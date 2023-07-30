
import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { shallow } from "zustand/shallow";
import { useSongStore } from "../store/songInfostore";
import { Navigate, redirect, useNavigate } from "react-router-dom";

import "./home.css";

const URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_SERVER_URL_DEV
    : import.meta.env.VITE_SERVER_URL_PROD;



const Home = () => {
  const navigate = useNavigate();
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);

  const updateSongInfo = useSongStore((state) => state.updateSongInfo);

  // var device = navigator.mediaDevices.getUserMedia({ audio: true });

  useEffect(() => {
    const getMicrophonePermission = async () => {
      if ("MediaRecorder" in window) {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });

          setStream(mediaStream);
        } catch (err) {
          alert(err.message);
        }
      } else {
        alert("The MediaRecorder API is not supported in your browser.");
      }
    };
    getMicrophonePermission();
  }, []);

  const startRecording = () => {
    setRecordingStatus("recording");
    console.log("recording started");
    //create new Media recorder instance using the stream
    const mediaRecorder = new MediaRecorder(stream);

    //set the MediaRecorder instance to the mediaRecorder ref
    // mediaRecorder.current = media;
    //invokes the start method to start the recording process

    mediaRecorder.start(5000);
    setTimeout(() => {
      mediaRecorder.stop();
    }, 5000);
    let localAudioChunks = [];
    mediaRecorder.ondataavailable = (event) => {
      localAudioChunks.push(event.data);
    };

    // setAudioChunks(localAudioChunks);

    mediaRecorder.onstop = () => {
      const blob = new Blob(localAudioChunks, { type: "audio/webm" });
      localAudioChunks = [];
      console.log(blob);
      console.log(typeof blob);

      uploadBlob(blob);
    };
  };

  async function uploadBlob(blob) {
    // Creating a new blob
    console.log("blob fuc called");

    blob = blob.slice(0, blob.size, "audio/wav");
    var fd = new FormData();
    // const myfile=new File([blob], 'curraudio.mp3');

    fd.append("upl", blob, "blobby.wav");

    //fetch song from backend
    try {
      const res = await axios.post(`${URL}/uploads`, fd, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      const datasandstatus = res.data;

      console.log(datasandstatus);
      processdata(datasandstatus);
    } catch (err) {
      console.log(err);
    }
  }

  //get required data and update store with new data
  const processdata = async (datasandstatus) => {
    console.log("inside datastatus");
    const objdataandstatus = JSON.parse(datasandstatus.resbody);
    console.log("objsanddata is", objdataandstatus);
    const hasKey = objdataandstatus.hasOwnProperty("track");

    //check if returned data is 200 ok
    if (hasKey && datasandstatus.statuscode === 200) {
      window.navigator.vibrate(400, 100, 400, 100, 200);
      console.log("inside 200 success");

      var trackname = objdataandstatus.track.title;
      var artistname = objdataandstatus.track.subtitle;
      var imgsrc = objdataandstatus.track.images.coverarthq;
      var lyrics = objdataandstatus.track.sections[1].text;
      var artistimage = objdataandstatus.track.images.background;
      var genres = objdataandstatus.track.genres.primary;
      // var yturl = objdataandstatus.track.hub.providers[1].actions[0].uri;

      let combinedString =
        trackname.replace(/ /g, "+") + "+" + artistname.replace(/ /g, "+");
      let yturl = `https://music.youtube.com/search?q=${combinedString}`;

      console.log("lyrics is of" + typeof lyrics);
      console.log(lyrics);

      var newsonginfo = {
        trackname,
        artistname,
        lyrics,
        imgsrc,
        artistimage,
        genres,
        yturl,
      };
      console.log("newsong info ", newsonginfo);
      await updateSongInfo(newsonginfo);

      console.log(
        "songInfo after state update",
        useSongStore.getState().songInfo
      );

      //navigate to detected if song found
      navigate("/detected");
    } else {
      window.navigator.vibrate(300, 100, 300);
      console.log("inside failed");

      //navigate to fail is not found
      navigate("/failed");
    }
  };

  return (
    <>
      <div className="recording" id="aud-recorder">
        <div
          className="container writing recording align-items-center justify-content-center"
          id="aud-record-status"
        >
          Tap the button to start recording
        </div>

        <div className="container  align-items-center justify-content-center">
  
          <button
            onClick={startRecording}
            type="button"
            className={`record  round  ${
              recordingStatus === "recording" ? "pulsing" : "breathing"
            }`}
            id="start-aud-recording"
          >
            {recordingStatus === "recording" ? "Recording..." : "Record"}
          </button>

          <footer
            className="footers d-flex justify-content-center"
    
          >
            {recordingStatus === "recording"
              ? "Listening for music..."
              : "made by Yash🍀"}
          </footer>
        </div>
      </div>
    </>
  );
};

export default Home;
