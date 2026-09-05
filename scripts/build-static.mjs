#!/usr/bin/env node
/**
 * Static-export build, for hosts that cannot run Node (GitHub Pages).
 *
 * A plain `NEXT_OUTPUT=export next build` script would not run on Windows
 * PowerShell or cmd, so the env is set here instead of inline.
 *
 *   npm run build:static
 *   npm run build:static -- --base-path /my-repo --site-url https://me.github.io/my-repo
 *
 * Output lands in ./out. Serve it with `npx serve out` to check it locally.
 */
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 ? args[i + 1] : undefined;
};

const env = {
  ...process.env,
  NEXT_OUTPUT: "export",
  NEXT_PUBLIC_BASE_PATH: flag("base-path") ?? process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  NEXT_PUBLIC_SITE_URL: flag("site-url") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "",
  // Local and preview exports stay out of search unless explicitly allowed.
  NEXT_PUBLIC_NOINDEX: args.includes("--index") ? "0" : "1",
};

if (env.NEXT_PUBLIC_BASE_PATH) {
  console.log(`base path : ${env.NEXT_PUBLIC_BASE_PATH}`);
}
console.log(`site url  : ${env.NEXT_PUBLIC_SITE_URL || "(placeholder)"}`);
console.log(`indexable : ${env.NEXT_PUBLIC_NOINDEX === "0" ? "yes" : "no"}\n`);

const result = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  env,
  shell: process.platform === "win32",
});
process.exit(result.status ?? 1);
