import './index.html';
import './assets/scss/app.scss';
import './assets/js/utils';
require.context('./static/', true, /\.(ttf|woff|woff2|svg|png|jpe?g)$/);

import Vue from 'vue/dist/vue';
import store from './store/index';

import App from './App.vue';

new Vue({
    el: '#app',
    data: {},
    store,
    components: { App }
})