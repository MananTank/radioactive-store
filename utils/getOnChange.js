import getRS from './getRS'
import { silentMutate } from './mutate'
import afterSync from './afterSync'

const getOnGSChange = (store) => {
  const timer = { set: false }
  let chains = {}

  const updateUI = () => {
    const _chains = Object.keys(chains)
    Object.keys(store.listeners).forEach(dep => {
      const depUpdated = _chains.some(chain => {
        const _chain = chain.split('.')
        const _dep = dep.split('.')
        return _dep.every((d, i) => d === _chain[i])
      })

      if (depUpdated) store.listeners[dep].forEach(l => l(_chains))
    })
    chains = {}
  }

  const onChange = (chain, value, trap, updateNow) => {
    const addingObject = typeof value === 'object' && trap === 'set'
    const rValue = addingObject ? getRS(value, onChange, chain) : value
    const success = silentMutate(store.state, chain, rValue, trap)
    if (success) chains[chain.join('.')] = true
    if (updateNow) updateUI() // for input binding
    if (!timer.set) afterSync(updateUI, timer)
    return success
  }

  return onChange
}

const getOnLSChange = (ref, forceUpdate) => {
  const timer = { set: false }

  const onChange = (chain, value, trap, updateNow) => {
    const addingObject = typeof value === 'object' && trap === 'set'
    const rValue = addingObject ? getRS(value, onChange, chain) : value
    const success = silentMutate(ref.current, chain, rValue, trap)
    if (updateNow) forceUpdate() // for input binding
    else if (!timer.set) afterSync(forceUpdate, timer)
    return success
  }

  return onChange
}

export { getOnLSChange, getOnGSChange }
