import { useReducer, useEffect } from 'react'
import { checkDeps } from '../utils/validity'

const useGS = (deps) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  useEffect(() => checkDeps(deps), [])
  useEffect(() => window.radioactiveStore.subscribe(deps, forceUpdate), [])
  return window.GS
}

export default useGS
