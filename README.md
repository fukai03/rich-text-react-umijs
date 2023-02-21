### 富文本简易 demo

- 安装依赖

```bash
yarn
#or
npm i
#or
pnpm i

```

- 启动

```bash
yarn dev
#or
npm run dev
```

`@umijs/max` 模板项目，更多功能参考 [Umi Max 简介](https://next.umijs.org/zh-CN/docs/max/introduce)

### 富文本调研

#### wangEditor

相关资源：

- [官网文档](https://www.wangeditor.com/v5/)
- [github](https://github.com/wangeditor-team/wangEditor) 特性：
- 使用 Typescript 开发的 Web 富文本编辑器，轻量、简洁、易用、开源免费。
- 有详细的中文文档，以及中文交流环境。
- wangEditor 基于 slate 内核开发，但不依赖于 React ，它本身是无框架依赖的，可以基于原生 js、react、vue 进行开发。
- 内置了所有常见的富文本操作功能，能满足绝大部分使用需求。直接配置使用即可，无需再二次开发。
- 有丰富的 API 和足够的扩展性，允许你自定义开发菜单、模块、插件等。
- 兼容常见的 PC 浏览器：Chrome，Firefox，Safar，Edge，QQ 浏览器，但 v5 版本不支持 IE。若需考虑支持 IE 及某些低版本浏览器，可以使用 V4 或 V3 版本（功能相对较少）。

#### SlateJS

相关资源：

- [官方文档](https://docs.slatejs.org/)
- [中文文档](https://rain120.github.io/athena/zh/slate/SlateStart.html)
- [github](https://github.com/ianstormtaylor/slate) 特性：
- 可深度定制的富编辑器框架，专用于 React。
- 具有良好的 API、强大的插件基础设施以及与 React 的深度连接
- 生成 JSON 输出，使其更容易与其他模块集成；
- 它的嵌套文档模型支持更复杂的内容结构，如表格、分页符和其他自定义功能；
- 可使用插件进行扩展；
- 提供良好的描述性文档和交互式演示。
- 使用上需要花上一定时间成本，不能开箱即用。

#### Quill

相关资源：

- [官方文档](https://quilljs.com/docs/quickstart/)
- [github](https://github.com/quilljs/quill/)
- [github for react-quill](https://github.com/zenoamaro/react-quill) 特性：
- 跨平台和浏览器支持，快速轻便；
- 通过其模块和富有表现力的 API 完全可定制；
- 可以将内容表示为 JSON，更易于处理和转换为其他格式；
- 提供两个主题以快速轻松地更改编辑器的外观。

#### TinyMCE

> 若有复杂的功能支持（表格定制等）或者非常多特殊的功能，可考虑该富文本工具

相关资源：

- [Github](https://github.com/tinymce/tinymce)
- [tinymce for react](https://github.com/tinymce/tinymce-react)
- [官方文档](https://www.tiny.cloud/docs/tinymce/6/) 特性：
- 易于集成，可以部署在基于云的、自托管或混合环境中
- 支持非常多的插件，功能非常齐全
  - 高级表格和复杂内容支持；
  - 增强的媒体嵌入支持；
  - 富文本预览、导出为 pdf、评论、多种语言单词拼写 check 等
- 实时协作支持；
- 自动链接检查器；
- 编辑器可以在三种模式下使用：经典、内联、无干扰；
- 提供云安全功能。

#### ProseMirror

相关资源

- [Github](https://github.com/ProseMirror/prosemirror-view)
- [官方文档](https://prosemirror.net/)
- [中文文档](https://prosemirror.xheldon.com/)
- [ProseMirror for react](https://remirror.io/docs/) 特性：
- 实时协同编辑：ProseMirror 内置了对实时协同编辑的坚定支持，它允许多个人同时对一个文档进行编辑。
- 可扩展的文档结构：文档结构（Document schemas）允许使用自定义的文档结构而无需从头开始编写自己的编辑器。
- 模块化：模块机制确保你只载入自己需要的模块，同时能够按需替换已有的模块。
- 插件化：插件系统允许你容易地增加额外的功能，同时以一种简单的方式打包你的插件。
- 函数式：一个函数式和不可变数据结构让 ProseMirror 很容易的与现代 web app 集成，以实现复杂的编辑行为。
- 定制化：核心库小巧且通用，为构建不同类型的编辑器提供基础支持。

#### DraftJS

相关资源：

- [github](https://github.com/facebookarchive/draft-js)
- [官方文档](https://draftjs.org/docs/getting-started/)
- [draft for react](https://github.com/jpuri/react-draft-wysiwyg) 特性：
- 具有高度可扩展性和可定制性；
- 由 Facebook 支持的庞大且不断增长的开源开发者社区提供了许多教程和支持；
- 无缝融入 React 应用程序，使用熟悉的声明式 API 抽象出渲染、选择和输入行为的细节；
- Draft.js 模型是用 immutable-js 构建的，提供了一个具有功能状态更新的 API，并积极利用数据持久性来实现可扩展的内存使用。
- 学习使用的时间成本相对较高，若无特殊定制需求可直接使用 react 版本库快速搭建。

#### morpho(百度自研)

相关资源：

- [官方文档](http://morpho-doc.weiyun.baidu.com/)
- [icode](https://console.cloud.baidu-int.com/devops/icode/repos/baidu/morpho/morpho/tree/master) 特性：
- 百度知识库所使用的富文本工具
- 以 slate0.61 为基础进行改造，基于 react 和 ts

### 前端 html 与 docx 相互转换

#### word 转 html

- https://github.com/mwilliamson/mammoth.js
- https://github.com/lalalic/docx2html

#### html 转 word

- https://github.com/evidenceprime/html-docx-js
- 参考文章：https://juejin.cn/post/7120190373036556301
- https://docx.js.org/#/?id=welcome
  > 需注意,该工具库不支持 IE 浏览器，使用前需考虑业务场景
  - 将 html 模板字符串转换为 AST（抽象语法树）
  - 根据 AST，使用 docx 库生成 docx 文档(具体代码见 demo 中[WordImportAndExport](./src/pages/WordImportAndExport/index.tsx)文件夹)
