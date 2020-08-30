# 每周总结可以写在这里

window 需要将下载下来的 `phantomjs` 的 `bin`目录放入环境变量中

### oAuth
- 去github building-oauth-app
- 拿到clientId，结合redirect_url和scope及state等 访问https://github.com/login/oauth/authorize，请求授权
- 授权成功后进入redirect_url，github会将code和state带到新的页面
- redirect_url链接会通过 code、client_id、client_secret, redirect_url及state等参数访问 https://github.com/login/oauth/access_token 拿到token