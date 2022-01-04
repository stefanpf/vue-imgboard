const express = require("express");
const { logUrl } = require("./utils/helper-functions");
const db = require("./utils/db");
const { uploader } = require("./utils/upload");
const s3 = require("./utils/s3");
const app = express();
const PORT = 8080;

if (process.env.NODE_ENV == "production") {
    app.use((req, res, next) => {
        if (req.headers["x-forwarded-proto"].startsWith("https")) {
            return next();
        }
        res.redirect(`https://${req.hostname}${req.url}`);
    });
}
app.use(logUrl);
app.use(express.static("./public"));
app.use(express.json());

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    if (req.file) {
        const newImage = {
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
            .then(() => {
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

app.get("/get-images", (req, res) => {
    db.getImages()
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log("Err in getImages:", err);
        });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(process.env.PORT || PORT, () =>
    console.log(`Imageboard server listening on port ${PORT}`)
);
