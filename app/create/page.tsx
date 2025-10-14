'use client';

import { useState, useRef } from 'react';
import { MAX_FILE_BYTES } from '@/lib/limits'; 

type Kind = 'image' | 'video' | 'doc' | 'text';

export default function CreatePage() {
  const [kind, setKind] = useState<Kind>('text');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [expires, setExpires] = useState<number | ''>('');
  const [downloadsAllowed, setDownloadsAllowed] = useState(true);
  const [created, setCreated] = useState<{id:string, code:string} | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  


  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();

    setErrorMsg(null);
    // If it's a file, enforce max size on client
    if (kind !== 'text' && file) {
      if (file.size > MAX_FILE_BYTES) {
        setErrorMsg(`File is too large. Max ${(MAX_FILE_BYTES/1024/1024).toFixed(1)} MB.`);
        return;
      }
    }
    setLoading(true);

    try {
      // 1) Create object record
      const payload:any = {
        kind, title,
        downloadsAllowed,
        expiresInHours: expires === '' ? null : Number(expires),
        textContent: kind === 'text' ? text : undefined,
        filename: file?.name,
        mimeType: file?.type
      };
      const res = await fetch('/api/objects', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create object');

      const { id, code } = data;

      // 2) If file, get signed upload URL and upload
      if (kind !== 'text' && file) {
        const up = await fetch(`/api/objects/${id}/upload-url`, { 
          method:'POST', 
          headers:{'Content-Type':'application/json'}, 
          body: JSON.stringify({ filename: file.name, mimeType: file.type, size: file.size }) });
        const upData = await up.json();
        if (!up.ok) throw new Error(upData.error || 'Failed to get upload URL');

        // PUT to signed URL
        const putRes = await fetch(upData.uploadUrl, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });
        if (!putRes.ok) throw new Error('Upload failed');

        // Confirm
        await fetch(`/api/objects/${id}/confirm`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ storagePath: upData.storagePath, mimeType: file.type, bytes: file.size }) });
      }

      setCreated({ id, code });
      setFile(null);
      if (inputRef.current) inputRef.current.value = '';
    } catch (err:any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  // In the UI, show the message if present:
  {errorMsg && <p className="hint" style={{color:'#fda4af'}}>{errorMsg}</p>} 

  return (
    <main className="card">
      <h1>Create a new share</h1>
      <form onSubmit={handleCreate} style={{marginTop:12, display:'grid', gap:12}}>
        <div>
          <label className="label">Type</label>
          <select className="input" value={kind} onChange={e => setKind(e.target.value as Kind)}>
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="doc">Document</option>
          </select>
        </div>

        <div>
          <label className="label">Title (optional)</label>
          <input className="input" value={title} onChange={e=>setTitle(e.target.value)} />
        </div>

        {kind === 'text' ? (
          <div>
            <label className="label">Text content</label>
            <textarea className="input" rows={6} value={text} onChange={e=>setText(e.target.value)} placeholder="Paste or type text here..." />
          </div>
        ) : (
          <div>
            <label className="label">File</label>
            <input ref={inputRef} className="input" type="file" accept={kind==='image' ? 'image/*' : (kind==='video' ? 'video/*' : undefined)} onChange={e=>setFile(e.target.files?.[0] || null)} />
            <p className="hint">Max {(MAX_FILE_BYTES/1024/1024).toFixed(1)} MB.</p>
          </div>
        )}

        <div className="grid">
          <div>
            <label className="label">Expiry (hours, optional)</label>
            <input className="input" type="number" min={1} placeholder="e.g. 168 for 7 days" value={expires} onChange={e=>setExpires(e.target.value === '' ? '' : Number(e.target.value))} />
          </div>
          <div>
            <label className="label">Downloads allowed?</label>
            <select className="input" value={String(downloadsAllowed)} onChange={e=>setDownloadsAllowed(e.target.value === 'true')}>
              <option value="true">Yes</option>
              <option value="false">No (view only)</option>
            </select>
          </div>
        </div>

        <button className="btn" disabled={loading || (kind!=='text' && !file)}>{loading ? 'Creating...' : 'Create share'}</button>
      </form>

      {created && (
        <>
          <hr />
          <h2>Share ready</h2>
          <p>Give them this code:</p>
          <p><span className="code-badge">{created.code}</span></p>
          <p className="hint">They can enter it on the home page or go directly to <a href={`/view/${created.id}`}>/view/{created.id}</a>.</p>
        </>
      )}
    </main>
  );
}
