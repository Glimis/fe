## columns来源
1. text

wiki,如
```html
产品，商品ID，xxx，yyy
```

核心：以中文+英文为单元，,等为间隔符,即text的显示文案[label],也是显示顺序

2. prop

syapi

核心：以prop + 注释为单元,可获取注释内容
尝试要求后台或手动,将wiki文案与syapi统一

3. 其他参数ui 自定义


## 整合方案
文件以.columns结尾,使用自定义webpack-loader进行加载
使用vscode插件,在保存时,进行格式化辅助
