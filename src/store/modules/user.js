import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    address: '',
    email: '',
    private_key: '',
    public_key: '',
    account_address: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ADDRESS: (state, address) => {
    state.address = address
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_PRIVATE_KEY: (state, private_key) => {
    state.private_key = private_key
  },
  SET_PUBILC_KEY: (state, public_key) => {
    state.public_key = public_key
  },
  SET_ACCOUNT_ADDRESS: (state, account_address) => {
    state.account_address = account_address
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, address, email } = data

        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_ROLES', roles)
        commit('SET_ADDRESS', address)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_EMAIL', email)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户注册
  register({ commit }, registerInfo) {
    const { private_key, public_key, account_address } = registerInfo
    // console.log('private_key', private_key)
    // console.log('public_key', public_key)
    // console.log('account_address', account_address)
    return new Promise(resolve => {
      commit('SET_PRIVATE_KEY', private_key)
      commit('SET_PUBILC_KEY', public_key)
      commit('SET_ACCOUNT_ADDRESS', account_address)
      resolve()
    })
  },

  // 登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // 必须先删除token
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // 必须先删除token
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

