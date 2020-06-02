<template>
    <v-navigation-drawer permanent expand-on-hover right mini-variant absolute>
        <v-list>
            <v-list-item class="px-2">
                <v-list-item-avatar>
                    <v-img src="https://randomuser.me/api/portraits/men/59.jpg"></v-img>
                </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
                <v-list-item-content>
                    <v-list-item-title class="title">{{ currentUser.firstName }}</v-list-item-title>
                    <v-list-item-subtitle>{{ currentUser.lastName }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav dense>
            <v-list-item to="/">
                <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
            <v-list-item to="/about">
                <v-list-item-icon>
                    <v-icon>mdi-information-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>About</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
                <v-list-item-icon>
                    <v-icon>mdi-exit-to-app</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
    data() {
        return {
            items: [
                { icon: "home", title: "Home", route: "/" },
                { icon: "about", title: "About", route: "/about" }
            ],
            drawer: false
        };
    },
    methods: {
        logout() {
            this.resetAuthentication();
        },
        ...mapMutations({
            resetAuthentication: "auth/resetAuthentication"
        })
    },
    computed: {
        ...mapGetters({
            currentUser: "auth/getCurrentUser"
        })
    },
};
</script>

<style>
</style>