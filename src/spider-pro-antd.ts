/**
 * 爬取pro-antd的监控页
 */

import * as puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://preview.pro.ant.design/dashboard/monitor");
  await page.content();
  await page.screenshot({
    path: "download/spider-pro-antd.jpg",
    fullPage: true
  });
  await browser.close();
})();
