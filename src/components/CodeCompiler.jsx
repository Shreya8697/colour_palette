import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { FiPlay, FiCode, FiTerminal, FiCopy, FiSave, FiDownload, FiShare2, FiAlertCircle } from 'react-icons/fi';
import { SiJavascript, SiPython } from 'react-icons/si';
import { toast, Toaster } from 'react-hot-toast';

const CodeCompiler = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your JavaScript code here\nconsole.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  const [executionTime, setExecutionTime] = useState(null);

  // Load saved code from localStorage
  useEffect(() => {
    const savedCode = localStorage.getItem(`savedCode_${language}`);
    if (savedCode) {
      setCode(savedCode);
    }
  }, [language]);

  const runCode = async () => {
    setIsLoading(true);
    setOutput('');
    setExecutionTime(null);
    const startTime = performance.now();

    try {
      if (language === 'javascript') {
        // Create a sandboxed environment
        const sandbox = {
          console: {
            log: (...args) => setOutput(prev => prev + args.join(' ') + '\n')
          },
          setTimeout,
          setInterval,
          clearTimeout,
          clearInterval
        };
        
        // Use Function constructor for better security than eval
        const fn = new Function('sandbox', `with(sandbox){${code}}`);
        fn(sandbox);
      } else if (language === 'python') {
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
      }
    } catch (err) {
      setOutput(err.message);
      toast.error('Execution error');
    } finally {
      const endTime = performance.now();
      setExecutionTime(((endTime - startTime) / 1000).toFixed(2));
      setIsLoading(false);
    }
  };

  const saveCode = () => {
    localStorage.setItem(`savedCode_${language}`, code);
    toast.success('Code saved locally');
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language === 'javascript' ? 'js' : 'py'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard');
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success('Output copied to clipboard');
  };

  const resetCode = () => {
    if (window.confirm('Are you sure you want to reset the code?')) {
      setCode(language === 'javascript' 
        ? '// Write your JavaScript code here\nconsole.log("Hello, World!");' 
        : '# Write your Python code here\nprint("Hello, World!")');
    }
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-xl max-w-5xl mx-auto mt-10">
      <Toaster position="top-right" />
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Online Code Compiler</h2>
          <p className="text-gray-600">Write, execute, and test {language === 'javascript' ? 'JavaScript' : 'Python'} code in your browser</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setEditorTheme(prev => prev === 'vs-dark' ? 'light' : 'vs-dark')}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
          >
            {editorTheme === 'vs-dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
          >
            {[12, 14, 16, 18, 20].map(size => (
              <option key={size} value={size}>{size}px</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex space-x-2">
              <button
                onClick={() => setLanguage('javascript')}
                className={`flex items-center px-3 py-1 rounded-md ${language === 'javascript' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <SiJavascript className="mr-1" /> JavaScript
              </button>
              <button
                onClick={() => setLanguage('python')}
                className={`flex items-center px-3 py-1 rounded-md ${language === 'python' ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <SiPython className="mr-1" /> Python
              </button>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={saveCode}
                className="p-1 text-gray-500 hover:text-blue-600"
                title="Save"
              >
                <FiSave size={18} />
              </button>
              <button
                onClick={downloadCode}
                className="p-1 text-gray-500 hover:text-blue-600"
                title="Download"
              >
                <FiDownload size={18} />
              </button>
              <button
                onClick={copyCode}
                className="p-1 text-gray-500 hover:text-blue-600"
                title="Copy"
              >
                <FiCopy size={18} />
              </button>
              <button
                onClick={resetCode}
                className="p-1 text-gray-500 hover:text-red-600"
                title="Reset"
              >
                <FiAlertCircle size={18} />
              </button>
            </div>
          </div>

          <div className="h-[350px] border rounded-lg overflow-hidden">
            <Editor
              height="100%"
              language={language}
              value={code}
              theme={editorTheme}
              onChange={setCode}
              options={{
                fontSize,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 10 },
              }}
            />
          </div>

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={runCode}
              disabled={isLoading}
              className={`flex items-center px-4 py-2 rounded-md ${isLoading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white`}
            >
              <FiPlay className="mr-2" />
              {isLoading ? 'Running...' : 'Run Code'}
            </button>
            {executionTime && (
              <span className="text-sm text-gray-500">
                Executed in {executionTime}s
              </span>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FiTerminal className="mr-2" /> Output
            </h3>
            <button
              onClick={copyOutput}
              className="flex items-center text-sm text-gray-500 hover:text-blue-600"
            >
              <FiCopy className="mr-1" /> Copy
            </button>
          </div>

          <div className="h-[350px] bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-auto">
            {output ? (
              <pre className="whitespace-pre-wrap font-mono text-sm">{output}</pre>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                {isLoading ? 'Executing code...' : 'Output will appear here'}
              </div>
            )}
          </div>

          <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
            <h4 className="font-medium text-blue-800 mb-2 flex items-center">
              <FiCode className="mr-2" /> Quick Reference
            </h4>
            <div className="text-sm text-blue-700">
              {language === 'javascript' ? (
                <ul className="space-y-1">
                  <li><code>console.log()</code> - Print to output</li>
                  <li><code>setTimeout(fn, ms)</code> - Delayed execution</li>
                  <li>ES6+ features supported</li>
                </ul>
              ) : (
                <ul className="space-y-1">
                  <li><code>print()</code> - Print to output</li>
                  <li>Python 3.x syntax supported</li>
                  <li>Standard library available</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeCompiler;