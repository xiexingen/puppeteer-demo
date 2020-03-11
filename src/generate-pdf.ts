/**
 * 生成pdf
 */

import * as puppeteer from 'puppeteer';

export default async ()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.baidu.com");

    await page.pdf({
      displayHeaderFooter: true,
      path: 'download/generate-pdf.pdf',
      format: 'A4',
      headerTemplate: '<b style="font-size: 30px">页头<b/>',
      footerTemplate: '<b style="font-size: 30px">页尾</b>',
      margin: {
        top: "100px",
        bottom: "200px",
        right: "30px",
        left: "30px",
      }
    });
    await browser.close();
}