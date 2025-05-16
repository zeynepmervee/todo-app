import { Builder, By, until } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome.js';

const options = new chrome.Options().addArguments('--headless'); // Tarayıcı arka planda açılır

const driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();

try {
  // 1. Sayfayı aç
  await driver.get('http://localhost:5000');

  // 2. Input'a görev metni yaz
  const input = await driver.findElement(By.id('taskInput'));
  await input.sendKeys('Walk the dog');

  // 3. "Add Task" butonunu bul ve tıkla
  const button = await driver.findElement(By.xpath("//button[text()='Add Task']"));
  await button.click();

  // 4. Yeni eklenen görev DOM'a eklendi mi? (li içinde görünmeli)
  const addedTask = await driver.wait(
    until.elementLocated(By.xpath("//li[contains(., 'Walk the dog')]")),
    3000
  );

  // 5. Görev bulunduysa test başarılıdır
  if (addedTask) {
    console.log('✅ Selenium UI Test Passed: Task successfully added.');
  }

} catch (error) {
  console.error('❌ Selenium UI Test Failed:', error);
} finally {
  await driver.quit(); // tarayıcıyı kapat
}
