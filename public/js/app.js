import * as Vue from "./vue.js";
import imageModalComponent from "./imageModalComponent.js";

Vue.createApp({
    data() {
        return {
            images: [],
            title: "",
            description: "",
            file: null,
            username: "",
            imageClicked: 0,
            moreImagesAvailable: false,
        };
    },
    mounted() {
        fetch("/get-images")
            .then((res) => res.json())
            .then((data) => {
                this.images = data;
                if (
                    this.images[this.images.length - 1].id >
                    this.images[this.images.length - 1].lowestId
                ) {
                    this.moreImagesAvailable = true;
                }
            })
            .catch((err) => console.log("Err in mounted:", err));
    },
    components: {
        "image-modal": imageModalComponent,
    },
    methods: {
        upload: function () {
            const fd = new FormData();
            fd.append("title", this.title);
            fd.append("description", this.description);
            fd.append("username", this.username || "anonymous");
            fd.append("file", this.file);
            fetch("/upload", {
                method: "POST",
                body: fd,
            })
                .then((res) => res.json())
                .then((res) => {
                    this.title = "";
                    this.description = "";
                    this.$refs.fileInput.value = null;
                    this.username = "";
                    this.images.unshift(res.newImage);
                })
                .catch((err) => {
                    console.log("Err in image upload:", err);
                });
        },
        selectFile: function (e) {
            this.file = e.target.files[0];
        },
        showModal: function (imageId) {
            this.imageClicked = imageId;
        },
        hideModal: function () {
            this.imageClicked = 0;
        },
        loadMoreImages: function () {
            fetch(`/get-more-images/${this.images[this.images.length - 1].id}`)
                .then((res) => res.json())
                .then((data) => {
                    for (let row of data) {
                        this.images.push(row);
                        if (row.id === row.lowestId) {
                            this.moreImagesAvailable = false;
                        }
                    }
                });
        },
    },
}).mount("#main");
