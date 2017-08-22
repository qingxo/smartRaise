var sleepcareAPI = {
  beginReceiveData: function(sn, callback) {
    if (sn == null) {
      sn = 'all';
    }

    var topics = {
      topics: [
        mqttHelper_B.subscribeTopic.getSingleBcgData(sn), mqttHelper_B.subscribeTopic.getSingleHeartData(sn)
      ], //主题
      dealData: function(topic, data) {
        var bcg = {};
        bcg.IsError = data.IsError;
        if (data.IsError == null) {
          bcg.equipementid = data.TagSN;
          if (data.IsLeaveBed == true) {
            bcg.status = 2;
            bcg.lastedleavebedtime = data.LastedLeaveTime;
          } else {
            bcg.status = 1;
          }
          bcg.hr = data.HR;
          bcg.rr = data.RR;
          bcg.mv = data.MV;
          bcg.lastMsgTime = data.LastMsgTime
          bcg.bodyposture = data.BodyPosture;
        } else {
          bcg.equipementid = data.TagSN;
          bcg.status = 3;
        }
        callback(bcg);
      }
    };
    mqttHelper_B.connect(topics);

  }
};
