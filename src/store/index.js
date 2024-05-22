import { createStore } from 'vuex';
import menu from './modules/menu'; 


export default createStore({

  modules: {
    menu,
  },
  state() {
    return {
      isSignedIn: false,
      userData: {}
    };
  },
  mutations: {
    setSignIn(state, { status, userData }) {
      state.isSignedIn = status;
      state.userData = userData;
    },
    setUserData(state, userData) {
        state.userData = userData;
    }
  },
  actions: {
    signIn({ commit }, { status, userData }) {
      commit('setSignIn', { status, userData });
    },
    signOut({ commit }) {
      commit('setSignIn', { status: false, userData: {} }); 
    }
  },
  getters: {
    isSignedIn: (state) => state.isSignedIn,
    userData: (state) => state.userData
  }
});




















