import * as puppeteer from "puppeteer";

async function retry (page:puppeteer.Page,fn:any, retryDelay:number = 100, numRetries:number = 3){
    for (let i = 0; i < numRetries; i++) {
      try {
        return await fn()
      } catch (e) {
        if (i === numRetries - 1) throw e
        await page.waitFor(retryDelay)
        retryDelay = retryDelay * 2
      }
    }
  }

  async function myRetry(promiseFactory, retryCount) {
    try {
      return await promiseFactory();
    } catch (error) {
      if (retryCount <= 0) {
        throw error;
      }
      return await myRetry(promiseFactory, retryCount - 1);
    }
  }

const crawlDetail = async (page: puppeteer.Page, url) => {
  await page.goto(url);
  await page.waitForSelector("#choose-btns");
  const hasStock = await page.evaluate(() => {
    return !document.querySelector(".J-notify-stock");
  });
  return hasStock;
};

const crawlPage = async (page: puppeteer.Page) => {
  const items = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll(".gl-item").forEach(el => {
      items.push({
        title: el.querySelector(".p-name > a").getAttribute("title"),
        url: "https:" + el.querySelector(".p-name > a").getAttribute("href")
      });
    });
    return items;
  });

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    item["has_stock"] = await myRetry(async ()=>await crawlDetail(page, item.url),6);
  }
  console.log(items);
};

export default async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
    // slowMo:100,
    timeout: 1000
  });

  const page = await browser.newPage();
  //page.setViewport({ height: 1300, width: 2560 });

  page.on("error", e => {
    console.error(e);
  });

  try {
    await page.goto("https://www.jd.com/chanpin/270170.html");
    await page.waitForSelector("#J_goodsList");
    await crawlPage(page);

    while (true) {
      const hasNext = await page.evaluate(() => {
        if (!document.querySelector(".pn-next")) return false;
        return !document.querySelector(".pn-next.disabled");
      });

      if (!hasNext) break;
      await page.click(".pn-next");
      await page.waitForNavigation({ waitUntil: "networkidle2" });
      await crawlPage(page);
    }

    await browser.close();
  } catch (ex) {
    console.error(ex);
  }
};
