import { useMonaco } from "@monaco-editor/react";
import { Suspense, useState } from "react";
import { cn } from "../lib/utils";
import { prettifyName, transformThemeName } from "./utils";
import { AVAILABLE_THEMES } from "./themes";
import { Columns2, Copy, Expand, Rows2, Shrink } from "lucide-react";

export const ToolBar = ({ 
  copyClipboard, 
  openDialog, 
  setOpenDialog, 
  editorTheme, 
  setEditorTheme, 
  layoutMode, 
  setLayoutMode, 
  className, 
  editorBg, 
  setEditorBg 
}) => {
  const monaco = useMonaco();
  const [selectedTheme, setSelectedTheme] = useState(editorTheme);

  const handleThemeChange = async (theme) => {
    setSelectedTheme(theme);
    if (theme === 'vs-dark' || theme === 'vs-light') {
      monaco?.editor.setTheme(theme);
      setEditorTheme(theme);
      setEditorBg(theme === 'vs-dark' ? '#1E1E1E' : '#fff')
      return;
    }
    try {
      // Map theme names to actual file names
      const themeMap = {
        'github-dark': 'GitHub Dark',
        'github-light': 'GitHub Light',
        'monokai': 'Monokai',
        'dracula': 'Dracula',
        'nord': 'Nord',
        'solarized-dark': 'Solarized-dark',
        'solarized-light': 'Solarized-light',
        'tomorrow-night': 'Tomorrow-Night',
        'tomorrow': 'Tomorrow',
        'one-dark': 'Tomorrow-Night',
        'one-light': 'Tomorrow'
      };
      const themeFileName = themeMap[theme] || theme;
      const themeData = await fetch(`/images/static/themes/${themeFileName}.json`).then(res => res.json());
      monaco?.editor.defineTheme(transformThemeName(theme), themeData);
      monaco?.editor.setTheme(transformThemeName(theme));
      setEditorTheme(transformThemeName(theme));
      setEditorBg(themeData.colors['editor.background']);
    } catch (error) {
      console.error('Error loading theme:', error);
      monaco?.editor.setTheme('vs-dark');
      setEditorTheme('vs-dark');
      setEditorBg('#1E1E1E');
    }
  };

  return (
    <Suspense fallback={<div>Loading themes...</div>}>
      <div
        className={cn(
          "flex w-full justify-between items-center relative z-20",
          openDialog && 'bg-white dark:bg-zinc-900 p-2',
          className
        )}>
        <div className="flex items-center gap-2">
          <select 
            onChange={(e) => handleThemeChange(e.target.value)}
            value={selectedTheme}
            className="px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 text-sm"
          >
            {AVAILABLE_THEMES.map((theme) => (
              <option value={theme} key={theme}>
                {prettifyName(theme)}
              </option>
            ))}
            <option value="vs-dark">Vs Dark</option>
            <option value="vs-light">Vs Light</option>
          </select>
          <div className="flex items-center w-fit border rounded-md">
            <button
              onClick={() => setLayoutMode("col")}
              className={cn(
                "p-2 hover:bg-gray-100 dark:hover:bg-zinc-700",
                layoutMode === "col" && "bg-gray-200 dark:bg-zinc-600"
              )}
              title="Column layout"
            >
              <Rows2 size={16} />
            </button>
            <button
              onClick={() => setLayoutMode("row")}
              className={cn(
                "p-2 hover:bg-gray-100 dark:hover:bg-zinc-700",
                layoutMode === "row" && "bg-gray-200 dark:bg-zinc-600"
              )}
              title="Row layout"
            >
              <Columns2 size={16} />
            </button>
          </div>
        </div>
        <div className={cn('flex items-center gap-2')}>
          <button
            onClick={() => copyClipboard()}
            className="p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700"
            title="Copy to clipboard"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={() => setOpenDialog(!openDialog)}
            className="p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700"
            title={openDialog ? "Shrink" : "Expand"}
          >
            {openDialog ? (
              <Shrink size={16} />
            ) : (
              <Expand size={16} />
            )}
          </button>
        </div>
      </div>
    </Suspense>
  )
}

