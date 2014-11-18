function GameState(maxTurns, width, height, spawn, startingEnergy){
	var self = this;
	self.rows = height || width || 20;
	self.cols = width || 20;
	self.maxTurns = maxTurns || 200
	self.turnsElapsed = 0;
	startingEnergy = startingEnergy || 0;
	self.p1 = {
		energy: startingEnergy,
		spawn: self.cols + 1
	}
	self.p2 = {
		energy: startingEnergy,
		spawn: (self.cols * self.rows) - self.p1.spawn - 1
	}
	function getInitialGrid(){
		var grid = "";
		for(y = 0; y<self.cols; y++){
			for(x = 0; x< self.rows; x++){
				grid = grid.concat(".");
			}
		}
		grid = grid.substr(0, self.p1.spawn) + "1" + grid.substr(self.p1.spawn + 1);
		grid = grid.substr(0, self.p2.spawn) + "2" + grid.substr(self.p2.spawn + 1);
		return grid;
	}
	self.grid = getInitialGrid();
}
