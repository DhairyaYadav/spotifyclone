console.log("Welcome to spotify");

//Intialize the variables
let audioElement = new Audio('1.mp3');
let songIndex = 0;
let masterplay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songbanner = document.getElementById('songbanner');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let song = [
    { songName: "NCS-1", filePath: "1.mp3", coverPath: "1.jpg" },
    { songName: "NCS-2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "NCS-3", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "NCS-4", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "NCS-5", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "NCS-6", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "NCS-7", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "NCS-8", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "NCS-9", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "NCS-10", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
];

songItem.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName('img')[0].src = song[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = song[i].filePath;
    // element.getElementsByClassName('timestamp')[0].innerText = song[i].duration;
});



// audioElement.play();

//Handle play/pause click
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime == 0) {
        audioElement.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterplay.classList.add('fa-play');
        masterplay.classList.remove('fa-pause');
        gif.style.opacity = 0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate', () => {

    //Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element,) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        index = parseInt(e.target.id);
        songbanner.innerText = song[index].songName;
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `songs/${index + 1}.mp3`;//
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        gif.style.opacity = 1;
    })
});

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;//
    songbanner.innerText = song[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
    gif.style.opacity = 1;
    makeAllPlays();
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 9;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;//
    songbanner.innerText = song[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
    gif.style.opacity = 1;
    makeAllPlays();
})