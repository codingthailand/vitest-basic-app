// ─────────────────────────────────────────────
// ฟังก์ชันตัวอย่างสำหรับบทเรียน Testing Asynchronous Code
// เรียก API จริง: https://api.codingthailand.com/api/version
// response จริง: { message: 'success', data: { version: '1.0.6' }, status_code: 200 }
// ─────────────────────────────────────────────

export const API_URL = 'https://api.codingthailand.com/api' // URL หลักของ API

// 1) ฟังก์ชันกลางสำหรับเรียก API (คืน Promise)
export async function fetchApi(path: string) { // รับ path เช่น '/version'
  const res = await fetch(`${API_URL}${path}`) // รอให้ request เสร็จ
  if (!res.ok) { // ถ้า status ไม่ใช่ 2xx (เช่น 404)
    throw new Error(`Request failed: ${res.status}`) // reject Promise พร้อม status code
  }
  return res.json() // คืน Promise ของ body ที่แปลงเป็น JSON แล้ว
}

// 2) ดึงเลข version ของ API
export async function getVersion(): Promise<string> { // async function คืนค่าเป็น Promise เสมอ
  const json = await fetchApi('/version') // เรียกใช้ async function อื่นได้
  return json.data.version // คืนเฉพาะเลข version เช่น '1.0.6'
}

// 3) แบบ callback (สไตล์เก่า ก่อนมี Promise): ส่งผลลัพธ์ผ่าน callback แทนการ return
export function getVersionWithCallback(callback: (version: string) => void) { // รับฟังก์ชันที่จะถูกเรียกเมื่อได้ผล
  getVersion().then(callback) // ได้ version แล้วค่อยเรียก callback (ฟังก์ชันนี้ไม่ return อะไร)
}
