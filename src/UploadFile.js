import AWS from 'aws-sdk';

export const upload = async(file, loading, setLoading, setBucket)=>{
        // S3 Bucket Name
        const S3_BUCKET = "video-rekognition-bucket-sertac";
    
        // S3 Region
        const REGION = 'eu-central-1'
    
        // S3 Credentials
        AWS.config.update({
          accessKeyId: "*****",
          secretAccessKey: "*****"
        });
        const s3 = new AWS.S3({
          params: { Bucket: S3_BUCKET },
          region: REGION,
        });
    
        // Files Parameters
        const params = {
          Bucket: S3_BUCKET,
          Key: file.name,
          Body: file,
        };
    
        // Uploading file to s3
        var upload = s3
          .putObject(params)
          .on("httpUploadProgress", (evt) => {
            // File uploading progress
            setLoading("Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%");
            console.log(
              "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
            );
          })
          .promise();
    
        await upload.then((err, data) => {
          console.log("err: ", err);
          console.log("data: ", data);
          // Fille successfully uploaded
          //alert("File uploaded successfully.");
          setLoading(file.name + " uploaded successfully.");
          setBucket("https://" + S3_BUCKET + ".s3." + REGION + ".amazonaws.com/" + file.name);
        });

}