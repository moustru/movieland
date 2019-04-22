<template>
    <div class="bar" :class="{ 'showBar': show, 'hideBar': hide }">
        <div class="bar-head">
            <div class="bar-img">
                <img :src="`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${ related.poster_path }`"/>
            </div>
            <div class="bar-desc">
                <span class="bar-desc-title">{{ related.title }}</span>
                <span class="movie-desc-rate">Оценка: {{ related.vote_average || 'Еще не оценивался' }}</span>
                <span class="movie-desc-genre">Жанр: {{ checkGenres(related.genre_ids, genres) }}</span>
                <span class="movie-desc-popularity">Популярность: {{ related.popularity }}</span>
                <span class="movie-desc-adult" v-if="related.adult">Для взрослых</span>
            </div>
        </div>
        <div class="bar-short">
            <h3 class="bar-short-title">Описание:</h3>
            <p class="bar-short-text">{{ related.overview }}</p>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import checkGenres from './../assets/js/utils';

    export default {
        props: [ 'show', 'hide' ],

        computed: {
            ...mapState({
                genres: state => state.genres,
                related: state => state.elements.bar.related
            })
        },

        methods: {
            checkGenres(genre) {
                var ar = [];
                genre.forEach(a => { ar.push(this.genres.find(i => i.id == a))})
                return ar.map(j => ` ${j.name}`).toString();
            }
        }
    }
</script>

<style lang="scss" scoped>
@import './../assets/scss/config';

.bar {
    position: fixed;
    top: 0;
    right: -35%;
    width: 35%;
    height: 100%;
    padding: 20px;
    background-color: rgba(0, 0, 0, .9);
    color: #fff;
    z-index: 3;

    &-head {
        @include Flex;
        margin-bottom: 20px;
    }

    &-img {
        width: 40%;
        margin-right: 3%;

        img {
            width: 100%;
        }
    }

    &-desc {
        @include Flex(flex-start, flex-start, column);
        width: 60%;

        * {
            padding-bottom: 10px;
        }

        &-title {
            padding-bottom: 25px;
            font-family: 'Montserrat', sans-serif;
            font-size: 32px;
            font-weight: 800;
        }
    }

    &-short {
        &-title {
            padding-bottom: 20px;
            font-size: 22px;
        }

        &-text {
            text-indent: 20px;
        }
    }
}

.showBar { animation: showBar .3s forwards }
.hideBar { animation: hideBar .3s forwards }

@keyframes showBar {
    from {
        right: -35%;
    }

    to {
        right: 0;
    }
}

@keyframes hideBar {
    from {
        right: 0;
    }

    to {
        right: -35%;
    }
}
</style>