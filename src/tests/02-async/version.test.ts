import { describe, expect, test } from 'vitest'
import { fetchApi, getVersion } from '../../02-async/version'

describe('Async/Await', () => {
    test('getVersion คืนเลข version ของ API', async () => {
        const VERSION_PATTERN = /^\d+\.\d+\.\d+$/ // ตัวเลข.ตัวเลข.ตัวเลข
        const version = await getVersion();
        expect(version).toMatch(VERSION_PATTERN) // ตรวจรูปแบบ
    })
    test('FetchApi คืน response ทั้งหมด', async () => {
        const json = await fetchApi('/version')
        expect(json).toHaveProperty('status_code', 200)
        expect(json).toHaveProperty('data.version')
    })
    test('.resolves ตรวจค่า Promise resolve', async () => {
        await expect(fetchApi('/version')).resolves.toMatchObject({
            message: 'success'
        })
    })
    test('.rejects ตรวจค่า Promise reject' ,async () => {
        await expect(fetchApi('/version555')).rejects.toThrow('Request failed: 404')
    }, 2_000)
})