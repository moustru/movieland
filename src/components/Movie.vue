<template>
    <div class="movies-block">
        <div class="movie" 
             v-for="(movie, i) in movies" 
             :key="i" 
             @click="showBar(movie)">
            <div class="movie-img">
                <img :src="`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie.poster_path}`"/>
            </div>
            <div class="movie-desc">
                <span class="movie-desc-title">{{ movie.title }}</span>
                <span class="movie-desc-rate">Оценка: 
                    <span class="rate-count" v-if="movie.vote_average">{{ movie.vote_average }}</span>
                    <span v-else>Еще не оценивался</span>
                </span>
                <span class="movie-desc-genre">Жанр: {{ checkGenres(movie.genre_ids, genres) }}</span>
                <span class="movie-desc-popularity">Популярность: {{ movie.popularity }}</span>
                <span class="movie-desc-adult" v-if="movie.adult">Для взрослых</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    import checkGenres from './../assets/js/utils';

    export default {
        props: [ 'movies', 'related' ],

        computed: {
            ...mapState({
                genres: state => state.genres
            })
        },

        methods: {
            showBar(movie) {
                this.$emit('show-bar', movie);
            },

            checkGenres(genre) {
                var ar = [];
                genre.forEach(a => { ar.push(this.genres.find(i => i.id == a))})
                return ar.map(j => ` ${j.name}`).toString();
            }
        },

        mounted() {
            this.$store.commit('setGenres');
        }
    }
</script>

<style lang="scss" scoped>
@import './../assets/scss/config';


.movies-block {
    @include Flex;
    flex-wrap: wrap;
}

.movie {
    width: 16%;
    margin: 0 .3333333%;
    cursor: pointer;

    &-img {
        width: 100%;
        margin-bottom: 10px;

        img {
            width: 100%;
        }
    }

    &-desc {
        @include Flex(flex-start, flex-start, column);
        height: 200px;

        * {
            padding-bottom: 10px;
        }

        &-title {
            width: 100%;
            padding-bottom: 25px;
            font-family: 'Montserrat', sans-serif;
            font-size: 18px;
            font-weight: 800;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
}

.rate-count {
    font-size: 24px;
}
</style>