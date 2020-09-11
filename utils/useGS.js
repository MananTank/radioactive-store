import { useReducer, useEffect, useRef } from 'react'
// import RadioActive from './context'
import { checkDeps } from './validity'

const inc = x => x + 1

const useGS = (deps) => {
  const [, forceUpdate] = useReducer(inc, 0)

  // if running the hook for the first time
  const ref = useRef()
  if (!ref.current) checkDeps(deps)

  // subscribe to store
  useEffect(() => window.radioactiveStore.subscribe(updatedKeys => {
    if (deps.some(dep => updatedKeys.includes(dep))) {
      forceUpdate()
    }
  }), [deps])

  return window.radioactiveStore.state
}

export default useGS
