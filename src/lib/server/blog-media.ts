import "server-only";

import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { Binary } from "mongodb";
import { getDb } from "@/lib/server/mongodb";

export const IMAGE_PATH = /^\/uploads\/blog\/([a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|webp|gif))$/;
const types: Record<string, string> = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" };

async function legacyImage(name: string) {
  const file = path.join(process.cwd(), "public", "uploads", "blog", name);
  try {
    return (await stat(file)).isFile() ? file : null;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

async function uploads() {
  return (await getDb()).collection<{ _id: string; bytes: Binary }>("blogImages");
}

export async function saveBlogImage(name: string, bytes: Buffer) {
  await (await uploads()).insertOne({ _id: name, bytes: new Binary(bytes) });
}

export async function blogImageExists(url: string) {
  const name = IMAGE_PATH.exec(url)?.[1];
  if (!name) return false;
  if (await legacyImage(name)) return true;
  return Boolean(await (await uploads()).findOne({ _id: name }, { projection: { _id: 1 } }));
}

export async function readBlogImage(name: string) {
  if (!IMAGE_PATH.test("/uploads/blog/" + name)) return null;
  const type = types[name.slice(name.lastIndexOf(".") + 1)];
  const legacy = await legacyImage(name);
  const bytes = legacy
    ? await readFile(path.join(process.cwd(), "public", "uploads", "blog", name))
    : (await (await uploads()).findOne({ _id: name }))?.bytes.buffer;
  return bytes ? { bytes, type } : null;
}
