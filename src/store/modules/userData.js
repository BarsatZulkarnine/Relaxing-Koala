const state = {
    userData: {}
  };
  
  const mutations = {
    setUserData(state, userData) {
      state.userData = userData;
    }
  };
  
  const actions = {
    setUserData({ commit }, userData) {
      commit('setUserData', userData);
    }
  };
  
  const getters = {
    getUserData: state => state.userData
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
  