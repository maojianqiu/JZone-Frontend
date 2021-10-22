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


  export function getViewBlogListByUserID(id) {
    return request({
      url: '/blogs/blogViewListByUserID/'+ id,
      method: 'get',
    })
  }