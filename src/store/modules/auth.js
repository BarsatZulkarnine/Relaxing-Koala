// store/modules/auth.js
const state = {
    isSignedIn: false
  };
  
  const mutations = {
    setSignIn(state, status) {
      state.isSignedIn = status;
    }
  };
  
  const actions = {
    signIn({ commit }) {
      commit('setSignIn', true);
    },
    signOut({ commit }) {
      commit('setSignIn', false);
    }
  };
  
  const getters = {
    isSignedIn: state => state.isSignedIn
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
  