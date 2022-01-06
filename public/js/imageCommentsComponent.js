const imageCommentsComponent = {
    data() {
        return {
            comments: [],
            username: "",
            comment: "",
        };
    },
    mounted() {
        fetch(`/get-comments-by-id/${this.imageId}`)
            .then((res) => res.json())
            .then((data) => {
                this.comments = data;
            })
            .catch((err) => console.log("Err in /get-image-by-id", err));
    },
    props: ["imageId"],
    methods: {
        saveComment: function () {
            fetch("/new-comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image_id: this.imageId,
                    comment_text: this.comment,
                    username: this.username || "anonymous",
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    this.comments.unshift({
                        comment_text: this.comment,
                        username: this.username || "anonymous",
                        created_at: data.created_at,
                    });
                    this.username = "";
                    this.comment = "";
                })
                .catch((err) => console.log("Err in /new-comment:", err));
        },
    },
    template: `
        <div class="comment-section">
            <h3>Comments:</h3>
            <div class="comments-wrapper">
                <div v-for="comment in comments" class="comment">
                    {{comment.comment_text}} by {{comment.username}} ({{comment.created_at}})
                    <hr>
                </div>
            </div>
            <h4>Add a comment:</h4>
            <form class="comment-form">
                <input v-model="comment" type="text" name="comment" placeholder="comment" required>
                <input v-model="username" type="text" name="username" placeholder="username">
                <button @click.prevent="saveComment">Save comment</button>
            </form>
        </div>`,
};

export default imageCommentsComponent;
