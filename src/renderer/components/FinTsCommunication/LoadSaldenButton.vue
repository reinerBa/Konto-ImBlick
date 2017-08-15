<template>
<button @click="load">Lade Salden</button>
</template>

<script>
import FinTSClient from 'open-fin-ts-js-client-promise'
import smalltalk from 'smalltalk'

export default {
  props: {
    bankUrl: {
      type: String,
      required: true
    },
    bankUrls: {
      type: Object,
      required: false
    },
    benutzerkennung: {
      type: String,
      required: true
    },
    blz: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
    async load () {
      let pin = await this.pinPromt()
      if (!pin)
        return false
      var client = new FinTSClient(this.blz, this.benutzerkennung, pin, this.bankUrls || this.bankUrl)
      try {
        // 3. Verbindung aufbauen
        await client.EstablishConnection()
        console.log('Erfolgreich Verbunden')

        // 4. Kontoumsätze für alle Konten nacheinander laden
        for (let konto of client.konten) {
          let {umsaetze} = await client.MsgGetKontoUmsaetze(konto.sepa_data, null, null)
          this.$store.commit('addAccount', {iban: konto.iban, 'name': konto.product_name, data: umsaetze})
        }

        // 6. Zeige Salden
        for (let konto of client.konten) {
          let saldo = await client.MsgGetSaldo(konto.sepa_data)
          let value = saldo.saldo.saldo.value * (saldo.saldo.saldo.soll_haben === 'S' ? -1 : 1)
          this.$store.commit('addSaldo', {iban: konto.iban, 'name': konto.product_name, value})

          console.log('Saldo von Konto ' + konto.iban + ' ist ' + JSON.stringify(saldo.saldo.saldo))
        }

        // 7. Verbindung beenden
        await client.MsgEndDialog()
      } catch (exception) {
        console.error('Fehler: ' + exception)
      }
      // 8. Secure Daten im Objekt aus dem Ram löschen
      client.closeSecure()
      console.log('ENDE')
    },
    async pinPromt () {
      try {
        let value = await smalltalk.prompt('PIN', 'Bitte geben sie ihre PIN ein', '10')
        return value
      } catch (exception) {
        console.log('Keine PIN eingegeben')
      }
    }
  }
}
</script>

<style scoped>
</style>
