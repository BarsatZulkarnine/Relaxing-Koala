import { getDocs, collection } from 'firebase/firestore';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebase'; 

const state = {
  menuItems: [],
};

const mutations = {
  setMenuItems(state, items) {
    state.menuItems = items;
  },
};

const actions = {
  async fetchMenuItems({ commit }) {
    
    const querySnapshot = await getDocs(collection(db, 'menuItems'));
    const items = [];
    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      const imgRef = storageRef(storage, data.image);
      try {
        const imgUrl = await getDownloadURL(imgRef);
        items.push({ id: doc.id, ...data, image: imgUrl });
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    }
    commit('setMenuItems', items);
  },
};

const getters = {
  getMenuItems: state => state.menuItems,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
