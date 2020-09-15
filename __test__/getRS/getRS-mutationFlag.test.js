import getRS from '../../utils/getRS'
import { getOnLSChange } from '../../utils/getOnChange'

test('$ is incremented when state (object) is mutated', () => {
  const RS = { current: null }
  RS.current = getRS({ a: 0 }, getOnLSChange(RS, () => {}))
  const state = RS.current

  expect(state.$).toBe(0)
  state.a++
  expect(state.$ > 0).toBeTruthy()
})

test('$ is incremented when state (array) is mutated', () => {
  const RS = { current: null }
  RS.current = getRS([200], getOnLSChange(RS, () => {}))
  const state = RS.current

  expect(state.$).toBe(0)
  state.push(100)
  expect(state.$ > 0).toBeTruthy()
})
