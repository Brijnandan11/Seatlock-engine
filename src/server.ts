// this is the server setup 
import { app } from './app';
import { env } from './config/env';
import { logger } from './lib/logger';
import { redis } from './lib/redis';

const server = app.listen(env.PORT, () => {
  logger.info(`Server listening on port ${env.PORT} (${env.NODE_ENV})`);
});

function gracefulShutdown(signal: string) {
  logger.info(`${signal} received, shutting down gracefully`);

  server.close(async () => {
    logger.info('HTTP server closed');

    await redis.quit();
    logger.info('Redis connection closed');

    process.exit(0);
  });

  
  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10_000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));