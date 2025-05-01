"use client";

import { useEffect, useState } from "react";
import {
  MDXEditor,
  MDXEditorMethods,
  toolbarPlugin,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  ListsToggle,
  BlockTypeSelect,
  CreateLink,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { FC, useRef } from "react";

interface EditorProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
  onChange?: (markdown: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  autofocus?: boolean;
  className?: string;
}

const Editor: FC<EditorProps> = ({
  markdown,
  editorRef,
  onChange,
  readOnly = false,
  placeholder = "Start writing...",
  autofocus = false,
  className = "",
}) => {
  const [mounted, setMounted] = useState(false);
  const localEditorRef = useRef<MDXEditorMethods>(null);
  const actualEditorRef = editorRef || localEditorRef;

  // Handle client-side only mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="border rounded-md p-4 w-full h-72 bg-gray-50 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-4/5 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  return (
    <div className={`mdx-editor-wrapper ${className}`}>
      <style>{`
        .mdxeditor {
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          min-height: 300px;
          max-height: 600px;
          overflow-y: auto;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .mdxeditor:focus-within {
          border-color: #8a63d2;
          box-shadow: 0 0 0 3px rgba(138, 99, 210, 0.1);
        }

        .toolbar {
          border-bottom: 1px solid #e2e8f0;
          background-color: #f8fafc;
          padding: 0.5rem;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }

        .toolbar button {
          margin-right: 0.25rem;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          background-color: transparent;
          color: #475569;
          transition: all 0.2s ease;
        }

        .toolbar button:hover {
          background-color: #f1f5f9;
          color: #1e293b;
        }

        .toolbar button.active {
          background-color: #e2e8f0;
          color: #1e293b;
        }

        .toolbar select {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.25rem;
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
          color: #475569;
        }

        .toolbar select:focus {
          outline: none;
          border-color: #8a63d2;
          box-shadow: 0 0 0 3px rgba(138, 99, 210, 0.1);
        }

        .toolbar-separator {
          height: 1.5rem;
          width: 1px;
          background-color: #e2e8f0;
          margin: 0 0.5rem;
        }

        /* Content styles */
        .content-container {
          padding: 1rem;
          font-family: ui-sans-serif, system-ui, sans-serif;
          line-height: 1.6;
        }

        .content-container h1,
        .content-container h2,
        .content-container h3,
        .content-container h4,
        .content-container h5,
        .content-container h6 {
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: #1e293b;
        }

        .content-container h1 {
          font-size: 1.875rem;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 0.5rem;
        }

        .content-container h2 {
          font-size: 1.5rem;
        }

        .content-container h3 {
          font-size: 1.25rem;
        }

        .content-container p {
          margin-bottom: 1rem;
        }

        .content-container blockquote {
          border-left: 4px solid #8a63d2;
          padding-left: 1rem;
          margin-left: 0;
          color: #64748b;
          font-style: italic;
        }

        .content-container pre {
          background-color: #f8fafc;
          border-radius: 0.25rem;
          padding: 1rem;
          overflow-x: auto;
          margin-bottom: 1rem;
          font-family:
            ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.875rem;
        }

        .content-container code {
          background-color: #f1f5f9;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family:
            ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.875rem;
        }

        .content-container a {
          color: #8a63d2;
          text-decoration: none;
          border-bottom: 1px dotted #8a63d2;
        }

        .content-container a:hover {
          border-bottom: 1px solid #8a63d2;
        }

        .content-container table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1rem;
        }

        .content-container th,
        .content-container td {
          border: 1px solid #e2e8f0;
          padding: 0.5rem;
          text-align: left;
        }

        .content-container th {
          background-color: #f8fafc;
          font-weight: 600;
        }

        .content-container ul,
        .content-container ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }

        .content-container li {
          margin-bottom: 0.25rem;
        }

        /* Code editor specific styles */
        .cm-editor {
          font-family:
            ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
          font-size: 0.875rem !important;
        }

        /* Placeholder styles */
        .mdxeditor [data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          font-style: italic;
          pointer-events: none;
        }
      `}</style>

      <MDXEditor
        ref={actualEditorRef}
        markdown={markdown}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        autoFocus={autofocus}
        contentEditableClassName="content-container"
        plugins={[
          // Core editing features
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          linkPlugin(),
          imagePlugin({
            imageUploadHandler: async (image) => {
              // This is a placeholder for image upload functionality
              // You would typically upload to your server/cloud storage here
              console.log("Image upload requested:", image);

              // Return a dummy URL for demonstration
              return Promise.resolve("https://via.placeholder.com/800x400");
            },
            imageAutocompleteSuggestions: [
              "https://via.placeholder.com/800x400",
              "https://via.placeholder.com/400x300",
            ],
          }),
          tablePlugin(),
          codeBlockPlugin({
            defaultCodeBlockLanguage: "javascript",
          }),
          markdownShortcutPlugin(),

          // Add CodeMirror for enhanced code editing
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: "JavaScript",
              jsx: "JSX",
              ts: "TypeScript",
              tsx: "TSX",
              html: "HTML",
              css: "CSS",
              python: "Python",
              rust: "Rust",
              go: "Go",
              java: "Java",
              php: "PHP",
              ruby: "Ruby",
              json: "JSON",
              yaml: "YAML",
              markdown: "Markdown",
              mdx: "MDX",
              text: "Text",
            },
          }),

          // Source code diff view
          diffSourcePlugin({
            viewMode: "rich-text",
          }),

          // Toolbar with formatting options
          toolbarPlugin({
            toolbarContents: () => (
              <div className="toolbar flex flex-wrap items-center">
                <UndoRedo />
                <span className="toolbar-separator" />
                <BoldItalicUnderlineToggles />
                <span className="toolbar-separator" />
                <BlockTypeSelect />
                <span className="toolbar-separator" />
                <ListsToggle />
                <span className="toolbar-separator" />
                <CreateLink />
                <InsertImage />
                <span className="toolbar-separator" />
                <InsertTable />
                <InsertThematicBreak />
                <span className="toolbar-separator" />
                <InsertCodeBlock />
                <ConditionalContents
                  options={[
                    {
                      when: (editor) => editor?.editorType === "codeblock",
                      contents: () => <ChangeCodeMirrorLanguage />,
                    },
                  ]}
                />
              </div>
            ),
          }),
        ]}
      />
    </div>
  );
};

export default Editor;
