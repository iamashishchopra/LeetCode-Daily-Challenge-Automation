const puppeteer = require("puppeteer");

const codeObj = require('./codes');

const loginLink = "https://leetcode.com/accounts/login/";
const email = "temp58047@gmail.com";
const password = "temp123456"

let browserOpen = puppeteer.launch({
    headless : false,
    defaultViewport:null,
    args:["--start-maximized"]
})

let page;

browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.pages();
    return browserOpenPromise; 
}).then(function(browserPages){
    page = browserPages[0];
    let leetcodeOpenPromise = page.goto(loginLink);
    return leetcodeOpenPromise;
}).then(function(){
    let waitFor4Seconds = page.waitForTimeout(4000); 
    return waitFor4Seconds;
}).then(function(){
    let emailIsEntered = page.type("input[name='login']",email,{delay : 50});
    return emailIsEntered;
}).then(function(){
    let passwordIsEntered = page.type("input[name='password']",password,{delay : 50});
    return passwordIsEntered;
}).then(function(){
    let loginButtonClicked = page.click("#signin_btn",{delay : 50});
    return loginButtonClicked;
}).then(function(){
    let waitFor4Seconds = page.waitForTimeout(4000); 
    return waitFor4Seconds;
})
.then(function(){
    let clickOnProblemsPromise = waitAndClick('a[href="/problemset/all/"].nav-item__5BvG',page);
    return clickOnProblemsPromise;
})
.then(function(){
    let waitFor4Seconds = page.waitForTimeout(4000); 
    return waitFor4Seconds;
})
.then(function(){
    let allQuestionsPromise = page.$$('.truncate.overflow-hidden .h-5');
    return allQuestionsPromise;
}).then(function(questionsArr){
    let questionWillBeClicked = questionsArr[0].click();
    return questionWillBeClicked;
}).then(function(){
    let waitFor4Seconds = page.waitForTimeout(4000); 
    return waitFor4Seconds;
}).then(function(){
    questionSolver(page,codeObj.answer);
})

function questionSolver(page,answer){
   return new Promise(function(resolve,reject){
    let consoleWillBeClicked = waitAndClick('.func__1DsC .custom-testcase__2ah7',page);
        consoleWillBeClicked.then(function(){
        let areaInFocus = waitAndClick('.editor-container__QkHu #testcase-editor',page);
        return areaInFocus;
    }).then(function(){
        let ctrlIsPressed = page.keyboard.down('Control'); // hold it down
        return ctrlIsPressed;
    }).then(function(){
        let AisPressed = page.keyboard.press('A',{delay:100}); // just press it
        return AisPressed;
    }).then(function(){
        let DisPressed = page.keyboard.press('D',{delay:100});
        return DisPressed; 
        // ctrl A + ctrl D done
    }).then(function(){
        let answerWillBeTyped = page.type('.editor-container__QkHu #testcase-editor',answer,{delay: 10});
        return answerWillBeTyped;
    }).then(function(){
        let ctrlIsPressed = page.keyboard.down('Control'); // hold it down
        return ctrlIsPressed;
    }).then(function(){
        let AisPressed = page.keyboard.press('A',{delay:100}); // just press it
        return AisPressed;
    }).then(function(){
        let XisPressed = page.keyboard.press('X',{delay:100});
        return XisPressed; 
    }).then(function(){
        let ctrlIsUnPressed = page.keyboard.up('Control'); 
        return ctrlIsUnPressed;
    })
    .then(function(){
        let editorInFocus = page.$$('.CodeMirror-scroll[tabIndex="-1"]');
        return editorInFocus;
    }).then(function(editorInFocus){
        let editorWillBeClicked = editorInFocus[0].click();
        return editorWillBeClicked;
    }).then(function(){
        let ctrlIsPressed = page.keyboard.down('Control'); // hold it down
        return ctrlIsPressed;
    }).then(function(){
        let AisPressed = page.keyboard.press('A',{delay:100}); // just press it
        return AisPressed;
    }).then(function(){
        let VisPressed = page.keyboard.press('V',{delay:100});
        return VisPressed; 
    }).then(function(){
        let waitFor4Seconds = page.waitForTimeout(4000); 
        return waitFor4Seconds;
    }).then(function(){
        let submitWillBeClicked = page.click('.submit__2ISl.css-ieo3pr');
        return submitWillBeClicked;
    })
    .then(function(){
        resolve();
    }).catch(function(err){
        reject();
      })
    })
}

function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
      let waitForElementPromise = cPage.waitForSelector(selector);
      waitForElementPromise.then(function(){
          let clickElement = cPage.click(selector,{delay:50});
          return clickElement;
      }).then(function(){
          resolve()
      }).catch(function(err){
          reject();
      })
    })
}
