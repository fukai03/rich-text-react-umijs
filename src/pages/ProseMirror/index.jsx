import React, { useEffect, useState, useCallback } from 'react';
import { PageContainer } from '@ant-design/pro-components/es';
import { WysiwygEditor } from '@remirror/react-editors/wysiwyg';
import { OnChangeJSON } from '@remirror/react';

const ProseMirror = () => {
  const intialJson = JSON.parse(
    '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"初始内容"}]}]}',
  );
  const [json, setJson] = useState(intialJson);

  const editorChange = useCallback((json) => {
    console.log(JSON.stringify(json));
  }, []);

  return (
    <PageContainer>
      <WysiwygEditor placeholder="请输入内容..." initialContent={json}>
        <OnChangeJSON onChange={editorChange}></OnChangeJSON>
      </WysiwygEditor>
    </PageContainer>
  );
};
export default ProseMirror;
