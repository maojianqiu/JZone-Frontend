import request from '@/utils/request'

export function bloglists(params) {
    return request({
      url: '/blogs/bloglist',
      method: 'get',
      params: params
    })
  }

  export function viewbloglist(params) {
    return request({
      url: '/blogs/viewbloglist',
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

  export function isLikeAdd(id) {
    return request({
      url: '/blogs/isLikeAdd/'+id,
      method: 'get',
    })
  }


  export function getViewBlogListByUserID(params) {
    return request({
      url: '/blogs/blogViewListByUserID/'+ params.id,
      method: 'get',
      params: params
    })
  }