let DATABASE, DB_USERNAME, DB_PASSWORD;

if (!(process.env.NODE_ENV == "production")) {
    DATABASE = require("../secrets").DATABASE;
    DB_USERNAME = require("../secrets").DB_USERNAME;
    DB_PASSWORD = require("../secrets").DB_PASSWORD;
}

const psql = require("spiced-pg");

const db = psql(
    process.env.DATABASE_URL ||
        `postgres:${DB_USERNAME}:${DB_PASSWORD}@localhost:5432/${DATABASE}`
);

console.log(`[db] connecting to: ${DATABASE}`);

function getImages() {
    return db.query("SELECT * FROM images ORDER BY created_at DESC LIMIT 10");
}

function insertImage(url, username, title, description) {
    const q = `INSERT INTO images (url, username, title, description) 
        VALUES ($1, $2, $3, $4)
        RETURNING id;`;
    const params = [url, username, title, description];
    return db.query(q, params);
}

module.exports = {
    getImages,
    insertImage,
};
