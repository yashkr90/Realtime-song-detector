import { create } from "zustand";

export const useSongStore = create((set, get) => ({
  songInfo: 
    {
      trackname: "",
      artistname: "",
      lyrics: [],
      imgsrc: "",
      artistimage: "",
      genres: "",
      yturl: "",
    },
  

  updateSongInfo: async (newSongInfo) => {
    // var arr = [trackname, artistname, imgsrc, artistimage, genres, yturl];

    console.log("newSongInfo", newSongInfo);
    // const newsong = state.songInfo.map((elem) => {
    //   console.log(elem);
    //   return { [elem]: newSongInfo[elem] };
    // });
    // console.log("newsong is ", newsong);
    // return { songInfo: newsong };

    set((state) => {

      console.log("original song info", state.songInfo);


      // const newsong = state.songInfo.map((elem) => {
      //   console.log(elem);
      //   return { [elem]: newSongInfo[elem] };
        
      // });
      // let oldsongonfo=state.songInfo;
      // old
      
      // console.log("newsong is ", newsong);
      return { songInfo: newSongInfo };
    });
    // console.log(songInfo);
    //is the same as:
    // set(state => ({ amount: newAmount + state.amount  }))
  },
}));
