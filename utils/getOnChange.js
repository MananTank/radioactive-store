import getRS from './getRS'
import { silentMutate } from './mutate'
import afterSync from './afterSync'

const getOnGSChange = (store) => {
  const timer = { set: false }
  let chains = []

  const updateUI = () => {
    store.listeners.forEach(l => l(chains))
    chains = []
  }

  const onChange = (chain, value, trap, updateNow) => {
    const addingObject = typeof value === 'object' && trap === 'set'
    const rValue = addingObject ? getRS(value, onChange, chain) : value
    const success = silentMutate(store.state, chain, rValue, trap)
    if (success) chains.push(chain)
    if (updateNow) updateUI()
    else if (!timer.set) afterSync(updateUI, timer)
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
