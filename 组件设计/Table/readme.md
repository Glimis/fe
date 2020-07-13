Table：基于element-ui，包含如下内容

1. 有统一内容样式输出
2. 有统一分页样式


## table分类
- 对于展示table,分简单与复杂

简单与复杂的标准,在于columns是否会改变

简单table:columns固定
复杂table:columns根据一定规则进行展示

-  区分展示与修改table,第一版主要优化展示table

删除,更新属于修改,修改本身就属于复杂table,需要考虑如下内容

1. 修改后如何更新【全局刷新 or 手动更新】

涉及到接口数据返回规范

2. 修改的属性与排序冲突【遵守 or 不遵守】

涉及到交互体验

3. 删除后,如何交互 【ui删除 or 手动删除 or 全局刷新 or 跳转】

涉及效率


## 简单table显示 -- 开发流程,痛点与开发方案
1. columns 来源：title/label

根据pm 描述的wiki,使用，,等特殊字符进行分割,可能会带有操作描述 【可协商】
2. columns 来源：props

后端提供的syapi进行对应,通常文案与props并总是对应

3. columns 来源：width/minWidth

ui
4. 确定后端接口,制定分页器 【痛点1,接口返回不统一,且分页器与内容分离】

### 开发方案
1. 基于`get columns`

columns选用经典的规则引擎【此处为最简易的map格式】

2. 如果需要自定义td,使用component进行自定义拓展 【额外参数使用params】

3. 基于colimnsLoader进行开发

.colimns 文件,提供elementUI 所需要的所有props

通过loader转换后,生成普通的columns格式

