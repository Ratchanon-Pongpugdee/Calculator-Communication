// @ts-check
const { test, expect } = require('@playwright/test');

// Define a test suite for the calculator
test.describe('Calculator Functionality Tests', () => {

  // Before each test, navigate to the base URL (http://localhost:5173)
  // This ensures each test starts with a clean slate
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173'); // Ensure this matches your frontend dev server URL
  });

  // --- Test Case 1.1: ทดสอบการบวกเลขด้วยปุ่มกด (TC-CALC-001) ---
  test('ทดสอบผลบวกด้วยปุ่มกด (TC-CALC-001)', async ({ page }) => {
    // Test Steps:
    await page.click('button:text("1")');
    await page.click('button:text("+")');
    await page.click('button:text("1")');
    await page.click('button:text("=")');

    // Expected Result:
    const result = await page.locator('.result').textContent(); // เปลี่ยนเป็น class result
    // @ts-ignore
    expect(result.trim()).toBe('2');
  });

  // --- Test Case 1.2: ทดสอบการลบเลขด้วยคีย์บอร์ด (TC-CALC-002) ---
  test('ทดสอบการลบเลขด้วยคีย์บอร์ด (TC-CALC-002)', async ({ page }) => {
    // Test Steps:
    await page.locator('.calc-input').type('2');
    await page.locator('.calc-input').type('-');
    await page.locator('.calc-input').type('2');
    await page.locator('.calc-input').press('Enter'); // กด Enter เพื่อคำนวณ

    const resultText = await page.locator('.result').textContent(); // เปลี่ยนเป็น class result
    // @ts-ignore
    expect(resultText.trim()).toBe('0');
  });

  // --- Test Case 1.3: ทดสอบการคูณเลข (TC-CALC-003) ---
  test('ทดสอบการคูณเลขด้วยปุ่มกด (TC-CALC-003)', async ({ page }) => {
    // Test Steps:
    await page.click('button:text("2")');
    await page.click('button:text("x")'); // ใช้ 'x' ตามปุ่ม
    await page.click('button:text("2")');
    await page.click('button:text("=")');

    // Expected Result:
    const result = await page.locator('.result').textContent(); // เปลี่ยนเป็น class result
    // @ts-ignore
    expect(result.trim()).toBe('4');
  });

  // --- Test Case 1.4: ทดสอบการหารด้วยศูนย์ (Error Handling) (TC-CALC-004) ---
  test('ทดสอบการหารด้วยศูนย์ (TC-CALC-004)', async ({ page }) => {
    // Test Steps:
    await page.click('button:text("1")');
    await page.click('button:text("0")');
    await page.click('button:text("0")');
    await page.click('button:text("÷")');
    await page.click('button:text("0")');
    await page.click('button:text("=")');

    // Expected Result:
    const resultText = await page.locator('.result').textContent();
    // @ts-ignore
    expect(resultText.trim()).toBe('Error');
    // * ไม่มีรายการ '100/0 = Error' ปรากฏในส่วนประวัติการคำนวณ
    // เนื่องจากเราบันทึกประวัติเฉพาะเมื่อคำนวณสำเร็จ
    // ตรวจสอบว่าไม่มีรายการประวัติ หรือรายการแรกไม่ตรงกับ Error
    await expect(page.locator('#history-list li')).toHaveCount(0);
    await page.click('button:text("C")'); // Clear input after test
    await expect(page.locator('.calc-input')).toHaveValue(''); // Ensure input is cleared
    await expect(page.locator('.result')).toHaveText(''); // Ensure result is cleared // ถ้าไม่มีประวัติอื่นเลย
  });

  // --- Test Case 1.5: ทดสอบปุ่ม Clear (C) (TC-CALC-005) ---
  test('ทดสอบปุ่ม Clear (C) (TC-CALC-005)', async ({ page }) => {
    // Preconditions: มีค่าในช่อง input หรือ result
    await page.click('button:text("1")');
    await page.click('button:text("+")');
    await page.click('button:text("2")');
    await expect(page.locator('.calc-input')).toHaveValue('1+2');

    // Test Steps:
    await page.click('button:text("C")');

    // Expected Result:
    const inputText = await page.locator('.calc-input').textContent();
    const resultText = await page.locator('.result').textContent();

    // @ts-ignore
    expect(inputText.trim()).toBe('');
    // @ts-ignore
    expect(resultText.trim()).toBe('');
  });

  // --- Test Case 1.6: ทดสอบปุ่ม Delete (DEL) (TC-CALC-006) ---
  test('ทดสอบปุ่ม Delete (DEL) (TC-CALC-006)', async ({ page }) => {
    // Preconditions: มีค่าในช่อง input
    await page.locator('.calc-input').type('12345');
    await expect(page.locator('.calc-input')).toHaveValue('12345');

    // Test Steps:
    await page.click('button:text("DEL")');
    await expect(page.locator('.calc-input')).toHaveValue('1234');
    await page.click('button:text("DEL")');

    // Expected Result:
    await expect(page.locator('.calc-input')).toHaveValue('123');
  });

  // --- Test Case 2.2: ทดสอบการล้างประวัติ (TC-HISTORY-002) ---
  test('ทดสอบการล้างประวัติ (TC-HISTORY-002)', async ({ page }) => {
    // Preconditions: มีประวัติการคำนวณในส่วนประวัติ
    // ทำการคำนวณบางอย่างเพื่อให้มีประวัติ
    await page.click('button:text("3")');
    await page.click('button:text("+")');
    await page.click('button:text("3")');
    await page.click('button:text("=")');
    const result = await page.locator('.result').textContent(); // เปลี่ยนเป็น class result
    // @ts-ignore
    expect(result.trim()).toBe('6');

    // Test Steps:
    await page.click('button:text("ลบประวัติ")'); // คลิกปุ่ม "ลบประวัติ"

    // Expected Result:
    // * ส่วน "ประวัติการคำนวณ" ว่างเปล่า
    expect(page.locator('#history-list li')).toHaveCount(0);
    // การทดสอบการล้างจากไฟล์ .json เมื่อปิด/เปิดแอปจะต้องทำด้วยตนเองหรือใช้เทคนิคการควบคุม Backend ที่ซับซ้อนขึ้น
  });
});