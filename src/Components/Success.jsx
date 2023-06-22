
import React from 'react'
import { useSongStore } from '../store/songInfostore';
import { shallow } from 'zustand/shallow';
import "./success.css";
import { Navigate,useNavigate } from 'react-router-dom';

const Success = () => {

  const navigate= useNavigate();
  const {songInfo} = useSongStore(
    (state) => ({ songInfo: state.songInfo }),
    shallow
  );

  console.log("songinfo of success",songInfo);

  return (
    <>
     <div className="player">
      <div className="player_inner">
        <div className="player_inner__top">
          <img
            src={songInfo.imgsrc}
            style={{ width: '0px',
            height: '0px',
            padding: '11.89rem',
            backgroundImage: `url(${songInfo.imgsrc})`,
            backgroundPosition: 'center',
            borderRadius: '10px',
            backgroundSize: 'cover'}}
         
            
          />

          <div className="t_left">
            <i className="bi bi-arrow-left-circle-fill fa-lg"
            onClick={()=> {
              console.log("clicked");
              navigate("/")
            }}
            ></i>
          </div>
          
          <div className="t_mid">
            <h1></h1>
          </div>
        </div>
        <div className="player_inner__middle">
          <input className="trigger--4" name="omni" type="radio" />

          <input className="trigger--2" name="omni" type="radio" />
          <input className="trigger--1" name="omni" type="radio" />

          <input className="empty" />
          <div className="cube">
            <div className="cube_inner">
              <div className="cube_inner__front">
                <div className="imgcover">
                  <img
                    src={songInfo.imgsrc}
                    style={{width: '0px',
                    height: '0px',
                    padding: '12rem',
                    backgroundImage: `url(${songInfo.imgsrc})`,
                    backgroundSize: 'cover',
                    opacity: '0.3'}}
                   
                    
                  />
                </div>
                <div className="bars">
                  <div className="bars_bar"></div>
                  <div className="bars_bar"></div>
                  <div className="bars_bar"></div>
                  <div className="bars_bar"></div>
                  <div className="bars_bar"></div>
                  <div className="bars_bar"></div>
                  <div className="bars_bar"></div>
                  <div className="bars_bar"></div>
                  <div className="bars_bar"></div>
                  <div className="bars_bar"></div>
                </div>
                <div className="details">
                  <div className="details_album">
                    <img
                      src={songInfo.artistimage}
                      style={{  width: '0px',
                      height: '0px',
                      padding: '45px',
                      borderRadius: '5%',
                      backgroundColor: 'red',
                      backgroundImage: `url(${songInfo.artistimage})`,
                      backgroundSize: 'cover'}}
                        
                    />
                  </div>
                  <h2>{songInfo.trackname}</h2>
                  <h3>{songInfo.artistname}</h3>
                </div>
              </div>
              <div className="cube_inner__left ">
                <div className="options">
                  {/* {
                  if(lyricsarr.length>0){
                  lyricsarr.forEach(element =>
                   element <br/>)}
                } */}
                
                {
                  songInfo.lyrics !==undefined?
                  (songInfo.lyrics.map((elem ,idx)=>{

                    // return (<>{elem}<br/></>)
                    return(<Lines elem={elem} key={idx}/>)
                  })):null
                }
                
                 
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="r_trim"></div>
        <div className="l_trim"></div>
        <div className="shadow_right"></div>
        <div className="shadow_left"></div>
        <div className="player_inner__bottom">
          <h1>{songInfo.trackname}</h1>

          <h4>{songInfo.artistname}</h4>
          <h5>Genre: {songInfo.genres}</h5>
          <div className="buttondiv">
            <button
              type="button"
              
              onClick={()=>window.open (`${songInfo.yturl}`, "_blank")}
              className="ytmusic"
            >
              Open in Youtube Music

              <i className="bi bi-play-circle-fill fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

const Lines=({elem})=>{
  return (<>
  {elem}<br/>
  </>)
}

export default Success;