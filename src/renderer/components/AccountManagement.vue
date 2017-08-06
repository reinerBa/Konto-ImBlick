<template>
  <div id="wrapperAcc">
    <div>Account Names:
      <div v-for="n in $store.state.Accounts.accounts">
        -> {{n.name | filename}} <input :checked="$store.state.Accounts.data === $store.state.Accounts.selectedAcc" @click="select(n.data)" type="checkbox">
    </div>
    </div>
    <button v-on:click="openFile">Open</button>

  </div>
</template>

<script>
const {dialog} = require('electron').remote
var {remote} = require('electron')
var electronFs = remote.require('fs')
export default {
  name: 'account-management',
  methods: {
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
          if (err) {
            alert('An error ocurred reading the file :' + err.message)
            // return
          }
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

<style scoped>
#wrapperAcc{
  padding: .5rem;
}
</style>
