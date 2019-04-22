<template>
    <div class="category-tabs">
        <h2 class="category-title">Новинки</h2>
        <h2 class="category-title">Популярные</h2>
        <h2 class="category-title">Лучшие</h2>
        <h2 class="category-title">Боевики</h2>
        <h2 class="category-title">Триллеры</h2>
        <h2 class="category-title">Драмы</h2>
        <h2 class="category-title">Комедии</h2>
        <h2 class="category-title">Ужасы</h2>
        <h2 class="category-title">Мультфильмы</h2>
        <h2 class="category-title">Мюзиклы</h2>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
@import './../assets/scss/config';

.category {
    &-tabs {
        @include Flex(space-between);
        margin-bottom: 30px;
        padding-bottom: 15px;
        border-bottom: 2px solid #000;
    }

    &-title {
        color: $gray;
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
</style>