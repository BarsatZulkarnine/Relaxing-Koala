import { createApp } from 'vue'; 
import store from './store/index'  
import App from './App.vue';  
import router from './router'; 
import './assets/styles.css'

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'; 
import 'primevue/resources/primevue.min.css'; 
import 'primeicons/primeicons.css'; 
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUtensils, faCalendarAlt, faDollarSign, faChartLine, faShoppingCart, faUsers, faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUtensils, faCalendarAlt, faDollarSign, faChartLine, faShoppingCart, faUsers, faSearch, faBars)


const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(PrimeVue);

app.use(router);
app.use(store);
app.mount('#app');
