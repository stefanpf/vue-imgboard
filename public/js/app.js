import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            heading: "Latest Images",
            images: [],
        };
    },
    mounted() {
        fetch("/get-image-urls")
            .then((res) => res.json())
            .then((data) => {
                this.images = data;
            })
            .catch((err) => console.log("Err in mounted:", err));
    },
}).mount("#main");
