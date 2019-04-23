<template>
    <div class="category-tabs">
        <div class="category-block">
            <span class="category-title" 
                v-for="(tab, i) in tabs" 
                :key="i"
                :class="{ 'tab-active': show == i }"
                @click="clickOnTab(tab.commit, i)"
            >{{ tab.name }}</span>
        </div>
        <div class="search">
            <div class="select">
                <span class="select-related" @click="showList = !showList">{{ relatedGenre.name || relatedGenre }}</span>
                <div class="select-list" v-if="showList">
                    <div class="select-list-item"
                        v-for="(genre, i) in genres"
                        :key="i"
                        @click="selectGenre(genre)"
                    >{{ genre.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                show: 0,
                tabs: [
                    { name: 'Новинки', commit: 'setNewFilms' },
                    { name: 'Популярные', commit: 'setPopularFilms' }
                ],
                showList: false,
                relatedGenre: 'Жанр'
            }
        },

        computed: {
            ...mapState({
                genres: state => state.genres
            })
        },

        methods: {
            clickOnTab(commit, e) {
                this.show = e;
                this.$store.commit(`${commit}`)
                this.$emit('click-tab');
            },

            selectGenre(e) {
                this.showList = !this.showList;
                this.relatedGenre = e;
                
                this.$emit('select-genre', e.id);
            }
        }
    }
</script>

<style lang="scss" scoped>
@import './../assets/scss/config';

.category {
    &-tabs {
        @include Flex(space-between, center);
        margin-bottom: 30px;
        padding-bottom: 15px;
        border-bottom: 2px solid #000;

        @media screen and (max-width: 768px) {
            flex-direction: column;
        }
    }

    &-block {
        width: 20%;

        @media screen and (max-width: 768px) {
            width: 100%;
            text-align: center;
        }
    }

    &-title {
        padding: 0 15px;
        color: $gray;
        font-size: 24px;
        text-transform: capitalize;
        cursor: pointer;
        transition: $transition;

        &:hover {
            color: #000;
        }
    }

    &-item {
        @include Flex(flex-start, flex-start, column);
        width: 19%;
        margin: 0 .5%;
    }
}

.tab-active {
    color: #000 !important;
}

.search {
    width: 30%;
    border: 1px solid $gray;

    @media screen and (max-width: 1440px) {
        margin-top: 20px;
    }

    @media screen and (max-width: 768px) {
        width: 100%;
    }
}

.select {
    position: relative;
    width: 100%;
    font-size: 20px;
    background-color: #fff;

    &-related {
        display: block;
        width: 100%;
        padding: 10px;
        text-transform: capitalize;
        cursor: pointer;
    }

    &-list {
        position: absolute;
        top: calc(100% + 1px);
        left: 0;
        width: 100%;
        max-height: 160px;
        background-color: #fff;
        overflow: auto;

        &-item {
            padding: 10px;
            text-transform: capitalize;
            cursor: pointer;
            transition: $transition;

            &:hover {
                background-color: #e5e5e5;
            }
        }
    }
}
</style>