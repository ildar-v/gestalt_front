<template>
    <v-container fluid fill-height>
        <v-layout flex align-center justify-center>
            <v-flex xs12 sm4 elevation-6>
                <v-card>
                    <v-card-title primary-title class="justify-center headline" block>Вход</v-card-title>
                    <v-card-text class="pt-4">
                        <v-form v-model="valid" ref="form" @submit="submit">
                            <v-text-field
                                label="Введите имя пользователя"
                                v-model="email"
                                :rules="emailRules"
                                required
                            ></v-text-field>
                            <v-text-field
                                label="Введите пароль"
                                v-model="password"
                                min="6"
                                type="password"
                                :rules="passwordRules"
                                counter
                                required
                            ></v-text-field>
                            <v-layout justify-space-between>
                                <v-btn
                                    type="submit"
                                    @click="submit"
                                    :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                                >Login</v-btn>
                            </v-layout>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            valid: false,
            password: "",
            passwordRules: [v => !!v || "Password is required"],
            email: "",
            emailRules: [
                v => !!v || "E-mail is required",
                v =>
                    // /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    /^.{4,}$/.test(v) || "Не менее 4 символов"
            ]
        };
    },
    methods: {
        submit() {
            this.authenticate({
                username: this.email,
                password: this.password
            });
        },
        clear() {
            this.$refs.form.reset();
        },
        ...mapActions({
            authenticate: "auth/authenticate" // map `this.authenticate()` to `this.$store.dispatch('authenticate')`
        })
    }
};
</script>

<style>
</style>