import '@wangeditor/editor/dist/css/style.css'; // 引入wangEditor的css
import './index.css';
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';

const WangEditor: React.FC = () => {
  // editor实例
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  // 编{辑器内容
  const [html, setHtml] = useState('<p>hello</p>');
  const origin_word: string = '类';
  const fix_word: string = '内';

  useEffect(() => {
    setTimeout(() => {
      setHtml('<p>ajax请求获取类容aaa类</p>');
      // console.log(editor);
    }, 3000);
  }, []);

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    // 所有工具栏选项的key
    // toolbarKeys: ['bold', 'underline', 'italic', 'through', 'code', 'sub', 'sup', 'clearStyle', 'color', 'bgColor', 'fontSize', 'fontFamily', 'indent', 'delIndent', 'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify', 'lineHeight', 'insertImage', 'deleteImage', 'editImage', 'viewImageLink', 'imageWidth30', 'imageWidth50', 'imageWidth100', 'divider', 'emotion', 'insertLink', 'editLink', 'unLink', 'viewLink', 'codeBlock', 'blockquote', 'headerSelect', 'header1', 'header2', 'header3', 'header4', 'header5', 'todo', 'redo', 'undo', 'fullScreen', 'enter', 'bulletedList', 'numberedList', 'insertTable', 'deleteTable', 'insertTableRow', 'deleteTableRow', 'insertTableCol', 'deleteTableCol', 'tableHeader', 'tableFullWidth', 'insertVideo', 'uploadVideo', 'editVideoSize', 'uploadImage', 'codeSelectLang']
    // 设置不需要的工具栏选项
    excludeKeys: ['codeBlock'],
  };

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    // onChange: (e: IDomEditor) => {
    //     console.log('content', e)
    // }
  };

  const editorChange = (e: IDomEditor) => {
    // console.log('change');
    setHtml(e.getHtml());
  };

  // 安徽电力标红功能，重写code标签
  const fixword = () => {
    let reg = new RegExp(origin_word, 'g');
    setHtml(html.replace(reg, ` <code>${origin_word}</code> `));
    setTimeout(() => {
      console.log(html);
    }, 0);
  };
  // 替换标红的词语
  const repalceWord = () => {
    let reg = new RegExp(` <code>${origin_word}</code> `, 'g');
    setHtml(html.replace(reg, `${fix_word}`));
  };
  useEffect(() => {
    let list = document.getElementsByTagName('code');
    // 此处直接添加事件不生效，放入宏任务队列生效
    setTimeout(() => {
      for (let i = 0; i < list.length; i++) {
        list[i].onmouseenter = function () {
          console.log('onmouseenter');
        };
        list[i].onmouseleave = function () {
          console.log('onmouseleave');
        };
      }
    }, 0);
  }, [html]);

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor === null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <PageContainer ghost>
      <div>
        <h1>wangEditor</h1>
        <>
          <button type="button" onClick={fixword} style={{ width: '50px' }}>
            纠错
          </button>
          <button type="button" onClick={repalceWord} style={{ width: '50px' }}>
            替换
          </button>
        </>

        <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
          <Toolbar
            editor={editor}
            defaultConfig={toolbarConfig}
            mode="default"
            style={{ borderBottom: '1px solid #ccc' }}
          />
          <Editor
            defaultConfig={editorConfig}
            value={html}
            onCreated={setEditor}
            onChange={editorChange}
            mode="default"
            style={{ height: '500px', overflowY: 'hidden' }}
          />
        </div>
        <div style={{ marginTop: '15px' }}>{html}</div>

        <a href="https://www.wangeditor.com/">
          具体配置及使用可参考wangEditor官网
        </a>
      </div>
    </PageContainer>
  );
};
export default WangEditor;
