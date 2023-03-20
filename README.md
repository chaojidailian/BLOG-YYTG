# my-app

## Project setup

```
npm install
npm run serve
```

## 说明

### 第一道题

已完成：

- 文章的展示
- 富文本编辑器的基本实现
- 评论功能
- 使用 localStorage 存储数据
- 导航栏
- 无限滚动加载
--------------------


未完成：

- 标签/日期查看文章(有思路：简单的分类就是对文章进行过滤，展示过滤后的数据，也可以说现在的文章就是一个没有过滤的过滤)
- 搜索(有思路：如果只是通过搜索标题的话，监听输入框事件，还是过滤)
- 白天黑夜(有思路：通过一个全局的 css 变量操控，或者在 js 中设定一组白天黑夜的颜色数组，然后将其 css 变量替换即可)

### 第二道题

优点：

1. 界面简约大方
2. 整体的页面风格清新
3. 整体还是挺不错的

-----------------
待改进：

1. B 站解析视频，点击开始解析之后没有进度条，让人误以为出了 bug
2. 解析失败后，在当前页面点击添加新文件，直接跳转至登录页；
   重新登录后，点击新建文件页面，虽然保留上次解析的文件，但是不能做任何操作，并且等了大概十几秒又跳转登录页
3. 接 2，点击返回再点进去，又可以重新上传了
4. 搜索框最好做一个动画过渡
5. 登录页的切换提示信息不足，可以不用那个按钮进行切换账户还是验证码
6. 总是无缘无故跳转到登录页

### 附加题

第一题：自己没有实现过，但是要做的话，还是可以做出来的
第二题：略

### 额外说明

自己也是今天才可以动手写这东西，有些实现没有太多的考虑（临界值、抽象逻辑组件），UI 设计上不是那么协调（个人觉得）？
