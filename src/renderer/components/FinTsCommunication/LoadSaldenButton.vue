<template>
<div>
<button @click="load">Lade Salden</button>
<modal-button v-if="showPinInput" @close="showPinInput = false;">
  <input slot="body" ref="pinInput" @keypress.enter="pinEntered" value="" type="password"/>
  <button slot="footer" @click="pinEntered">OK</button>
</modal-button>

<modal-button v-if="showError" @close="showError = false;">
  <span slot="body">Beim Abruf der Daten ist ein Fehler aufgetreten.</span>
</modal-button>
</div>
</template>

<script>
import FinTSClient from 'open-fin-ts-js-client-promise'
import ModalButton from './ModalButton'

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
  data () {
    return {
      showPinInput: false,
      showError: false
    }
  },
  methods: {
    load () {
      this.showPinInput = true
    },
    async pinEntered () {
      let pin = this.$refs.pinInput.value
      this.$refs.pinInput.value = ''
      this.showPinInput = false

      if (!pin)
        return false

      let client = new FinTSClient(Number(this.blz), this.benutzerkennung, pin, this.bankUrls || this.bankUrl)
      try {
        // 3. Verbindung aufbauen
        this.showError = ''
        setTimeout(function () { if (this.showError === '') this.showError = true }.bind(this), 2500)

        await client.EstablishConnection()
        this.showError = true
        console.log('Erfolgreich Verbunden not')

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
        console.log('Fehler: ' + exception)
      }
      // 8. Secure Daten im Objekt aus dem Ram löschen
      client.closeSecure()
      console.log('ENDE')
    }
  },
  components: {
    ModalButton
  }
}
</script>

<style scoped>
</style>
