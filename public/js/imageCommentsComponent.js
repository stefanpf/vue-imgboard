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
            console.log("save a comment");
        },
    },
    template: `
        <div>
            <form class="comment-form">
                <input v-model="comment" type="text" name="comment" placeholder="comment">
                <input v-model="username" type="text" name="username" placeholder="username">
                <button @click.prevent="saveComment">Save Comment</button>
            </form>
            <div class="comments-wrapper">
                <div v-for="comment in comments" class="comment">
                    {{comment.comment_text}} by {{comment.username}} at {{comment.created_at}}
                </div>
            </div>
        </div>`,
};

export default imageCommentsComponent;
