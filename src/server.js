import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import config from './server.config';
import schema from './graphql/schema'

console.log(`${new Date} - Iniciando servidor...`);
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.use('/graphql', graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

mongoose.connect(config.DATABASE.MONGODB_STRING_CONNECTION).then(() => {
    console.log(`${new Date} - MongoDB conectado...`);
    app.listen(config.SERVER.PORT, () => {
        console.log(`${new Date} - Corriendo servidor en http://localhost:${config.SERVER.PORT}`);
    });
}).catch(error => {
    console.error(error);
});
