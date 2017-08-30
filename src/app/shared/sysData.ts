const SysData = {
  qiniuDomain: 'http://oivkcwaj2.bkt.clouddn.com',
  missionType: [
    '一次性任务', '周期性任务'
  ],
  reportDomain: 'http://116.62.29.103',
  healthReportDomain: 'http://mhc.smartcare.org.cn',
  // healthReportDomain: "http://xukq1.dev.317hu.com",
  level_top_array: [
    '平台管理', '健康管理', '统计报表', '设置'
  ],
  level_sec_array: [
    [
      '客户管理', '服务包管理', '订单管理', '健康服务专员管理'
    ],
    [
      '我的任务', '异常提醒', '体征管理', '睡眠管理'
    ],
    ['账号管理', '机构管理', '权限管理', '意见反馈', '同步数据']
  ],
  clientBtn: [
    {
      'key': '新增客户',
      'value': false
    }, {
      'key': '编辑客户',
      'value': false
    }, {
      'key': '删除客户',
      'value': false
    }, {
      'key': '客户详情',
      'value': false
    }, {
      'key': '安排专员',
      'value': false
    }, {
      'key': '绑定设备',
      'value': false
    }, {
      'key': '订购服务包',
      'value': false
    }
  ],
  servicePackageBtn: [
    {
      'key': '新增服务包',
      'value': false
    }, {
      'key': '编辑服务包',
      'value': false
    }, {
      'key': '上/下架',
      'value': false
    }, {
      'key': '服务包详情',
      'value': false
    }
  ],
  orderBtn: [
    {
      'key': '启动/停止',
      'value': false
    }, {
      'key': '退订',
      'value': false
    }, {
      'key': '详情',
      'value': false
    }
  ],
  accountsBtn: [
    {
      'key': '新增账号',
      'value': false
    }, {
      'key': '编辑账号',
      'value': false
    }, {
      'key': '删除账号',
      'value': false
    }
  ],
  waiterBtn: [
    {
      'key': '新增',
      'value': false
    }, {
      'key': '编辑',
      'value': false
    }, {
      'key': '删除',
      'value': false
    }, {
      'key': '设为默认专员',
      'value': false
    }
  ],
  myTaskBtn: [
    {
      'key': '处理',
      'value': false
    }, {
      'key': '完成',
      'value': false
    }
  ],
  errorBtn: [
    {
      'key': '处理',
      'value': false
    }
  ],
  sleepBtn: [
    { 'key': '绑定设备', 'value': false },
    { 'key': '睡眠监测', 'value': false },
    { 'key': '365睡眠评估', 'value': false }
  ]
};

export default SysData;
