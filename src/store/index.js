import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    url: '/juejin/recommend_cate_feed',
    tagId: '',
    refreshList: function () {}
  },
  mutations: {
    setRefresh(state, payload) {
      state.refreshList = payload
    },
    setUrl(state, url) {
      state.url = url
    },
    setTagId(state, tagId) {
      state.tagId = tagId
    }
  },
  actions: {},
  modules: {}
})