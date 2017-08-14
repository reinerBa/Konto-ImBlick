const FinTSClient = require('open-fin-ts-js-client')

export default async function (bankenliste, blz, customerLogin, pin) {
  // 2. FinTSClient anlegen
  // BLZ: 12345678
  // Kunden-ID/Benutzerkennung: test1
  // PIN: 1234
  // Bankenliste siehe oben
  var client = new FinTSClient(blz, customerLogin, pin, bankenliste)  //  bzl: number
  // 3. Verbindung aufbauen
  try {
    await establish(client)
  } catch (e) {
    return []
  }

  let returnObj = {}
  for (let i = 0; i < client.konten.length; i++) {
    try {
      returnObj[i] = await getTransactions()
    } catch (e) {
      return returnObj
    }
  }

  // 5. Verbindung beenden
  client.MsgEndDialog((error, recvMsg2) => {
    if (error)
      console.log('Fehler beim schließen der Bankverbindung')
    // 6. Secure Daten im Objekt aus dem Ram löschen
    client.closeSecure()
  })

  function establish () {
    return new Promise((resolve, reject) => {
      client.EstablishConnection((error) => {
        if (error) {
          console.log('Fehler: ' + error)
          reject(error)
        } else
          resolve()
      })
    })
  }

  function getTransactions () {
    return new Promise((resolve, reject) => {
      client.MsgGetKontoUmsaetze(client.konten[0].sepa_data, null, null, (error, rMsg, data) => {
        if (error) {
          console.log('Fehler: ' + error)
          reject(error)
        } else
          resolve({rMsg, data})
      })
    })
  }
}
