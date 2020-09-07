import path from 'path';
import dbConfig from '../config/db.config';
import mongoose from 'mongoose';
import { Seeder } from 'mongo-seeding';

export const connectDB = async () => {
    const env = process.env.NODE_ENV || 'development';
    const { server, database, seeding = false } = dbConfig[env];

    try {
        await mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true, useUnifiedTopology: true });
        if (['development', 'test'].includes(env) && seeding) {
            const seeder = new Seeder({
                database: { name: database },
                dropDatabase: true
            });
            const collections = seeder.readCollectionsFromPath(path.resolve('./seeders'));
            console.log(`Seeding data in database ${database}`);
            await seeder.import(collections);
            console.log(`Database ${database} seeding successful`)
        }
        return console.log(`Database ${database} connection successful`);
    } catch (err) {
        console.error('Database connection error', err);
        return process.exit(1);
    }
};