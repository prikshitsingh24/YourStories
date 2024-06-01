// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      MODEL_API_KEY: string;
      MONGO_DB_URL: string;
    }
  }
  