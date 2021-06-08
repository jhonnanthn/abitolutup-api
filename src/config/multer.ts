import multerS3 from 'multer-s3';
import path from 'path';
import {v4 as uuid} from 'uuid';
import aws from 'aws-sdk';

const MAX_SIZE_THREE_MEGABYTES = 3 * 1024 * 1024;

const storageTypes = {

    s3: multerS3({
        s3: new aws.S3({
            secretAccessKey: process.env.AWS_KEY_SECRET,
            accessKeyId: process.env.AWS_KEY_ID
        }),
        bucket: process.env.AWS_BUCKET_NAME || "",
        acl: 'public-read',
        
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (request, file, cb)=>{
            const filetype = file.originalname.split(".")[file.originalname.split(".").length-1]
            file.filename = `${new Date().toISOString()}_${uuid()}.${filetype}`;
            cb(null, file.filename);
        }
    })
};

export default {
    storage: storageTypes["s3"],
    limits: {
      fileSize: MAX_SIZE_THREE_MEGABYTES,
    },
};