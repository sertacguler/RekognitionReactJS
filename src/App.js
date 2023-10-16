import { useState } from "react";
import { Player } from "video-react";

import { upload } from "./UploadFile";
import { sendAnalysis } from "./SendAnalysis";
import { getAnalysis } from "./GetAnalysis";
import { checkStatus } from "./CheckStatus";

import './App.css';

function App() {
  const [videoSrc , seVideoSrc] = useState("");
  // Create state to store file
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState('');
  const [bucketUrl, setBucketUrl] = useState('');
  const [jobId, setJobId] = useState('');
  const [jobStatus, setJobStatus] = useState('');
  const [result, setResult] = useState([]);

  // Function to upload file to s3
  const uploadFile = () =>{
    upload(file, loading, setLoading, setBucketUrl);
    videoWatch();
  }
  
  // Function to send analysis
  const sendFileToAnalysis = () =>{
    sendAnalysis(bucketUrl, setJobId);
  }

  const _checkStatus = () =>{
    checkStatus(jobId, setJobStatus);
  }

  // Function to get analysis
  const getTheAnalysis = () =>{
    getAnalysis(jobId, setResult);
  }

  // Function to handle file and store it to file state
  const handleFileChange = (e) => {
    // Uploaded file
    const file = e.target.files[0];
    // Changing file state
    setFile(file);
  };

  const videoWatch = () => {
    seVideoSrc(bucketUrl);
  };

  return (
    <div>
      <div>
        <div className="row">
          <div className="col-sm-4">
            <input type="file" onChange={handleFileChange}  className="button"/>
            <br/><br/>
            <button className="btn btn-info" onClick={uploadFile}>Upload</button>
            <br/>
            <span>{loading}</span>
            <br/>
            <span>{!!bucketUrl ? "Bucket Url: "+bucketUrl : ""}</span>
            <br/><br/>
            <button className="btn btn-info" onClick={sendFileToAnalysis}>Start Analysis</button> 
            <br/>
            <span>{!!jobId ? "jobId: "+jobId : ""}</span>
            <br/><br/>
            <button className="btn btn-info" onClick={_checkStatus}>Check Status The Analysis</button>
            <br/>
            <span>{!!jobStatus ? "Job Status: "+jobStatus : ""}</span>
            <br/><br/>
            <button className="btn btn-info" onClick={getTheAnalysis}>Get Analysis</button>
            <br/>
          </div>
          <div className="col-sm-8 border">
          <br/>
            {!!bucketUrl ? <video src={bucketUrl}  width="800" height="400" controls /> :
              ""//<video src="https://video-rekognition-bucket-sertac.s3.eu-central-1.amazonaws.com/videoCV.mp4"  width="800" height="400" controls />
            }
            <br/>
            <span>{result.length !== 0 ? "result: "+result : ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
