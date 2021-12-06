import chalk from 'chalk';

export default class Message {
  constructor( user, message ) {
    this.user = user;
    this.message = message;
    this.snowflake = Date.now();
  };

  log( senderColor = 'red', messageColor = 'white' ) {
    console.log( chalk[ senderColor ]( `<${ this.user.name }>: ` ), chalk[ messageColor ]( this.message ) );
  }

  static system( message, color = 'green' ) {
    return new Message( { name: 'System' }, message ).log( color );
  }
  static chalk = chalk;
}