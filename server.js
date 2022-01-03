const express = require("express");
const { logUrl } = require("./utils/helper-functions");
const db = require("./utils/db");
const app = express();

app.use(logUrl);
app.use(express.static("./public"));
app.use(express.json());

app.get("/get-image-urls", (req, res) => {
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

app.listen(8080, () => console.log(`I'm listening.`));
