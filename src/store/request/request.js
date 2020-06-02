import axios from "axios";

export default {
    namespaced: true,
    state: {
        requests: {}
    },
    getters: {
        getRequests: state => state.requests
    },
    mutations: {
        updateRequests(state, value) {
            state.requests = value;
        },
        clearRequests(state) {
            state.requests = {};
        }
    },
    actions: {
        loadRequests(context) {
            axios
                .get("request")
                .then(response => {
                    context.commit('updateRequests', response.data);
                });
        }
    }
}