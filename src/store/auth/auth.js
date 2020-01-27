import axios from "axios";

export default {
    namespaced: true,
    state: {
        authenticated: false,
        currentUser: null
    },
    getters: {
        getAuthenticated: state => state.authenticated,
        getCurrentUser: state => state.currentUser,
    },
    mutations: {
        updateAuthenticated(state, value) {
            state.authenticated = value;
        },
        updateCurrentUser(state, value) {
            state.currentUser = value;
        },
        authenticateLocal() {
            if (localStorage["token"]) {
                this.commit('auth/updateAuthenticated', true);
                axios.defaults.headers.common["Authorization"] =
                    localStorage["token"];
            }
        },
        resetAuthentication() {
            this.commit('auth/updateAuthenticated', false);
            localStorage["token"] = "";
        }
    },
    actions: {
        authenticate(context, model) {
            axios
                .post("Users/authenticate/", {
                    Username: model.username,
                    Password: model.password
                })
                .then(response => {
                    context.commit('updateAuthenticated', true);
                    context.commit('updateCurrentUser', response.data);

                    let authToken = `Bearer ${response.data.token}`;
                    localStorage["token"] = authToken;
                    axios.defaults.headers.common['Authorization'] = authToken;
                });
        }
    }
}