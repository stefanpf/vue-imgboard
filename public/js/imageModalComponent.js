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
    template: `
        <div>
            <div class="overlay">
            <div class="image-modal">
                <div class="image-modal-content">
                    <img :src="image.url" :alt="image.description">
                    <div class="image-modal-text">
                        {{image.id}} | {{image.title}} | uploaded by {{image.username}} on {{image.created_at}}
                    </div>
                    <button @click="emitClose">Close</button>
                </div>
            </div>
        </div>`,
};

export default imageModalComponent;
