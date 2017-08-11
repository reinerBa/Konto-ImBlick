import Datastore from 'nedb'
import path from 'path'
import {remote} from 'electron'

const neDBPath = path.join(remote.app.getPath('userData'), 'settingsAccViewer.db')
const settingsDb = new Datastore({filename: neDBPath, autoload: true})

console.log(path.join(remote.app.getPath('userData'), 'settingsAccViewer.db'))

const state = {
  loginAccs: []
}

const mutations = {
  init (state, docx) {
    state.loginAccs.push(...docx)
  },
  addLoginAcc (state, acc) {
    state.loginAccs.push(acc)
  },
  removeLoginAcc (state, idx) {
    state.loginAccs.splice(idx, 1)
  }
}

const getters = {
  // ...
//  getTodoById: (state, getters) => (id) => {
//    return state.todos.find(todo => todo.id === id)
//  }
}

const actions = {
  checkout ({ commit, state }, products) {
    ;
  },
  addLoginAcc ({ commit, state }, acc) {
    acc.type = 'loginAcc'
    settingsDb.insert(acc, (err, newDoc) => {
      if (!err)
        commit('addLoginAcc', newDoc)
      else
        console.dir(err)
    })
  },
  removeLoginAcc ({ commit, state }, selAcc) {
    let idx = state.loginAccs.find((a) => {
      return JSON.stringify(a) === JSON.stringify(selAcc)
    })
    settingsDb.remove({ _id: selAcc._id }, {}, (err, numRemoved) => {
      if (!err && numRemoved === 1)
        commit('removeLoginAcc', idx)
    })
  },
  async init ({ commit }) {
    settingsDb.find({type: 'loginAcc'}, (err, docs) => {
      if (!err)
        commit('init', docs)
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
