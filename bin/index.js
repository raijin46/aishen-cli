#! /usr/bin/env node
import App from '../src/interfaces/app.js';
import Message from '../src/interfaces/message.js';
import dotenv from 'dotenv';

dotenv.config();
Message.system( 'Initializing interface...' );
const app = new App();
app.setup()
  .then( () => Message.system( 'App is done setting up!' ) )
  .catch( e => Message.system( `Error occured.\n${ e }`, 'red' ) );