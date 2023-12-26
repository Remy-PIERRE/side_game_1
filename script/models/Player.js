export default class Player {
	node;
	dim = { x: null, y: null };
	posInit = { x: null, y: null };
	pos = { x: null, y: null };
	attributes = {};
	pos = { x: null, y: null };

	constructor({ dim, posInit, colors }) {
		this.dim = dim;
		this.posInit = posInit;
		this.pos = posInit;

		this.createPlayer(colors);
	}

	getNode() {
		return this.node;
	}

	getPos() {
		return this.pos;
	}

	updateAttibutes() {
		this.node.setAttribute(
			"style",
			Object.entries(this.attributes)
				.map((entrie) => entrie.join(":"))
				.join(";")
		);
	}

	createPlayer(colors) {
		this.node = document.createElement("div");
		this.node.id = "player";
		this.node.className = "map--player";

		this.attributes = {
			...this.attributes,
			"width": `${this.dim.x}px`,
			"height": `${this.dim.y}px`,
			"background": colors[0],
			"border-color": colors[1],
		};
		this.updateAttibutes();

		const container = document.querySelector(".playground--container");
		container.appendChild(this.node);
	}

	updatePos({ x, y }) {
		this.pos = { x, y };
	}
}
