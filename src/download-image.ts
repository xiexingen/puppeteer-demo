/**
 * 下载图片
 */

import * as puppeteer from 'puppeteer';

export default async ()=>{
    const browser=await puppeteer.launch({
        headless:true,
        //slowMo:1000
    });

    const page=await browser.newPage();

    // 设置浏览器窗口大小
    //page.setViewport({height:600,width:800})
    
    await page.goto("https://juejin.im/timeline");

    await page.screenshot({
        fullPage:true,//是否全屏幕
        path:'download/example.jpg'
    })
    await browser.close();
}