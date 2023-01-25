const musicCont = document.getElementById("music-cnt");
const playButton = document.getElementById("play");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const audioBox = document.getElementById("audio");
const progressCont = document.getElementById("progress-cnt");
const progressBar = document.getElementById("progress");
const title = document.getElementById("title");
const coverpic = document.getElementById("cover-pic");

//List/Array of songs 
const songList = ["DJ DENZ-The Rooster"   ,
                  "Future - Mask off"     ,
                  "Hans Zimmer - Time"    ,
                  "Kisma - Fingertips"   ,
                  "LXST CXNTURY - ODIUM"  ,
                  "SICKICK - Lana Del Rey"];

// track which song is currently playing
let currentSong = 1;

//FUNCTIONS

// function to load song to DOM

function loadSong(s){                                                            //function banaya jisme hamne audio,cover or title ko update kiya... or us function
    
    title.innerText = s;                                                        // ko call krke songlist se link kiya or currentSong array ko link kiya.
    audioBox.src = `musics/${s}.mp3`;
    coverpic.src = `images/${s}.jpg`;
}

// initial song load
loadSong(songList[currentSong]);

//funtions to playSong
function playSong(){
    
    musicCont.classList.add("play");                                           //musicCont me play ki class add kardi
    playButton.querySelector("i.fa-solid").classList.remove("fa-play");         //html me fa-play ko remove krke fa-pause ko add karwaya 
    playButton.querySelector("i.fa-solid").classList.add("fa-pause");

    audio.play();
}

//funtions to pauseSong
function pauseSong(){
    
    musicCont.classList.remove("play");                                            //musicCont me play ki class add kardi
    playButton.querySelector("i.fa-solid").classList.add("fa-play");                //html me fa-play ko remove krke fa-pause ko add karwaya 
    playButton.querySelector("i.fa-solid").classList.remove("fa-pause");

    audio.pause();
}

//funtions to previous Song
function prevSong(){
    
    currentSong--;                                                                      //hamne currentsong ki value me -1 karadiya            
    if (currentSong < 0 ) {                                                             //or condition di ke songlist ki total length me 1 minus karate rho
        currentSong = songList.length - 1;
    }
    
    loadSong(songList[currentSong]);                                                    //loadsong karadiya take UI update ho audio or image ki 
    playSong();                                                                         //playsong function call kardiya take prevsong press pr play ho
}

//funtions to mext Song
function nextSong(){

    currentSong++;

    if (currentSong > songList.length - 1) {
        currentSong = 0;
    }

    loadSong(songList[currentSong]);
    playSong();
}

//funtions to update progress bar
function updateProgress(e){
    
    const {currentTime, duration} = e.srcElement;                       //event premeter ki ek property he srcElement jis se ham timeupdate me se kch data lenge
    const progressprecentage = (currentTime / duration) * 100;
    progressBar.style.width = `${progressprecentage}%`;
}
//funtions to drag progress bar
function dragProgress(e){
    const progressWidth = this.clientWidth;                             //"this" use hota he agr hame ksi bhi jaga/container pr click karna ho 
    const offsetXvalue = e.offsetX;                                     //offsetX start se ksi bhi point ki value batata he
    const duration = audioBox.duration;
    audioBox.currentTime = (offsetXvalue / progressWidth) * duration;
}

// initial song load
loadSong(songList[currentSong]);




//EVENTLISTENERS

// adding eventlisteners
// 1- Play button 
playButton.addEventListener("click", () => {

        const isPlaying = musicCont.classList.contains("play");         // hamne ek const banaya, agr musicCont me "play" ki class he to value true return kare
        if (isPlaying){
            pauseSong();
        } else {
            playSong();
        }
    }
)
// 1- Previous button 
previousButton.addEventListener("click" , prevSong);

// 2- Next button 
nextButton.addEventListener('click', nextSong);

// 3- Updated Progress
audioBox.addEventListener("timeupdate", updateProgress)

// 4- drag Progress
progressCont.addEventListener("click",dragProgress)

//automatically play next song 
audioBox.addEventListener("ended", nextSong);