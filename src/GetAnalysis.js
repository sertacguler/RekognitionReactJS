
export const getAnalysis = async(jobId, setResult)=>{

    const API = "https://api.hume.ai/v0/batch/jobs/"+ jobId +"/predictions";
    
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
        setResult(JSON.stringify(data));
    })
}