const imageModalComponent = {
    data() {
        return {
            image: {},
        };
    },
    mounted() {
        fetch("/get-image-by-id?" + new URLSearchParams({ id: this.imageId }))
            .then((res) => res.json())
            .then((data) => (this.image = { ...data }))
            .catch((err) => console.log("Err in /get-image-by-id", err));
    },
    props: ["imageId"],
    methods: {
        emitClose() {
            this.$emit("close");
        },
    },
    template: `<div class="image-modal">
        <img :src="image.url" :alt="image.description">
        {{image.id}} | {{image.title}} | {{image.created_at}} | <span @click="emitClose">Close</span>
    </div>`,
};

export default imageModalComponent;
