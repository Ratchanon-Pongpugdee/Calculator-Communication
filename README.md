# UN.Universe Calculator (Internship Project from Training)

## รายละเอียด
[เวอร์ชันปรับปรุงใหม่]เว็บแอปเครื่องคิดเลขที่สามารถคำนวณ บันทึกประวัติย้อนหลังและเก็บผลลัพธ์ล่าสุด แม้ปิด/เปิด server ใหม่ สร้างขึ้นในช่วงฝึกงานปี 2025

## คุณสมบัติ
- อินเทอร์เฟซเครื่องคิดเลข (คลิก/พิมพ์ได้)
- ฟีเจอร์เหมือนเครื่องคิดเลขจริง (บวก ลบ คูณ หาร ฯลฯ)
- เก็บประวัติย้อนหลังและผลลัพธ์ล่าสุด
- ประวัติไม่หายเมื่อปิด/เปิด server ใหม่
- รองรับการเข้าถึงผ่านเครือข่ายและ ngrok
- สามารถทดสอบด้วย Playwright ว่าเครื่องคิดเลขทำงานถูกต้องจริงไหมในทุกกรณี

## เทคโนโลยีที่ใช้
- React (Frontend)
- Vite
- Node.js + Express (Backend)
- Ngrok (สำหรับ เข้าถึงเเบบ allow all network)
- Playwright (สำหรับเขียน TestScript)
- Electron (สำหรับเปิดเเอปบน Desktop)

## วิธีเปิดโปรเจคต์
- (Backend)
    cd backend
    npm run dev , npm start , node server.js
- (Frontend)
    cd frontend
    npm run dev
- (Playwright)
    cd playwright
    npx playwright test , npx playwright test --headed(หากต้องการดูผลใน browser)
- (Ngrok)
    cd Calculator-App
    ngrok http 5173
- (ElectronJS)
    cd electron
    npm install
    npm start

## หมายเหตุ
โปรเจคต์นี้อยู่ระหว่างการทดลอง(Alpha)เเละอาจมีการอัปเดตในอนาคต คุณลักษณะบางอย่างอาจเปลี่ยนเเปลงหรือถูกยกเลิก
