const puppeteer = require('puppeteer');
const { logging } = require('selenium-webdriver');
require('dotenv').config();

(async () => {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    try {

        await page.goto('https://www.instagram.com')

        await login();

        if (!await isSigned()) {
            throw new Error('Credenciais parecem estar incorretas.');
        }

        await page.goto('https://www.instagram.com/p/CLhM5INM4Lf/?igshid=1uoy4v8d59o3x');

        for (let i = 0; i <= 20; i++) {
            await commentPost('quero ganhar o sorteio');
            await page.waitForTimeout(20000);
        }


    } catch (e) {
        console.log(e);
    }

    async function commentPost(commentBody) {
        try {
            await page.waitForSelector('textarea', { timeout: 10000 });
            await page.click('textarea', { timeout: 10000 });
            await page.type('textarea', commentBody);

            await page.click('[type="submit"]');
        } catch (e) {
            console.log('Erro ao comentar');
        }
    }

    async function login() {
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;

        const usernameInputSelector = '[name="username"]'
        const passwordInputSelector = '[name="password"]'

        try {
            await page.waitForSelector(usernameInputSelector);
            await page.type(usernameInputSelector, email);

            await page.waitForSelector(passwordInputSelector);
            await page.type(passwordInputSelector, password);

            await page.click('[type="submit"]');
        } catch (e) {
            console.log(e);
            console.log('Erro ao logar-se.');
        }
    }

    async function isSigned() {
        try {
            await page.waitForSelector('._6q-tv', { timeout: 10000 });

            return true;
        } catch (e) {
            return false;
        }
    }

})();