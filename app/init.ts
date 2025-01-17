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
import passport from 'passport';
import {
  passportGoogleAuth,
  passportEmailAndPasswordAuth,
} from './utils/passport';
import { handleGoogleAuth2 } from './libs/authentication/Oauth2';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';
import { generateOTP, verifyOTP } from './utils/encoding';
import { SendGmail } from './libs/mailService/SendGmail';

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

const SetUpAuthentication = async () => {
  const redisClient = createClient({
    socket: {
      host: 'redis',
      port: 6379,
    },
  });

  redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
  });

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'myapp:',
  });

  app.use(
    session({
      store: redisStore,
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    console.log('Serializing User:', user);
    done(null, user);
  });
  passport.deserializeUser((user, done) => done(null, user));
  passportGoogleAuth(handleGoogleAuth2);
  passportEmailAndPasswordAuth();

  await redisClient.connect();
  SetUpRoutes();
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
  app.use(
    cors({
      origin: ['http://localhost:5000', 'http://localhost:5173'],
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  SetupDatabase();
  SetUpAuthentication();
  SetUpSwagger();
  SetupMorgan();
  // SendGmail({to:"kavyanshy66@gmail.com",text:"sdassd",html:"<div>anme</div>",subject:"top"})

  app.get('/', (req, res) => {
    console.log(req.session.cookie);

    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.send('not authenticated');
    }
  });
};

export default InitApp;
