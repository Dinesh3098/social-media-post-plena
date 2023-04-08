const s3 = require("./s3");
const { S3Uploader } = require("./gqlUploadr");

const imageUploader = new S3Uploader(s3, {
  baseKey: "asset",
});

module.exports = {
  imageUploader,
};
