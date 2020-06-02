<template>
    <div class="home">
        <div>Список всех</div>
        <div v-for="item in requests" :key="item.id">
            <div v-for="request in item.requests" :key="request.id">
                <hr />
                {{ request.message }}
            </div>
            <hr />
        </div>
        <div class="text-center">
            <v-pagination v-model="page" :length="requestsCount" circle></v-pagination>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            countOnPage: 10
        };
    },
    created() {
        this.loadRequests();
    },
    computed: {
        totalRequestsCount: {
            get() {
                return this.requests.reduce((total, x) => (total += x.requests.length), 0);
            }
        },
        requestsCount: {
            get() {
                return this.totalRequestsCount / this.countOnPage;
            }
        },
        ...mapGetters({
            requests: "request/getRequests"
        }),
    },
    methods: {
        ...mapActions({
            loadRequests: "request/loadRequests"
        })
    }
};
</script>
