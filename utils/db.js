import mongodb from 'mongodb';
// eslint-disable-next-line no-unused-vars
import Collection from 'mongodb/lib/collection';
import envConfig from './env_config';

class DBClient {
  constructor() {
    envConfig();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${dbName}`;

    this.instClient = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.instClient.connect();
  }

  isAlive() {
    return this.instClient.isConnected()
  }

  async nbUsers() {
    return this.instClient.db().collection('users').countDocuments();
  }

  async nbFiles() {
    return this.instClient.db().collection('files').countDocuments();
  }

  async usersCollection() {
    return this.instClient.db().collection('users');
  }

  async filesCollection() {
    return this.instClient.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
