<template>
    <header class="header">
        <div class="header-logo">
            <h1 class="header-logo-title">Movieland</h1>
            <h3 class="header-logo-subtitle">Сайт о кино и про кино</h3>
        </div>
        <Search/>
    </header>
</template>

<script>
    import Search from './Search.vue';

    export default {
        components: {
            Search
        }
    }
</script>

<style lang="scss" scoped>
@import './../assets/scss/config';

.header {
    @include Flex(space-between, center);
    padding-top: 5%;

    &-logo {
        &-title {
            font-family: 'Montserrat', sans-serif;
            font-size: 96px;
        }

        &-subtitle {
            font-size: 36px;
        }
    }
}
</style>