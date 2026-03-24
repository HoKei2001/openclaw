#!/usr/bin/env bun
/**
 * kb/upload.ts — GoVeda Patent KB uploader
 *
 * Usage:
 *   bun kb/upload.ts              # process everything in kb/raw/
 *   bun kb/upload.ts <file>       # process a single file
 *   bun kb/upload.ts <dir>        # process a directory
 */

import { existsSync } from "node:fs";
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const MEMORY_DIR = path.resolve(import.meta.dir, "../memory");
const RAW_DIR = path.resolve(import.meta.dir, "raw");

const CATEGORY_MAP: Record<string, string> = {
  disclosure: "inventions",
  "prior-art": "patent-pipeline",
  ppa: "templates",
  uspto: "patent-law",
  law: "patent-law",
  template: "templates",
  checklist: "templates",
  flow: "patent-pipeline",
  stakeholder: "patent-pipeline",
};

function detectCategory(filename: string): string {
  const name = filename.toLowerCase();
  for (const [keyword, category] of Object.entries(CATEGORY_MAP)) {
    if (name.includes(keyword)) {
      return category;
    }
  }
  return "patent-pipeline";
}

function addFrontmatter(content: string, source: string, category: string): string {
  if (content.trimStart().startsWith("---")) {
    return content;
  }
  const today = new Date().toISOString().split("T")[0];
  const slug = path
    .basename(source, path.extname(source))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  return `---\ntopic: ${slug}\nsource: ${source}\ndate: ${today}\ntype: ${category}\n---\n\n${content}`;
}

async function processFile(src: string, category?: string): Promise<void> {
  const ext = path.extname(src).toLowerCase();
  if (![".md", ".txt"].includes(ext)) {
    console.log(`  skip ${path.basename(src)} (unsupported: ${ext})`);
    return;
  }

  const content = await readFile(src, "utf-8");
  const cat = category ?? detectCategory(path.basename(src));
  const processed = addFrontmatter(content, path.basename(src), cat);

  const outName = path.basename(src, ext) + ".md";
  const outPath = path.join(MEMORY_DIR, cat, outName);

  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, processed, "utf-8");
  console.log(`  ✓ ${path.basename(src)} → memory/${cat}/${outName}`);
}

async function walkDir(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...(await walkDir(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const [, , target] = process.argv;

  const files = target
    ? existsSync(target) && (await readdir(target).catch(() => null))
      ? await walkDir(target)
      : [target]
    : await walkDir(RAW_DIR);

  console.log(`Processing ${files.length} files...`);
  for (const f of files) {
    await processFile(f);
  }
  console.log("\nDone. Run: pnpm openclaw memory index --force");
}

main().catch(console.error);
