// store/modules/cart.js
const state = {
    cartItems: []
  };
  
  const mutations = {
    addToCart(state, item) {
      state.cartItems.push(item);
    }
  };
  
  export default {
    state,
    mutations
  };
  