import { describe, expect, test } from 'vitest'
import { add, applyDiscount, createProduct, createUser, findProduct, formatEmail, getCart, getTags, Product } from '../../01-matchers/matchers'

describe('Common Matchers', () => {
    test('toBe ใช้กับค่า primitive', () => {
        expect(add(2,2)).toBe(4)
        expect(add(1, 2)).not.toBe(0) // กลับเงื่อนไข 1+2 ต้องไม่ใช่ 0
    })
    test('toEqual เทียบโครงสร้างของ object', () => {
        const product = createProduct('Coffee', 100)
        expect(product).toEqual({ name: 'Coffee', price: 100 }) //เทียบทุกฟิลด์ต้องเหมือนกัน
    })
    test('toStrictEqual ตรวจ undefined property และชนิด class', () => {
        expect({ name: 'Book' }).toEqual({ name: 'Book', price: undefined }) // ไม่สน property ที่เป็น undefined
        expect({ name: 'Book' }).not.toStrictEqual({ name: 'Book', price: undefined }) // จับได้ว่ามี price เกินมา

        expect(new Product('Book', 200)).toEqual({ name: 'Book', price: 200 }) // ไม่สนว่าเป็น class อะไร
        expect(new Product('Book', 200)).not.toStrictEqual({ name: 'Book', price: 200 }) // จับได้ว่า class ไม่เท่ากับ object
    })
})

describe('Truthiness', () => {
    test('พบสินค้า -> ได้ object (truthy)', () => {
        expect(findProduct('Book')).toBeTruthy() // object ถือว่าเป็น true
        expect(findProduct('Book')).not.toBeNull() // ต้องไม่ใช่ null
    })
    test('ไม่พบสินค้า -> ได้ null', () => {
        expect(findProduct('Labtop')).toBeNull() // ตรงกับ null เท่านั้น
        expect(findProduct('Labtop')).toBeDefined() // null ไม่ใช่ undefined
        expect(findProduct('Labtop')).toBeFalsy()// null ถือว่าเป็น false
    })
})

describe('Numbers', () => {
    test('เปรียบทียบมากกว่า น้อยกว่า', () => {
        const price = applyDiscount(1000, 10) // ลด 10% เหลือ 900 บาท
        expect(price).toBeGreaterThan(800)
        expect(price).toBeGreaterThanOrEqual(900)
        expect(price).toBeLessThan(1000)
        expect(price).toBeLessThanOrEqual(900)
    })
    test('ทศนิยมใช้ toBeCloseTo', () => {
        const price = applyDiscount(19.99, 15) // 16.9915
        expect(price).toBeCloseTo(16.99, 2)
        expect(price).toBeCloseTo(16.991, 3)
    })
})

describe('Strings', () => {
    test('toMatch ตรวจ regex หรือ substring', () => {
        const email = formatEmail('   John   ');
        expect(email).toBe('john@example.com')
        expect(email).toMatch('example') // ตรวจว่ามีคำนี้อยู่
        expect(email).not.toMatch(/[A-Z]/) // ต้องไม่มีตัวพิมพ์ใหญ่
    })
})

describe('Arrays', () => {
    test('toContain ใช้กับค่า primitive ใน array / Set', () => {
       const tags = getTags() // ['javascript','typescript', 'vitest']
       expect(tags).toContain('vitest') // ใน array มีค่า vitest หรือไม่
       expect(tags).toHaveLength(3) // ตรวจจำนวนสมาชิกว่าตรงไหม
    })
    test('toContainEqual ใช้กับ object ใน array', () => {
       const cart = getCart() // array ของ object สินค้า
       expect(cart).toContainEqual({ name: 'Pen', qty: 3 })
    })
})

describe('Objects', () => {
    test('toMatchObject ตรวจเฉพาะบาง property', () => {
      const user = createUser('Mary')
      expect(user).toMatchObject({ name: 'Mary', email: 'mary@example.com' })
    })
    test('toHaveProperty ตรวจ property (ตรวจ path ซ้อน)', () => {
      const user = createUser('Mary')
      expect(user).toHaveProperty('id')
      expect(user).toHaveProperty('name', 'Mary')
      expect(user).toHaveProperty('address.city', 'Bangkok')
    })
})

describe('Asymmetric Matcher: ไม่รู้ค่าแน่นอน แต่รู้ชนิด/รูปร่าง', () => {
    test('ตรวจรูปร่างของ user ที่มี id สุ่ม และวันที่', () => {
      const user = createUser('Bob')
      expect(user).toMatchObject({
        id: expect.any(Number), // ขอแค่ตัวเลข ค่าอะไรก็ได้
        name: 'Bob',
        email: expect.stringContaining('@'), // .stringMatching(/^bob@/)
        roles: expect.arrayContaining(['viewer']),
        address: expect.objectContaining({ city: 'Bangkok' }),
        createdAt: expect.any(Date)
      })
    })
})