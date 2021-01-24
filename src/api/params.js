import request from '@/utils/request'

export function getParams(params) {
  return request({
    url: '/vue-admin-template/visual/params',
    method: 'get',
    params
  })
}

export function getTrace(params) {
  return request({
    url: '/vue-admin-template/visual/trace',
    method: 'get',
    params
  })
}

export function getTrade(params) {
  return request({
    url: '/vue-admin-template/visual/trade',
    method: 'get',
    params
  })
}
