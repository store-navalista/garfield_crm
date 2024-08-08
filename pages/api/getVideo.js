import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const videosDirectory = path.resolve('./public/video');
    const filenames = fs.readdirSync(videosDirectory);
    const videos = filenames.map((name) => `/video/${name}`);
    res.status(200).json(videos);
}