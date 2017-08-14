import Datastore from 'nedb'
import path from 'path'
import {remote} from 'electron'

const neDBPath = path.join(remote.app.getPath('userData'), 'settingsAccViewer.db')
const settingsDb = new Datastore({filename: neDBPath, autoload: true})

console.log(path.join(remote.app.getPath('userData'), 'settingsAccViewer.db'))

const state = {
  loginAccs: [],
  bankUrls: []
}

const mutations = {
  init (state, docx) {
    if (docx.loginAccs)
      state.loginAccs.push(...docx.loginAccs)
    if (docx.bankUrls)
      state.bankUrls.push(...docx.bankUrls)
  },
  addLoginAcc (state, acc) {
    state.loginAccs.push(acc)
  },
  removeLoginAcc (state, accIdx) {
    state.loginAccs.splice(accIdx, 1)
  },
  saveBankUrl (state, urlObj) {
    state.bankUrls.push(urlObj)
  },
  removeBankUrl (state, urlIdx) {
    state.bankUrls.splice(urlIdx, 1)
  }
}

const getters = {}

const actions = {
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
  addBankUrl ({ commit, state }, url) {
    url.type = 'bankurl'
    settingsDb.insert(url, (err, newDoc) => {
      if (!err)
        commit('saveBankUrl', newDoc)
      else
        console.dir(err)
    })
  },
  removeBankUrl ({ commit, state }, url) {
    let idx = state.bankUrls.find((a) => {
      return JSON.stringify(a) === JSON.stringify(url)
    })
    settingsDb.remove({ _id: url._id }, {}, (err, numRemoved) => {
      if (!err && numRemoved === 1)
        commit('removeBankUrl', idx)
    })
  },
  async init ({ commit }) {
    settingsDb.find({type: 'loginAcc'}, (err, docs) => {
      if (!err)
        commit('init', {loginAccs: docs})
    })
    settingsDb.find({type: 'bankurl'}, (err, docs) => {
      if (!err)
        commit('init', {bankUrls: docs})
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
