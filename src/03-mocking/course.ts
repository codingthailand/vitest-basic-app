// ─────────────────────────────────────────────
// ฟังก์ชันตัวอย่างสำหรับบทเรียน Mocking Requests
// เรียก API: https://api.codingthailand.com/api/course
// (ตอน test MSW จะดัก request ไว้ ไม่ได้ยิงไปที่ server จริง)
// ─────────────────────────────────────────────

export const API_URL = 'https://api.codingthailand.com/api' // URL หลักของ API

export interface Course { // รูปแบบข้อมูลคอร์ส 1 รายการ
  id: number // รหัสคอร์ส
  title: string // ชื่อคอร์ส
  detail: string // รายละเอียด
  date: string // วันที่สร้าง
  view: number // จำนวนผู้เข้าชม
  picture: string // URL รูปภาพ
}

export interface Chapter { // รูปแบบข้อมูลบทเรียน (ตอน) 1 รายการ
  ch_id: number // รหัสบทเรียน
  course_id: number // รหัสคอร์สที่บทเรียนนี้อยู่
  ch_title: string // ชื่อบทเรียน
  ch_timetotal: string // ความยาววิดีโอ เช่น '7:44'
}

// ดึงคอร์สทั้งหมด -> response จริงคือ { data: Course[], meta: {...} }
export async function getCourses(): Promise<Course[]> { // async function คืนค่าเป็น Promise เสมอ
  const res = await fetch(`${API_URL}/course`) // เรียก GET /course
  if (!res.ok) { // ถ้า status ไม่ใช่ 2xx (เช่น server ล่ม 500)
    throw new Error(`Server error: ${res.status}`) // reject Promise พร้อม status code
  }
  const json = await res.json() // แปลง body เป็น JSON
  return json.data // คืนเฉพาะ array ของคอร์ส
}

// ดึงบทเรียนของคอร์ส -> ไม่พบคอร์สจะได้ 404
export async function getChapters(courseId: number): Promise<Chapter[]> { // รับรหัสคอร์ส
  const res = await fetch(`${API_URL}/course/${courseId}`) // เรียก GET /course/:id
  if (res.status === 404) { // ถ้าไม่พบคอร์ส
    throw new Error('Course not found') // reject ด้วยข้อความที่อ่านง่าย
  }
  if (!res.ok) { // ถ้าเป็น error อื่น (เช่น 500)
    throw new Error(`Server error: ${res.status}`) // reject พร้อม status code
  }
  const json = await res.json() // แปลง body เป็น JSON -> { data: [...] }
  return json.data // คืน array ของบทเรียน
}

// ดึงเฉพาะคอร์สยอดนิยม (ยอดวิวมากกว่าหรือเท่ากับ minView)
export async function getPopularCourses(minView: number): Promise<Course[]> { // รับยอดวิวขั้นต่ำ
  const courses = await getCourses() // เรียกใช้ async function อื่นได้
  return courses.filter((course) => course.view >= minView) // กรองคอร์สที่ยอดวิวถึงเกณฑ์
}
