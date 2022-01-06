const express = require("express");
const commentRouter = express.Router();
const db = require("../utils/db");

commentRouter.get("/get-comments-by-id/:id", (req, res) => {
    db.getCommentsById(req.params.id)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => console.log("Err in getCommentsById:", err));
});

module.exports = commentRouter;
