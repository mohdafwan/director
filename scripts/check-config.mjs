#!/usr/bin/env node
/**
 * Pre-deploy guard.
 *
 * Fails if the site would ship with placeholder company details still in place.
 * Wire this into CI before `next build` on the production branch — a live site
 * with "[COMPANY NAME]" in its <title> and "[+91 XXXXX XXXXX]" in its schema.org
 * markup is worse than no site.
 *
 *   node scripts/check-config.mjs           # report and fail on placeholders
 *   node scripts/check-config.mjs --warn    # report only, always exit 0
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const configPath = join(root, "src", "config", "site.ts");

const source = readFileSync(configPath, "utf8");

// Match "key: "[SOMETHING]"" — the placeholder convention used throughout.
const placeholderLine = /^\s*(\w+):\s*"(\[[^"]*\])"/gm;

const found = [];
let match;
while ((match = placeholderLine.exec(source)) !== null) {
  found.push({ key: match[1], value: match[2] });
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const originUnset = !siteUrl || siteUrl.includes("company.example");

const warnOnly = process.argv.includes("--warn");

if (found.length === 0 && !originUnset) {
  console.log("✓ site config: no placeholders remaining.");
  process.exit(0);
}

console.error("\n  Placeholder configuration detected\n");
console.error("  Edit src/config/site.ts before deploying to production.\n");

for (const item of found) {
  console.error(`    ${item.key.padEnd(18)} ${item.value}`);
}
if (originUnset) {
  console.error(
    `    ${"NEXT_PUBLIC_SITE_URL".padEnd(18)} not set — canonicals, sitemap and OG images
                       will point at https://company.example and robots.txt
                       will disallow all crawling.`,
  );
}
console.error(
  `\n  ${found.length + (originUnset ? 1 : 0)} item(s) outstanding.` +
    (warnOnly ? " (warning only)\n" : "\n"),
);

process.exit(warnOnly ? 0 : 1);
