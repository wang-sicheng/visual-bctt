
const tokens = {
  regulator: {
    token: 'regulator-token'
  },
  provider: {
    token: 'provider-token'
  },
  consumer: {
    token: 'consumer-token'
  }
}

const users = {
  'regulator-token': {
    roles: ['regulator'],
    introduction: 'I am a regulator',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201402%2F11%2F20140211175446_ekur8.gif&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612792373&t=60642a69bfde67a7c800abe24f1f40fb',
    name: 'regulator123',
    email: 'regulator@visual.com',
    address: '0x2701665e73e51963230acb830ebafc465377da18'
  },
  'provider-token': {
    roles: ['provider'],
    introduction: 'I am an provider',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170118%2F6a9b553205b149999e728c580e633ae9_th.gif&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612880293&t=2a3323a0c5f303a7860f23a304ab2b99',
    name: 'provider123',
    email: 'provider@visual.com',
    address: '0x73bceb1cd57c711feac4224d062b0f6ff338501e'
  },
  'consumer-token': {
    roles: ['consumer'],
    introduction: 'I am an consumer',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170922%2F8efd2dd78d7248f09944072ff0f72b83.gif&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614147264&t=fc79d996b31d1df17bb8785df7d13731',
    name: 'consumer123',
    email: 'consumer@visual.com',
    address: '0x2701665e73e5196323a4224d062b0f6ff3384ab9'
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
