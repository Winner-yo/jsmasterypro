"use client";
// InitializedMDXEditor.tsx
import {
    headingsPlugin,
    listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  toolbarPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  imagePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
} from "@mdxeditor/editor";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { basicDark} from "cm6-theme-basic-dark";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef } from "react";
import "@mdxeditor/editor/style.css";
import "./dark-editor.css";



// Only import this to the next file
interface Props { 
    value: string;
    fieldChange: (value: string) => void;
  editorRef?: React.RefObject<MDXEditorMethods | null> | null;
    }

const Editor = ({
    value,
    editorRef,
    fieldChange,
  ...props
}: Props) => {
    const { resolvedTheme } = useTheme();
    const internalEditorRef = useRef<MDXEditorMethods>(null);
    const activeEditorRef = editorRef ?? internalEditorRef;

    const initialMarkdownRef = useRef<string>(value ?? "");
    const lastEmittedMarkdownRef = useRef<string | null>(null);
    const lastSyncedValueRef = useRef<string>(value ?? "");
    
    const theme =
    resolvedTheme === "dark"
      ? [basicDark]
      : []; // Add light theme extensions if needed

    const handleChange = useCallback(
      (nextMarkdown: string) => {
        lastEmittedMarkdownRef.current = nextMarkdown;
        fieldChange(nextMarkdown);
      },
      [fieldChange]
    );

    useEffect(() => {
      const nextValue = value ?? "";

      // Avoid feeding the editor back the same value that it just emitted.
      if (lastEmittedMarkdownRef.current === nextValue) {
        lastSyncedValueRef.current = nextValue;
        return;
      }

      if (lastSyncedValueRef.current === nextValue) return;
      lastSyncedValueRef.current = nextValue;

      // Imperatively sync external form changes (e.g., reset/setValue).
      activeEditorRef.current?.setMarkdown(nextValue);
    }, [value, activeEditorRef]);

  return (
    <MDXEditor
      key={resolvedTheme}
      markdown={initialMarkdownRef.current}
      ref={activeEditorRef}
      className="background-light800_dark200 light-border-2
          markdown-editor dark-editor w-full border"
      onChange={handleChange}
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
          tablePlugin(),
          imagePlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
          codeMirrorPlugin({
              codeBlockLanguages: {
                  java:"java",
                  go:"go",
                  rust:"rust",
                  css:"css",
                  html:"html",
                  json:"json",
                  bash: "bash",
                  sql: "sql",
                  txt: "txt",
                  saas: "saas",
                  scss: "scss",
                  xml: "xml",
                  js: "javascript",
                  "": "unspecified",
                  ts:"typescript",
                  tsx: "Typescript (React)",
                  jsx: "Javascript (React)",
            },
            autoLoadLanguageSupport: true,
            codeMirrorExtensions: theme,
          }),
          diffSourcePlugin({ viewMode:"rich-text", diffMarkdown:""}),
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === "codeblock",
                  contents: () => <ChangeCodeMirrorLanguage />,
                },
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <Separator />
                            
                      <BoldItalicUnderlineToggles />
                      <Separator />

                      <ListsToggle />
                      <Separator />

                      <CreateLink />
                      <InsertImage />
                      <Separator />

                      <InsertTable />
                      <InsertThematicBreak />
                            
                      <InsertCodeBlock />
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
      ]}
      {...props}
    />
  );
};

export default Editor;
