// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [
{
	name: "Pallikoodam",
	artist: "Hip Hop Tamizha",
	image: "https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?cs=srgb&dl=pexels-pixabay-257904.jpg&fm=jpg",
	path: "songs/pallikoodam.mp3"
},
{
	name: "Thalli Pogathey",
	artist: "Sid Sriram",
	image: "https://images.pexels.com/photos/934067/pexels-photo-934067.jpeg?cs=srgb&dl=pexels-ylanite-koppens-934067.jpg&fm=jpg",
	path: "songs/thallipogathey.mp3"
},
{
	name: "Antha Kanna",
	artist: "Uvan Shankar Raja, Anirudh Ravichander",
	image: "https://images.pexels.com/photos/668295/pexels-photo-668295.jpeg?cs=srgb&dl=pexels-tim-mossholder-668295.jpg&fm=jpg",
	path: "songs/andhakanna.mp3",
},
{
	name: "Vaathi Coming",
	artist: "Anirudh Ravichander, Gana Balachandar",
	image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?cs=srgb&dl=pexels-vishnu-r-nair-1105666.jpg&fm=jpg",
	path: "songs/vaathicoming.mp3"
},
{
	name: "Kutty Pattas",
	artist: "Santhosh Dhayanidhi, Rakshita Suresh",
	image: "https://images.pexels.com/photos/374703/pexels-photo-374703.jpeg?cs=srgb&dl=pexels-burst-374703.jpg&fm=jpg",
	path: "songs/kuttypattas.mp3"
},
{
	name: "Thangamey",
	artist: "Anirudh Ravichander",
	image: "https://images.pexels.com/photos/6320/smartphone-vintage-technology-music.jpg?cs=srgb&dl=pexels-kaboompics-com-6320.jpg&fm=jpg",
	path: "songs/thangame.mp3"
},
{
	name: "Asku Maaro",
	artist: "Dharan Kumar ft. K. Sivaangi",
	image: "https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg?cs=srgb&dl=pexels-elina-sazonova-3971985.jpg&fm=jpg",
	path: "songs/askumaaro.mp3"
},
{
	name: "Senjitaley",
	artist: "Anirudh Ravichander",
	image: "https://images.pexels.com/photos/1761362/pexels-photo-1761362.jpeg?cs=srgb&dl=pexels-ashutosh-sonwani-1761362.jpg&fm=jpg",
	path: "songs/senjitaley.mp3"
},
{
	name: "samajavaragamana",
	artist: "Sid Sriram",
	image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?cs=srgb&dl=pexels-wendy-wei-1540406.jpg&fm=jpg",
	path: "songs/samajavaragamana.mp3"
},
{
	name: "Butta Bomma",
	artist: "Armaan Malik",
	image: "https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg?cs=srgb&dl=pexels-marcelo-chagas-1876279.jpg&fm=jpg",
	path: "songs/buttabomma.mp3"
},
{
	name: "Ramuloo Ramulaa",
	artist: "Anurag Kulkarni, Mangli Satyavathi",
	image: "https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
	path: "songs/ramulooramulaa.mp3"
},
{
	name: "He's So Cute",
	artist: "Madhu Priya",
	image: "https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg?cs=srgb&dl=pexels-thibault-trillet-167491.jpg&fm=jpg",
	path: "songs/hesocute.mp3"
},
{
	name: "Saranga Dharia",
	artist: "Mangli",
	image: "https://images.pexels.com/photos/89909/pexels-photo-89909.jpeg?cs=srgb&dl=pexels-keith-wako-89909.jpg&fm=jpg",
	path: "songs/sarangadharia.mp3"
},
{
	name: "Okay Oka Lokam",
	artist: "Sid Sriram",
	image: "https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg?cs=srgb&dl=pexels-elina-sazonova-3971985.jpg&fm=jpg",
	path: "songs/okayokalokam.mp3"
},
{
	name: "Undipova",
	artist: "Spoorthi Yadagiri",
	image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendy-wei-1190298.jpg&fm=jpg",
	path: "songs/undipova.mp3"
},
{
	name: "Yevevo",
	artist: "Akhil Akkineni",
	image: "https://images.pexels.com/photos/2147029/pexels-photo-2147029.jpeg?cs=srgb&dl=pexels-laura-stanley-2147029.jpg&fm=jpg",
	path: "songs/yevevo.mp3"
},
{
	name: "Queen of Hearts",
	artist: "Starla Edney",
	image: "https://images.pexels.com/photos/3944104/pexels-photo-3944104.jpeg?cs=srgb&dl=pexels-cottonbro-3944104.jpg&fm=jpg",
	path: "songs/queenofhearts.mp3"
},
{
	name: "A Thousand Years",
	artist: "Christina Perri",
	image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?cs=srgb&dl=pexels-wendy-wei-1190297.jpg&fm=jpg",
	path: "songs/athousandyears.mp3"
},
{
	name: "By My Side",
	artist: "David Choi",
	image: "https://images.pexels.com/photos/290660/pexels-photo-290660.jpeg?cs=srgb&dl=pexels-pixabay-290660.jpg&fm=jpg",
	path: "songs/bymyside-david.mp3"
},
{
	name: "Run Free",
	artist: "Deep Chills",
	image: "https://images.pexels.com/photos/736843/pexels-photo-736843.jpeg?cs=srgb&dl=pexels-kat-jayne-736843.jpg&fm=jpg",
	path: "songs/runfree.mp3"
},
{
	name: "Play Date",
	artist: "Melanie Martinez",
	image: "https://images.pexels.com/photos/60783/pexels-photo-60783.jpeg?cs=srgb&dl=pexels-caio-60783.jpg&fm=jpg",
	path: "songs/playdate.mp3"
},
{
	name: "Heading Home",
	artist: "Alan Walker, Ruben",
	image: "https://images.pexels.com/photos/111287/pexels-photo-111287.jpeg?cs=srgb&dl=pexels-clem-onojeghuo-111287.jpg&fm=jpg",
	path: "songs/headinghome.mp3"
},
{
	name: "Umbrella",
	artist: "Ember Island",
	image: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?cs=srgb&dl=pexels-thibault-trillet-167636.jpg&fm=jpg",
	path: "songs/umbrella.mp3"
},
{
	name: "At My Worst",
	artist: "Pink Sweats",
	image: "https://images.pexels.com/photos/426976/pexels-photo-426976.jpeg?cs=srgb&dl=pexels-jacob-morch-426976.jpg&fm=jpg",
	path: "songs/atmyworst.mp3"
},
];
function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
    
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    // Update details of the track
    track_art.style.backgroundImage =
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
    
    // Apply a random background color
    random_bg_color();
    }
    
    function random_bg_color() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    
    // Construct a color withe the given values
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    
    // Set the background to the new color
    document.body.style.background = bgColor;
    }
    
    // Function to reset all values to their default
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    }
    function playpauseTrack() {
        // Switch between playing and pausing
        // depending on the current state
        if (!isPlaying) playTrack();
        else pauseTrack();
        }
        
        function playTrack() {
        // Play the loaded track
        curr_track.play();
        isPlaying = true;
        
        // Replace icon with the pause icon
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        }
        
        function pauseTrack() {
        // Pause the loaded track
        curr_track.pause();
        isPlaying = false;
        
        // Replace icon with the play icon
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
        }
        
        function nextTrack() {
        // Go back to the first track if the
        // current one is the last in the track list
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;
        
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
        }
        
        function prevTrack() {
        // Go back to the last track if the
        // current one is the first in the track list
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length;
        
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
        }
        function seekTo() {
            // Calculate the seek position by the
            // percentage of the seek slider
            // and get the relative duration to the track
            seekto = curr_track.duration * (seek_slider.value / 100);
            
            // Set the current track position to the calculated seek position
            curr_track.currentTime = seekto;
            }
            
            function setVolume() {
            // Set the volume according to the
            // percentage of the volume slider set
            curr_track.volume = volume_slider.value / 100;
            }
            
            function seekUpdate() {
            let seekPosition = 0;
            
            // Check if the current track duration is a legible number
            if (!isNaN(curr_track.duration)) {
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                seek_slider.value = seekPosition;
            
                // Calculate the time left and the total duration
                let currentMinutes = Math.floor(curr_track.currentTime / 60);
                let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(curr_track.duration / 60);
                let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
            
                // Add a zero to the single digit time values
                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
            
                // Display the updated duration
                curr_time.textContent = currentMinutes + ":" + currentSeconds;
                total_duration.textContent = durationMinutes + ":" + durationSeconds;
            }
            }
// Load the first track in the tracklist
loadTrack(track_index);
                        