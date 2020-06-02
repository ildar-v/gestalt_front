<template>
    <v-container>
        <v-container fluid fill-height style="padding: 0;">
            <MainMenu></MainMenu>
        </v-container>
        <div>
            <router-view />
        </div>
    </v-container>
</template>

<script>
import mainMenu from "./Menu";

export default {
    components: {
        MainMenu: mainMenu
    }
};
</script>

<style scoped lang="scss">
</style>
