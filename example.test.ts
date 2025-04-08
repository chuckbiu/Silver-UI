// import { describe } from "node:test";
import type { Mocked } from 'vitest'
import { describe, expect, vi } from 'vitest'
import axios from 'axios'
import { request, testFn } from './uitls'

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>
// test('test common matcher', () => {
//     const viki = 'zhangsan'
//     expect(viki).to.equal('zhangsan');
//     expect(2 + 2).to.equal(4);
//     expect(2 + 2).to.not.equal(5);

// })
// test('test to be true or false', () => {
//    expect(1).toBeTruthy()
//    expect(0).toBeFalsy()
// })
// test('test to be true or false', () => {
//     expect(1).toBeTruthy()
//     expect(0).toBeFalsy()
//  })
//  test('test number', () => {
//     expect(1).toBeGreaterThan(0); // 1 > 0 pass
//     expect(0).toBeLessThan(1); // 0 < 1 pass
//  })
//  test('test Object', ()=>{
//     expect({name: 'zhans'}).toEqual({name: 'zhans'}) // 比较值，不比较引用值
//  })
// callback test
// mock
describe('functions', () => {
  it('create a mock function', () => {
    const callback = vi.fn()
    testFn(12, callback)
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith(12)
  })
  it('spy on method', () => {
    const obj = {
      getName: () => 1,
    }
    const spy = vi.spyOn(obj, 'getName')
    obj.getName()
    expect(spy).toHaveBeenCalled()
    obj.getName()
    expect(spy).toHaveBeenCalledTimes(2)
  })
  it('mock third party module', async () => {
    // mockedAxios.get.mockImplementation(() => Promise.resolve({
    //     data: 123
    // }))
    mockedAxios.get.mockResolvedValue({
      data: 123,
    })
    const result = await request()
    expect(result).toBe(123)
  })
})
