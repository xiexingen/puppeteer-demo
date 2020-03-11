import * as puppeteer from "puppeteer";
import { resolve } from "path";
import * as fs from "fs";
import * as https from "https";
import fetch from 'node-fetch'

const download = (fileUrl, destination) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);
    https
      .get(fileUrl, response => {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve(true);
        });
      })
      .on("error", error => {
        fs.unlink(destination, () => {});
        reject(error.message);
      });
  });
};

async function loadData1(){
    const posts = await fetch('https://www.trialos.com/api/trialos-service/site/searchInstitution',{
    method:'POST',
    headers:{
      'content-type':'application/json;version=3.0;compress=false',
      'cookie':'token=34a956dde0664a71812f136ee95eada5; gr_user_id=e26caa58-9807-4861-aa19-ed1485445902; 90cd4fa8e924e7b7_gr_session_id=09d1c26a-3883-46ee-b6ff-18869cf8e9c5; 90cd4fa8e924e7b7_gr_session_id_09d1c26a-3883-46ee-b6ff-18869cf8e9c5=true'
    },
    body:JSON.stringify({
      pageNo: 1,
      pageNum: 1, 
      pageSize: 10, 
      isPersonal: 1,
      paging: true, 
      counting: true,
      sortProperties:[{propertyName: "underGoingProject", sort: "DESC"}]
    })
  }).then(resp => resp.json());
  console.log(posts);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    dumpio: true
  });
  const page = await browser.newPage();
  page.setViewport({ height: 1300, width: 2560 });

  await page.setCookie({
    name: "token",
    value: "34a956dde0664a71812f136ee95eada5",
    domain: ".trialos.com"
  });

  // await page.goto("https://www.trialos.com/login/");
  // await page.waitFor("#username"); // 等待文本框加载完成
  // await page.type("#username", "xiexingen");
  // await page.type("#password", "Abcd1234", {
  //   delay: 1
  // });
  // await page.click("button.loginButton ");
  // await page.waitForNavigation({waitUntil:'networkidle2'});

  await page.on("response", async response => {
    if (response.url() == "https://www.trialos.com/api/trialos-service/site/searchInstitution") {
      const json=await response.json();
      console.log(json);
    }
  });
  console.log('start');
  await page.goto("https://www.trialos.com/os/home/site/research_site", {
    waitUntil: "networkidle2"
  });
  console.log('down');



  await browser.close();
})();
