var mqttHelper_B = {
    subscribeTopic: {
        getSingleBcgData:function(sn){
            return 'newbcg/' + sn;
        },
        getSingleHeartData: function (sn) {
            return 'newheart/' + sn;
        },
    },
    connect: MQTTconnect
};

var reconnectTimeout = 2000;
var failTime = 0;
function MQTTconnect(option) {
    if (!option) {
        option = {};
    }
    mqtt = new Paho.MQTT.Client(
                        '122.224.242.241',
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
