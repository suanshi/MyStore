方法参数：2 个

第一个参数包含：

- 内容容器	字段为：data_el
- 分页容器    字段为：page_el
- DOM片段   字段为：dom

第二个参数包含：

- 分页数据   字段为：data
- 显示条数   字段为：num

调用示例：

具体见代码

```js
page_render({data_el:'.new-main',page_el:'.pagination',dom:render_dom},{data:newsData})
function page_render(el,json){}
```



略有不足之处，请大家指正修改
