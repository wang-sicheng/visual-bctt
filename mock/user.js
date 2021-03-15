
const tokens = {
  regulator: {
    token: 'regulator-token'
  },
  provider: {
    token: 'provider-token'
  },
  consumer: {
    token: 'consumer-token'
  },
  banker: {
    token: 'banker-token'
  }
}

const users = {
  'regulator-token': {
    roles: ['regulator'],
    introduction: 'I am a regulator',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201402%2F11%2F20140211175446_ekur8.gif&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612792373&t=60642a69bfde67a7c800abe24f1f40fb',
    name: 'regulator-001',
    email: 'regulator@visual.com',
    address: '0x2701665e73e51963230acb830ebafc465377da18'
  },
  'provider-token': {
    roles: ['provider'],
    introduction: 'I am an provider',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdingyue.nosdn.127.net%2FqPEVpIgPSDIx5rB%3DcMK6hD0Mb4iNAhwmlaN5u3P8NoXbf1536595541941.gif&refer=http%3A%2F%2Fdingyue.nosdn.127.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614147281&t=65bd510d31c0b0b2cedfaf723c631829',
    name: 'provider-001',
    email: 'provider@visual.com',
    address: '0x73bceb1cd57c711feac4224d062b0f6ff338501e'
  },
  'consumer-token': {
    roles: ['consumer'],
    introduction: 'I am an consumer',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170922%2F8efd2dd78d7248f09944072ff0f72b83.gif&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614147264&t=fc79d996b31d1df17bb8785df7d13731',
    name: 'consumer-001',
    email: 'consumer@visual.com',
    address: '0x2701665e73e5196323a4224d062b0f6ff3384ab9'
  },
  'banker-token': {
    roles: ['banker'],
    introduction: 'I am an banker',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170922%2F8efd2dd78d7248f09944072ff0f72b83.gif&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614147264&t=fc79d996b31d1df17bb8785df7d13731',
    name: 'banker-001',
    email: 'banker@visual.com',
    address: '0x2701665e73e5348523adb1fe791b0f6ff08a7b3a'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
