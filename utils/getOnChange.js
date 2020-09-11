import getRS from './getRS'
import { silentMutate } from './mutate'
import afterSync from './afterSync'

const getOnGSChange = (store) => {
  const timer = { set: false }
  let chains = []
  const notify = (chain) => store.listeners.forEach(l => l(chain))

  const onChange = (chain, value, trap) => {
    const addingObject = typeof value === 'object' && trap === 'set'
    const rValue = addingObject ? getRS(value, onChange, chain) : value
    const success = silentMutate(store.state, chain, rValue, trap)
    if (success) chains.push(chain.join('.'))
    if (!timer.set) {
      afterSync(() => {
        notify(chains)
        chains = []
      }, timer)
    }
    return success
  }

  return onChange
}

const getOnLSChange = (ref, forceUpdate) => {
  const timer = { set: false }

  const onChange = (chain, value, trap) => {
    const addingObject = typeof value === 'object' && trap === 'set'
    const rValue = addingObject ? getRS(value, onChange, chain) : value
    const success = silentMutate(ref.current, chain, rValue, trap)
    if (!timer.set) afterSync(forceUpdate, timer)
    return success
  }

  return onChange
}

export { getOnLSChange, getOnGSChange }
