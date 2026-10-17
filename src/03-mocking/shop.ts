// ─────────────────────────────────────────────
// ฟังก์ชันตัวอย่างสำหรับบทเรียน Mock Functions
// แต่ละฟังก์ชัน "รับ dependency เข้ามาเป็น argument"
// ตอน test จึงส่ง vi.fn() เข้าไปแทนของจริงได้ง่าย
// ─────────────────────────────────────────────

export interface CartItem { // สินค้าในตะกร้า 1 รายการ
  name: string // ชื่อสินค้า
  price: number // ราคาต่อชิ้น
  qty: number // จำนวน
}

// 1) dependency แบบ sync: getDiscount คืน % ส่วนลด (ของจริงอาจดึงจากโปรโมชันในระบบ)
export function calculateTotal(items: CartItem[], getDiscount: () => number) { // รับฟังก์ชันหาส่วนลดเข้ามา
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0) // รวมราคาก่อนลด
  const discount = getDiscount() // เรียก dependency (ตอน test จะเป็น mock)
  return subtotal - (subtotal * discount) / 100 // คืนราคาหลังหักส่วนลด
}

// 2) dependency แบบ async: fetchUser ดึงข้อมูลผู้ใช้ (ของจริงอาจเรียก API)
export async function getDisplayName(id: number, fetchUser: (id: number) => Promise<{ name: string }>) { // รับฟังก์ชันดึงผู้ใช้เข้ามา
  try { // ลองดึงข้อมูล
    const user = await fetchUser(id) // รอผลจาก dependency
    return user.name // สำเร็จ -> คืนชื่อ
  } catch { // ถ้าดึงไม่สำเร็จ
    return 'Guest' // คืนชื่อเริ่มต้น
  }
}

// 3) เรียก dependency หลายครั้ง: ส่งอีเมลหาผู้เรียนทุกคน
export function notifyStudents(emails: string[], course: string, sendEmail: (to: string, subject: string) => void) { // รับฟังก์ชันส่งอีเมลเข้ามา
  emails.forEach((email) => sendEmail(email, `ยินดีต้อนรับสู่คอร์ส ${course}`)) // เรียก sendEmail ทีละคน
  return emails.length // คืนจำนวนอีเมลที่ส่ง
}

// 4) method บน object: ใช้สอน vi.spyOn
export const calculator = { // object ที่มี method
  multiply(a: number, b: number) { // คูณเลข
    return a * b // คืนผลคูณ
  },
}

export function priceWithVat(price: number) { // คำนวณราคารวม VAT 7%
  return calculator.multiply(price, 1.07) // เรียก method ของ calculator (spy จะเห็นการเรียกนี้)
}

// 5) แก้ไข object หลังส่งให้ dependency: ใช้สอนข้อควรระวังของ mock.calls
export interface Order { // คำสั่งซื้อ
  id: number // รหัสคำสั่งซื้อ
  status: string // สถานะ
}

export function submitOrder(order: Order, save: (order: Order) => void) { // รับฟังก์ชันบันทึกเข้ามา
  save(order) // ส่ง order ไปบันทึก (ตอนนี้ status = 'pending')
  order.status = 'submitted' // แก้ object ตัวเดิม "หลัง" เรียก save
}
