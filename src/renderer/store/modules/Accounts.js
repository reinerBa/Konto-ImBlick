const state = {
  main: 0,
  accounts: [],
  selectedAcc: {}
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  selectAcc (state, selAcc) {
    state.selectedAcc = selAcc
  },
  addAccount (state, newAcc) {
    state.accounts.push(newAcc)
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
