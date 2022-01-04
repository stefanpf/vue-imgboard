const { DATABASE, DB_USERNAME, DB_PASSWORD } = require("../secrets");
const psql = require("spiced-pg");
const db = psql(
    `postgres:${DB_USERNAME}:${DB_PASSWORD}@localhost:5432/${DATABASE}`
);

console.log(`[db] connecting to: ${DATABASE}`);

function getImages() {
    return db.query(
        "SELECT url, username, title, description FROM images ORDER BY created_at DESC LIMIT 10"
    );
}

function insertImage(url, username, title, description) {
    const q = `INSERT INTO images (url, username, title, description) 
        VALUES ($1, $2, $3, $4);`;
    const params = [url, username, title, description];
    return db.query(q, params);
}

module.exports = {
    getImages,
    insertImage,
};
