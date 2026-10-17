// ─────────────────────────────────────────────
// ฟังก์ชันตัวอย่างสำหรับบทเรียน Using Matchers
// ─────────────────────────────────────────────

// 1) Common Matchers: คืนค่า primitive / object
export function add(a: number, b: number) { // ฟังก์ชันบวกเลข 2 ตัว
  return a + b // คืนค่าเป็น number (primitive)
}

export function createProduct(name: string, price: number) { // สร้างสินค้าแบบ object ธรรมดา
  return { name, price } // คืน object ใหม่ทุกครั้งที่เรียก
}

export class Product { // สร้างสินค้าแบบ class (ใช้เทียบกับ toStrictEqual)
  name: string // ชื่อสินค้า
  price: number // ราคาสินค้า
  constructor(name: string, price: number) { // รับค่าตอน new Product(...)
    this.name = name // เก็บชื่อสินค้า
    this.price = price // เก็บราคาสินค้า
  }
}

// 2) Truthiness: คืนค่าได้หลายแบบ (object / null / undefined / 0 / '')
const stock: Record<string, number> = { apple: 10, banana: 0 } // จำนวนสินค้าคงเหลือ (banana หมดสต็อก)

export function getStock(item: string) { // ดูจำนวนสินค้าคงเหลือ
  return stock[item] // ไม่มีสินค้า -> undefined, หมดสต็อก -> 0
}

export function findProduct(name: string) { // ค้นหาสินค้าตามชื่อ
  return name === 'Book' ? { name: 'Book', price: 250 } : null // พบ -> object, ไม่พบ -> null
}

// 3) Numbers: คำนวณราคาหลังหักส่วนลด (อาจได้ทศนิยม)
export function applyDiscount(price: number, percent: number) { // หักส่วนลดตามเปอร์เซ็นต์
  return price - (price * percent) / 100 // ราคา - (ราคา x % / 100)
}

// 4) Strings
export function formatEmail(name: string, domain = 'example.com') { // สร้างอีเมลจากชื่อ (domain มีค่าเริ่มต้น)
  return `${name.trim().toLowerCase()}@${domain}` // ตัดช่องว่าง + แปลงเป็นตัวเล็ก แล้วต่อด้วย @domain
}

// 5) Arrays & Iterables
export function getCart() { // คืนตะกร้าสินค้า (array ของ object)
  return [ // array ที่มีสมาชิกเป็น object
    { name: 'Book', qty: 1 }, // สินค้าชิ้นที่ 1
    { name: 'Pen', qty: 3 }, // สินค้าชิ้นที่ 2
  ]
}

export function getTags() { // คืนรายการ tag (array ของ string)
  return ['javascript', 'typescript', 'vitest'] // array ของค่า primitive
}

// 6) Objects & Asymmetric Matchers: มีค่าที่ไม่แน่นอน (id สุ่ม, วันที่)
export function createUser(name: string) { // สร้างข้อมูลผู้ใช้
  return {
    id: Math.floor(Math.random() * 1000), // id สุ่ม 0-999 (เดาค่าล่วงหน้าไม่ได้)
    name, // ชื่อผู้ใช้ตามที่ส่งเข้ามา
    email: formatEmail(name), // อีเมลสร้างจากชื่อ เช่น alice@example.com
    roles: ['viewer'], // สิทธิ์เริ่มต้น
    address: { city: 'Bangkok', zip: '10110' }, // object ซ้อนใน object
    createdAt: new Date(), // วันเวลาที่สร้าง (เปลี่ยนทุกครั้งที่รัน)
  }
}

// 7) Exceptions
export function withdraw(balance: number, amount: number) { // ถอนเงินจากบัญชี
  if (amount <= 0) { // ถ้าจำนวนเงินไม่ถูกต้อง
    throw new RangeError('Amount must be greater than 0') // throw error ชนิด RangeError
  }
  if (amount > balance) { // ถ้าถอนเกินยอดเงินที่มี
    throw new Error('Insufficient balance') // throw error ชนิด Error ทั่วไป
  }
  return balance - amount // คืนยอดเงินคงเหลือ
}
