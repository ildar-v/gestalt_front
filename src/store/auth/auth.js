import axios from "axios";

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export default {
    namespaced: true,
    state: {
        authenticated: false,
        currentUser: null
    },
    getters: {
        getAuthenticated: state => state.authenticated,
        getCurrentUser: () => {
            let user = parseJwt(axios.defaults.headers.common['Authorization']);
            return { id: user.id, username: user.username, firstName: user.firstName, lastName: user.lastName };
        },
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