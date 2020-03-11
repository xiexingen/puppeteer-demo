/**
 * 追踪站点性能
 */

import * as puppeteer from "puppeteer";

export default async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.tracing.start({
    path: "download/track-site-time.json"
  });

  await page.goto("https://github.com/login");
  await page.tracing.stop();
  await browser.close();
}