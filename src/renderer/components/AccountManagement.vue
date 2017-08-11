<template>
  <div id="wrapperAcc">
    <div>Account Names:
      <div v-for="n in $store.state.Accounts.accounts">
        -> {{n.name | filename}} <input :checked="$store.state.Accounts.data === $store.state.Accounts.selectedAcc" @click="select(n.data)" type="checkbox">
    </div>
    </div>
    <button v-on:click="openFile">Open</button>

    <br/>
    <h2>Login Verwaltung</h2>
    <div>
        <div><p v-for="acc in $store.state.Settings.loginAccs">{{acc.blz}}
          <button @click="removeAcc(acc)">Löschen</button></p>
          <label for="kennung">Kunden-ID/Benutzerkennung:</label>
          <input id="kennung" type="text" v-model="kennung"/>
          <label for="blz">BLZ:</label>
          <input id="blz" type="text" v-model="blz"/>
          <label for="url">Hbci Url:</label>
          <input id="url" type="text" v-model="url"/>
          <button @click="saveNewAcc">Speichern</button>
        </div>
    </div>
  </div>
</template>

<script>
const {dialog} = require('electron').remote
var {remote} = require('electron')
var electronFs = remote.require('fs')
export default {
  name: 'account-management',
  data () {
    return {
      kennung: '',
      blz: '',
      url: ''
    }
  },
  methods: {
    saveNewAcc () {
      this.$store.dispatch('addLoginAcc', {kennung: this.kennung, blz: this.blz})
    },
    removeAcc (a) {
      this.$store.dispatch('removeLoginAcc', a)
    },
    select (acc) {
      this.$store.commit('selectAcc', acc)
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
    }
  },
  filters: {
    filename (f) {
      var ar = f.split(/[.\\]/)
      return ar[ ar.length - 2 ]
    }
  }
}
</script>

<style scoped lang="stylus">
#wrapperAcc
  padding .5rem

input
  max-width 5em

</style>
