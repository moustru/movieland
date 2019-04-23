<template>
    <div class="main">
        <Header/>
        <div class="category main-block">
            <Categories @click-tab="resetFilters"
                        @select-genre="filterMovies($event)"/>
            <div class="movies-block">
                <Movie v-for="(movie, i) in filters"
                       :key="i"
                       :movie="movie"
                       @show-bar="showBar($event)"
                />
            </div>
            <span class="no-results" v-if="filterList && filterList.length == 0">По выбранному жанру фильмов не найдено</span>
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
    import { mapState } from 'vuex';

    import Header from './components/Header.vue';
    import Categories from './components/Categories.vue';
    import Movie from './components/Movie.vue';
    import Bar from './components/Bar.vue';

    export default {
        data() {
            return {
                filterList: null
            }
        },

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
            }),

            filters() {
                return this.filterList ? this.filterList : this.films;
            }
        },

        methods: {
            filterMovies(id) {
                var fArray = [];
                this.films.forEach(a => {
                    if(a.genre_ids.find(b => b == id)) {
                        fArray.push(a);
                    } else {
                        return false;
                    }
                })

                this.filterList = fArray;
                return false;
            },

            showBar(e) {
               this.$store.commit('showBar', e);
               this.$store.commit('getVideo', e.id);
            },

            resetFilters() {
                this.filterList = null;
            }
        },

        mounted() {
            this.$store.commit('setNewFilms');
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

.movies-block {
    @include Flex;
    flex-wrap: wrap;
}

.no-results {
    display: block;
    width: 100%;
    font-size: 18px;
    text-align: center;
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