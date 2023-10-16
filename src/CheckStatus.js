
export const checkStatus = async(jobId, setJobStatus)=>{

    const API = "https://api.hume.ai/v0/batch/jobs/"+ jobId;
    
    fetch(API, {
        method: "GET",
        headers: {
            'accept': 'application/json; charset=utf-8',
            "X-Hume-Api-Key": "****"
        },
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
        setJobStatus(JSON.stringify(data?.state?.status));
    })
}