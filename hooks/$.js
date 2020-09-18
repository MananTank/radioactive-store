import { useReducer, useEffect } from 'react'
import { checkDeps } from '../utils/validity'

const depUpdated = (deps, chains) =>
  deps.some(dep =>
    chains.some(
      chain => dep.every((d, i) => d === chain[i])
    )
  )

const $ = (...deps) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  useEffect(() => checkDeps(deps), [])
  useEffect(() => {
    const depsSplit = deps.map(dep => dep.split('.'))
    return window.radioactiveStore.subscribe(chains => {
      if (depUpdated(depsSplit, chains)) forceUpdate()
    })
  }, [])
  return window.radioactiveStore.state
}

export default $
