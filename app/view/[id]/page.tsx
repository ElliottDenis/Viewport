'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type AccessResp =
  | { error: string }
  | { kind: 'text', text: string }
  | { kind: 'image' | 'video' | 'doc', url: string, mimeType?: string };

export default function ViewPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [data, setData] = useState<AccessResp | null>(null);
  const [meta, setMeta] = useState<any>(null);

  useEffect(() => {
    async function fetchMeta() {
      const res = await fetch(`/api/objects/${id}/meta`);
      const d = await res.json();
      setMeta(d);
    }
    async function fetchAccess() {
      const res = await fetch(`/api/objects/${id}/access`);
      const d = await res.json();
      setData(d);
    }
    fetchMeta();
    fetchAccess();
  }, [id]);

  if (!data) return <main className="card"><p>Loading...</p></main>;
  if ('error' in data) return <main className="card"><p style={{color:'#fda4af'}}>Error: {data.error}</p></main>;

  return (
    <main className="card">
      <h1>{meta?.title || 'Shared item'}</h1>
      {data.kind === 'text' ? (
        <pre style={{whiteSpace:'pre-wrap', background:'#0f1117', padding:12, borderRadius:12, border:'1px solid #2b2f3b'}}>{data.text}</pre>
      ) : data.kind === 'image' ? (
        <img src={data.url} alt={meta?.title || 'Shared image'} style={{maxWidth:'100%', borderRadius:12, border:'1px solid #2b2f3b'}} />
      ) : data.kind === 'video' ? (
        <video src={data.url} controls style={{width:'100%', borderRadius:12, border:'1px solid #2b2f3b'}} />
      ) : (
        <p><a className="btn" href={data.url} target="_blank" rel="noreferrer">Open file</a></p>
      )}

      <hr/>
      <p className="hint">Signed URLs are short‑lived — refresh the page if it expires.</p>
    </main>
  );
}
