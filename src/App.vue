<template>
    <div class="main">
        <Header/>
        <div class="category main-block">
            <Categories/>
            <Movie :movies="films" @show-bar="$store.commit('showBar', $event)"/>
        </div>
        <Bar :show="bar.show" 
             :hide="bar.hide"
             v-if="bar.related"/>
        <div class="overlay"
             :class="{ 'show': overlay.show, 'hide': overlay.hide }"
             @click="$store.commit('hideBar')">
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapState } from 'vuex';

    import Header from './components/Header.vue';
    import Categories from './components/Categories.vue';
    import Movie from './components/Movie.vue';
    import Bar from './components/Bar.vue';

    export default {
        components: {
            Header,
            Categories,
            Movie,
            Bar
        },

        computed: {
            ...mapState({
                films: state => state.films,
                bar: state => state.elements.bar,
                overlay: state => state.elements.overlay
            })
        },

        mounted() {
            this.$store.commit('setFilms')
        }
    }
</script>

<style lang="scss" scoped>
@import './assets/scss/config';

.main {
    position: relative;
    width: 80%;
    margin: auto;

    &-block {
        margin-top: 80px;
    }
}

.overlay {
    position: fixed;
    display: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0;
    z-index: 2;
}

.tab-active {
    color: #000;
}

.show { animation: show .3s forwards }
.hide { animation: hide .3s forwards }

@keyframes show {
    from {
        opacity: 0;
    }

    to {
        opacity: 0.5;
    }
}

@keyframes hide {
    from {
        opacity: 0.5;
    }

    to {
        opacity: 0;
    }
}
</style>