import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const filename = req.headers['x-filename'];

    if (!filename) {
      return res.status(400).json({ error: 'Filename header is required' });
    }

    // Upload to Vercel Blob under the 'resumes/' prefix, private access
    const { url } = await put(`resumes/${filename}`, req, { access: 'private' });

    return res.status(200).json({ url });
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    return res.status(500).json({ error: 'Failed to upload file to Vercel Blob' });
  }
}
