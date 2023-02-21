import '@wangeditor/editor/dist/css/style.css'; // 引入wangEditor的css
import './index.css';
import React, { useState, useEffect, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { Button } from 'antd';
import mammoth from 'mammoth';
import exportFile from '../../utils/exportDocxFromAST.js';

const SelectFile = (props: any) => {
  const { changeHtml } = props;
  const fileRef = useRef(null);

  const fileSelect = () => {
    console.log(fileRef.current);
    if (fileRef.current) (fileRef.current as HTMLElement).click();
  };
  const fileToArrayBuffer = (file: any) => {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = function (result) {
        resolve(result?.target?.result);
      };
      reader.readAsArrayBuffer(file);
    });
  };
  const fileChange = (e: any) => {
    // console.log(e.target.files)
    const file = e.target.files[0];
    let data = fileToArrayBuffer(file).then((res) => res);
    console.log(data);
    console.log(e.target.value); // 文件绝对路径

    mammoth
      .convertToHtml({ arrayBuffer: data })
      .then((res) => {
        console.log(res);
        changeHtml(res.value);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <Button onClick={fileSelect}>选择文件</Button>
      <input
        ref={fileRef}
        type="file"
        onChange={fileChange}
        style={{ display: 'none' }}
      ></input>
    </>
  );
};

const WangEditor: React.FC = () => {
  // editor实例
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  // 编{辑器内容
  const [html, setHtml] = useState('<p>hello</p>');
  const [exportHtml, setExportHtml] = useState('');
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
  // 导出
  const fileExport = () => {
    console.log('导出', exportHtml);
    exportFile('test.docx', exportHtml);
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor === null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  useEffect(() => {
    let reg = /(<br>)(.*?)(<br>)/gim;
    let tempHtml = html.replace(reg, (str: string, $1, $2, $3) => {
      console.log('$1', $1);
      console.log('$2', $2);
      console.log('$3', $3);
      return [$1, '<p>', $2, '</p>', $3].join('');
    });
    setExportHtml(tempHtml.replace(/<br>/gi, ''));
  }, [html]);

  return (
    <PageContainer ghost>
      <div>
        <SelectFile changeHtml={(htmlString: string) => setHtml(htmlString)} />
        <Button onClick={fileExport}>导出文件</Button>
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
        <div style={{ marginTop: '15px' }}>{exportHtml}</div>
      </div>
    </PageContainer>
  );
};
export default WangEditor;
