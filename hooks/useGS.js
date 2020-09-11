import { useReducer, useEffect, useRef } from 'react'
import { checkDeps } from '../utils/validity'
import depsUpdated from '../utils/depsUpdated'

const useGS = (deps) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)

  // if running the hook for the first time
  const ref = useRef()
  if (!ref.current) checkDeps(deps)

  // subscribe to store
  useEffect(() =>
    window.radioactiveStore.subscribe(chains => {
      if (depsUpdated(deps, chains)) forceUpdate()
    }),
  [deps])

  return window.radioactiveStore.state
}

export default useGS
