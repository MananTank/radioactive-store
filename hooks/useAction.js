const useAction = action => {
  const actions = window.radioactiveStore.actions
  if (!(action in actions)) throw new Error(`Invalid Action: "${action}"`)
  return actions[action]
}

export default useAction
