import { useReducer, useEffect } from 'react'
import { checkDeps } from '../utils/validity'

const $ = (...deps) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  useEffect(() => checkDeps(deps), [])
  useEffect(() => window.radioactiveStore.subscribe(deps, forceUpdate), [])
  return window.radioactiveStore.state
}

export default $
