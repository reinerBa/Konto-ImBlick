import Datastore from 'nedb'
import path from 'path'
import {remote} from 'electron'
import AES from 'crypto-js/aes'
//  import sha256 from 'crypto-js/sha256'
import CryptoJS from 'crypto-js'

const neDBPath = path.join(remote.app.getPath('userData'), 'accounts.db')
var accountsDb

const state = {
  main: 0,
  accounts: [],
  selectedAcc: [],  //  {name, data}
  curSaldos: [],   // {name, datum, value}
  dbKey: false,
  accDetails: []
}

const mutations = {
  addAccDetails (state, sepa) {
    if (sepa === null)
      state.accDetails.splice('deleteCount')
    else
      state.accDetails.push(sepa)
  },
  setDbKey (state, key) {
    state.dbKey = key
  },
  toggleSelectAcc (state, account) {
    if (state.selectedAcc.includes(account))
      state.selectedAcc.splice(state.selectedAcc.indexOf(account), 1)
    else
      state.selectedAcc.push(account)
  },
  addAccount (state, newAcc) {
    state.accounts.push(newAcc)
  },
  addSaldo (state, newSaldo) {
    let sIdx = state.curSaldos.find((e) => e.iban === newSaldo.iban)
    if (sIdx)
      state.curSaldos.splice(sIdx, 1)
    state.curSaldos.push(newSaldo)
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
  isAuthenticated (state, getters) {
    return !!state.dbKey
  },
  accIsSelected: (state, getters) => (acc) => {
    return state.selectedAcc.includes(acc)
  },
  saldosCummulated: (state) => {
    let value = 0
    if (state.curSaldos.length) {
      for (let s of state.curSaldos)
        value += s.value
      return value
    }
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
  async saveSepas ({commit, state}, sepas) {
    accountsDb.insert(sepas, (err, newDocs) => {
      if (!err)
        commit('addAccDetails', newDocs)
      else
        console.dir(err)
    })
  },
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
  },
  async initAccounts ({ commit }) {
    var key = 'key'
    accountsDb = new Datastore(
      {filename: neDBPath, autoload: true, beforeDeserialization: GetBeforeDes(key), afterSerialization: GetAfterSer(key)})
    accountsDb.insert({type: '1', myobj: Date.now()})
    accountsDb.find({type: '1'}, (err, docs) => {
      if (!err)
        console.log(docs)
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

function GetAfterSer (key) {
  function afterSerialization (str) {
    if (typeof str !== 'undefined' && str !== '') {
      var encrypted = AES.encrypt(str, 'key')
      var ciphertext = encrypted.toString()
      return ciphertext
    } else
    return str
  }
  return afterSerialization
}

function GetBeforeDes (key) {
  function beforeDeserialization (str) {
    if (typeof str !== 'undefined' && str !== '') {
      var decrypted = AES.decrypt(str, key)
      var plaintext = decrypted.toString(CryptoJS.enc.Utf8)
      return plaintext
    } else
    return str
  }
  return beforeDeserialization
}
/*
App.EncryptDB = function (strData) {
if (strData != undefined && strData != "") {
var encrypted = App.Crypto.AES.encrypt(strData, App.Constants.DBKey);
var ciphertext = encrypted.toString();
return ciphertext;
} else {
return strData;
}
}

App.DecryptDB = function (strData) {
if (strData != undefined && strData != "") {
var decrypted = App.Crypto.AES.decrypt(strData, App.Constants.DBKey);
var plaintext = decrypted.toString(App.Crypto.enc.Utf8);
return plaintext;
} else {
return strData;
}
}

var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");

// Encrypt
var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');

// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
var plaintext = bytes.toString(CryptoJS.enc.Utf8);

console.log(plaintext)
*/
