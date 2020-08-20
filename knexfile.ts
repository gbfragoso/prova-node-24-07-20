import path from 'path';

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'model', 'database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'model', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'model', 'seeds')
    },
    useNullAsDefault: true
};