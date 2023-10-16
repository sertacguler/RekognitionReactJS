
export const sendAnalysis = async(bucket, setJobId)=>{

    const body = {
        "models": {
          "face": {}
        },
        "urls": [
            bucket //"https://video-rekognition-bucket-sertac.s3.eu-central-1.amazonaws.com/video.mp4"
        ]
      };

    fetch("https://api.hume.ai/v0/batch/jobs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Hume-Api-Key": "******"
        },
        body: JSON.stringify(body)
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
        setJobId(data.job_id);
    })
}
