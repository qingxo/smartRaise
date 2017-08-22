var mqttHelper = {
    subscribeTopic: {
        bcgData: 'smartCare/t600BcgData',
        getSingleBcgData:function(sn){
            return this.bcgData + '/' + sn;
        },
        leaveBedData: 'smartCare/t600LeaveBedData',
        getSingleLeaveBedData: function (sn) {
            return this.leaveBedData + '/' + sn;
        },
        cmdData: 'smartCare/t600CmdData',
        getSingleCmdData: function (sn) {
            return this.cmdData + '/' + sn;
        },
        alarmData: 'smartCare/t600AlarmData',
        getSingleAlarmData: function (sn) {
            return this.alarmData + '/' + sn;
        }
    },
    publishTopic: {
        cmdData: 'smartCare/CmdAsk'
    },
    connect: MQTTconnect,
    publish: function (topic, data) {
        mqtt.send(topic, data, 0, false);
    },
    subscribe: function (topic) {
        mqtt.subscribe(topic, { qos: 0 });
    },
    listen: function (sn, type, cb) {
      return this.listener.push({
        sn: sn,
        type: type,
        cb: cb
      });
    },
    listener: [],
    unlisten: function () {
      this.listener = []
    }
};

var reconnectTimeout = 2000;
var failTime = 0;
function MQTTconnect(option) {
    if (!option) {
        option = {};
    }
    mqtt = new Paho.MQTT.Client(
                        '120.26.9.196',
                        1884,
                        "web_" + parseInt(Math.random() * 100,
                        10));
    var options = {
        timeout: 3,
        useSSL: false,
        cleanSession: true,
        onSuccess: function () {
            onConnect(option.topics)
        },
        onFailure: function (message) {
            failTime++;
            console.log(message.errorMessage);
            if (failTime < 3) {
                setTimeout(MQTTconnect, reconnectTimeout);
            }
        }
    };

    mqtt.onConnectionLost = onConnectionLost;
    mqtt.onMessageArrived = function (message) {
        pushState(message)
        onMessageArrived(message, option.dealData)
    };
    mqtt.connect(options);
}

function onConnect(topics) {
    if (topics && topics.length > 0) {
        for (var i = 0; i < topics.length; i++) {
            mqtt.subscribe(topics[i], { qos: 0 });
        }
    }
}

function onConnectionLost(response) {
    setTimeout(MQTTconnect, reconnectTimeout);
};

function onMessageArrived(message, dealData) {
    var topic = message.destinationName;
    var payload = message.payloadString;
    var data = eval("(" + payload + ")");
    if (dealData) {
        dealData(topic, data);
    }
};

function pushState(message) {

  // 监听列表为空不做处理
  if (!mqttHelper.listener.length) return

  var fullType = message.destinationName;
  var payload = JSON.parse(message.payloadString);
  var SN = payload.Data.SN;

  // 处理监听，执行回调方法
  mqttHelper.listener.forEach(function (listener, i) {
    if (fullType.indexOf(listener.type) > -1) {
      if (listener.sn === SN) {
        mqttHelper.listener[i].cb(payload);
      }
    }
  })
}
