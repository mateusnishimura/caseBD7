const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

module.exports = {
    async insert(hash, address) {
        try {
            const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });

            await db.run(`CREATE TABLE IF NOT EXISTS tabela(hash TEXT, address TEXT)`);

            await db.run('INSERT INTO tabela(hash, address) VALUES (?,?)', [hash, address]);

            const rows = await db.all('SELECT * FROM tabela');
            console.log(rows);

            await db.close();
        } catch (error) {
            console.log(error);
        }
    },

    async delete(hash, address) {
        try {
            const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });

            await db.run(`DELETE FROM tabela WHERE hash=(?) AND address=(?)`, [hash, address]);

            const rows = await db.all('SELECT * FROM tabela');
            console.log(rows);

            await db.close();
        } catch (error) {
            console.log(error);
        }
    }
}
