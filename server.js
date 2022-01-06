const express = require("express");
const { logUrl } = require("./utils/helper-functions");
const imageRouter = require("./routers/imageRouter");
const commentRouter = require("./routers/commentRouter");
const app = express();
const PORT = 8080;

// MIDDLEWARE
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

// ROUTES
app.use(imageRouter);
app.use(commentRouter);
app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(process.env.PORT || PORT, () =>
    console.log(`Imageboard server listening on port ${PORT}`)
);
