import Mock from 'mockjs'

const userInfo = Mock.mock({
  'nickName': Mock.Random.first(),
  'avatar': 'http://5b0988e595225.cdn.sohucs.com/images/20170911/aa2247ad3e9345809e4bc1cb3c3f30fe.jpeg',
  'contend|1-1000': 1,
  'daily|1-10000': 1
})
const taskList = Mock.mock({
  'data|0-3': [
    {
      'taskName|+1': [
        '软件工程大作业',
        '数据库实验3',
        'OOP实验2'
      ],
      'id|1-100': 0,
      'type|1': [
        'daily',
        'multiPlayer'
      ],
      'taskNum|5-8': 0,
      'finishedTaskNum|1-6': 0,
      'finishedPlayer|0-3': 0,
      'deadLine|+1': [
        Mock.Random.date('yyyy-MM-dd H:mm'),
        Mock.Random.date('yyyy-MM-dd H:mm'),
        Mock.Random.date('yyyy-MM-dd H:mm')
      ]
    }
  ]
})
const templatesMap = {
  '/userInfo': userInfo,
  '/taskList': taskList
}

export default templatesMap
