import { test, expect } from 'vitest'
import { getGrade } from '../utils'

// parameterized test
test.for([
    { score: 85, grade: 'A' },
    { score: 65, grade: 'C' },
    { score: 10, grade: 'F' },
])('getGrade($score) -> $grade', ({score, grade}) => {
    // Act
    const result = getGrade(score)

    // Assert
    expect(result).toBe(grade)
})

test('ตรวจว่าฟังก์ชันมีการ throw error', () => {
    expect(() => getGrade(-10)).toThrow(RangeError) // เทียบ type
    expect(() => getGrade(-10)).toThrow('must be') // pass string → message "มีคำนี้อยู่" (substring)
    expect(() => getGrade(-10)).toThrow(new RangeError('Score must be between 0 and 100')) // failed
})