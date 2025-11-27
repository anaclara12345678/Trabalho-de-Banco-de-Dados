const BASE = '' // same host, relative

async function get(path) {
  const res = await fetch('/api' + path);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
async function post(path, body) {
  const res = await fetch('/api' + path, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
async function del(path) {
  const res = await fetch('/api' + path, { method:'DELETE' });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
export default { get, post, del }
