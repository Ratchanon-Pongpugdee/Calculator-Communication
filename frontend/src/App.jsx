import { useState, useEffect, useRef } from 'react';
import './App.css';

// กำหนด URL ของ API สำหรับการจัดการประวัติ
const API_URL = 'http://localhost:3001/api/history'; // Uncomment ส่วนนี้

function Calculator() {
  // state สำหรับเก็บค่า input ที่กำลังพิมพ์
  const [input, setInput] = useState('');
  // state สำหรับเก็บผลลัพธ์การคำนวณ
  const [result, setResult] = useState('');
  // state สำหรับเก็บประวัติการคำนวณ
  const [history, setHistory] = useState([]);
  // ref สำหรับ focus ที่ input field
  const inputRef = useRef(null);

  // useEffect สำหรับโหลดประวัติการคำนวณเมื่อ component โหลดเสร็จ
  useEffect(() => {
    // โค้ดส่วนนี้จะทำงานเมื่อ Backend พร้อม
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        // ตั้งค่าประวัติและผลลัพธ์ล่าสุดจากข้อมูลที่ดึงมา
        setHistory(data.history || []);
        setResult(data.lastResult !== null ? data.lastResult : '');
      })
      .catch(error => console.error("Failed to fetch history:", error)); // เพิ่ม error handling
  }, []); // [] หมายถึงรันแค่ครั้งเดียวเมื่อ component mount

  // ฟังก์ชันจัดการการคลิกปุ่มต่างๆ
  const handleButton = (val) => {
    let v = val; // ใช้ตัวแปร v เพื่อแปลงค่า
    if (v === '÷') v = '/'; // แปลง ÷ เป็น /
    if (v === 'x') v = '*'; // แปลง x เป็น *
    if (v === 'C') { // ปุ่ม Clear
      setInput('');
      setResult('');
      return;
    }
    if (v === 'DEL') { // ปุ่ม Delete (ลบตัวอักษรสุดท้าย)
      setInput(input.slice(0, -1));
      return;
    }
    if (v === '=') { // ปุ่ม Equals (คำนวณ)
      calculate();
      return;
    }
    // สำหรับปุ่มตัวเลขและเครื่องหมายอื่นๆ
    setInput(input + v);
  };

  // ฟังก์ชันสำหรับคำนวณผลลัพธ์
  const calculate = () => {
    try {
      // eval() ใช้สำหรับประเมินผลสตริงคณิตศาสตร์ (ควรระมัดระวังในการใช้งานจริง)
      const evalResult = eval(input);

      // --- เพิ่ม Logic ตรงนี้เพื่อจัดการ Infinity และ NaN ---
      if (evalResult === Infinity || evalResult === -Infinity || isNaN(evalResult)) {
        setResult('Error');
        // ไม่บันทึกประวัติหากเกิด Error
        setInput('');
        return; // ออกจากฟังก์ชัน
      }
      // --- สิ้นสุด Logic ที่เพิ่ม ---

      setResult(evalResult);
      // เพิ่มการคำนวณปัจจุบันลงในประวัติ
      const newHistoryEntry = { expression: input, result: evalResult };
      setHistory(prevHistory => [...prevHistory, newHistoryEntry]); // ใช้ prevHistory เพื่อให้แน่ใจว่าได้ state ล่าสุด

      // ส่งข้อมูลการคำนวณไปบันทึกที่ Backend
      fetch(API_URL, { // Uncomment ส่วนนี้
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHistoryEntry) // ส่งข้อมูล expression และ result
      }).catch(error => console.error("Failed to save history:", error)); // เพิ่ม error handling
      setInput(''); // ล้าง input หลังจากคำนวณ
    } catch (error) { // Catch นี้สำหรับ Syntax Error หรือ Error อื่นๆ
      setResult('Error'); // แสดง Error ถ้าคำนวณผิดพลาด
      console.error("Calculation error:", error);
      setInput(''); // ล้าง input แม้จะมี syntax error
    }
  };

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของ input field
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  // ฟังก์ชันจัดการการกดปุ่มบนคีย์บอร์ด
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') calculate(); // ถ้ากด Enter ให้คำนวณ
    if (e.key === 'Escape') setInput(''); // ถ้ากด Esc ให้ล้าง input
  };

  // ฟังก์ชันสำหรับล้างประวัติทั้งหมด
  const clearHistory = () => {
    setHistory([]);
    fetch(API_URL, { method: 'DELETE' }) // Uncomment ส่วนนี้
      .catch(error => console.error("Failed to clear history:", error)); // เพิ่ม error handling
  };

  // กำหนดปุ่มทั้งหมดสำหรับเครื่องคิดเลข
  const buttons = [
    '7', '8', '9', '÷', 'C',
    '4', '5', '6', 'x', 'DEL',
    '1', '2', '3', '-', '(',
    '0', '.', '=', '+', ' )'
  ];

  return (
    <div className="calculator-container">
      {/* ส่วนหัวข้อ */}
      <h2>เพียงเเค่เเตะปุ่มเบาๆ <br />คณิตศาสตร์จะไม่ยากอีกต่อไป</h2>
      {/* ช่อง input สำหรับการคำนวณ */}
      <input
        ref={inputRef} // เชื่อม inputRef เพื่อการ focus
        className="calc-input"
        value={input}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="มีอะไรให้ช่วยคำนวณบ้าง ?"
        autoFocus // ให้ focus อัตโนมัติเมื่อโหลดหน้า
      />
      {/* ช่องแสดงผลลัพธ์ */}
      <div className="result">{result}</div>
      {/* Grid สำหรับปุ่มเครื่องคิดเลข */}
      <div className="button-grid">
        {buttons.map((b, i) => (
          <button
            key={i}
            onClick={() => handleButton(b)}
            // เพิ่ม class สำหรับปุ่มพิเศษเพื่อให้จัดสไตล์ได้ง่ายขึ้น
            className={`${b === 'C' ? 'clear-button' : ''}
                       ${b === 'DEL' ? 'del-button' : ''}
                       ${b === '=' ? 'equals-button' : ''}
                       ${b === '+' || b === '-' || b === 'x' || b === '÷' ? 'operator-button' : ''}
                       ${b === '0' ? 'zero-button' : ''}
                       ${b === '(' || b === ' )' ? 'parenthesis-button' : ''}
                      `}
          >
            {b}
          </button>
        ))}
      </div>
      {/* ส่วนแสดงประวัติการคำนวณ */}
      <div className="history">
        <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          ประวัติการคำนวณ
          {/* ปุ่มลบประวัติ */}
          <button
            style={{ fontSize: '0.9rem', padding: '0.2rem 0.7rem', borderRadius: '6px', background: '#444', color: '#fff', border: 'none', cursor: 'pointer' }}
            onClick={clearHistory}
          >
            ลบประวัติ
          </button>
        </h2>
        {/* รายการประวัติ (แสดง 10 รายการล่าสุดและเรียงย้อนหลัง) */}
        <ul>
          {history.slice(-10).reverse().map((h, i) => (
            <li key={i}>{h.expression} = {h.result}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Calculator;