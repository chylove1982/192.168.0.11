import WebHost from 'nm-module-admin'
import config from './config'
import IDCard from './index'

// 注入模块
WebHost.addModule(IDCard)

// 启动
WebHost.start(config)
