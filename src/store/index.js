import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const MAIN_URL = 'https://api.themoviedb.org/3/discover/movie?page=1';
const API_KEY = '3937655aadcaf3ea0b16fb7a63681435';

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
                related: null,
                video: ''
            },

            overlay: {
                show: false,
                hide: false
            }
        }
    },

    mutations: {
        setPopularFilms(state) {
            axios
                .get(`${ MAIN_URL }&sort_by=popularity.desc&api_key=${ API_KEY }&language=ru-RU&region=RU`)
                .then(res => { state.films = res.data.results });
        },

        setNewFilms(state) {
            axios
                .get(`${ MAIN_URL }&primary_release_year=2019&sort_by=vote_average.desc&api_key=${ API_KEY }&language=ru-RU&region=RU`)
                .then(res => { state.films = res.data.results });
        },

        setGenres(state) {
            axios
                .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${ API_KEY }&language=ru-RU&region=RU`)
                .then(res => { state.genres = res.data.genres })
        },

        getVideo(state, payload) {
            axios
                .get(`https://api.themoviedb.org/3/movie/${ payload }/videos?api_key=${ API_KEY }&language=ru-RU&region=RU`)
                .then(res => { state.elements.bar.video = res.data.results[0].key })
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
            state.elements.bar.video = '';
            fn.hide('overlay', 300);
        }
    }
})