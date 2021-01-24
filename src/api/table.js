import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getAddrList(params) {
  return request({
    url: '/vue-admin-template/table/addressList',
    method: 'get',
    params
  })
}

export function getTrade(id) {
  return request({
    url: '/vue-admin-template/table/trade',
    method: 'post',
    params: { id }
  })
}

export function getAddress(id) {
  return request({
    url: '/vue-admin-template/table/address',
    method: 'post',
    params: { id }
  })
}
