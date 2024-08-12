import * as yaml from "./js-yaml.mjs";

const repoBranch = "space-wizards/space-station-14/master";

// backgrounds
const backgrounds = yaml.load(await (await fetch(`https://raw.githubusercontent.com/${repoBranch}/Resources/Prototypes/lobbyscreens.yml`)).text()).map(bg => bg.background);
let currentBackgroundIndex = Math.floor(Math.random() * backgrounds.length);
function changeBackground() {
	currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
	document.body.style.setProperty("--background", `url("https://raw.githubusercontent.com/${repoBranch}/Resources/${backgrounds[currentBackgroundIndex]}")`);
}
changeBackground();

// songs
const songs = yaml.load(await (await fetch(`https://raw.githubusercontent.com/${repoBranch}/Resources/Prototypes/SoundCollections/lobby.yml`)).text())[0].files;
let currentSongIndex = Math.floor(Math.random() * songs.length);
function getSong() {
	currentSongIndex = (currentSongIndex + 1) % songs.length;
	const audio = new Audio(`https://raw.githubusercontent.com/${repoBranch}/Resources/${songs[currentSongIndex]}`);
	audio.addEventListener("ended", playSong);
	return audio;
}
let nextSong = getSong();
let currentSong;
async function playSong() {
	nextSong.volume = volumeSlider.value;
	currentSong = nextSong;
	nextSong = getSong();
	return currentSong.play();
}

playSong().then(undefined, () => {
	document.addEventListener("click", playSong, {once: true});
});

volumeSlider.addEventListener("input", function() {
	currentSong.volume = this.value;
});

changeArtBtn.addEventListener("click", function() {
	if (!document.startViewTransition) {
		changeBackground();
	} else {
		document.startViewTransition(changeBackground);
	}
});