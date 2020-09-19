import axios from 'axios'


// const config = {
//   headers: {
//     Authorization: 'Bearer ' + localStorage.getItem('token')
//   }
// }

// function auth () {
//   axios.post('token/vertify', {}, config).then(res => {
//     console.log('post请求成功：', res.data)
//     this.setState({
//       user: res.data.userName
//     });
//   },
//     err => {
//       console.log(err)
//     }
//   ).catch(() => { console.log('后台post请求处理失败') })
// }

function updateToBackEnd (url, message, method = 'post') {
  // 后台处理post请求
  if (method === 'post') {
    axios.post(url, message).then((res) => {
      console.log('post请求成功：', res.data)
    }).catch(() => { console.log('后台post请求处理失败') })
  }

  // 后台处理get请求
  else if (method === 'get') {
    axios.get(url, message,).then((res) => {
      console.log(res.data)
    }).catch(() => { console.log('后台get请求处理失败') })
  }
}

export { updateToBackEnd }


