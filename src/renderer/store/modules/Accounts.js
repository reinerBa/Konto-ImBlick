import Datastore from 'nedb'
import path from 'path'
import {remote} from 'electron'

const neDBPath = path.join(remote.app.getPath('userData'), 'accounts.db')
const accountsDb = new Datastore({filename: neDBPath, autoload: true})

const state = {
  main: 0,
  accounts: [],
  selectedAcc: []
}

const mutations = {
  toggleSelectAcc (state, account) {
    if (state.selectedAcc.includes(account))
      state.selectedAcc.splice(state.selectedAcc.indexOf(account), 1)
    else
      state.selectedAcc.push(account)
  },
  addAccount (state, newAcc) {
    state.accounts.push(newAcc)
  },
  loadAuszuege (state, auszeugeAr) {
    if (auszeugeAr.length) {
      let kontoBez = auszeugeAr[0].konto_bez
      let acc = state.accounts.find((a) => a.konto_bez === kontoBez)
      if (acc)
        acc.data(...auszeugeAr)
      else
        state.accounts.push({konto_bez: kontoBez, data: auszeugeAr})
    }
  }
}

const getters = {
  accIsSelected: (state, getters) => (acc) => {
    return state.selectedAcc.includes(acc)
  },
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
  addAuszug ({ commit, state }, auszeugeAr) {
    accountsDb.insert(auszeugeAr, (err, newDocs) => {
      if (!err)
        commit('loadAuszuege', newDocs)
      else
        console.dir(err)
    })
  },
  async loadAuszuege ({ commit, state }, kontoBez) {
    accountsDb.find({'konto_bez': kontoBez, auszug_nr: {$exists: true}}, (err, docs) => {
      if (!err)
        commit('loadAuszuege', docs)
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
