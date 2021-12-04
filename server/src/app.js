import bodyParser from 'body-parser';
import Express from 'express';
import session from 'express-session';
import compression from 'compression';

import { apiRouter } from './routes/api';
import { staticRouter } from './routes/static';

const app = Express();

app.use(compression({level: 6}));

var maxTime = 86400000 * 30;
app.use(Express.static(__dirname + "/public", {maxAge: maxTime}))

app.set('trust proxy', true);

app.use(
  session({
    proxy: true,
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.raw({ limit: '10mb' }));

app.use((_req, res, next) => {
  res.header({
    'Cache-Control': 'max-age=0, no-transform',
    Connection: 'close',
  });
  return next();
});

app.use('/api/v1', apiRouter);
app.use(staticRouter);

export { app };
