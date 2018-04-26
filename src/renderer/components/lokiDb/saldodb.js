import path from 'path'
import {remote} from 'electron'
const Loki = require('lokijs')
const cryptedFileAdapter = require('lokijs/lokiCryptedFileAdapter')
let hash = require('object-hash')

const dbs = {}

export default {
  insertUnique (dbName, collectionName, object, collectionRef) {
    let col = collectionRef || dbs[dbName].getCollection(collectionName)

    let objHash = hash(object)
    let alreadyExists = col.findOne({'hash': objHash})
    if (alreadyExists) return alreadyExists

    object.hash = objHash
    return col.insert(object) // save object with hash property into the db
  },
  saveAllDbs () {
    for (let db in dbs) db.saveDatabase()
  },
  isDbInit (dbName) {
    return dbs[dbName]
  },
  isInit (dbName, collectionName) {
    return dbs[dbName] && dbs[dbName].getCollection(collectionName) !== null
  },
  initDb (dbName, collectionName, secret) {
    cryptedFileAdapter.setSecret(secret) // you should change 'mySecret' to something supplied by the user
    var db = new Loki(path.join(remote.app.getPath('userData'), dbName + '.cryptedLokiDb'), {
      adapter: cryptedFileAdapter,
      autoload: true,
      autoloadCallback: databaseInitialize,
      autosave: false
    //  , autosaveInterval: 4000
    }) // you can use any name, not just '*.crypted'

    dbs[dbName] = db
    function databaseInitialize (collectionName) {
      var log = db.getCollection(collectionName)

      if (log === null) db.addCollection(collectionName)

      // log some random event data as part of our example
      log.insert({ event: 'dbinit', dt: (new Date()).getTime() })
    }
  }
}
