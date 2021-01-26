import request from '@/utils/request'

/**
 *
 * 获取各种表格类信息
 */
export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

// 地址所含交易信息
export function getAddrList(data) {
  return request({
    url: '/vue-admin-template/table/addressList',
    method: 'post',
    params: { data }
  })
}

// 交易相关信息
export function getTrade(id) {
  return request({
    url: '/vue-admin-template/table/trade',
    method: 'post',
    id
  })
}

// 地址信息
export function getAddress(id) {
  return request({
    url: '/vue-admin-template/table/address',
    method: 'post',
    id
  })
}

// 区块信息
export function getBlock(id) {
  return request({
    url: '/vue-admin-template/block/block',
    method: 'post',
    id
  })
}

// 区块所含交易信息
export function getBlockList(data) {
  return request({
    url: '/vue-admin-template/block/list',
    method: 'post',
    params: { data }
  })
}
