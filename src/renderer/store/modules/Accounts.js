import Datastore from 'nedb'
import path from 'path'
import {remote} from 'electron'

const neDBPath = path.join(remote.app.getPath('userData'), 'accounts.db')
const accountsDb = new Datastore({filename: neDBPath, autoload: true})

const state = {
  main: 0,
  accounts: [],
  selectedAcc: {}
}

const mutations = {
  selectAcc (state, selAcc) {
    state.selectedAcc = selAcc
  },
  addAccount (state, newAcc) {
    state.accounts.push(newAcc)
  }
}

const getters = {
  // ...
//  getTodoById: (state, getters) => (id) => {
//    return state.todos.find(todo => todo.id === id)
//  }
  getAuszeugeFrom: (state, getters) => (kontoBez, from, to) => {
    return new Promise((resolve, reject) => {
      if (!from && !to) {
        accountsDb.find({'konto_bez': kontoBez}, (err, docs) => {
          if (err)
            reject(err)
          resolve(docs)
        })
      }
      accountsDb.find({'konto_bez': kontoBez, 'anfangssaldo.buchungsdatum': { $gt: from }, 'schlusssaldo.buchungsdatum': { $lt: to }}, (err, docs) => {
        if (err)
          reject(err)
        resolve(docs)
      })
    })
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
