<template>
    <div class="bar" :class="{ 'showBar': show, 'hideBar': hide }">
        <div class="bar-head">
            <div class="bar-img">
                <img :src="`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${ related.poster_path }`"/>
            </div>
            <div class="bar-desc">
                <span class="bar-desc-title">{{ related.title }}</span>
                <span class="bar-desc-rate">Оценка: {{ related.vote_average || 'Еще не оценивался' }}</span>
                <span class="bar-desc-genre">Жанр: 
                    <span class="genre-list">{{ checkGenres(related.genre_ids, genres) }}</span>               
                </span>
                <span class="bar-desc-popularity">Популярность: {{ related.popularity }}</span>
                <span class="bar-desc-adult" v-if="related.adult">Для взрослых</span>
                <button class="btn btn-return" @click="$store.commit('hideBar')">Вернуться</button>
            </div>
        </div>
        <div class="bar-short">
            <h3 class="bar-title">Описание:</h3>
            <p class="bar-short-text">{{ related.overview }}</p>
        </div>
        <div class="bar-video">
            <h3 class="bar-title">Трейлер фильма:</h3>
            <iframe width="560" 
                    height="315" 
                    :src="`https://www.youtube.com/embed/${ video }`" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    v-if="video">
            </iframe>
            <span class="no-video" v-else>К сожалению, трейлер отсутствует</span>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapState } from 'vuex';

    export default {
        props: [ 'show', 'hide' ],

        computed: {
            ...mapState({
                genres: state => state.genres,
                related: state => state.elements.bar.related,
                video: state => state.elements.bar.video
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
    overflow-y: auto;
    z-index: 3;

    @media screen and (max-width: 1024px) {
        right: -100%;
        width: 100%;
    }

    &-head {
        @include Flex;
        margin-bottom: 20px;

        @media screen and (max-width: 480px) {
            flex-direction: column;
        }
    }

    &-title {
        display: block;
        width: 100%;
        padding-bottom: 20px;
        font-size: 22px;
        text-align: center;
    }

    &-img {
        width: 40%;
        margin-right: 3%;

        @media screen and (max-width: 1024px) {
            width: 20%;
        }

        @media screen and (max-width: 768px) {
            width: 35%;
        }

        @media screen and (max-width: 480px) {
            width: 50%;
            margin: 0 auto 20px;
        }

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

            @media screen and (max-width: 768px) {
                font-size: 26px;
            }
        }

        &-genre {
            .genre-list {
                text-transform: capitalize;
            }
        }
    }

    &-short {
        margin-bottom: 30px;

        &-text {
            text-indent: 20px;
        }
    }

    &-video {
        @include Flex(center, center, column);

        iframe {
            width: 100%;
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

@media screen and (max-width: 1024px) {
    @keyframes showBar {
        from {
            right: -100%;
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
            right: -100%;
        }
    }    
}
</style>