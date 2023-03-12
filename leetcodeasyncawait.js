const puppeteer = require("puppeteer");

const codeObj = require('./codes');

const loginLink = "https://leetcode.com/accounts/login/";
const email = "temp58047@gmail.com";
const password = "temp123456";

(async function(){
    try{
     let browserObj = await puppeteer.launch({
            headless : false,
            defaultViewport:null,
            args:["--start-maximized"]
     })
     
     let browserPages  = await browserObj.pages();
     let page = browserPages[0];
     await page.goto(loginLink);
     await page.waitForTimeout(4000);
     await page.type("input[name='login']",email,{delay : 50});
     await page.type("input[name='password']",password,{delay : 50});
     await page.click("#signin_btn",{delay : 50});
     await page.waitForTimeout(4000);
     await waitAndClick('a[href="/problemset/all/"].nav-item__5BvG',page);
     await page.waitForTimeout(4000);
     let questionsArr = await page.$$('.truncate.overflow-hidden .h-5');
     await questionsArr[0].click();
     await page.waitForTimeout(4000);
     await questionSolver(page,codeObj.answer);
    }catch(error){
     console.log(error);
    } 
 })()

 async function questionSolver(page,answer){
     try{
        await waitAndClick('.func__1DsC .custom-testcase__2ah7',page);
        await waitAndClick('.editor-container__QkHu #testcase-editor',page);
        await page.keyboard.down('Control');
        await page.keyboard.press('A',{delay:100});
        await page.keyboard.press('D',{delay:100});
        await page.type('.editor-container__QkHu #testcase-editor',answer,{delay: 10});
        await page.keyboard.down('Control');
        await page.keyboard.press('A',{delay:100});
        await page.keyboard.press('X',{delay:100});
        await page.keyboard.up('Control');
        let editorInFocus = await page.$$('.CodeMirror-scroll[tabIndex="-1"]');
        await editorInFocus[0].click();
        await page.keyboard.down('Control');
        await page.keyboard.press('A',{delay:100});
        await page.keyboard.press('V',{delay:100});
        await page.waitForTimeout(4000); 
        await page.click('.submit__2ISl.css-ieo3pr');
     }catch(error){
        console.log(error);
     }
 }

 
async function waitAndClick(selector,page){
    await page.waitForSelector(selector);
    let selectorClicked = page.click(selector);
    return selectorClicked;
 }
