<template>
    <div style="width: 500px; margin: auto;">
        <v-dialog max-width="600px" v-model="dialog">
            <v-card>
                <v-card-title class="headline justify-center" block>{{ title }}</v-card-title>

                <div style="width: 500px; margin: auto">
                    <v-card-text class="text-center">{{ text }}</v-card-text>
                </div>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="dark darken-1" text @click="dialog = false">{{ closeButtonText }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
// Provided by https://medium.com/@panzelva/writing-modals-for-vue-js-callable-from-anywhere-6994d180451

// we must import our Modal plugin instance
// because it contains reference to our Eventbus
import AppModal from "../../plugins/appModal";

export default {
    data() {
        return {
            dialog: false,
            title: "Title",
            text: "Text",
            closeButtonText: "Close",
            onConfirm: {}
        };
    },
    beforeMount() {
        // here we need to listen for emited events
        // we declared those events inside our plugin
        AppModal.EventBus.$on("show", params => {
            this.show(params);
        });
    },
    methods: {
        show(params) {
            // making modal visible
            this.dialog = true;
            // setting title and text
            this.title = params.title;
            this.text = params.text;
            this.closeButtonText = params.closeButtonText;
            // setting callback function
            // this.onConfirm = params.onConfirm;
        },
        hide() {
            this.dialog = false;
        }
        // confirm() {
        //     // confirm code will be here soon(TM)
        // }
    }
};
</script>

<style>
</style>