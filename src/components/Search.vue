<template>
    <div class="search">
        <input type="text" 
               class="input search-input" 
               placeholder="Найдите свой фильм"/>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
@import './../assets/scss/config';

.search {
    width: 60%;

    &-input {
        width: 100%;
        font-size: 20px;
        transition: $transition;

        &:focus {
            border-bottom-color: #000;
        }
    }
}
</style>