const path = require("path");

function timestampFilenameTransform(filename = "") {
    const fileExtension = path.extname(filename);
    const fileName = path.parse(filename).name;
    return `${fileName}-${Date.now()}${fileExtension}`;
}

class S3Uploader {
    constructor(s3, config) {
        const {
            baseKey = "",
            uploadParams = {},
            concurrencyOptions = {},
            filenameTransform = timestampFilenameTransform,
        } = config;

        this._s3 = s3;
        this._baseKey = baseKey.replace("/$", "");
        this._filenameTransform = filenameTransform;
        this._uploadParams = uploadParams;
        this._concurrencyOptions = concurrencyOptions;
    }

    async upload(stream, { filename, mimetype }) {
        const transformedFilename = this._filenameTransform(filename);
        const { Location, key } = await this._s3
            .upload(
                {
                    ...this._uploadParams,
                    Body: stream,
                    Key: `${this._baseKey}/${transformedFilename}`,
                    ContentType: mimetype,
                },
                this._concurrencyOptions
            )
            .promise();
        console.log("Location", Location)
        return { Location, key };
    }
}

module.exports = { S3Uploader };
