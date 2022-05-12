import AWS from "aws-sdk";
import fs from "fs";
import type { File } from "formidable";
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

type Data = { lastname: string; firstname: string; email: string; message: string };

export class Db {
  static data: Data[] = [];
  constructor() {}

  async read() {
    return Db.data;
  }

  async uploadFile(file: File) {
    let fileStream = fs.createReadStream(file.filepath);
    console.log(file.filepath);

    const params: AWS.S3.PutObjectRequest = {
      Bucket: process.env.AWS_BUCKET_NAME || "",
      Key: file.filepath,
      Body: fileStream,
    };

    s3.upload(params, (err, data) => {
      if (err) return console.log(err);
      return console.log(data.Location);
    });
    return true;
  }

  async write(data: Data) {
    Db.data.push();
  }
}
