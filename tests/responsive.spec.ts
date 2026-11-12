import { expect, test } from "@playwright/test";

test.use({ reducedMotion: "reduce" });

test("public headings and primary controls fit a 320px screen", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  for (const route of ["/about", "/services", "/services/cyber-crime-investigation", "/courses", "/clients", "/contact"]) {
    expect((await page.goto(route))?.ok(), route).toBe(true);
    const overflow = await page.locator("main :is(h1, h2, h3, button, input, select)").evaluateAll(async (elements) => {
      await document.fonts.ready;
      return elements.filter((element) => {
        const bounds = element.getBoundingClientRect();
        if (!bounds.width || !bounds.height || element.closest('[aria-hidden="true"]')) return false;
        return bounds.left < -1 || bounds.right > document.documentElement.clientWidth + 1;
      }).map((element) => element.textContent?.trim().slice(0, 70));
    });
    expect(overflow, route).toEqual([]);
  }
});

test("landscape navigation reaches every link and unlocks scrolling on resize", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 667, height: 375 }, hasTouch: true });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: /Contact/ }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.setViewportSize({ width: 1100, height: 650 });
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  } finally {
    await context.close();
  }
});

test("course enquiry keeps the selected programme", async ({ page }) => {
  await page.goto("/courses/basic-course-cyber-investigation");
  await page.getByRole("link", { name: "Ask about this course" }).click();
  await expect(page.getByLabel("Enquiry type")).toHaveValue("Course / Training");
  await expect(page.getByLabel("How can we help?")).toHaveValue(/Cyber Investigation/i);
});

test("industry tabs support keyboard navigation", async ({ page }) => {
  await page.goto("/");
  const tabs = page.getByRole("tablist", { name: "Industries" }).getByRole("tab");
  await tabs.first().focus();
  await page.keyboard.press("ArrowDown");
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toHaveAccessibleName(/government/i);
});
