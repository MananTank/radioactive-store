import { useReducer, useContext, useEffect, useRef } from 'react'
import RadioActive from './context'
import { checkDeps } from './validity'
const inc = x => x + 1

const useState = (deps) => {
  const [, forceUpdate] = useReducer(inc, 0)
  const { store } = useContext(RadioActive)

  // if running the hook for the first time
  const ref = useRef()
  if (!ref.current) checkDeps(deps, store.state)

  // subscribe to store
  useEffect(() => store.subscribe(updatedKeys => {
    if (deps.some(dep => updatedKeys.includes(dep))) {
      forceUpdate()
    }
  }), [store, deps])

  return store.state
}

export default useState
