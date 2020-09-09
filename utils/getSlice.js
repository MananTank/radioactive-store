/*
* getSlice(state, ['a', 'b', 'c', '2'])
* returns state.a.b.c[2]
*/

export const getSlice = (state, chain) => {
  let target = state
  chain.forEach(key => { target = target[key] })
  return target
}

export default getSlice
