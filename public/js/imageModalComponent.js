import imageCommentsComponent from "./imageCommentsComponent.js";

const imageModalComponent = {
    data() {
        return {
            image: {},
        };
    },
    mounted() {
        fetch(`/get-image-by-id/${this.imageId}`)
            .then((res) => res.json())
            .then((data) => (this.image = { ...data }))
            .catch((err) => console.log("Err in /get-image-by-id", err));
    },
    props: ["imageId"],
    components: { "image-comments": imageCommentsComponent },
    methods: {
        emitClose() {
            this.$emit("close");
        },
    },
    template: `
        <div>
            <div @click="emitClose" class="overlay"></div>
            <div class="image-modal">
                <div class="image-modal-content">
                    <img :src="image.url" :alt="image.description">
                    <div class="image-modal-title">
                        {{image.title}}
                    </div>
                    <div class="image-modal-text">
                        uploaded by {{image.username}} ({{image.created_at}})
                    </div>
                    <button @click="emitClose">X</button>
                </div>
                <image-comments :image-id="this.imageId"></image-comments>
            </div>
        </div>`,
};

export default imageModalComponent;
