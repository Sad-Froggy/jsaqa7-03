const {	test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const {
	email,
	password,
	incorrectEmail,
	incorrectPassword,
} = require("../user");

test("Successful authorization", async () => {
	const browser = await chromium.launch({
	  });
	const page = await browser.newPage("https://netology.ru/?modal=sign_in");
	await page.goto("https://netology.ru/?modal=sign_in");
	await page.screenshot({
		path: "playwright/testScreenshots/loginPage.png",
		fullPage: true
	});
	await page.fill('[placeholder="Email"]', email);
	await page.fill('[placeholder="Пароль"]', password);
	await page.click('[data-testid="login-submit-btn"]');
	await expect(page).toHaveURL("https://netology.ru/profile/9154054");
	await expect(page.locator("h2")).toContainText(["Моё обучение"]);
	await page.screenshot({ path: "playwright/testScreenshots/screenshotSuccessful.png", fullPage: true });
	browser.close();
});

test("Failed authorization", async () => {
	test.setTimeout(50000);
	const browser = await chromium.launch({
	});
	const page = await browser.newPage("https://netology.ru/?modal=sign_in");
	await page.goto("https://netology.ru/?modal=sign_in");
	await page.screenshot({
		path: "playwright/testScreenshots/loginPageIncorrectEmail.png",
		fullPage: true
	});
	await page.fill('[placeholder="Email"]', incorrectEmail);
	await page.fill('[placeholder="Пароль"]', incorrectPassword);
	await page.click('[data-testid="login-submit-btn"]');
	const error = await page.locator('[data-testid="login-error-hint"]');
	await expect(error).toHaveText("Вы ввели неправильно логин или пароль.");
	await page.screenshot({
		path: "playwright/testScreenshots/screenshotFailed.png",
		fullPage: true
	});
	browser.close();
});