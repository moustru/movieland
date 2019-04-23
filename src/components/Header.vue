<template>
    <header class="header">
        <div class="header-logo">
            <h1 class="header-logo-title">Movieland</h1>
            <h3 class="header-logo-subtitle">Сайт о кино и про кино</h3>
        </div>
    </header>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
@import './../assets/scss/config';

.header {
    @include Flex(space-between, center);
    padding-top: 5%;

    @media screen and (max-width: 1440px) {
        align-items: flex-start;
        flex-direction: column;
    }

    &-logo {
        user-select: none;

        &-title {
            font-family: 'Montserrat', sans-serif;
            font-size: 96px;

            @media screen and (max-width: 768px) {
                font-size: 64px;
            }

            @media screen and (max-width: 480px) {
                font-size: 44px;
            }
        }

        &-subtitle {
            font-size: 36px;

            @media screen and (max-width: 768px) {
                font-size: 24px;
            }

            @media screen and (max-width: 480px) {
                font-size: 18px;
            }
        }
    }
}
</style>