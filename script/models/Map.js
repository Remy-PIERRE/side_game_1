import Cell from "./Cell.js";

export default class Map {
	node;
	attributes = {};
	dim = { x: null, y: null };
	pov = { x: null, y: null };
	posRange = { x: [], y: [] };
	cells = [];

	constructor({ mapDim, cellsDim, pov }) {
		this.dim = mapDim;
		this.pov = {
			x: pov.x / 2 + cellsDim.x / 2,
			y: pov.y / 2 + cellsDim.y / 2,
		};

		this.createMap(cellsDim);
		this.createCells(cellsDim);

		this.posRange = {
			x: [0, -(this.node.offsetWidth - pov.x)],
			y: [0, -(this.node.offsetHeight - pov.y)],
		};
	}

	createMap(cellsDim) {
		this.node = document.createElement("div");
		this.node.id = "mapGrid";
		this.node.className = "map--grid";

		this.attributes = {
			...this.attributes,
			"grid-template-columns": `repeat(${this.dim.x}, ${cellsDim.x}px)`,
			"grid-template-rows": `repeat(${this.dim.y}, ${cellsDim.y}px)`,
		};
		this.updateAttibutes();

		const container = document.querySelector(".playground--container");
		container.appendChild(this.node);
	}

	createCells(dim) {
		for (let y = 1; y <= this.dim.y; y++) {
			for (let x = 1; x <= this.dim.x; x++) {
				const cell = new Cell({ pos: { x, y }, dim });
				this.cells.push(cell);
				this.node.appendChild(cell.getNode());
			}
		}
	}

	updateAttibutes() {
		this.node.setAttribute(
			"style",
			Object.entries(this.attributes)
				.map((entrie) => entrie.join(":"))
				.join(";")
		);
	}

	centerOnPos({ x, y }) {
		const cellsDim = this.cells[0].getDim();

		let posX, posY;
		if (this.pov.x - cellsDim.x * x > this.posRange.x[0])
			posX = this.posRange.x[0] + "px";
		else if (this.pov.x - cellsDim.x * x < this.posRange.x[1])
			posX = this.posRange.x[1] + "px";
		else posX = this.pov.x - cellsDim.x * x + "px";
		if (this.pov.y - cellsDim.y * y > this.posRange.y[0])
			posY = this.posRange.y[0] + "px";
		else if (this.pov.y - cellsDim.y * y < this.posRange.y[1])
			posY = this.posRange.y[1] + "px";
		else posY = this.pov.y - cellsDim.y * y + "px";

		this.attributes = {
			...this.attributes,
			left: posX,
			top: posY,
		};
		this.updateAttibutes();
	}

	placeEntity(entity) {
		const cell = this.cells.find(
			(cell) =>
				+entity.getPos().x === cell.getPos().x &&
				+entity.getPos().y === cell.getPos().y
		);
		cell.placeEntity(entity.getNode());
	}

	moveEntity(entity, direction) {
		const pos = entity.getPos();
		switch (direction) {
			case "up":
				if (pos.y - 1 > 0) pos.y = pos.y - 1;
				break;
			case "down":
				if (pos.y + 1 <= this.dim.y) pos.y = pos.y + 1;
				break;
			case "left":
				if (pos.x - 1 > 0) pos.x = pos.x - 1;
				break;
			case "right":
				if (pos.x + 1 <= this.dim.x) pos.x = pos.x + 1;
				break;
		}

		const cell = this.cells.find(
			(cell) => +cell.getPos().x === +pos.x && +cell.getPos().y === +pos.y
		);
		cell.placeEntity(entity.getNode());

		entity.updatePos(pos);
		this.centerOnPos(pos);
	}
}
