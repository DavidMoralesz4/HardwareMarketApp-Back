import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../config/firebase.js';
// import sharp from 'sharp';

export const uploadFile = async (file) => {
  // console.log('--> File recibida: ', file);
  let fileBuffer = file.buffer;
  //   console.log('--> File buffer: ', fileBuffer)
  // await sharp(file.buffer)
  // .resize({ width: 200, height: 200, fit: 'cover' })
  // .toBuffer();

  const fileRef = ref(storage, `products/${Date.now()}-${file.originalname}`);
  // console.log('--> FileRef: ', fileRef)
  const fileMetadata = {
    contentType: file.mimetype,
  };

  const fileUploadPromise = uploadBytesResumable(
    fileRef,
    fileBuffer,
    fileMetadata
  );

  await fileUploadPromise;

  const fileDownloadURL = await getDownloadURL(fileRef);
  // console.log('--> fileDownloadURL: ', fileDownloadURL)

  return { ref: fileRef, downloadURL: fileDownloadURL };
};
