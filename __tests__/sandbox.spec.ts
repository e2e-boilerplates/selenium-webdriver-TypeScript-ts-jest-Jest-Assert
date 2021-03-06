import * as assert from "assert";
/* tslint:disable:no-submodule-imports */
import { Builder, By } from "selenium-webdriver";
// tslint:disable-next-line:no-var-requires
const chrome = require("selenium-webdriver/chrome");

import "chromedriver";

const options = new chrome.Options();
const chromeOptions = process.env.GITHUB_ACTIONS ? options.headless() : options;

describe("Sandbox", () => {
  let browser: any;

  beforeAll(async () => {
    browser = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    await browser.get("https://e2e-boilerplate.github.io/sandbox/");
  }, 30000);

  afterAll(() => {
    browser.quit();
  });

  it("Should be on Sandbox", async () => {
    const title = await browser.getTitle();
    const header = await browser.findElement(By.css("h1"));

    assert.strictEqual(title, "Sandbox");
    assert.strictEqual(await header.getText(), "Sandbox");
  });
});
