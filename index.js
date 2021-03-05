const { By, Builder, until, findElement, } = require('selenium-webdriver');
require('dotenv').config();

(async () => {

    const driver = await new Builder().forBrowser('chrome').build();
    try {
        
        await goToInstagramHomePage();
        await login();
        
    } catch (e) {
        console.log(e);
    }

    async function goToInstagramHomePage() {
        await driver.get('https://www.instagram.com');
    }

    async function login() {
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;

        const actions = driver.actions({ async: true });

        const usernameInput = By.name('username')
        await driver.wait(until.elementLocated(usernameInput), 10000);
        await driver.findElement(usernameInput)
        .sendKeys(email);
        
        const passwordInput = By.name('password')
        await driver.wait(until.elementLocated(passwordInput));
        await driver.findElement(passwordInput)
            .sendKeys(password);

        const submitBtn = By.css('[type="submit"]');
        actions.click(driver.findElement(submitBtn)).perform();
    }

})();