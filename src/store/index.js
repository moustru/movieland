import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const fn = {
    show(s) {
        document.querySelector(`.${s}`).style.display = 'block';
    },
    
    hide(s, t) {
        setTimeout(() => { document.querySelector(`.${s}`).style.display = 'none' }, t);
    }
}

export default new Vuex.Store({
    state: {
        films: [],
        genres: [],
        elements: {
            bar: {
                show: false,
                hide: false,
                related: null
            },

            overlay: {
                show: false,
                hide: false
            }
        }
    },

    mutations: {
        setFilms(state) {
            axios
                .get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3937655aadcaf3ea0b16fb7a63681435')
                .then(res => { state.films = res.data.results });
        },

        setGenres(state) {
            axios
                .get('https://api.themoviedb.org/3/genre/movie/list?api_key=3937655aadcaf3ea0b16fb7a63681435')
                .then(res => { state.genres = res.data.genres });
        },

        showBar(state, payload) {
            state.elements.bar.hide = state.elements.overlay.hide = false;
            state.elements.bar.show = state.elements.overlay.show = true;
            fn.show('overlay')
            
            state.elements.bar.related = payload;
        },

        hideBar(state) {
            state.elements.bar.hide = state.elements.overlay.hide = true;
            state.elements.bar.show = state.elements.overlay.show = false;
            fn.hide('overlay', 300);
        }
    }
})