export default class Controls {
	instance;
	directions = {
		events: null,
		z: false,
		s: false,
		q: false,
		d: false,
	};

	constructor() {}

	static getInstance() {
		if (!this.instance) this.instance = new Controls();
		return this.instance;
	}

	setDirectionsActive() {
		window.addEventListener("keydown", this.handleDirectionsKeyDown);
		window.addEventListener("keyup", this.handleDirectionsKeyUp);

		this.directions = {
			...this.directions,
			events: [
				{
					type: "keydown",
					listener: this.handleDirectionsKeyDown,
				},
				{
					type: "keyup",
					listener: this.handleDirectionsKeyUp,
				},
			],
		};
	}

	setDirectionsInactive() {
		this.directions.events.forEach(({ type, listener }) =>
			window.removeEventListener(type, listener)
		);

		this.directions = {
			...this.directions,
			events: false,
		};
	}

	handleDirectionsKeyDown(event) {
		switch (event.key) {
			case "z":
				this.directions = { ...this.directions, z: true };
				window.dispatchEvent(new CustomEvent("moveup"));
				break;
			case "s":
				this.directions = { ...this.directions, s: true };
				window.dispatchEvent(new CustomEvent("movedown"));
				break;
			case "q":
				this.directions = { ...this.directions, q: true };
				window.dispatchEvent(new CustomEvent("moveleft"));
				break;
			case "d":
				this.directions = { ...this.directions, d: true };
				window.dispatchEvent(new CustomEvent("moveright"));
				break;
			default:
				break;
		}
	}

	handleDirectionsKeyUp(event) {
		switch (event.key) {
			case "z":
				this.directions = { ...this.directions, z: false };
				break;
			case "s":
				this.directions = { ...this.directions, s: false };
				break;
			case "q":
				this.directions = { ...this.directions, q: false };
				break;
			case "d":
				this.directions = { ...this.directions, d: false };
				break;
			default:
				break;
		}
	}
}
