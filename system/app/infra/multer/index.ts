import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

const multerConfig = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', '..','tmp', 'uploads'),
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return callback(err, 'Error generating filename');
        return callback(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};

export default multer(multerConfig)