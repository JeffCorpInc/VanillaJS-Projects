const musicCont = document.getElementById("music-cnt");
const playButton = document.getElementById("play");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const audioBox = document.getElementById("audio");
const progressCont = document.getElementById("progress-cnt");
const progressBar = document.getElementById("progress");
const title = document.getElementById("title");
const coverpic = document.getElementById("cover");

//List/Array of songs 
const songList = ["DJ DENZ-The Rooster"   ,
                  "Future - Mask off"     ,
                  "Hans Zimmer - Time"    ,
                  "Kisma - Fingertips "   ,
                  "LXST CXNTURY - ODIUM"  ,
                  "SICKICK - Lana Del Rey"
                                            ];

// track which song is currently playing
let currentSong = 1;

//FUNCTIONS

// function to load song to DOM

function loadSong(song){                                                //function banaya jisme hamne audio,cover or title ko update kiya... or us function
    
    title.innerText = song;                                            // ko call krke songlist se link kiya or currentSong array ko link kiya.
    audioBox.src = `musics/${song}.mp3`;
    coverpic.src = `images/${song}.jpg`;
}

loadSong(songList[currentSong]);
// // initial song load
// loadSong(songList[currentSong]);

// //funtions to playSong
// function playSong() {
    
//     musicCont.classList.add("play");                                    //musicCont me play ki class add kardi
//     playButton.querySelector("i.fas").classList.remove("fa-play");      //html me fa-play ko remove krke fa-pause ko add karwaya 
//     playButton.querySelector("i.fas").classList.add("fa-pause");

//     audio.play();
// }

// //funtions to pauseSong
// function pauseSong() {
    
//     musicCont.classList.remove("play");                                    //musicCont me play ki class add kardi
//     playButton.querySelector("i.fas").classList.add("fa-play");      //html me fa-play ko remove krke fa-pause ko add karwaya 
//     playButton.querySelector("i.fas").classList.remove("fa-pause");

//     audio.pause();
// }


// //EVENTLISTENERS

// // adding eventlisteners
// // 1- Play button 
// playButton.addEventListener("click", () => {

//         const isPlaying = musicCont.classList.contains("play");         // hamne ek const banaya, agr musicCont me "play" ki class he to value true return kare
//         if (isPlaying){
//             pauseSong();
//         } else {
//             playSong();
//         }
//     }
// )