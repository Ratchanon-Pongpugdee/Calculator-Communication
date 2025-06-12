# UN.Universe Calculator (Internship Project from Training)

## รายละเอียด
(เวอร์ชันปรับปรุงใหม่) เว็บแอปเครื่องคิดเลขที่สามารถคำนวณ บันทึกประวัติย้อนหลังและเก็บผลลัพธ์ล่าสุด แม้ปิด/เปิด server ใหม่ สร้างขึ้นในช่วงฝึกงานปี 2025

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
* **(Backend)**
  * cd backend
  * node server.js , npm start , npm run dev(เเนะนำ)
* **(Frontend)**
  * cd frontend
  * npm run build(หากใช้ครั้งเเรก)
  * npm run dev
* **(Playwright)**
  * *รัน backend เเละ frontend ก่อน*
  * cd playwright
  * npm install (หากยังไม่มี node modules)
  * npx playwright test , npx playwright test --headed(หากต้องการดูผลใน browser)
* **(Ngrok)**
  * *รัน backend เเละ frontend ก่อน*
  * cd Calculator-App >> 
  * npm install (หากใช้ครั้งเเรก) 
  * ngrok http 5173
* **(ElectronJS)**
  * *รัน backend เเละ frontend ก่อน*
  * cd electron
  * npm install 
  * npm start

## วิธีหยุดโปรเจคต์
  * *โปรเจคต์กำลังรันอยู่*
  * ctrl + c
  * y (ถ้ามี)

## หมายเหตุ
โปรเจคต์นี้อยู่ระหว่างการทดลอง(Alpha)เเละอาจมีการอัปเดตในอนาคต คุณลักษณะบางอย่างอาจเปลี่ยนเเปลงหรือถูกยกเลิก
