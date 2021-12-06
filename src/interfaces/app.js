import readline from 'readline';
import Discord from 'discord.js';
import Message from './message.js';

export default class App {
  constructor () {
    this.commands = new Map();
    this.readline = readline.createInterface({ input: process.stdin, output: process.stdout });
    this.client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });
  }
  async setup() {
    const args = process.argv.slice( 2 );
    await this.login( process.env.TOKEN || args[ 0 ] || '' )
      .then( () => Message.system( `Successfully logged in as ${ this.client.user.tag }` ))
      .catch( async e => {
        Message.system( String( e ), 'red' );
        await this.login();
      });
  }

  async login( token = '' ) {
    if ( App.discordTokenRegex.exec( token ) != null ) {
      return this.client.login( token )
        .catch( async e => {
          Message.system( String( e ), 'red');
          await this.login();
        });
    }
    token = await this.ask( Message.chalk.yellow( '> Please provide a valid discord token: ') );
    if ( token.toLowerCase() == 'aishen quit' ) process.exit(); 
    this.client.login( token )
      .catch( async e => {
        Message.system( String( e ), 'red');
        await this.login();
      });
  }

  ask( question ) {
    return new Promise( resolve => {
      this.readline.question( question, input => resolve( input ) );
    });
  }

  static discordTokenRegex = /[MN][A-Za-z\d]{23}\.[\w-]{6}\.[\w-]{27}/g;
}