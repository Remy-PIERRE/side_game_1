import Controls from "./models/Controls.js";
import EventsBus from "./models/EventsBus.js";
import Map from "./models/Map.js";
import Player from "./models/Player.js";

// SETTINGS //
const mapOptions = {
	mapDim: {
		x: 51,
		y: 51,
	},
	cellsDim: {
		x: 25,
		y: 25,
	},
	pov: {
		x: document.querySelector(".playground--container").offsetWidth,
		y: document.querySelector(".playground--container").offsetHeight,
	},
};

const playerOptions = {
	dim: {
		x: 25,
		y: 25,
	},
	posInit: {
		x: 26,
		y: 26,
	},
	colors: ["#f8f38d", "#ffb480"],
};

const initApp = () => {
	const map = new Map(mapOptions);
	const controls = Controls.getInstance();
	const player = new Player(playerOptions);

	const eventBus = new EventsBus();
	eventBus.setMap(map);
	eventBus.setcontrols(controls);
	eventBus.setPlayer(player);

	map.placeEntity(player);
	map.centerOnPos(player.getPos());

	//
	controls.setDirectionsActive();

	//
	// const ennemy = new Player({
	// 	...playerOptions,
	// 	posInit: {
	// 		x: 20,
	// 		y: 20,
	// 	},
	// 	colors: ["#ff6961", "crimson"],
	// });
	// map.placeEntity(ennemy);

	// setTimeout(() => {
	// 	map.centerOnPos(ennemy.getPos());
	// }, 3000);
};

initApp();
