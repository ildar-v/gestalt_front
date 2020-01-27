<template>
    <v-app>
        <LoginPage v-if="!authenticated"></LoginPage>
        <MainPage v-if="authenticated"></MainPage>
        <app-modal />
    </v-app>
</template>

<script>
import axios from "axios";
import LoginPage from "./components/auth/Login";
import MainPage from "./components/Main";
import { mapGetters, mapMutations } from "vuex";

export default {
    components: {
        MainPage,
        LoginPage
    },
    created() {
        this.authenticateLocal();

        axios.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                if (error && !error.response) {
                    this.$modal.show({
                        title: "Notification",
                        text:
                            "Something wrong with server, please contact the administration.",
                        closeButtonText: "OK"
                    });
                } else if (error && error.response.status === 400) {
                    this.$modal.show({
                        title: "Notification",
                        text: "Username or password is invalid.",
                        closeButtonText: "OK"
                    });
                    this.resetAuthentication();
                } else if (error && error.response.status === 401) {
                    this.$modal.show({
                        title: "Notification",
                        text:
                            "Session timeout has expired, please authorize again.",
                        closeButtonText: "OK"
                    });
                    this.resetAuthentication();
                } else {
                    this.$modal.show({
                        title: "Error",
                        text: error.response.data,
                        closeButtonText: "OK"
                    });
                }
                return Promise.reject(error);
            }
        );
        axios.defaults.baseURL = "http://localhost:5000/api/";
    },
    data() {
        return {
            status: "uploading"
        };
    },
    computed: {
        ...mapGetters({
            authenticated: "auth/getAuthenticated"
        })
    },
    methods: {
        ...mapMutations({
            authenticateLocal: "auth/authenticateLocal",
            resetAuthentication: "auth/resetAuthentication"
        })
    }
};
</script>

<style lang="scss">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
