// import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { shallow } from "zustand/shallow";
import { useSongStore } from "../store/songInfostore";
import { Navigate, redirect } from "react-router-dom";

import "./home.css";

const URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_SERVER_URL_DEV
    : import.meta.env.VITE_SERVER_URL_PROD;

const Home = () => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [isNavigate, setIsNavigate] = useState(false);

  const updateSongInfo = useSongStore((state) => state.updateSongInfo);

  const songInfo = useSongStore(
    (state) => ({ songInfo: state.songInfo }),
    shallow
  );

  // var device = navigator.mediaDevices.getUserMedia({ audio: true });

  useEffect(() => {
    const getMicrophonePermission = async () => {
      if ("MediaRecorder" in window) {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          setPermission(true);
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
      setAudioChunks([]);
      console.log(blob);
      console.log(typeof blob);
      // const audioUrl = URL.createObjectURL(blob);
      // console.log(audioUrl);
      // setAudio(audioUrl);
      uploadBlob(blob);
    };

    // mediaRecorder.onstop = () => {
    //     setAudioChunks(localAudioChunks);
    //     stopRecording();

    // }
  };

  async function uploadBlob(blob) {
    // Creating a new blob
    console.log("blob fuc called");

    blob = blob.slice(0, blob.size, "audio/wav");
    var fd = new FormData();
    // const myfile=new File([blob], 'curraudio.mp3');

    fd.append("upl", blob, "blobby.wav");

    // const data = new FormData();
    // data.append("name", name);
    // data.append("file", file);

    try {
      const res = await axios.post(`${URL}/uploads`, fd);
      console.log(res);
      const datasandstatus = res.data;

      console.log(datasandstatus);
      processdata(datasandstatus);
    } catch (err) {
      console.log(err);
    }
  }

  const processdata = async (datasandstatus) => {
    console.log("inside datastatus");
    const objdataandstatus = JSON.parse(datasandstatus.resbody);
    console.log("objsanddata is", objdataandstatus);
    const hasKey = objdataandstatus.hasOwnProperty("track");

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

      let combinedString = trackname.replace(/ /g, "+") + "+" + artistname.replace(/ /g, "+");
      let yturl=`https://music.youtube.com/search?q=${combinedString}`;
      
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

      setIsNavigate(true);
    }
  };

  if (isNavigate) {
    return <Navigate to="/detected" />;
  }


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
          {/* <button type="button" className="record round btn btn-outline-warning breathing" id="start-aud-recording">
        Record
    </button> */}
          
            <button
              onClick={startRecording}
              type="button"
              className={`record  round  ${recordingStatus==='recording'?'pulsing':'breathing'}`}
              id="start-aud-recording"
            >
              {recordingStatus==='recording'?'Recording...': 'Record' }
            </button>
          
          <footer className="footers d-flex justify-content-center" 
      // style="color: white;
      // font-weight: 500;
      // font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
      >
        {recordingStatus==='recording'?'Listening for music...': 'made by Yash🍀' }
      </footer>
        </div>
      </div>
    </>
  );
};

export default Home;
