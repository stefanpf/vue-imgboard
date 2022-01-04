const express = require("express");
const { logUrl } = require("./utils/helper-functions");
const db = require("./utils/db");
const { uploader } = require("./utils/upload");
const app = express();
const PORT = 8080;

app.use(logUrl);
app.use(express.static("./public"));
app.use(express.json());

app.post("/upload", uploader.single("file"), (req, res) => {
    if (req.file) {
        res.json({ success: true });
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
            console.log("Err in getImageUrls:", err);
        });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(PORT, () =>
    console.log(`Imageboard server listening on port ${PORT}`)
);
