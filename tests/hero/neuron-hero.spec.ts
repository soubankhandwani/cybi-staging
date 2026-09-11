import { test, expect, type Page } from "@playwright/test";
import { advanceMotion, getNarrative } from "../../src/components/hero/narrative";

const hero = (page: Page) => page.locator("[data-hero-panel]");
const progress = (page: Page) => hero(page).evaluate((el) => Number((el as HTMLElement).style.getPropertyValue("--hero-progress")));
async function seek(page: Page, value: number) {
  await hero(page).evaluate((panel, p) => {
    const track = panel.parentElement!;
    window.scrollTo({ top: track.getBoundingClientRect().top + scrollY + (track.offsetHeight - (panel as HTMLElement).offsetHeight) * p, behavior: "instant" });
  }, value);
}

test("motion eases quickly without overshoot and remains display-rate independent", () => {
  let near = { position: 0, velocity: 0 };
  let far = { position: 0, velocity: 0 };
  for (let i = 0; i < 4; i++) {
    near = advanceMotion(near, 0.4, 1 / 60);
    far = advanceMotion(far, 1, 1 / 60);
  }
  expect(near.position).toBeGreaterThan(0);
  expect(near.position).toBeLessThan(0.4);
  expect(far.position).toBeGreaterThan(near.position);
  expect(far.position).toBeLessThan(1);

  let sixtyHz = { position: 0, velocity: 0 };
  let oneTwentyHz = { position: 0, velocity: 0 };
  for (let i = 0; i < 60; i++) sixtyHz = advanceMotion(sixtyHz, 0.5, 1 / 60);
  for (let i = 0; i < 120; i++) oneTwentyHz = advanceMotion(oneTwentyHz, 0.5, 1 / 120);
  expect(sixtyHz.position).toBeCloseTo(0.5, 10);
  expect(oneTwentyHz.position).toBeCloseTo(sixtyHz.position, 10);
  expect(sixtyHz.velocity).toBe(0);

  let reverse = { position: 0.8, velocity: 0 };
  for (let i = 0; i < 60; i++) {
    const previous = reverse.position;
    reverse = advanceMotion(reverse, 0.2, 1 / 60);
    expect(reverse.position).toBeLessThanOrEqual(previous);
    expect(reverse.position).toBeGreaterThanOrEqual(0.2);
  }
  expect(reverse).toEqual({ position: 0.2, velocity: 0 });
});

test("new brand identity and discovery metadata are published consistently", async ({ page, request }) => {
  await page.goto("/");

  const headerLogo = page.getByRole("link", { name: "Cyber-I home" }).locator("img");
  await expect(headerLogo).toHaveAttribute("src", /cyber-i-logo-2026\.png/);
  await expect(page.locator('link[rel="icon"][href*="/icon"]')).toHaveCount(1);
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "http://localhost:3000");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/opengraph-image\.png/);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain("Cyber-I Consultancy");

  const manifestResponse = await request.get("/manifest.webmanifest");
  expect(manifestResponse.ok()).toBe(true);
  expect(await manifestResponse.text()).toContain("cyber-i-site-icon-2026.png");

  const robotsResponse = await request.get("/robots.txt");
  expect(robotsResponse.ok()).toBe(true);
  expect(await robotsResponse.text()).toContain("Sitemap: http://localhost:3000/sitemap.xml");

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  expect(await sitemapResponse.text()).toContain("/services/cyber-crime-investigation");
});

test("clip join overlaps continuously and the final frame remains on C", () => {
  const before = getNarrative((1 - 0.000001) / 1.94);
  const after = getNarrative(1 / 1.94);
  expect(before.blend).toBeGreaterThan(0.999);
  expect(after.sequence).toBe(before.sequence + 1);
  expect(after.flightProgress).toBeCloseTo(before.nextProgress, 4);
  expect(getNarrative(0).flightProgress).toBe(0);
  expect(getNarrative(1)).toMatchObject({ sequence: 1, story: 2, flightProgress: 1, blend: 0 });
});

