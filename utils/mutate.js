/*
* Mutate state using (chain, value, trap)
* For example:
* to do: state.a.b.c.d[2] = 100
* call the function mutate like this :
* mutate(state, ['a', 'b', 'c', 'd', '2'], 100, 'set')
*/

export const mutate = (state, chain, value, trap) => {
  let target = state
  chain.slice(0, -1).forEach(key => { target = target[key] })
  const prop = chain[chain.length - 1]
  if (target.__isRadioactive__) target.__INC$__()
  return Reflect[trap](target, prop, value)
}

// silent mutate mutates the radioactive state in a way that does not trigger onChange
export const silentMutate = (state, ...args) => {
  state.__disableOnChange__(true)
  const success = mutate(state, ...args)
  state.__disableOnChange__(false)
  return success
}

export default mutate
