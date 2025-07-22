import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeCompiler = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');

  const runCode = async () => {
    if (language === 'javascript') {
      try {
        const result = eval(code);
        setOutput(String(result));
      } catch (err) {
        setOutput(err.message);
      }
    } else if (language === 'python') {
      try {
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: 'python3',
            source: code,
          }),
        });

        const data = await response.json();
        setOutput(data.output || data.message || 'No output');
      } catch (error) {
        setOutput('Error executing Python code');
      }
    }
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">🧠 Online Code Compiler (with Monaco Editor)</h2>

      <div className="mb-4 flex gap-4">
        <button
          className={`px-4 py-2 rounded ${language === 'javascript' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => {
            setLanguage('javascript');
            setCode('// Write JavaScript code here');
          }}
        >
          JavaScript
        </button>
        <button
          className={`px-4 py-2 rounded ${language === 'python' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => {
            setLanguage('python');
            setCode('# Write Python code here');
          }}
        >
          Python
        </button>
      </div>

      <div className="h-[300px] mb-4 border rounded overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage={language}
          value={code}
          language={language}
          theme="vs-dark"
          onChange={(newCode) => setCode(newCode)}
        />
      </div>

      <button
        onClick={runCode}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Run Code
      </button>

      <div className="mt-4">
        <h3 className="font-semibold">🔽 Output:</h3>
        <pre className="bg-gray-100 p-3 mt-2 rounded h-32 overflow-auto whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
};

export default CodeCompiler;
