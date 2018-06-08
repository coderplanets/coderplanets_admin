/*
 * the entry of the App store
 *
 */

// import { onAction } from 'mobx-state-tree'

import RootStore from './RootStore'

let rootStore = null

// TODO: refactor
const createRootStore = ({ langSetup, ...restData }) => {
  /* console.log('createRootStore: ', { ...restData }) */
  /* console.log('0 initRootStore: ', { ...restData }) */
  return RootStore.create({ appLangs: langSetup, ...restData }, {})
}

function initRootStore({ langSetup, ...restData }) {
  if (rootStore === null) {
    /* console.log('initRootStore 0 (rootStore is Empty)') */
    /* console.log('1 initRootStore: ', { ...restData }) */

    rootStore = createRootStore({ langSetup, ...restData })
  }

  /* console.log('2 initRootStore: ', { ...restData }) */
  rootStore.markState({
    ...restData,
  })
  /* console.log('initRootStore 1:  rootStore: ', rootStore) */
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
