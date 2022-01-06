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
    return db.query(`SELECT *, (SELECT id
                    FROM images
                    ORDER BY id ASC
                    LIMIT 1) AS "lowestId" 
                    FROM images ORDER BY id DESC LIMIT 3;`);
}

function getImageById(imageId) {
    const q = `SELECT * FROM images WHERE id = $1`;
    const params = [imageId];
    return db.query(q, params);
}

function getMoreImages(lowestId) {
    const q = `SELECT url, title, id, (SELECT id
        FROM images
        ORDER BY id ASC
        LIMIT 1) AS "lowestId" FROM images
        WHERE id < $1
        ORDER BY id DESC
        LIMIT 3;`;
    const params = [lowestId];
    return db.query(q, params);
}

function insertImage(url, username, title, description) {
    const q = `INSERT INTO images (url, username, title, description) 
        VALUES ($1, $2, $3, $4)
        RETURNING id, created_at;`;
    const params = [url, username, title, description];
    return db.query(q, params);
}

function getCommentsById(imageId) {
    const q = `SELECT * FROM comments WHERE image_id = $1`;
    const params = [imageId];
    return db.query(q, params);
}

function insertComment() {}

module.exports = {
    getImages,
    getImageById,
    getMoreImages,
    insertImage,
    getCommentsById,
    insertComment,
};
