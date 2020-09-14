import { useReducer, useEffect } from 'react'
import { checkDeps } from '../utils/validity'
// import depsUpdated from '../utils/depsUpdated'

const useGS = (deps) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)

  useEffect(() => {
    checkDeps(deps)
  }, [])

  // subscribe / unsubscribe to store
  useEffect(() => window.radioactiveStore.subscribe(forceUpdate, deps), [])

  return window.radioactiveStore.state
}

export default useGS
