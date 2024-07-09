import { FilesetResolver, HandLandmarker, HandLandmarkerResult } from '@mediapipe/tasks-vision';
import React, { useEffect, useRef } from 'react';
import { setInterval } from 'timers/promises';

type Props = {
  setHandResults: () => void;
};

const HandRecognizer = ({ setHandResults }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    initVideoAndModel();
  }, []);

  const initVideoAndModel = async () => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      return;
    }
    await initVideo(videoElement);
    const handLandmarker= await initModel();
     setInterval(()=>{
      const detections  = handLandmarker.detectForVideo(videoElement,Date.now());
      processDetections(detections,setHandResults);
     })
  };

  return (
    <div>
      <video ref={videoRef}></video>
    </div>
  );
};

export default HandRecognizer;

async function initVideo(videoElement: HTMLVideoElement) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });
  videoElement.srcObject = stream;
  videoElement.addEventListener('loadeddata', () => {
    videoElement.play();
  });
}
 async function initModel(videoElement: HTMLVideoElement) {
  const wasm =await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm");
  const handLandmarker =HandLandmarker.createFromOptions(wasm,{
    baseOptions: {
      modelAssetPath:"https://storage.googleapis.com/mediapipe-models/hand_landmaeker/hand_landmarker/float16/1/hand_landmark.task",
      delegate: 'GPU'
  },
  numHands:2,
  runningMode:'VIDEO'
 });
 return handLandmarker
}

function processDetections(detections: HandLandmarkerResult, setHandResults: () => void) {
 
 console.log("");
}

