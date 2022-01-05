const express = require("express");
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
                    created_at: rows[0].created_at,
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
            res.json(rows);
        })
        .catch((err) => {
            console.log("Err in getImages:", err);
        });
});

imageRouter.get("/get-image-by-id", (req, res) => {
    db.getImageById(parseInt(req.query.id))
        .then(({ rows }) => {
            res.json(rows[0]);
        })
        .catch((err) => console.log("Err in getImageById:", err));
});

module.exports = imageRouter;
