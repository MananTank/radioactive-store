const getSlice = (obj, key) => {
  let slice = obj
  key.split('.').forEach(k => { slice = slice[k] })
  return slice
}

export const checkDeps = (deps) => {
  if (!deps || !Array.isArray(deps)) throw new Error(`expected dependency array, got ${typeof deps} instead`)
  deps.forEach(dep => {
    if (getSlice(window.radioactiveStore.state, dep) === undefined) throw new Error(`invalid dependency: "${dep}" \nstate.${dep} does not exist`)
  })
}

export const checkInitialState = initialState => {
  const msg = `Invalid Initial State: Expected a reference type, but got "${initialState}" instead.\n` +
  'useRS() hook takes a reference type as an argument, such as object/array ' +
  'OR a function that returns an object/array.'

  if (typeof initialState !== 'object' && initialState !== null) {
    if (process.env.NODE_ENV !== 'production') throw new Error(msg)
    else console.error(msg)
  }
}
