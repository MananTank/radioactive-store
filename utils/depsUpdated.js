// dep is a string, chains is an array of string
// if any chain starts with dep string return true
// examples

// ('a.b', 'a.b.c.d') -> true
// ('a', 'x') -> false
// ('a', 'a') -> true
const depUpdated = (dep, chains) => chains.some(chain => chain.startsWith(dep))

// if any dep is updated return true
const depsUpdated = (deps, chains) => deps.some(dep => depUpdated(dep, chains))

export default depsUpdated
