export default class Cell {
	node;
	attributes;
	dim;
	pos;

	constructor({ dim, pos }) {
		this.dim = dim;
		this.pos = pos;

		this.createCell();
	}

	getNode() {
		return this.node;
	}

	getDim() {
		return this.dim;
	}

	getPos() {
		return this.pos;
	}

	createCell() {
		this.node = document.createElement("div");
		this.node.id = `${this.pos.x}-${this.pos.y}`;
		this.node.className = "map--cell";

		this.attributes = {
			...this.attributes,
			width: `${this.dim.x}px`,
			height: `${this.dim.y}px`,
		};
		this.updateAttibutes();
	}

	updateAttibutes() {
		this.node.setAttribute(
			"style",
			Object.entries(this.attributes)
				.map((entrie) => entrie.join(":"))
				.join(";")
		);
	}

	placeEntity(entity) {
		this.node.appendChild(entity);
	}
}
