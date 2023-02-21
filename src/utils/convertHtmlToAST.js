// 将html字符串转换为AST

const attribute =
  /^\s*([^\s"'<>/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
// 匹配 <div
const startTagOpen = new RegExp(`^<${qnameCapture}`);
// 匹配 > />
const startTagClose = /^\s*(\/?)>/;
// 匹配 </div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const doctype = /^<!DOCTYPE [^>]+>/i;

//注意树形的html 只能有一个根节点
export default function parseHtmlToAst(html) {
  let text,
    root,
    currentParent,
    stack = [];
  let html_temp = html;
  while (html_temp) {
    let textEnd = html_temp.indexOf('<');
    if (textEnd === 0) {
      //查找开始tag
      const startTagMatch = parseStartTag();
      if (startTagMatch) {
        //生成AST树
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }
      //查找结束标签
      const endTagMatch = html_temp.match(endTag);
      if (endTagMatch) {
        advance(endTagMatch[0].length);
        //构造ast树
        end(endTagMatch[1]);
        continue;
      }
    }
    //文本节点
    if (textEnd > 0) {
      text = html_temp.substring(0, textEnd);
    }
    if (text) {
      //截取字符串
      advance(text.length);
      chars(text);
    }
  }
  //截些开始标记
  function parseStartTag() {
    const start = html_temp.match(startTagOpen);

    let end, attr;
    //找到开始标记
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
      };

      advance(start[0].length);
      //配置属性
      while (
        !(end = html_temp.match(startTagClose)) &&
        (attr = html_temp.match(attribute))
      ) {
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5],
        });
        advance(attr[0].length);
      }
      //匹配结束字符 > 或 />
      if (end) {
        advance(end[0].length);
        return match;
      }
    }
  }

  //截取字符串
  function advance(n) {
    html_temp = html_temp.substring(n);
  }
  //构造AST树形
  function start(tagName, attrs) {
    const element = createAstElement(tagName, attrs);

    if (!root) {
      root = element;
    }
    currentParent = element;
    stack.push(element);
  }

  //结束钩爪树形
  function end(tagName) {
    const element = stack.pop();
    currentParent = stack[stack.length - 1];
    if (currentParent) {
      element.parent = currentParent;
      currentParent.children.push(element);
    }
  }
  //处理文本节点
  function chars(text) {
    if (text.length > 0) {
      currentParent.children.push({
        type: 3,
        text,
      });
    }
  }

  function createAstElement(tagName, attrs) {
    return {
      tag: tagName,
      type: 1,
      children: [],
      attrs,
      parent,
    };
  }
  return root;
}
