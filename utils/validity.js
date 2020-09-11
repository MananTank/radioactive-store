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
