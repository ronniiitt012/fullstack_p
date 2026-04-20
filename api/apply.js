import { put } from '@vercel/blob';
import { neon } from '@neondatabase/serverless';
import formidable from 'formidable';
import { createReadStream } from 'fs';

// Disable default body parsing so formidable can handle multipart
export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Initialize DB connection
    const sql = neon(process.env.DATABASE_URL);

    // Create table if it doesn't exist yet
    await sql`
      CREATE TABLE IF NOT EXISTS applications (
        id          SERIAL PRIMARY KEY,
        name        VARCHAR(255) NOT NULL,
        email       VARCHAR(255) NOT NULL,
        phone       VARCHAR(50),
        cover_letter TEXT,
        job_title   VARCHAR(255),
        resume_url  TEXT,
        applied_at  TIMESTAMP DEFAULT NOW()
      )
    `;

    // Parse incoming multipart/form-data
    const form = formidable({ maxFileSize: 5 * 1024 * 1024 });
    const [fields, files] = await form.parse(req);

    const name        = fields.name?.[0]        || '';
    const email       = fields.email?.[0]       || '';
    const phone       = fields.phone?.[0]       || '';
    const coverLetter = fields.coverLetter?.[0] || '';
    const jobTitle    = fields.jobTitle?.[0]    || '';

    // Upload resume to Vercel Blob if present
    let resumeUrl = null;
    if (files.resume?.[0]) {
      const file   = files.resume[0];
      const stream = createReadStream(file.filepath);
      const { url } = await put(
        `resumes/${Date.now()}_${file.originalFilename}`,
        stream,
        { access: 'private' }
      );
      resumeUrl = url;
    }

    // Persist applicant record to Neon Postgres
    const [row] = await sql`
      INSERT INTO applications (name, email, phone, cover_letter, job_title, resume_url)
      VALUES (${name}, ${email}, ${phone}, ${coverLetter}, ${jobTitle}, ${resumeUrl})
      RETURNING id, applied_at
    `;

    return res.status(200).json({ success: true, id: row.id, resumeUrl });
  } catch (error) {
    console.error('Error processing application:', error);
    return res.status(500).json({ error: error.message });
  }
}
