/**
 * 自动化提交表单
 */

import * as puppeteer from "puppeteer";

export default async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.goto("https://github.com/login");
  await page.waitFor("#login_field"); // 等待文本框加载完成
  await page.type("#login_field", "1002275364@qq.com");
  await page.type("#password", "密码", {
    delay: 100
  });
  await page.click("input[type=submit]");

  await browser.close();
}
