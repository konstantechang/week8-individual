const express = require('express');

const router = express.Router();
const appError = require('../utils/appError');
const handleErrorAsync = require('../middleware/handleErrorAsync');
const sizeOf = require('image-size');
const upload = require('../utils/image');
const { ImgurClient } = require('imgur');
const { isAuthor } = require('../middleware/handleJWT');
const handleSuccess = require('../utils/successHandle');

router.post(
  '/',
  isAuthor,
  upload,
  handleErrorAsync(async (req, res, next) => {
    if (!req.files.length) {
      return next(appError(400, '尚未上傳檔案', next));
    }
    const client = new ImgurClient({
      clientId: process.env.IMGUR_CLIENTID,
      clientSecret: process.env.IMGUR_CLIENT_SECRET,
      refreshToken: process.env.IMGUR_REFRESH_TOKEN,
    });
    const response = await client.upload({
      image: req.files[0].buffer.toString('base64'),
      type: 'base64',
      album: process.env.IMGUR_ALBUM_ID,
    });
    return handleSuccess(res, response.data.link);
  }),
);

module.exports = router;