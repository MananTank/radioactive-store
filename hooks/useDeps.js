import { useReducer, useEffect } from 'react'
import { checkDeps } from '../utils/validity'

const useDeps = (deps) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  useEffect(() => checkDeps(deps), [])
  useEffect(() => window.radioactiveStore.subscribe(deps, forceUpdate), [])
}

export default useDeps
