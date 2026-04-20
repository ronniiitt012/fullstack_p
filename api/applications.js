import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    const applications = await sql`
      SELECT id, name, email, phone, cover_letter, job_title, resume_url, applied_at
      FROM applications
      ORDER BY applied_at DESC
    `;

    return res.status(200).json({ applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return res.status(500).json({ error: error.message });
  }
}
