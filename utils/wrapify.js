const wrapify = (value, onChange) => new Proxy({ value }, {
  get (target, prop) {
    return Reflect.get(target, prop)
  },
  set (target, prop, value) {
    onChange(prop)
    return Reflect.set(target, prop, value)
  }
})

export default wrapify
