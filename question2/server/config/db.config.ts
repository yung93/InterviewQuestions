const dbConfig = {
    development: {
        server: 'localhost:27017',
        database: 'question2_dev',
        seeding: true,
    },
    test: {
        server: 'localhost:27017',
        database: 'question2_test',
        seeding: true,
    },
    production: {
        server: 'localhost:27017',
        database: 'question2',
    }
};

export default dbConfig;