import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';

const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api', router);

export default app;