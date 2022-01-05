const imageModalComponent = {
    mounted() {
        console.log("logging imageId from the component:", this.imageId);
        fetch("/get-image-by-id?" + new URLSearchParams({ id: this.imageId }))
            .then((res) => res.json())
            .then(console.log);
    },
    props: ["imageId"],
    template: `<div>
        <h1>This is the Modal</h1>
    </div>`,
};

export default imageModalComponent;
