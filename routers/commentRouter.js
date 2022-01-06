const express = require("express");
const commentRouter = express.Router();
const moment = require("moment");
const db = require("../utils/db");

commentRouter.get("/get-comments-by-id/:id", (req, res) => {
    db.getCommentsById(req.params.id)
        .then(({ rows }) => {
            for (let row of rows) {
                row.created_at = moment(new Date(row.created_at)).fromNow();
            }
            res.json(rows);
        })
        .catch((err) => console.log("Err in getCommentsById:", err));
});

commentRouter.post("/new-comment", (req, res) => {
    const { image_id, comment_text, username } = { ...req.body };
    db.insertComment(image_id, comment_text, username)
        .then(({ rows }) =>
            res.json({
                created_at: moment(new Date(rows[0].created_at)).fromNow(),
            })
        )
        .catch((err) => console.log("Err in insertComment:", err));
});

module.exports = commentRouter;
