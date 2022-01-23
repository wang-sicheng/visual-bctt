import request from '@/utils/request-ssbc'

/*
*这里的api与ssbcV2 client gin框架的后台服务一一对应
* */

export function postTran(data) {
  return request({
    url: '/postTran',
    method: 'post',
    data: data
  })
}

export function registerAccount() {
  return request({
    url: '/registerAccount',
    method: 'get'
  })
}

export function postContract(data) {
  return request({
    url: '/postContract',
    method: 'post',
    data: data
  })
}

export function query(data) {
  return request({
    url: '/query',
    method: 'post',
    data: data
  })
}

export function postCrossTran(data) {
  return request({
    url: '/postCrossTran',
    method: 'post',
    data: data
  })
}

