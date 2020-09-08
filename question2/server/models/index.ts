import * as path from 'path';
import dbConfig, { IDbConfig } from '../config/db.config';
import mongoose from 'mongoose';
import { Seeder } from 'mongo-seeding';

export const connectDB = async () => {
    const env = process.env.NODE_ENV || 'development';
    const config: IDbConfig = dbConfig(env);
    const { server, database, seederPath = null} = config;

    try {
        await mongoose.connect(`mongodb://${server}/${database}`,
            { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        if (['development', 'test'].includes(env) && seederPath) {
            const seeder = new Seeder({
                database: { name: database },
                dropDatabase: true
            });
            const collections = seeder.readCollectionsFromPath(path.resolve(seederPath));
            console.log(`Seeding data in database ${database}`);
            await seeder.import(collections);
            console.log(`Database ${database} seeding successful`)
        }
        console.log(`Database ${database} connection successful`);
    } catch (err) {
        console.error('Database connection error', err);
        return process.exit(1);
    }
};