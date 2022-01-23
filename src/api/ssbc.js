import request from '@/utils/request-ssbc'

/*
*这里的api与ssbcV2 client gin框架的后台服务一一对应
* */

export function getBlockChain() {
  return request({
    url: '/getBlockChain',
    method: 'get'
  })
}

export function getBlock() {
  return request({
    url: '/getBlock',
    method: 'get'
  })
}

export function getOneBlockTrans() {
  return request({
    url: '/getOneBlockTrans',
    method: 'get'
  })
}

export function postTran(data) {
  return request({
    url: '/postTran',
    method: 'post',
    data: data
  })
}

export function getAllTrans() {
  return request({
    url: '/getAllTrans',
    method: 'get'
  })
}

export function getAllAccounts() {
  return request({
    url: '/getAllAccounts',
    method: 'get'
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

