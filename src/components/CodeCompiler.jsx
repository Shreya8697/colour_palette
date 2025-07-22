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
    <div className="min-h-screen bg-gradient-to-br from-purple-600/20 to-pink-600/20 py-10 px-4">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        
        <div 
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-10"
          style={{ animation: 'float 6s ease-in-out infinite' }}
        ></div>
        <div 
          className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-r from-green-400 to-teal-400 rounded-full opacity-10"
          style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '1s' }}
        ></div>
        <div 
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10"
          style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '2s' }}
        ></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl shadow-xl"></div>
        <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden p-8">
          <Toaster position="top-right" />
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Online Code Compiler</h2>
              <p className="text-gray-600 max-w-lg">
                Write, execute, and test {language === 'javascript' ? 'JavaScript' : 'Python'} code in your browser
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setEditorTheme(prev => prev === 'vs-dark' ? 'light' : 'vs-dark')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${editorTheme === 'vs-dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                {editorTheme === 'vs-dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium"
              >
                {[12, 14, 16, 18, 20].map(size => (
                  <option key={size} value={size}>{size}px</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Editor Column */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-3">
                  <button
                    onClick={() => setLanguage('javascript')}
                    className={`flex items-center px-4 py-2 rounded-xl transition-all ${language === 'javascript' ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    <SiJavascript className="mr-2" /> JavaScript
                  </button>
                  <button
                    onClick={() => setLanguage('python')}
                    className={`flex items-center px-4 py-2 rounded-xl transition-all ${language === 'python' ? 'bg-green-600 text-white shadow-md hover:bg-green-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    <SiPython className="mr-2" /> Python
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={saveCode}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="Save"
                  >
                    <FiSave size={18} />
                  </button>
                  <button
                    onClick={downloadCode}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="Download"
                  >
                    <FiDownload size={18} />
                  </button>
                  <button
                    onClick={copyCode}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="Copy"
                  >
                    <FiCopy size={18} />
                  </button>
                  <button
                    onClick={resetCode}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Reset"
                  >
                    <FiAlertCircle size={18} />
                  </button>
                </div>
              </div>

              <div className="h-[400px] border border-gray-200 rounded-xl overflow-hidden shadow-inner">
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
                    padding: { top: 15 },
                  }}
                  loading={<div className="h-full flex items-center justify-center text-gray-400">Loading editor...</div>}
                />
              </div>

              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={runCode}
                  disabled={isLoading}
                  className={`flex items-center px-6 py-3 rounded-xl text-white font-medium transition-all ${isLoading ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg'}`}
                >
                  <FiPlay className="mr-2" />
                  {isLoading ? 'Running...' : 'Run Code'}
                </button>
                {executionTime && (
                  <span className="text-sm text-gray-500 font-medium">
                    Executed in {executionTime}s
                  </span>
                )}
              </div>
            </div>

            {/* Output Column */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FiTerminal className="mr-2 text-blue-600" /> Output
                </h3>
                <button
                  onClick={copyOutput}
                  className="flex items-center text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg transition-all"
                >
                  <FiCopy className="mr-1" /> Copy Output
                </button>
              </div>

              <div className="h-[400px] bg-gray-50 p-4 rounded-xl border border-gray-200 overflow-auto shadow-inner">
                {output ? (
                  <pre className="whitespace-pre-wrap font-mono text-sm">{output}</pre>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    {isLoading ? 'Executing code...' : 'Output will appear here'}
                  </div>
                )}
              </div>

              <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                  <FiCode className="mr-2 text-blue-600" /> Quick Reference
                </h4>
                <div className="text-sm text-blue-700 space-y-2">
                  {language === 'javascript' ? (
                    <>
                      <div className="flex items-baseline">
                        <code className="bg-blue-100 px-2 py-1 rounded mr-2">console.log()</code>
                        <span>Print to output</span>
                      </div>
                      <div className="flex items-baseline">
                        <code className="bg-blue-100 px-2 py-1 rounded mr-2">setTimeout(fn, ms)</code>
                        <span>Delayed execution</span>
                      </div>
                      <div className="flex items-baseline">
                        <code className="bg-blue-100 px-2 py-1 rounded mr-2">ES6+</code>
                        <span>Modern JavaScript supported</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-baseline">
                        <code className="bg-blue-100 px-2 py-1 rounded mr-2">print()</code>
                        <span>Print to output</span>
                      </div>
                      <div className="flex items-baseline">
                        <code className="bg-blue-100 px-2 py-1 rounded mr-2">Python 3.x</code>
                        <span>Latest syntax supported</span>
                      </div>
                      <div className="flex items-baseline">
                        <code className="bg-blue-100 px-2 py-1 rounded mr-2">Standard Library</code>
                        <span>Built-in modules available</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          25% { 
            transform: translateY(-10px) rotate(5deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(0deg); 
          }
          75% { 
            transform: translateY(-10px) rotate(-5deg); 
          }
        }
      `}</style>
    </div>
  );
};

export default CodeCompiler;