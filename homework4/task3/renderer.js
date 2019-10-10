let renderer = {

	map: "",
	
	render() {	
		
		for (let row = 0; row < config.rowsCount; row++) {
			for (let col = 0; col < config.colsCount; col++) {
				
				if (player.y === row && player.x === col) {
					this.map += config.gamerChar;
				} else if (config.targetModeOn && player.y === row) {
					this.map += "- ";
				} else if (config.targetModeOn && player.x === col) {
					this.map += "| ";
				} else {
					this.map += config.fieldChar;
				}
			}			
			this.map += '\n';
		}
		this.map += `Режим pacman (команда 5) - ${config.getPacmanModeString()}\n`;
		this.map += `Режим target (команда 10) - ${config.getTargetModeString()}\n`;
		console.log(this.map);
	},
	
	clear() {
		console.clear();
		this.map = "";
	}
};