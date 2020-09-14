import getRS from '../../utils/getRS'
import { getOnLSChange } from '../../utils/getOnChange'
import { wait } from '../utils'

test('BATCHING: multiple subsequent mutations calls forceUpdate only once', async () => {
  const forceUpdate = jest.fn()
  const rs = { current: null }
  rs.current = getRS({ a: 0, b: 0 }, getOnLSChange(rs, forceUpdate))

  // doing multiple mutations
  rs.current.a++
  rs.current.b++
  rs.current.a++

  // wait because forceUpdate is called async-ly
  await wait(1000)
  expect(forceUpdate.mock.calls.length).toBe(1)
})

test('FRESH STATE: state is always fresh, even directly after mutating the state', () => {
  const rs = { current: null }
  rs.current = getRS({ value: 0 }, getOnLSChange(rs, () => {}))

  // doing multiple mutations
  expect(rs.current.value).toBe(0)
  rs.current.value++
  expect(rs.current.value).toBe(1)
})

test('INFECTION: newly added object becomes radioactive', () => {
  const rs = { }
  rs.current = getRS({ a: 0 }, getOnLSChange(rs, () => true))

  expect(rs.current.a.__isRadioactive__).toBe(undefined)
  rs.current.a = { b: 200 }
  expect(rs.current.a.__isRadioactive__).toBe(true)
})
