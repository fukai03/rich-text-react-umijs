import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button } from 'antd';

const MyInput = () => {
  const [value, setValue] = useState('');
  const onChange = (evt: any) => setValue(evt.target.value);

  return <input value={value} onChange={onChange} />;
};

const DraftJS: React.FC = () => {
  const empty = EditorState.createEmpty();
  const [editorState, setEditorState] = useState(empty);

  const onChange = (e) => setEditorState(e);
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };
  const undo = () => {
    console.log('撤销');
    onChange(EditorState.undo(editorState));
  };
  const redo = () => {
    console.log('重做');
    onChange(EditorState.redo(editorState));
  };

  return (
    <PageContainer>
      <div>DraftJS</div>
      <Button onClick={undo}>撤销</Button>
      <Button onClick={redo}>重做</Button>
      <div style={{ border: '1px solid #ccc' }}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Enter some text..."
          handleKeyCommand={handleKeyCommand}
        />
      </div>
      <MyInput />
      {/* <iframe
        src=" http://10.36.248.26:8429/#/templateCompose"
        style={{ width: '800px', height: '600px' }}
      ></iframe> */}
    </PageContainer>
  );
};
export default DraftJS;
