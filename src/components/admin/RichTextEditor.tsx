"use client";

import { useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import { Bold, Heading2, Heading3, ImagePlus, Italic, Link2, List, ListOrdered, Quote, Redo2, Strikethrough, Underline, Undo2 } from "lucide-react";

function ToolButton({ label, active, onClick, children }: { label: string; active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" title={label} aria-label={label} aria-pressed={active} onClick={onClick} className={`grid h-9 min-w-9 cursor-pointer place-items-center border-r border-slate-200 px-2 hover:bg-blue-50 hover:text-command-blue ${active ? "bg-blue-100 text-command-blue" : "text-slate-600"}`}>{children}</button>;
}

export function RichTextEditor({ value, onChange, onError, onUploadChange }: { value: string; onChange: (html: string) => void; onError: (message: string) => void; onUploadChange: (uploading: boolean) => void }) {
  const imageInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [StarterKit.configure({ heading: { levels: [2, 3, 4] }, link: { openOnClick: false, autolink: true } }), ImageExtension.configure({ allowBase64: false })],
    content: value || "<p>Start writing your article…</p>",
    editorProps: { attributes: { class: "admin-editor-content", role: "textbox", "aria-labelledby": "blog-body-label", "aria-multiline": "true" } },
    onUpdate: ({ editor: current }) => onChange(current.getHTML()),
  });
  if (!editor) return <div className="min-h-80 animate-pulse bg-slate-50" />;
  const currentEditor = editor;

  async function uploadInline(file?: File) {
    if (!file) return;
    if (imageInput.current) imageInput.current.value = "";
    const alt = window.prompt("Describe this image for accessibility:", file.name.replace(/\.[^.]+$/, ""))?.trim();
    if (!alt) return;
    onError("");
    setUploading(true);
    onUploadChange(true);
    const form = new FormData(); form.set("file", file);
    try {
      const response = await fetch("/api/admin/uploads", { method: "POST", body: form });
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      currentEditor.chain().focus().setImage({ src: data.url, alt }).run();
    } catch (error) { onError(error instanceof Error ? error.message : "Image upload failed."); }
    finally { setUploading(false); onUploadChange(false); }
  }
  function setLink() {
    const current = currentEditor.getAttributes("link").href as string | undefined;
    const href = window.prompt("Link URL (leave blank to remove):", current || "https://");
    if (href === null) return;
    if (!href.trim()) currentEditor.chain().focus().extendMarkRange("link").unsetLink().run();
    else if (!currentEditor.chain().focus().extendMarkRange("link").setLink({ href: href.trim(), target: "_blank" }).run()) {
      onError("Enter a valid link URL.");
    }
  }
  return <div className="border border-slate-300 bg-white focus-within:border-command-blue focus-within:ring-1 focus-within:ring-command-blue">
    <div className="sticky top-16 z-[5] flex flex-wrap border-b border-slate-200 bg-slate-50">
      <ToolButton label="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo2 className="h-4 w-4" /></ToolButton><ToolButton label="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo2 className="h-4 w-4" /></ToolButton>
      <ToolButton label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="h-4 w-4" /></ToolButton><ToolButton label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="h-4 w-4" /></ToolButton><ToolButton label="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><Underline className="h-4 w-4" /></ToolButton><ToolButton label="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough className="h-4 w-4" /></ToolButton>
      <ToolButton label="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="h-4 w-4" /></ToolButton><ToolButton label="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="h-4 w-4" /></ToolButton>
      <ToolButton label="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="h-4 w-4" /></ToolButton><ToolButton label="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="h-4 w-4" /></ToolButton><ToolButton label="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="h-4 w-4" /></ToolButton><ToolButton label="Link" active={editor.isActive("link")} onClick={setLink}><Link2 className="h-4 w-4" /></ToolButton><ToolButton label="Insert image" onClick={() => imageInput.current?.click()}><ImagePlus className="h-4 w-4" /></ToolButton>
      <input ref={imageInput} disabled={uploading} className="hidden" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => uploadInline(event.target.files?.[0])} />
      {uploading && <span role="status" className="px-2 py-2 text-xs text-slate-600">Uploading image…</span>}
    </div>
    <EditorContent editor={editor} />
  </div>;
}
