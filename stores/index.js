/*
 * the entry of the App store
 *
 */

// import { onAction } from 'mobx-state-tree'

import RootStore from './RootStore'

let rootStore = null

const createRootStore = ({ langSetup, communities }) => {
  return RootStore.create({ appLangs: langSetup, communities }, {})
}

function initRootStore({ langSetup, communities }) {
  if (rootStore === null) {
    rootStore = createRootStore({ langSetup, communities })
  }

  /*
  onAction(rootStore, data => {
  })
  */

  return rootStore
}

export default initRootStore

// not work, TODO
/*
if (module.hot) {
  if (module.hot.data && module.hot.data.rootStore) {
    // applySnapshot(module.hot.data.old, module.hot.data.rootStore)
  }
  module.hot.dispose(data => {
   // getSnapshot ...
  })
}
*/
