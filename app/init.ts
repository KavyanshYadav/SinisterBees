import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import logger from '../app/utils/logger';
import config from '../app/config/config';
import WebRouter from '../app/controllers/web/WebRouter';
import { app } from '../src/Backend';
import ApiRouter from './controllers/api';
import cors from 'cors';
import path from 'path';
import express from 'express';
import sequelize from './db/index';
import AuthRouter from './controllers/auth';

const SetupMorgan = () => {
  app.use(
    morgan('combined', {
      stream: {
        write: (message) => {
          logger.info(message.trim());
        },
      },
    }),
  );
};
const SyncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database Synced');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
};

const SetUpRoutes = () => {
  const viteDistPath = path.join(
    'app',
    'controllers',
    'web',
    'SinisterBeesFrontend',
    'dist',
  );
  console.log(viteDistPath);
  app.use('/web', express.static(viteDistPath));

  app.use('/web', WebRouter);
  app.use('/api', ApiRouter);
  app.use('/auth', AuthRouter);
};

const SetUpSwagger = () => {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.1',
      info: {
        title: 'User API',
        version: '1.0.0',
        description: 'API to retrieve user information.',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./src/routes/*.js'],
  };

  const swaggerDocs = swaggerJsdoc(swaggerOptions);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

const SetupDatabase = async () => {
  await sequelize.authenticate();
  logger.info('Connection to database has been established successfully.');
  const result = await sequelize.query('SELECT NOW();');
  logger.info('Database Time:', result[0]);
  SyncDatabase();
};

const InitApp = () => {
  logger.info(console.log(config));
  app.use(cors());

  SetupDatabase();
  SetUpRoutes();
  SetUpSwagger();
  SetupMorgan();
};

export default InitApp;
