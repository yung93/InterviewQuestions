export interface IDbConfig {
    server: string,
    database: string,
    seederPath?: string,
}

const dbConfig = (env: string): IDbConfig => {
    switch (env) {
        case 'development':
        default:
            return {
                server: 'localhost:27017',
                database: 'question2_dev',
                seederPath: './seeders',
            };
        case 'test':
            return {
                server: 'localhost:27017',
                database: 'question2_test',
                seederPath: './server/seeders',
            };
        case 'production':
            return {
                server: 'localhost:27017',
                database: 'question2'
            };
    }
};

export default dbConfig;