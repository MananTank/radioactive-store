import getRS from '../../utils/getRS'

// REACTIVE BINDINGS FOR INPUTS ----------------------------

describe('reactive bindings', () => {
  const onChange = () => true
  const obj = { a: 10, x: '', y: true }
  const RS = getRS(obj, onChange)

  test('binding API\'s onChange triggers sync re-render to avoid the cursor jump issue', () => {
    const onChange = jest.fn(() => true)
    const RS = getRS({ x: 0 }, onChange)
    const binding = RS.$x
    binding.onChange({ target: { value: 100 } })
    expect(onChange.mock.calls.length).toBe(1)
  })

  test('$key returns a binding containing value and onChange for initial value string or number', () => {
    const binding = RS.$a
    expect(typeof binding).toBe('object')
    expect('value' in binding).toBe(true)
    expect('onChange' in binding).toBe(true)

    const binding2 = RS.$x
    expect(typeof binding2).toBe('object')
    expect('value' in binding2).toBe(true)
    expect('onChange' in binding2).toBe(true)
  })

  test('if state.key is boolean state.$key is {checked, onChange}', () => {
    const binding = RS.$y
    expect(typeof binding).toBe('object')
    expect('checked' in binding).toBe(true)
    expect('onChange' in binding).toBe(true)
  })

  test('if state.key is undefined, state.$key is also undefined', () => {
    const binding = RS.$b
    expect(binding).toBe(undefined)
  })

  test('if state.key is a number, state.$key\'s onChange converts the e.target.value to number and then saves it in state.key', () => {
    const onChange = (_, value) => {
      expect(value).toBe(1000)
    }
    const RS = getRS({ a: 10 }, onChange)
    RS.$a.onChange({ target: { value: '1000' } })
  })

  test('if state.key is boolean, onChange uses the e.target.checked to set the state.key', () => {
    const onChange = (_, value) => {
      expect(value).toBe(false)
    }
    const RS = getRS({ x: true }, onChange)
    const binding = RS.$x
    expect(binding.checked).toBe(true)
    binding.onChange({ target: { checked: false } })
  })
})
