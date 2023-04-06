import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  isPlay: false,
  musicData: {},
  currentMusicInfo: {
    currentTime: 0,
    nextId: null,
    lastId: null
  },
  historyList: window.localStorage.getItem('setHistoryInfo') ? JSON.parse(window.localStorage.getItem('setHistoryInfo')) : []
}
const actions = {
}
const mutations = {
  setPlayState (state, isPlay) {
    state.isPlay = isPlay
  },
  setMusicInfo (state, data) {
    state.musicData = {
      ...state.musicData,
      ...data
    }
  },
  setHistoryInfo (state, data) {
    let newHistouryList = state.historyList
    if (data.type === 'add') {
      if (newHistouryList.find(item => item.id === data.musicDetail.id)) {
        return
      }
      newHistouryList.unshift(data.musicDetail)
    } else if (data.type === 'delete') {
      newHistouryList = newHistouryList.filter(item => {
        return item.id !== data.musicDetail.id
      })
    } else if (data.type === 'clear') {
      newHistouryList = []
    }
    window.localStorage.setItem('setHistoryInfo', JSON.stringify(newHistouryList))
    state.historyList = newHistouryList
  }
}
const store = new Vuex.Store({
  state,
  actions,
  mutations
})
export default store
