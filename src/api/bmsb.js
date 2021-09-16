import request from '@/utils/request'

export function bloglist(params) {
    return request({
      url: '/bmsblog/bloglist',
      method: 'get',
      params: params
    })
  }


  export function createBlog(data) {
    return request({
      url: '/bmsblog/blogadd',
      method: 'post',
      data: data
    })
  }

  export function updateBlog(data) {
    return request({
      url: '/bmsblog/blogupdate',
      method: 'post',
      data: data
    })
  }

  export function getBlogInfo(id) {
    return request({
      url: '/bmsblog/bloginfo/'+ id,
      method: 'get',
    })
  }


// -------------------------


  export function classList(params) {
    return request({
      url: '/bmsclassify/classifylist',
      method: 'get',
      params: params
    })
  }
  
  export function classInfoOfBlog(blogId) {
    return request({
      url: '/bmsclassify/classifyInfo/'+blogId,
      method: 'get',
    })
  }


  export function createClassify(data) {
    return request({
      url: '/bmsclassify/classifyadd',
      method: 'post',
      data: data
    })
  }
  
  export function updateClassify(data) {
    return request({
      url: '/bmsclassify/classifyupdate',
      method: 'post',
      data: data
    })
  }
  
  export function deleteClassify(params) {
    return request({
      url: '/bmsclassify/classifydel',
      method: 'post',
      data:params,
    })
  }