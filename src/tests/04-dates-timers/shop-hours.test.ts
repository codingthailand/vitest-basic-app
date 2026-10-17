import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { purchase } from '../../04-dates-timers/shop-hours'

beforeEach(() => vi.useFakeTimers()) // ก่อนแต่ละ test เปลี่ยนไปใช้เวลาปลอม
afterEach(() => vi.useRealTimers()) // หลังแต่ละ test กลับไปใช้เวลาจริง

describe('Mocking Dates', () => {
    test('ซื้อได้ในเวลาทำการ (13.00)', () => {
        vi.setSystemTime(new Date(2026, 0, 1, 13))
        expect(purchase()).toEqual({ message: 'Success' })
    })
    test('ซื้อได้ในเวลาทำการ (09.00)', () => {
        vi.setSystemTime(new Date(2026, 0, 1, 9))
        expect(purchase()).toEqual({ message: 'Success' })
    })
    test('ร้านปิด ซื้อไม่ได้ (19.00)', () => {
        vi.setSystemTime(new Date(2026, 0, 1, 19))
        expect(purchase()).toEqual({ message: 'Shop is closed' })
    })
})