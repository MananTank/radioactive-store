import getRS from '../../utils/getRS'
import { getOnGSChange } from '../../utils/getOnChange'
import { wait } from '../utils'

test('listeners are called as expected', async () => {
  const l1 = jest.fn()
  const l2 = jest.fn()
  const l3 = jest.fn()

  const store = {
    state: null,
    listeners: {
      'a.b.c': [l1],
      'a.b': [l2],
      a: [l3]
    }
  }

  store.state = getRS({ a: { b: { c: 0 } } }, getOnGSChange(store))
  store.state.a.b.c++
  await wait(1000)
  expect(l1.mock.calls.length).toBe(1)
  expect(l2.mock.calls.length).toBe(1)
  expect(l3.mock.calls.length).toBe(1)
})

test('BATCHING: multiple subsequent mutations calls listeners once', async () => {
  const l1 = jest.fn()
  const l2 = jest.fn()

  const store = {
    state: null,
    listeners: {
      count: [l1, l2]
    }
  }

  store.state = getRS({ count: 0 }, getOnGSChange(store))

  // doing multiple mutations
  store.state.count++
  store.state.count++
  store.state.count++

  await wait(1000)

  expect(l1.mock.calls.length).toBe(1)
  expect(l2.mock.calls.length).toBe(1)
})

test('FRESH STATE: after mutating the state, new state is directly available', () => {
  const store = {
    state: null,
    listeners: {}
  }

  store.state = getRS({
    count: 0,
    counts: []
  }, getOnGSChange(store))

  // value type data
  expect(store.state.count).toBe(0)
  store.state.count++
  expect(store.state.count).toBe(1) // expect new

  // ref type data
  expect(store.state.counts).toEqual([])
  store.state.counts.push(100)
  expect(store.state.counts).toEqual([100]) // expect new
})

test('INFECTION: newly added object becomes radioactive', () => {
  const store = { listeners: [() => true] }
  store.state = getRS({ a: 0 }, getOnGSChange(store))
  expect(store.state.a.__isRadioactive__).toBe(undefined)
  store.state.a = { b: 200 }
  expect(store.state.a.__isRadioactive__).toBe(true)
})
