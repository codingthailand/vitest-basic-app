import { expect, test } from 'vitest'
import { sum } from '../sum'

test('adds 1 + 2 to equal 3', () => {
    // 1. Arrange - เตรียมข้อมูล
    const a = 1
    const b = 2

    // 2. Act - เรียกฟังก์ชันที่ต้องการทดสอบ
    const result = sum(a, b)

    // 3. Assert - ตรวจว่าผลตรงกันกับที่คาดไว้หรือไม่
    expect(result).toBe(3)

//   expect(sum(1, 2)).toBe(3)
})

test('adds 2 + 5 to equal 7', () => {
  expect(sum(2, 5)).toBe(7)
})