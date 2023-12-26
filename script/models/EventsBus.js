export default class EventsBus {
	instance;
	map;
	controls;
	player;

	constructor() {
		window.addEventListener("startGame", this.handleStartGame.bind(this));
	}

	static getInstance() {
		if (!this.instance) this.instance = new EventsBus();
		return this.instance;
	}

	setMap(map) {
		this.map = map;
	}

	setcontrols(controls) {
		this.controls = controls;

		window.addEventListener("moveup", () =>
			this.map.moveEntity(this.player, "up")
		);
		window.addEventListener("movedown", () =>
			this.map.moveEntity(this.player, "down")
		);
		window.addEventListener("moveleft", () =>
			this.map.moveEntity(this.player, "left")
		);
		window.addEventListener("moveright", () =>
			this.map.moveEntity(this.player, "right")
		);
	}

	setPlayer(player) {
		this.player = player;
	}

	handleStartGame() {
		this.map.centerOnPos(this.player.getPos());
	}
}
