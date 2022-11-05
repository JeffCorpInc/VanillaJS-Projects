const video = document.getElementById("video");
const timestamp = document.getElementById("timestamp");
const progressBar= document.getElementById("progress-bar");

const playButton = document.getElementById("play");
const stopButton = document.getElementById("stop");


//Functions//

// 1- toggleVideo - Play or Pause Video
//If video is playing, then pause
//If video is paused, then play
function toggleVideo(){                                                             //.paused (is a property) tells either the media is pause or play 
    if (video.paused){                                                              //.play and .pause(is a method)
        video.play();                                                               // play button is also executing because we give it the same parameter 
    }
    else{
        video.pause();
    }
}

// 2-UpdateIcon
//If video is playing, then show pause icon
//If video is paused, then show play icon
function updateIcon(){
    
    if (video.paused){
        play.innerHTML = '<i class="fa-sharp fa-solid fa-play fa-2x"></i>';           //agr paused wali condition true hoti he to icon play wala hi rhe ga
    }
    else{                                                                             //agr paused wali condition false hoti he to icon pause wala hogae ga
        play.innerHTML = '<i class="fa-sharp fa-solid fa-pause fa-2x"></i>';
    }
}

// 3-videoProgress - Timstamp and progressBar update
function videoProgress(){                                                             //.currentTime shows the time in seconds --and .duration will tell the overall time of video 
    
    //update slider
    progressBar.value = video.currentTime/video.duration*100;                          

    //update timestamp
    //minutes
    let minutes = Math.floor(video.currentTime / 60);                                 //math.floor will round it down
    if (minutes<10){
        minutes = `0${minutes}`;                                                      //literal
    }
    //seconds
    let seconds = Math.floor(video.currentTime % 60);
    if (seconds <10){
        seconds  = `0${seconds}`;
    }
    //display timestamp
    timestamp.innerHTML = `${minutes}:${seconds}`;

    
}

// 4- resetVideo - reset to 0 time and pause the video                                //there is no stop method---if you want to stop the video--pause the video and reset its timestamp to zero
function resetVideo(){
    video.pause();
    video.currentTime = 0;                                                            
}

// 5- updateProgressBar - move progress bar manually and change time linked to progress bar
function updatePbar(){

    video.currentTime = progressBar.value * video.duration / 100;

}


//Event Listeners//

// 1- Video Element - Click to play or pause Video
video.addEventListener("click" , toggleVideo);

// 2- Video Element - Click on screen to play 
video.addEventListener("play" , updateIcon);                                          //play event occur when the media is played

// 3- Video Element - Click on screen to Pause                                      
video.addEventListener("pause" , updateIcon);                                         //pause event occur when the media is paused

// 4- Video Element - Update porgress bar and timestamp
video.addEventListener("timeupdate" , videoProgress);                                 //timeupdate triggers when the media is playing  

// 5- Play button   - Click to play or pause Video
playButton.addEventListener("click" , toggleVideo);

// 6- Stop button   - Reset Video and pause 
stopButton.addEventListener("click" , resetVideo);

// 7- Progress Bar  - move progress bar manually and update timestamp
progressBar.addEventListener("change" , updatePbar);

