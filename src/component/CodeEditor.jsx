import React, { useState } from 'react';
import AceEditor from 'react-ace';
import FileSaver from 'file-saver';
import { FaCopy, FaLock, FaUnlock, FaSave } from 'react-icons/fa';

import 'ace-builds/src-noconflict/mode-javascript'; // Import the JavaScript mode
import 'ace-builds/src-noconflict/theme-github'; // Choose an Ace Editor theme

const CodeEditor = () => {
  const [code, setCode] = useState('// Write your code here');
  const [isLocked, setLocked] = useState(false);

  const handleCopy = () => {
    if (!isLocked) {
      navigator.clipboard.writeText(code).then(() => {
        console.log('Code copied to clipboard');
      });
    }
  };

  const handleLockToggle = () => {
    setLocked(!isLocked);
  };

  const handleSave = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, 'myCodeFile.txt');
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-2">
        <button
          onClick={handleCopy}
          disabled={isLocked}
          className={`px-4 py-2 rounded-md ${
            isLocked ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'
          } text-white flex items-center`}
        >
          <FaCopy className="mr-2" />
          Copy
        </button>
        <button
          onClick={handleLockToggle}
          className={`px-4 py-2 rounded-md ${
            isLocked ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          } text-white flex items-center`}
        >
          {isLocked ? <FaUnlock className="mr-2" /> : <FaLock className="mr-2" />}
          {isLocked ? 'Unlock' : 'Lock'}
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white flex items-center"
        >
          <FaSave className="mr-2" />
          Save
        </button>
      </div>
      <AceEditor
        mode="javascript"
        theme="github"
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        value={code}
        readOnly={isLocked}
        onChange={(value) => setCode(value)}
        width="100%"
        height="500px"
      />
    </div>
  );
};

export default CodeEditor;
