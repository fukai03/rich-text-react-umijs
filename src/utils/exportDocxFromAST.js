/**
 * 使用docx（https://github.com/dolanmiu/docx）库完成前端html字符转导出为docx文档
 * 相较于html-docx-js(https://github.com/evidenceprime/html-docx-js)库具有更好的兼容性
 *
 * 具体流程为： 将html字符串解析为AST（抽象语法树），而后根据AST逐个构建docx内容。
 */
import * as docx from 'docx';
import { saveAs } from 'file-saver';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  LevelSuffix,
  UnderlineType,
} from 'docx';
import parseHtmlToAst from './convertHtmlToAST';

/**
 * 用于分隔node数组，分段
 * @param {Array} node domnode数组
 */
// function splitParagraph(node) {
//     for (let i = 0; i < node.length; i++) {
//         const paragraphs = node[i].innerHTML.replace('</p>').split(/<br>|<p>/)
//         console.log(paragraphs);
//         paragraphs.forEach(el => {
//             let temp = new Paragraph({
//                 text: el
//             })
//             sections[0].children.push(temp)
//         });
//     }
//     doc = new Document(config);

// }

// 生成文本样式
function textStyle(text, styleObj) {
  if (text.text) {
    styleObj.text = text.text;
    return styleObj;
  } else if (text.tag === 'b') {
    styleObj.bold = true;
    return textStyle(text.children[0], styleObj);
  } else if (text.tag === 'i') {
    styleObj.italics = true;
    return textStyle(text.children[0], styleObj);
  } else if (text.tag === 'strike') {
    styleObj.strike = true;
    return textStyle(text.children[0], styleObj);
  } else if (text.tag === 'u') {
    styleObj.underline = {
      type: UnderlineType.SINGLE,
    };
    return textStyle(text.children[0], styleObj);
  } else {
    return textStyle(text.children[0], styleObj);
  }
}

function genText(childs) {
  let res = [];
  childs.forEach((e) => {
    let temp = textStyle(e, {});
    // console.log(temp);
    res.push(temp);
  });
  return res;
}

let testArr = [
  {
    text: '优美作文 篇1',
  },
  {
    text: '风轻轻吹过',
    bold: true,
    italics: true,
    underline: {
      type: 'single',
    },
  },
  {
    text: '。岁月停泊在那块斑驳的墙上，',
  },
  {
    text: '一点点地把墙侵蚀',
    bold: true,
    italics: true,
    strike: true,
  },
];

let headOption = {
  h1: HeadingLevel.HEADING_1,
  h2: HeadingLevel.HEADING_2,
  h3: HeadingLevel.HEADING_3,
  h4: HeadingLevel.HEADING_4,
  h5: HeadingLevel.HEADING_5,
};
let alignOption = {
  'text-align:left;': AlignmentType.LEFT,
  'text-align:right;': AlignmentType.RIGHT,
  'text-align:center;': AlignmentType.CENTER,
  'text-align:justify;': AlignmentType.JUSTIFIED,
};
function setAlign(attrs = [], paragraphConf) {
  if (attrs) {
    attrs.forEach((el) => {
      if (el.name === 'style') {
        paragraphConf.alignment = alignOption[el.value];
      }
    });
  }
  return paragraphConf;
}

function parseAstToDocObject(ast) {
  let res = [];
  let sections = [
    {
      properties: {},
      children: [],
    },
  ];
  let config = {
    numbering: {
      config: [
        {
          reference: 'my-crazy-numbering',
          levels: [
            {
              level: 0,
              format: 'decimal',
              text: '%1',
              alignment: AlignmentType.START,
              suffix: LevelSuffix.TAB,
              style: {
                paragraph: {
                  indent: { left: 420, hanging: 100 },
                },
              },
            },
          ],
        },
      ],
    },
    sections,
  };
  ast.children.forEach((e, index) => {
    let child = [];
    let textArr = genText(e.children);
    let paragraphConfig = {};
    if (headOption[e.tag]) {
      paragraphConfig.heading = headOption[e.tag];
    }
    paragraphConfig = setAlign(e.attrs, paragraphConfig);
    if (e.tag === 'ul') {
      paragraphConfig.bullet = { level: 0 };
      textArr.forEach((el, index_li) => {
        paragraphConfig = setAlign(e.children[index_li].attrs, paragraphConfig);
        let liText = new TextRun(el);
        paragraphConfig.children = [liText];
        res.push(new Paragraph(paragraphConfig));
      });
    } else if (e.tag === 'ol') {
      paragraphConfig.numbering = {
        reference: 'my-crazy-numbering',
        level: 0,
        format: 'decimal',
      };
      textArr.forEach((el) => {
        let liText = new TextRun(el);
        paragraphConfig.children = [liText];
        res.push(new Paragraph(paragraphConfig));
      });
    } else {
      // console.log(textArr);
      textArr.forEach((e) => {
        child.push(new TextRun(e));
      });
      console.log(paragraphConfig);
      paragraphConfig.children = child;

      res.push(new Paragraph(paragraphConfig));
    }
    paragraphConfig = null;
  });
  // console.log(res);
  sections[0].children.push(...res);
  return new Document(config);
}

/**
 *
 * @param {String} filename 导出文件名
 * @param {string} html html字符串
 */
export default function (filename, html = '') {
  // let nodelist = new DOMParser().parseFromString(html, 'text/html').body.childNodes
  // console.log(nodelist);
  // splitParagraph(nodelist)

  // console.log(html);
  // const ast = parse(html)

  const ast = parseHtmlToAst(`<div>${html}</div>`);
  console.log(html, ast);
  // console.log(genText(ast.children[1].children));
  // sections[0].children.push(...parseAstToDocObject(ast));
  // doc = new Document(config);
  Packer.toBlob(parseAstToDocObject(ast)).then((blob) => {
    saveAs(blob, filename);
  });
}
