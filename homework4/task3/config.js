const config = {
	rowsCount: 10,
	colsCount: 10,
	pacmanModeOn: true,
	targetModeOn: false,
	gamerChar: "o ",
	fieldChar: "x ",
	
	getPacmanModeString() {
		let state = "выключен";
		if (this.pacmanModeOn) {
			state = "включен";
		}
		return state;
	},
	
	getTargetModeString() {
		let state = "выключен";
		if (this.targetModeOn) {
			state = "включен";
		}
		return state;
	},
	
	changePacmanMode() {
		this.pacmanModeOn = !this.pacmanModeOn;
		
		alert(`Режим pacman будет ${this.getPacmanModeString()}`);
	},
	
	setFieldChar() {
		if (this.pacmanModeOn) {
			this.gamerChar = "c ";
			this.fieldChar = ". ";
		} else {
			this.gamerChar = "o ";
			this.fieldChar = "x ";
		}
	},
	
	changeTargetMode() {
		this.targetModeOn = !this.targetModeOn;
		
		alert(`Режим target будет ${this.getTargetModeString()}`);
	},
};