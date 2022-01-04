import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            heading: "Latest Images",
            images: [],
            title: "",
            description: "",
            file: null,
            username: "",
        };
    },
    mounted() {
        fetch("/get-images")
            .then((res) => res.json())
            .then((data) => {
                this.images = data;
            })
            .catch((err) => console.log("Err in mounted:", err));
    },
    methods: {
        clickHandler: function () {
            const fd = new FormData();
            fd.append("title", this.title);
            fd.append("description", this.description);
            fd.append("username", this.username);
            fd.append("file", this.file);
            fetch("/upload", {
                method: "POST",
                body: fd,
            })
                .then((res) => res.json())
                .then(console.log)
                .catch((err) => {
                    console.log("Err in image upload:", err);
                });
        },
        fileSelectHandler: function (e) {
            this.file = e.target.files[0];
        },
    },
}).mount("#main");