test("desktop has a full-screen continuous flight, chapter copy, sticky header and keyboard CTA", async ({ page }) => {
  const errors: string[] = [];
  const requests = new Set<string>();
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    const sequence = request.url().match(/\/hero\/frames\/([^/]+)\//)?.[1];
    if (sequence) requests.add(sequence);
  });
  await page.goto("/");
  await expect(hero(page)).toHaveAttribute("data-enhanced", "true");
  await expect(hero(page).locator("canvas")).toBeVisible();
  await expect(page.locator("[data-site-header]")).toHaveAttribute("data-scrolled", "false");
  const bounds = await hero(page).boundingBox();
  expect(bounds?.width).toBe(1440);
  expect(bounds?.height).toBe(900);
  await expect(hero(page).locator('img[src*="neuron-"]')).toHaveCount(0);
  await expect.poll(() => requests.size).toBe(2);
  expect([...requests].sort()).toEqual(["a-to-b", "b-to-c"]);
  const distance = await hero(page).evaluate((el) => el.parentElement!.offsetHeight - (el as HTMLElement).offsetHeight);
  expect(distance).toBe(8100);
  await expect(hero(page).locator('[data-story][data-active="true"]')).toContainText(/See what others\s*overlook/);
  await page.screenshot({ path: "tmp/hero-desktop-top.png" });

  await seek(page, 0.22);
  await page.waitForTimeout(35);
  const accelerating = await progress(page);
  expect(accelerating).toBeGreaterThan(0);
  expect(accelerating).toBeLessThan(0.22);
  await page.waitForTimeout(75);
  const coasting = await progress(page);
  expect(coasting).toBeGreaterThan(accelerating);
  expect(coasting).toBeLessThan(0.22);
  await expect.poll(() => progress(page)).toBeCloseTo(0.22, 3);
  await expect(page.locator("[data-site-header]")).toHaveAttribute("data-scrolled", "false");
  await page.screenshot({ path: "tmp/hero-desktop-continuous.png" });

  for (const [p, copy, shot] of [[0.35, "Follow the facts", "investigation"], [0.86, "Move forward", "intelligence"], [1, "Move forward", "complete"]] as const) {
    await seek(page, p);
    await expect.poll(() => progress(page)).toBeCloseTo(p, 3);
    await expect(hero(page).locator("canvas")).toBeVisible();
    await expect(hero(page).locator('[data-story][data-active="true"]')).toContainText(copy);
    await expect(page.locator("[data-site-header]")).toHaveAttribute("data-scrolled", p === 1 ? "true" : "false");
    await page.screenshot({ path: `tmp/hero-desktop-${shot}.png` });
  }
  for (const p of [0.5, 0]) {
    await seek(page, p);
    await expect.poll(() => progress(page)).toBeCloseTo(p, 3);
  }
  await page.getByRole("button", { name: "Pause ambient animation" }).focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Explore our expertise" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("mobile and reduced motion load no flight frames and remain unpinned", async ({ browser }) => {
  for (const mobile of [true, false]) {
    const context = await browser.newContext(mobile
      ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }
      : { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    const frames: string[] = [];
    page.on("request", (request) => { if (request.url().includes("/hero/frames/")) frames.push(request.url()); });
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Explore our expertise" })).toBeVisible();
    await page.getByRole("button", { name: "Pause ambient animation" }).click();
    await expect(page.getByRole("button", { name: "Play ambient animation" })).toBeVisible();
    if (mobile) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
      await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
      await page.keyboard.press("Escape");
      await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
    }
    await page.waitForTimeout(500);
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await expect(hero(page).locator("canvas")).toBeHidden();
    expect(frames).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `tmp/hero-${mobile ? "mobile" : "reduced"}-continuous.png` });
    await context.close();
  }
});

test("failed flight requests retain the supplied world fallback", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("**/hero/frames/**", (route) => route.fulfill({ status: 404, body: "Missing frame" }));
  await page.goto("/");
  await expect(hero(page)).toHaveAttribute("data-enhanced", "true");
  await seek(page, 0.2);
  await expect.poll(() => progress(page)).toBeCloseTo(0.2, 3);
  await expect(hero(page).locator("canvas")).toBeVisible();
  const drawn = await hero(page).locator("canvas").evaluate((element) => {
    const canvas = element as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    const a = ctx.getImageData(canvas.width * 0.3, canvas.height * 0.5, 1, 1).data;
    const b = ctx.getImageData(canvas.width * 0.7, canvas.height * 0.5, 1, 1).data;
    return a[0] !== b[0] || a[1] !== b[1] || a[2] !== b[2];
  });
  expect(drawn).toBe(true);
  expect(errors).toEqual([]);
});

test("changing reduced-motion preference cleans up the running pin", async ({ page }) => {
  await page.goto("/");
  await expect(hero(page)).toHaveAttribute("data-enhanced", "true");
  await seek(page, 0.4);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(hero(page).locator("canvas")).toBeHidden();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(hero(page)).toHaveAttribute("data-enhanced", "true");
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
});
