// ─────────────────────────────────────────────
// ฟังก์ชันตัวอย่างสำหรับบทเรียน Mocking Dates & Timers
// ผลลัพธ์ขึ้นกับ "เวลาตอนนี้" หรือต้อง "รอเวลา"
// ตอน test จึงต้องใช้เวลาปลอม (fake timers)
// ─────────────────────────────────────────────

// 1) ขึ้นกับเวลาตอนนี้: ร้านเปิด 9:00 - 16:59
export function purchase() { // สั่งซื้อสินค้า
  const hour = new Date().getHours() // ดูว่าตอนนี้กี่โมง (0-23)
  if (hour >= 9 && hour < 17) { // อยู่ในเวลาทำการ
    return { message: 'Success' } // ซื้อสำเร็จ
  }
  return { message: 'Shop is closed' } // นอกเวลาทำการ
}

// 2) ขึ้นกับวันที่วันนี้: นับวันที่เหลือก่อนถึงวันสอบ
export function daysUntil(target: Date) { // รับวันที่เป้าหมาย
  const ONE_DAY = 24 * 60 * 60 * 1000 // 1 วัน = 86,400,000 มิลลิวินาที
  return Math.ceil((target.getTime() - Date.now()) / ONE_DAY) // (เป้าหมาย - ตอนนี้) แปลงเป็นจำนวนวัน
}

// 3) ต้องรอเวลา: เตือนหลังผ่านไป ms มิลลิวินาที
export function remindLater(callback: (msg: string) => void, ms = 3000) { // ค่าเริ่มต้นรอ 3 วินาที
  setTimeout(() => callback('ถึงเวลาพักสายตาแล้ว!'), ms) // ครบเวลาแล้วเรียก callback
}
