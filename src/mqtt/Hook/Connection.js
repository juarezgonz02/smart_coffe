import React from 'react';

class Connection{
  constructor(connect, disconnect){
      this.connect = connect
      this.disconnect = disconnect
  } 

  record = {
    host: 'broker.emqx.io',
    clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
    port: 8083,
  };
   connectToClient = () => {
    const url = 'mqtt://io.adafruit.com:443';
    const options = {
      // Clean session
      clean: true,
      connectTimeout: 4000,
      // Auth
      clientId: `mqttjs_+${Math.random().toString(16).substr(2, 8)}`,
      username: 'Juarez00',
      password: 'aio_OUqh91BGVENrRRHKCHlOcPJTLYVj',
    }
    this.connect(url, options);
  };

  handleDisconnect = () => {
    this.disconnect();
  };


}

export default Connection;
