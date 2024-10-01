import { existsSync, readFileSync } from 'fs';

const envConfig = () => {
  const envNow = process.env.npm_lifecycle_event || 'dev';
  const envFilePath = envNow.includes('test') || envNow.includes('cover') ? '.env.test' : '.env';

  if (existsSync(envFilePath)) {
    const fileLinesEnv = readFileSync(envFilePath, 'utf-8').trim().split('\n');

    for (const line of fileLinesEnv) {
      const delimIndx = line.indexOf('=');
      const key = line.substring(0, delimIndx);
      const value = line.substring(delimIndx + 1);
      process.env[key] = value;
    }
  }
};

export default envConfig;
