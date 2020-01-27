<template>
    <v-container>
        <div class="hello">Hello, Gestalt!</div>
        <v-btn @click="logout">Logout</v-btn>
        <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/about">About</router-link>
        </div>
    </v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    methods: {
        logout() {
            this.resetAuthentication();
        },
        ...mapMutations({
            resetAuthentication: "auth/resetAuthentication"
        })
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
