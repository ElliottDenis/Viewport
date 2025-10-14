# Viewport (MVP)

## Local setup

1. Copy .env.sample to .env.local and fill with your Supabase keys.
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create a Supabase Storage bucket called \`objects\` and run \`sql/schema.sql\` in your Supabase SQL editor.
4. Start dev server:
   \`\`\`bash
   npm run dev
   \`\`\`
5. Visit http://localhost:3000

## Notes
- This is a minimal MVP. It uses the Supabase anon key on the client for storage uploads (simple). For production, use server-signed upload URLs and enforce quotas/security on the server.
- Add environment variables to Vercel when deploying.

