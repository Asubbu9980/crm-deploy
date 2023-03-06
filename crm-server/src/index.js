global._root = __dirname;
const dotenv = require('dotenv').config('../.env');
const app = require('./express')();
const db = require('./db');

const PORT = process.env.PORT;
if (!process.env.PORT) {
    process.exit(1);
}

app.listen(PORT, async() => {
    const dbStatus = await db();
    console.log(`SERVER RUNNING ON PORT - ${PORT}`);
    console.log(dbStatus);
});

