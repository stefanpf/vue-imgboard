const express = require("express");
const moment = require("moment");
const imageRouter = express.Router();
const db = require("../utils/db");
const { uploader } = require("../utils/upload");
const s3 = require("../utils/s3");

imageRouter.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    if (req.file) {
        let newImage = {
            url: `https://spimgboardeu.s3.eu-central-1.amazonaws.com/${req.file.filename}`,
            username: req.body.username,
            title: req.body.title,
            description: req.body.description,
        };
        db.insertImage(
            newImage.url,
            newImage.username,
            newImage.title,
            newImage.description
        )
            .then(({ rows }) => {
                newImage = {
                    ...newImage,
                    id: rows[0].id,
                    created_at: moment(new Date(rows[0].created_at)).fromNow(),
                };
                res.json({ success: true, newImage });
            })
            .catch((err) => {
                console.log("Err in insertImage:", err);
                res.json({ success: false });
            });
    } else {
        res.json({ success: false });
    }
});

imageRouter.get("/get-images", (req, res) => {
    db.getImages()
        .then(({ rows }) => {
            for (let row of rows) {
                row.created_at = moment(new Date(row.created_at)).fromNow();
            }
            res.json(rows);
        })
        .catch((err) => {
            console.log("Err in getImages:", err);
        });
});

imageRouter.get("/get-more-images", (req, res) => {
    db.getMoreImages(parseInt(req.query.id))
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => console.log("Err in getMoreImages:", err));
});

imageRouter.get("/get-image-by-id/:id", (req, res) => {
    db.getImageById(req.params.id)
        .then(({ rows }) => {
            rows[0].created_at = moment(new Date(rows[0].created_at)).fromNow();
            res.json(rows[0]);
        })
        .catch((err) => console.log("Err in getImageById:", err));
});

module.exports = imageRouter;
