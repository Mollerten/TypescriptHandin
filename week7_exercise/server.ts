import * as mongoose from 'mongoose';

const DB = process.env.DATABASE_DEV!.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD!,
);

mongoose.connect(DB, {
}).then(() => console.log('DB connection successful!'));