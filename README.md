# 待办事项清单 V2.0
1. 主要功能：
   1. 用户可注册、登录账号，修改账号密码
   2. 用户可增加、编辑、删除、标记完成待办事项，一键删除已完成事项
   3. 用户再次登录可同步已有数据
2. 主要技术栈：
   1. 项目使用`React.js`框架搭建前端
   2. 使用基于`Node.js`的`Express`框架搭建服务端
   3. 使用`MySQL`存储数据库
   4. 使用`Sequelize`作为ORM操作数据库
   5. 使用`JWT`作为登录令牌
   6. 使用`PM2`运维服务端
3. 存在的问题
   1. Tokens和跨域
   2. Button内必须点击文字才能添加
   3. 密码长度限制、字符限制
   4. React Router里的push解决方案，解决Link的点击
   5. 输入防抖
   6. 多端适配
4. 改进的地方
   1. 使用SCSS
   2. 使用React hook 和redux
   3. 自动化部署，自动化部署，如CICD，github action或Gitlab runner
   4. 服务端打包，部署脚本
   5. SSR
5. 增加功能点
   1. 修改用户名功能
   2. 手机或邮箱验证功能
   3. Todo 可以换行
   4. 数据埋点


# 待办事项清单 V1.0
1. 使用`React.js`框架搭建，使用`Ant Design`配置UI界面
2. 基于`component state`管理数据
3. 使用`local stoarge`在本地持久存储数据
4. 点击【完成】按钮会有简单动画效果