import { Builder, By, until } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome.js';

const options = new chrome.Options().addArguments('--headless');
const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

try {
  await driver.get('http://localhost:5000');

  const input = await driver.findElement(By.id('taskInput'));
  await input.sendKeys('Walk the dog (test)');

  const button = await driver.findElement(By.xpath("//button[text()='Add Task']"));
  await button.click();

  const addedTask = await driver.wait(
    until.elementLocated(By.xpath("//li[contains(., 'Walk the dog (test)')]")),
    3000
  );

  if (addedTask) {
    console.log('✅ Selenium UI Test Passed: Short task successfully added.');
  }

  const longTitle = '[TEST] This is a very long task title that should wrap to a new line and remain inside the layout boundaries without breaking the UI or overflowing.'.repeat(2);

  const longInput = await driver.findElement(By.id('taskInput'));
  await longInput.clear();
  await longInput.sendKeys(longTitle);

  const longButton = await driver.findElement(By.xpath("//button[text()='Add Task']"));
  await longButton.click();

  const longTask = await driver.wait(
    until.elementLocated(By.xpath(`//li[contains(., "${longTitle.substring(0, 30)}")]`)),
    3000
  );

  if (longTask) {
    console.log('✅ Selenium UI Test Passed: Long title task successfully added.');
  }

} catch (error) {
  console.error('Selenium UI Test Failed:', error);
} finally {
  try {
    const deleteTestTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks');
      const tasks = await res.json();

      for (const task of tasks) {
        if (
          task.title.includes('(test)') ||
          task.title.includes('[TEST]')
        ) {
          await fetch(`http://localhost:5000/tasks/${task.id}`, {
            method: 'DELETE',
          });
        }
      }
    };
    await deleteTestTasks();

    await driver.quit();
  } catch (e) {
    console.error('Error during cleanup or closing:', e);
  }
}
