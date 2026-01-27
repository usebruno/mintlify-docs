export const Translator = () => {
  // Postman to Bruno script translator
  const postmanTranslation = (script) => {
    if (!script || script.trim() === '') {
      return script;
    }

    try {
      let translatedScript = script;

      // Basic Postman to Bruno API conversions
      const conversions = [
        // Test function conversions
        {
          pattern: /pm\.test\s*\(\s*["'`]([^"'`]+)["'`]\s*,\s*function\s*\(\s*\)\s*\{/g,
          replacement: 'test("$1", function() {'
        },
        // Response status conversions
        {
          pattern: /pm\.response\.to\.have\.status\((\d+)\)/g,
          replacement: 'expect(res.getStatus()).to.equal($1)'
        },
        // Response body JSON access
        {
          pattern: /pm\.response\.json\(\)/g,
          replacement: 'res.getBody()'
        },
        // Environment variable operations
        {
          pattern: /pm\.environment\.set\s*\(\s*["'`]([^"'`]+)["'`]\s*,\s*([^)]+)\)/g,
          replacement: 'bru.setEnvVar("$1", $2)'
        },
        {
          pattern: /pm\.environment\.get\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
          replacement: 'bru.getEnvVar("$1")'
        },
        // Global variable operations
        {
          pattern: /pm\.globals\.set\s*\(\s*["'`]([^"'`]+)["'`]\s*,\s*([^)]+)\)/g,
          replacement: 'bru.setVar("$1", $2)'
        },
        {
          pattern: /pm\.globals\.get\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
          replacement: 'bru.getVar("$1")'
        },
        // Collection variable operations
        {
          pattern: /pm\.collectionVariables\.set\s*\(\s*["'`]([^"'`]+)["'`]\s*,\s*([^)]+)\)/g,
          replacement: 'bru.setVar("$1", $2)'
        },
        {
          pattern: /pm\.collectionVariables\.get\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
          replacement: 'bru.getVar("$1")'
        },
        // Response time assertions
        {
          pattern: /pm\.expect\s*\(\s*pm\.response\.responseTime\s*\)\.to\.be\.below\s*\(\s*(\d+)\s*\)/g,
          replacement: 'expect(res.getResponseTime()).to.be.below($1)'
        },
        // Response header assertions
        {
          pattern: /pm\.response\.to\.have\.header\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
          replacement: 'expect(res.getHeader("$1")).to.exist'
        },
        // Response body text
        {
          pattern: /pm\.response\.text\(\)/g,
          replacement: 'res.getBody()'
        },
        // Basic expect conversions
        {
          pattern: /pm\.expect\s*\(\s*([^)]+)\s*\)\.to\.eql\s*\(\s*([^)]+)\s*\)/g,
          replacement: 'expect($1).to.equal($2)'
        },
        {
          pattern: /pm\.expect\s*\(\s*([^)]+)\s*\)\.to\.equal\s*\(\s*([^)]+)\s*\)/g,
          replacement: 'expect($1).to.equal($2)'
        },
        // Response size
        {
          pattern: /pm\.response\.responseSize/g,
          replacement: 'res.getSize()'
        }
      ];

      // Apply all conversions
      conversions.forEach(({ pattern, replacement }) => {
        translatedScript = translatedScript.replace(pattern, replacement);
      });

      return translatedScript;
    } catch (error) {
      console.error('Translation error:', error);
      return script;
    }
  };

  const [mounted, setMounted] = useState(false);
  const [pmCode, setPmCode] = useState('// translate your awesome code');
  const [translatedCode, setTranslatedCode] = useState('');
  const [layoutMode, setLayoutMode] = useState('col');
  const [editorTheme, setEditorTheme] = useState('dark');

  useEffect(() => {
    setMounted(true);
    // Load saved code
    if (typeof window !== 'undefined') {
      const savedPmCode = localStorage.getItem('pmCode');
      if (savedPmCode) {
        setPmCode(savedPmCode);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      const output = postmanTranslation(pmCode);
      setTranslatedCode(output);
    }
  }, [pmCode, mounted]);

  const savePmCode = (code) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pmCode', code);
    }
    setPmCode(code);
  };

  const copyClipboard = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(translatedCode).then(() => {
        const toast = document.createElement('div');
        toast.textContent = 'Copied to clipboard!';
        toast.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #4F46E5;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          z-index: 10000;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          font-size: 14px;
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
          if (document.body.contains(toast)) {
            document.body.removeChild(toast);
          }
        }, 2000);
      });
    }
  };

  const isRowMode = layoutMode === 'row';
  const isDark = editorTheme === 'dark';
  const bgColor = isDark ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDark ? '#D4D4D4' : '#000000';
  const borderColor = isDark ? '#3E3E3E' : '#E5E7EB';

  if (!mounted) {
    return (
      <div style={{ 
        width: '100%', 
        padding: '2rem', 
        textAlign: 'center',
        color: '#666'
      }}>
        Loading translator...
      </div>
    );
  }

  return (
    <div style={{ width: '100%', marginTop: '1rem', marginBottom: '2rem' }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        padding: '0.75rem',
        backgroundColor: isDark ? '#2D2D2D' : '#F9FAFB',
        borderRadius: '0.5rem',
        border: `1px solid ${borderColor}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: '500', color: textColor, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Theme:
            <select
              value={editorTheme}
              onChange={(e) => setEditorTheme(e.target.value)}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '0.375rem',
                border: `1px solid ${borderColor}`,
                fontSize: '0.875rem',
                backgroundColor: bgColor,
                color: textColor,
                cursor: 'pointer'
              }}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </label>
          
          <div style={{ display: 'flex', gap: '0.25rem', border: `1px solid ${borderColor}`, borderRadius: '0.375rem', padding: '0.125rem' }}>
            <button
              onClick={() => setLayoutMode('col')}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '0.25rem',
                border: 'none',
                backgroundColor: layoutMode === 'col' ? '#4F46E5' : 'transparent',
                color: layoutMode === 'col' ? 'white' : textColor,
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
              title="Column Layout"
            >
              ⬍ Column
            </button>
            <button
              onClick={() => setLayoutMode('row')}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '0.25rem',
                border: 'none',
                backgroundColor: layoutMode === 'row' ? '#4F46E5' : 'transparent',
                color: layoutMode === 'row' ? 'white' : textColor,
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
              title="Row Layout"
            >
              ⬌ Row
            </button>
          </div>
        </div>

        <button
          onClick={copyClipboard}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: isDark ? '#3F3F46' : '#E4E4E7',
            color: isDark ? '#FAFAFA' : '#18181B',
            border: `1px solid ${borderColor}`,
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = isDark ? '#52525B' : '#D4D4D8';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = isDark ? '#3F3F46' : '#E4E4E7';
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          Copy Bruno Code
        </button>
      </div>

      {/* Editor Layout */}
      <div style={{
        display: 'flex',
        flexDirection: isRowMode ? 'row' : 'column',
        gap: '0.5rem',
        border: `1px solid ${borderColor}`,
        borderRadius: '0.5rem',
        overflow: 'hidden',
        backgroundColor: bgColor,
        minHeight: isRowMode ? '500px' : '600px'
      }}>
        {/* Postman Editor */}
        <div style={{
          flex: 1,
          position: 'relative',
          borderRight: isRowMode ? `1px solid ${borderColor}` : 'none',
          borderBottom: !isRowMode ? `1px solid ${borderColor}` : 'none',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '0.1rem 0.5rem',
            backgroundColor: isDark ? '#252526' : '#F3F4F6',
            borderBottom: `1px solid ${borderColor}`,
            fontSize: '0.75rem',
            fontWeight: '600',
            color: textColor,
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem'
          }}>
            <img
              src="/images/postman.svg"
              alt="Postman"
              style={{
                height: '18px',
                width: '17px',
                display: 'block'
              }}
            />
            <span>Postman Script</span>
          </div>
          <textarea
            value={pmCode}
            onChange={(e) => savePmCode(e.target.value)}
            style={{
              flex: 1,
              width: '100%',
              padding: '0.75rem',
              fontFamily: '"Fira Code", "Consolas", "Monaco", "Courier New", monospace',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              border: 'none',
              outline: 'none',
              resize: 'none',
              backgroundColor: bgColor,
              color: textColor
            }}
            placeholder="Paste your Postman script here..."
            spellCheck={false}
          />
        </div>

        {/* Bruno Editor */}
        <div style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '0.1rem 0.5rem',
            backgroundColor: isDark ? '#252526' : '#F3F4F6',
            borderBottom: !isRowMode ? `1px solid ${borderColor}` : 'none',
            fontSize: '0.75rem',
            fontWeight: '600',
            color: textColor,
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem'
          }}>
            <img
              src="/images/bruno.svg"
              alt="Bruno"
              style={{
                height: '18px',
                width: '18px',
                display: 'block'
              }}
            />
            <span>Bruno Script</span>
          </div>
          <textarea
            value={translatedCode}
            readOnly
            style={{
              flex: 1,
              width: '100%',
              padding: '0.75rem',
              fontFamily: '"Fira Code", "Consolas", "Monaco", "Courier New", monospace',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              border: 'none',
              outline: 'none',
              resize: 'none',
              backgroundColor: bgColor,
              color: textColor
            }}
            placeholder="Translated Bruno script will appear here..."
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};
