import Mock from 'mockjs'

const userInfo = Mock.mock({
  'nickName': Mock.Random.first(),
  'avatar': 'http://5b0988e595225.cdn.sohucs.com/images/20170911/aa2247ad3e9345809e4bc1cb3c3f30fe.jpeg',
  'contend|1-1000': 1,
  'daily|1-10000': 1
})

const templatesMap = {
  '/userInfo': userInfo
}

export default templatesMap
