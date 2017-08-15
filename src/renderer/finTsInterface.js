const FinTSClient = require('open-fin-ts-js-client')

export default async function (bankenliste, blz, customerLogin, pin, saldosOrUmsaetze) {
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
    if (!saldosOrUmsaetze) {
      try {
        returnObj[client.konten.iban] = await getTransactions(client.konten[i], null, null)
      } catch (e) {
        return returnObj
      }
    } else {
      try {
        returnObj[client.konten.iban] = await getSalden()
      } catch (e) {
        return returnObj
      }
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

  function getTransactions (konto, from, to) {
    return new Promise((resolve, reject) => {
      client.MsgGetKontoUmsaetze(konto.sepa_data, from, to, (error, rMsg, data) => {
        if (error) {
          console.log('Fehler: ' + error)
          reject(error)
        } else
          resolve({rMsg, data})
      })
    })
  }

  function getSalden (konto) {
    return new Promise(function (resolve, reject) {
      client.MsgGetSaldo(konto, function (error, recvMsg, saldo) {
        if (error)
          reject(error)
        else
          resolve({recvMsg, saldo})
      })
    })
  }
}
