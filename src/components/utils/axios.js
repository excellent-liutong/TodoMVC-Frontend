import axios from 'axios'


const storage = window.localStorage;
let token = storage.getItem('token')
const headers = {
  'authorization': 'Bearer ' + token
}
console.log(headers)

const config = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
}


function updateToBackEnd (url, message, method = 'post') {

  // 验证token
  axios.post('token/vertify', {}, config).then((res) => {
    console.log(res.data)
  }).catch(() => { console.log('验证失败') })

  // 后台处理post请求
  if (method === 'post') {
    axios.post(url, message, config).then((res) => {
      console.log(res.data)
    }).catch(() => { console.log('后台post请求处理失败') })
  }

  // 后台处理get请求
  else if (method === 'get') {
    axios.get(url, message, config).then((res) => {
      console.log(res.data)
    }).catch(() => { console.log('后台get请求处理失败') })
  }
}

export { updateToBackEnd }


