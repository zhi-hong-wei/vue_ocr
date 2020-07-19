import {request} from './request'

export function ocr_common(action) {
  return request({
    url:'/apidebug_imagequery',
    data: {
      action
    },
    method: 'post',
  })
}


