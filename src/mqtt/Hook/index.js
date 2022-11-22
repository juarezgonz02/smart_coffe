import React, { createContext, useEffect, useState } from 'react';
import mqtt from 'mqtt';

export const QosOption = createContext([])

const qosOption = [
  {
    label: '0',
    value: 0,
  }, {
    label: '1',
    value: 1,
  }, {
    label: '2',
    value: 2,
  },
];

class HookMqtt {
  
  constructor({client, isSubed, payload, connectStatus, setConnectStatus, setIsSub, setClient, setPayload}){
    this.client = client
    this.isSubed = isSubed
    this.payload = payload
    this.connectStatus = connectStatus

    this.setConnectStatus = setConnectStatus
    this.setClient = setClient
    this.setIsSub = setIsSub
    this.setPayload = setPayload
  }

  mqttConnect = (host, mqttOption) => {
    this.setConnectStatus('Connecting');
    this.setClient(mqtt.connect(host, mqttOption));
  };

  mqttDisconnect = () => {
    if (this.client) {
      this.client.end(() => {
        this.setConnectStatus('Connect');
      });
    }
  }

  mqttPublish = (context) => {
    if (this.client) {
      const { topic, qos, payload } = context;
      this.client.publish(topic, payload, { qos }, error => {
        if (error) {
          console.log('Publish error: ', error);
        }
      });
    }
  }

  mqttSub = (subscription) => {
    if (this.client) {
      const { topic, qos } = subscription;
      this.client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        this.setIsSub(true)
      });
    }
  };

  mqttUnSub = (subscription) => {
    if (this.client) {
      const { topic } = subscription;
      this.client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
        this.setIsSub(false);
      });
    }
  };

}

export default HookMqtt;
