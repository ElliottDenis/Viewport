export function makeCode(len = Number(process.env.CODE_LENGTH || 6)) {
  const alphabet = (process.env.CODE_ALPHABET || 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789');
  let out = '';
  for (let i = 0; i < len; i++) out += alphabet[Math.floor(Math.random()*alphabet.length)];
  return out;
}
