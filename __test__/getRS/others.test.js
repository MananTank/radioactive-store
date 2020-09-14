import getRS from '../../utils/getRS'

test('__isRadioactive__ is true for ref types data in state', () => {
  const onChange = () => true
  const RS = getRS({ a: 0, b: { c: 0 } }, onChange)
  expect(RS.__isRadioactive__).toBe(true)
  expect(RS.a.__isRadioactive__).toBe(undefined)
  expect(RS.b.__isRadioactive__).toBe(true)
  expect(RS.b.c.__isRadioactive__).toBe(undefined)
})

test('$json returns the stringified object in json', () => {
  const onChange = () => true
  const RS = getRS({ a: 0, b: 0 }, onChange)
  expect(typeof RS.$json).toBe('string')
  expect(JSON.parse(RS.$json)).toEqual({ a: 0, b: 0 })
})
