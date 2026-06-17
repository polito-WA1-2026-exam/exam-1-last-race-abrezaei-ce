// imports
import express from "express";

import corsConfig from './config/corsConfig.js';
import passportConfig from './config/passportConfig.js';
import sessionConfig from './config/sessionConfig.js';

import router from './router/index.js';

import ecxeptionHandler from './middlewares/ecxeptionHandler.js';

// init express
const app = express();
const port = 3001;

app.use(corsConfig);
app.use(sessionConfig);
app.use(passportConfig.authenticate('session'));

app.use(express.json());

app.use('/api', router);

app.use(ecxeptionHandler);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});