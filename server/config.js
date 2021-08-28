exports.DATABASE_URL =
    process.env.DATABASE_URL || "mongodb://localhost:27017/project-pi";
exports.PORT = process.env.PORT || 8080;
exports.SECRET = process.env.SECRET || "secret";
