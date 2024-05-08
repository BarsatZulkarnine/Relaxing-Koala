import { createStore } from 'vuex';
import menu from './modules/menu'; 
import cart from './modules/cart';

export default createStore({

  modules: {
    menu,
    cart,
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
      commit('setSignIn', { status: false, userData: {} }); // Update isSignedIn to false and userData to an empty object
    }
  },
  getters: {
    isSignedIn: (state) => state.isSignedIn,
    userData: (state) => state.userData
  }
});



























/*

// store/index.js
import { createStore } from 'vuex';
import menu from './modules/menu';
import userData from './modules/userData';
import auth from './modules/auth';

export default createStore({
  modules: {
    menu,
    userData,
    auth
  }
});

*/