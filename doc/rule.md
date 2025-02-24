因为 mock 原理大致是直接在浏览器运行代码中拦截重写 XMLHttpRequest 类实现的，而 vite 服务器 proxy 是服务器级别的；mock 先被执行
mockProdServer.ts 在测试生产环境断网的时候使用，开发环境不使用，开发环境定义了 VITE_USE_MOCK 之后，就能使用

console.log(Mock.Random.province())
生成省：@mock=@province()
生成市：@mock=@city()
生成县：@mock=@county()
生成 url：@mock=@url()
生成姓名：@mock=@cname()
生成汉字：@mock=@cword(2,5)
生成句子：@mock=@csentence(2,5)生成段落：@mock=@cparagraph(3)
生成图片：@mock=@img(100x100)
生成颜色：@mock=@imgcolor()
生成日期：@mock=@date(yy-mm-dd)
生成时间：@mock=@time(hh-mm-ss)
生成自增：@mock=@increment(1)
生成自然数：@mock=@natural(1,100)
生成整数：@mock=@integer(1,100)
生成小数：@mock=@float(1,100,2,3)
