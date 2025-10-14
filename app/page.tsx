'use client';

import { useState } from 'react';

export default function HomePage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/code/${encodeURIComponent(code.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid code');
      window.location.href = `/view/${data.id}`;
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="card">
      <h1>Enter a code to view</h1>
      <form onSubmit={onSubmit} className="row" style={{marginTop:12}}>
        <input
          className="input"
          placeholder="e.g. 7FK3QZ"
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          maxLength={12}
          aria-label="Code"
        />
        <button className="btn" disabled={loading || !code.trim()}>{loading ? 'Checking...' : 'View'}</button>
      </form>
      {error && <p className="hint" style={{color:'#fda4af', marginTop:8}}>{error}</p>}
      <hr/>
      <p className="hint">Or <a href="/create">create a new share</a>.</p>
    </main>
  );
}
