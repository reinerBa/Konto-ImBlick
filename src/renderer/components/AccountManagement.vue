<template>
  <div id="wrapperAcc">
    <div>
      <h2>Umsatz Dateien</h2>
      <ul>
        <li v-for="n in $store.state.Accounts.accounts" @click="toggleSelectAcc(n)">
          <input :checked="accIsSelected(n)" type="checkbox">
          {{n.name | filename}}
        </li>
      </ul>
    </div>
    <button v-on:click="openFile">Open</button>

    <br/>
    <h2>Login Verwaltung</h2>
    <div>
      <table>
        <thead><tr><th>Login</th><th>BLZ</th><th>Bankurl</th></tr></thead>
        <tbody>
          <tr v-for="acc in $store.state.Settings.loginAccs">
            <td>{{acc.kennung}}</td>
            <td>{{acc.blz.blz}}</td>
            <td>{{acc.blz.url}}</td>
            <td><button @click="removeLoginAcc(acc)">Löschen</button></td>
          </tr>
        </tbody>
      </table>
      <br/>
      <form @submit.prevent="saveNewAcc">
        <label for="kennung">Kunden-ID/Benutzerkennung:</label>
        <input id="kennung" type="text" v-model="kennung" required/>
        <label for="blz">BLZ:</label>
        <select id="blz" v-model="blz" required>
          <option v-for="urlObj in $store.state.Settings.bankUrls" :value="urlObj">{{urlObj.blz}}</option>
        </select>
        <input :disabled="!kennung || !blz" type="submit" value="Speichern"/>
      </form>
    </div>

    <br/>
    <h2>Banken URLs</h2>
    <div>
        <div>
          <p v-for="url in $store.state.Settings.bankUrls">
            BLZ: {{url.blz}} URL: {{url.url}}
            <button @click="toggleUrl(url)">Löschen</button>
          </p>
          <form @submit.prevent="toggleUrl(url, blz2)">
            <label for="blz">BLZ:</label>
            <input id="blz" type="text" v-model="blz2" required/>
            <button @click="openWindow">Suche Url</button>
            <label for="url">Hbci Url:</label>
            <input id="url" type="text" v-model="url" required/>
            <input type="submit" value="Speichern"/>
          </form>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
const {dialog} = require('electron').remote
var {remote} = require('electron')
var electronFs = remote.require('fs')
const BrowserWindow = remote.BrowserWindow
export default {
  name: 'account-management',
  data () {
    return {
      kennung: '',
      blz: '',
      blz2: '',
      url: ''
    }
  },
  computed: {
    ...mapGetters(['accIsSelected'])
  },
  methods: {
    ...mapMutations(['toggleSelectAcc']),
    ...mapActions(['removeLoginAcc']),
    saveNewAcc () {
      this.$store.dispatch('addLoginAcc', {kennung: this.kennung, blz: this.blz})
    },
    toggleUrl (url, blz) {
      if (blz) {
        this.$store.dispatch('addBankUrl', {blz, url})
        this.url = this.blz2 = ''
      } else
        this.$store.dispatch('removeBankUrl', url)
    },
    openFile () {
      dialog.showOpenDialog((fileNames) => {
        // fileNames is an array that contains all the selected
        if (fileNames === undefined) {
          console.log('No file selected')
          return
        }
        electronFs.readFile(fileNames[0], 'utf-8', (err, data) => {
          let c = JSON.parse(data)

          this.$store.commit('addAccount', {name: fileNames[0], data: c})
          if (err)
            alert('An error ocurred reading the file :' + err.message)
        })
      })
    },
    openWindow () {
      var win = new BrowserWindow({ width: 800, height: 600 })
      win.loadURL('http://www.hbci-zka.de/institute/institut_auswahl.htm')
      // Or load a local HTML file
      //  win.loadURL(`file://${__dirname}/app/index.html`)
    }
  }
}
</script>

<style scoped lang="stylus">
#wrapperAcc
  padding .5rem

input:not([type="submit"])
  max-width 5em

li
  padding-top 0.1rem
  padding-bottom 0.1rem
  background-color whitesmoke
li:hover
  background-color antiquewhite
ul
  border 1px solid lightgrey
  padding-left 0
</style>
