export default async function handler(req, res) {
  const SHEET =
    'https://docs.google.com/spreadsheets/d/e/' +
    '2PACX-1vSM1TpPHBqHM1WHx2jwOtNTrPuA55fiG7MifQ6FoCz_C0KrmMkBkRAqhQfYC_bmntSEnUpAC_PmVtjM' +
    '/pub?gid=0&single=true&output=csv';

  try {
    const r = await fetch(SHEET);
    if (!r.ok) throw new Error('Google returned HTTP ' + r.status);
    const text = await r.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    // Cache for 60 seconds on CDN, serve stale for up to 30s while revalidating
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
    res.status(200).send(text);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
