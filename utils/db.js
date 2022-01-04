const { DATABASE, DB_USERNAME, DB_PASSWORD } = require("../secrets");
const psql = require("spiced-pg");
const db = psql(
    `postgres:${DB_USERNAME}:${DB_PASSWORD}@localhost:5432/${DATABASE}`
);

console.log(`[db] connecting to: ${DATABASE}`);

function getImages() {
    return db.query(
        "SELECT url, title, description FROM images ORDER BY created_at DESC LIMIT 10"
    );
}

module.exports = {
    getImages,
};
