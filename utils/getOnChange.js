import getRS from './getRS'
import { silentMutate } from './mutate'
import afterSync from './afterSync'

// forceUpdate is called not for all onChange, but after all onChanges are called
// this is because onChange may be called multiple times for a single mutation
// calling forceUpdate after all the sync code has executed, essentially batches all of them into one

const getOnChange = (store) => {
  let chains = []
  const timer = { set: false }

  const notify = (chain) => store.listeners.forEach(l => l(chain))

  const onChange = (chain, value, trap) => {
    // if setting an object, make it radioactive
    const rValue =
      typeof value === 'object' && trap === 'set'
        ? getRS(value, onChange, chain)
        : value

    // mutate and get status
    const success = silentMutate(store.state, chain, rValue, trap)

    // save chain in the batch
    chains.push(chain[0])

    // when the batching is done, notify listeners with chains
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

export default getOnChange
