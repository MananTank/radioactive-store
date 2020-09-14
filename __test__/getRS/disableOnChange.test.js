import getRS from '../../utils/getRS'

test('key __disableOnChange__ returns a function', () => {
  const onChange = () => true
  const RS = getRS({}, onChange)
  expect(typeof RS.__disableOnChange__).toBe('function')
})

test('after __disableOnChange__ is called with true, onChange is not called', async () => {
  const onChange = jest.fn(() => true)
  const RS = getRS({ a: 0, b: 0, c: 100, d: 100 }, onChange)

  // these will call onChange
  RS.a++
  RS.b++
  delete RS.c

  RS.__disableOnChange__(true)

  // these will not call onChange
  RS.a++
  RS.a++
  RS.b++
  delete RS.d

  RS.__disableOnChange__(false)

  expect(onChange.mock.calls.length).toBe(3)
})
