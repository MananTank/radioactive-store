import getRS from '../../utils/getRS'
import { getOnGSChange } from '../../utils/getOnChange'
import { wait } from '../utils'

test('BATCHING: multiple subsequent mutations calls listeners once', async () => {
  const listener1 = jest.fn()

  const state = {
    count: 0
  }

  const store = {
    state: null,
    listeners: [listener1]
  }

  store.state = getRS(state, getOnGSChange(store))

  // doing multiple mutations
  store.state.count++
  store.state.count++
  store.state.count++
  store.state.count++
  store.state.count++

  // forceUpdate is called after all the code runs
  await wait(1000)

  // so do this after 1 second of sync code completion, so that this executes after forceUpdate is called
  expect(listener1.mock.calls.length).toBe(1)
})

test('FRESH STATE: state is always fresh, even directly after mutating the state', () => {
  const store = {
    state: null,
    listeners: []
  }

  const state = {
    count: 0,
    counts: []
  }
  store.state = getRS(state, getOnGSChange(store))

  // doing multiple mutations
  expect(store.state.count).toBe(0)
  store.state.count++
  expect(store.state.count).toBe(1)

  expect(store.state.counts).toEqual([])
  store.state.counts.push(100)
  expect(store.state.counts).toEqual([100])
})

test('INFECTION: newly added object in the radioactive state also becomes radioactive', async () => {
  const listener1 = jest.fn()

  const state = {
    a: 0
  }

  const store = {
    state: null,
    listeners: [listener1]
  }

  store.state = getRS(state, getOnGSChange(store))

  store.state.a = { b: 200 }
  await wait(1000)
  store.state.a.b = 300
  await wait(1000)
  expect(listener1.mock.calls.length).toBe(2)
})
