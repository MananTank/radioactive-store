const createActions = (actions) => {
  if (!window.radioactiveStore) throw new Error('window.GS is not defined. Call createGS() first and then call createActions()')
  window.radioactiveStore.actions = actions
}

export default createActions
