import request from '@/utils/request'

export function bloglists(params) {
    return request({
      url: '/blogs/bloglist',
      method: 'get',
      params: params
    })
  }


  export function getBlogInfo(id) {
    return request({
      url: '/blogs/bloginfo/'+ id,
      method: 'get',
    })
  }