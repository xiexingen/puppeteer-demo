/**
 * 设为手机屏幕
 */

import * as puppeteer from 'puppeteer';
import * as devices from "puppeteer/DeviceDescriptors"; //导入屏幕设备相关

const iPhone = devices["iPhone 6"];// iphone 6

export default async ()=>{
    const browser=await puppeteer.launch({
        headless:false,
        //slowMo:1000
    });

    const page=await browser.newPage();

    // 使用iphone6 设备
    await page.emulate(iPhone);
    await page.goto("https://baidu.com/");
    await browser.close();
}