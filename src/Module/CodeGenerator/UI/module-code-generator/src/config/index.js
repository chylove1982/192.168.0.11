const isDev = process.env.NODE_ENV !== 'production'

const config = {
  baseUrl: 'http://49.235.222.38:6220/api/'
}

// 开发模式
if (isDev) {
  config.baseUrl = 'http://49.235.222.38:6220/api/'
}
export default config
