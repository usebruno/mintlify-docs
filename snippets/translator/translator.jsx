"use client";
import { useEffect, useState } from "react";
import { postmanTranslation } from "./utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import { ToolBar } from "./toolbar.jsx";
import { EditorLayout } from "./editor-layout.jsx";


export const Translator = () => {
  const [layoutMode, setLayoutMode] = useState<"col" | "row">("col");
  const [openDialog, setOpenDialog] = useState(false)
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  const [editorBg, setEditorBg] = useState('#1E1E1E');
  const [pmCode, setPmCode] = useState<string[]>([
    '// translate your awesome code',
  ]);
  const [translatedCode, setTranslatedCode] = useState<string[]>(['']);

  useEffect(() => {
    const translate = async () => {
      const output = await postmanTranslation(pmCode.join('\n'));
      setTranslatedCode(output.split('\n'));
    };
    translate();
  }, [pmCode]);

  const copyClipboard = () => {
    navigator.clipboard.writeText(translatedCode.join("\n")).then(() => {
      toast('Copied to clipboard !')
    })
  }
  const savePmCode = (code: string[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pmCode', JSON.stringify(code));
    }
    setPmCode(code);
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPmCode = localStorage.getItem('pmCode');
      if (savedPmCode) {
        setPmCode(JSON.parse(savedPmCode));
      }
    }
  }, []);
  return (
    <div className="flex flex-col items-start w-full mt-2">
      <div className="flex items-center justify-between w-full">
        <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
          <DialogContent className="max-w-[calc(100dvw)] w-full h-full max-h-[calc(100dvh)] bg-transparent p-0 border-0">
            <DialogHeader>
              <DialogDescription className="p-0">
                <ToolBar
                  copyClipboard={copyClipboard}
                  openDialog={openDialog}
                  setOpenDialog={setOpenDialog}
                  editorTheme={editorTheme}
                  setEditorTheme={setEditorTheme}
                  editorBg={editorBg}
                  setEditorBg={setEditorBg}
                  layoutMode={layoutMode}
                  setLayoutMode={setLayoutMode}
                />
                <EditorLayout
                  pmCode={pmCode}
                  computedTranslation={translatedCode}
                  setPmCode={savePmCode}
                  layoutMode={layoutMode}
                  editorTheme={editorTheme}
                  editorBg={editorBg}
                  openDialog
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {!openDialog && (
        <>
          <ToolBar
            copyClipboard={copyClipboard}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            editorTheme={editorTheme}
            editorBg={editorBg}
            setEditorBg={setEditorBg}
            setEditorTheme={setEditorTheme}
            layoutMode={layoutMode}
            setLayoutMode={setLayoutMode}
          />
          <EditorLayout
            pmCode={pmCode}
            computedTranslation={translatedCode}
            setPmCode={savePmCode}
            layoutMode={layoutMode}
            editorTheme={editorTheme}
            editorBg={editorBg}
            className="mt-2"
          />
        </>
      )}
    </div>
  )
}