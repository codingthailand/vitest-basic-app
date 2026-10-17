import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { describe, expect, test, afterAll, beforeAll, afterEach } from 'vitest'
import { API_URL, getCourses } from '../../03-mocking/course'

// 1. เตรียมข้อมูลปลอม
const courses = [
    {
      "id": 1,
      "title": "HTML 5",
      "view": 47889,
    },
    {
      "id": 2,
      "title": "CSS 3",
      "view": 24236,
    },
    {
      "id": 3,
      "title": "PHP Basic",
      "view": 39231
    }
]

// 2. สร้าง server ปลอม พร้อม handler (url ไหน ตอบอะไร)
const server = setupServer(
    http.get(API_URL + '/course', () => {
        return HttpResponse.json({ data: courses })
    })
)

// 3. เปิด / reset / ปิด server
beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('ทดสอบคอร์สเรียน', () => {
    test('getCourses คืนค่าคอร์สถูกต้อง', async () => {
       const result = await getCourses()
       expect(result).toHaveLength(3)
       expect(result).toContainEqual({ id: 1, title: "HTML 5", view: 47889 })
       expect(result[1]).toMatchObject({ id: 2, title: 'CSS 3'})
    })

    test('จำลอง server error (500)', async () => {
       server.use(
          http.get(API_URL + '/course', () => new HttpResponse(null, { status: 500 }))
       )
       await expect(getCourses()).rejects.toThrow('Server error: 500')
    })

})