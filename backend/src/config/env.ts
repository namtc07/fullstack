import "dotenv/config";

const requiredEnv = ["MONGO_URI", "JWT_SECRET"] as const;

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  mongoUri: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  port: Number(process.env.PORT) || 8080,
};
