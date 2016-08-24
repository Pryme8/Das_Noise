Worley = function(args){	
	this._init(args);
};

Worley.prototype._init = function(args){
	if(typeof args.seed == 'undefined' || args.seed == 0){args.seed = 1;}	
	if(typeof args.width !== 'undefined' && typeof args.width == 'number'){args.width = Math.floor(args.width)};
	if(typeof args.width == 'undefined' || args.width < 1 || typeof args.width != 'number'){ args.width = 100;}
	if(typeof args.height !== 'undefined' && typeof args.height == 'number'){args.height = Math.floor(args.height)};
	if(typeof args.height == 'undefined' || args.height < 1 || typeof args.height != 'number'){ args.height = 100;}	
	if(typeof args.nPoints !== 'undefined' && typeof args.nPoints == 'number'){args.nPoints = Math.floor(args.nPoints)}
	if(typeof args.nPoints == 'undefined' || args.nPoints < 2 || typeof args.nPoints != 'number' ){ args.nPoints = 4;}
	if(typeof args.n !== 'undefined' && typeof args.n == 'number'){args.n = Math.floor(args.n)};
	if(typeof args.n == 'undefined' || args.n < 1 || typeof args.n != 'number'){ args.n = 2;}
	if(args.style != 'euclidean' && args.style != 'manhattan' && args.style != 'chebyshev' && args.style != 'canberra' && args.style != 'braycurtis'){ args.style = 'euclidean';}
	
	this._seed = this._Seed(args.seed);
	this._args = {
		width: args.width,
		height: args.height,
		nPoints : args.nPoints,
		n : args.n,
		style : args.style,
	};
	
	this.map = new Array(this._args.nPoints);
	for(var i=0; i<this.map.length; i++){
		this.map[i] = [this._Seed(this._seed+((1+i)*2.96)),this._Seed(this._seed+((1+i)*4.52))];
	}
	
}
									
Worley.prototype._NormalMap = function(zone){//zone is an array [x,y];
	var nMap = [];
	var zN10 = this._normalizeZone([zone[0]-1,zone[1]-1]); //NorthWest
	var zN00 = this._normalizeZone([zone[0],zone[1]-1]); //North
	var zN01 = this._normalizeZone([zone[0]+1,zone[1]-1]); //NorthEast
	var zM10 = this._normalizeZone([zone[0]-1,zone[1]]);
	var zM00 = this._normalizeZone([zone[0],zone[1]]);
	var zM01 = this._normalizeZone([zone[0]+1,zone[1]]);
	var zS10 = this._normalizeZone([zone[0]-1,zone[1]+1]);
	var zS00 = this._normalizeZone([zone[0],zone[1]+1]);
	var zS01 = this._normalizeZone([zone[0]+1,zone[1]+1]);
	
	nMap = zN10.concat(zN00,zN01,zM10,zM00,zM01,zS10,zS00,zS01);
  
   return nMap;
}

Worley.prototype._NormalMap2 = function(zone){//zone is an array [x,y];
	var nMap = [];
	var zN10 = this._normalizeZone2([zone[0]-1,zone[1]-1]); //NorthWest
	var zN00 = this._normalizeZone2([zone[0],zone[1]-1]); //North
	var zN01 = this._normalizeZone2([zone[0]+1,zone[1]-1]); //NorthEast
	var zM10 = this._normalizeZone2([zone[0]-1,zone[1]]);
	var zM00 = this._normalizeZone2([zone[0],zone[1]]);
	var zM01 = this._normalizeZone2([zone[0]+1,zone[1]]);
	var zS10 = this._normalizeZone2([zone[0]-1,zone[1]+1]);
	var zS00 = this._normalizeZone2([zone[0],zone[1]+1]);
	var zS01 = this._normalizeZone2([zone[0]+1,zone[1]+1]);
	
	nMap = zN10.concat(zN00,zN01,zM10,zM00,zM01,zS10,zS00,zS01);
  
   return nMap;
}

Worley.prototype._NormalMap3 = function(zone){//zone is an array [x,y];
	var nMap = [];
	var zN10 = this._normalizeZone3([zone[0]-1,zone[1]-1]); //NorthWest
	var zN00 = this._normalizeZone3([zone[0],zone[1]-1]); //North
	var zN01 = this._normalizeZone3([zone[0]+1,zone[1]-1]); //NorthEast
	var zM10 = this._normalizeZone3([zone[0]-1,zone[1]]);
	var zM00 = this._normalizeZone3([zone[0],zone[1]]);
	var zM01 = this._normalizeZone3([zone[0]+1,zone[1]]);
	var zS10 = this._normalizeZone3([zone[0]-1,zone[1]+1]);
	var zS00 = this._normalizeZone3([zone[0],zone[1]+1]);
	var zS01 = this._normalizeZone3([zone[0]+1,zone[1]+1]);
	
	nMap = zN10.concat(zN00,zN01,zM10,zM00,zM01,zS10,zS00,zS01);
  
   return nMap;
}

Worley.prototype._normalizeZone = function(zone){
	var zWidth = this._args.width, zHeight = this._args.height;
	var zX = zone[0], zY = zone[1];
	var xOffset = zX*zWidth, yOffset = zY*zHeight;
	var nMap = [];
	for(var i=0; i< this.map.length; i++){ //you can do map length or nPoints it does not matter they are the same.
		nMap.push(
		[this._Seed([this.map[i][0],zone])*zWidth,
		this._Seed([this.map[i][1],zone])*zHeight]
		);
		
	//Add offsets and check if zone is negitive.
		if(zone[0]<0){
		nMap[i][0]*=-1;
		nMap[i][0]+=xOffset;
		}else{
		nMap[i][0]+=xOffset;
		}
		
		if(zone[1]<0){
		nMap[i][1]*=-1;
		nMap[i][1]+=yOffset;
		}else{
		nMap[i][1]+=yOffset;
		}
	}
	return nMap;
}

Worley.prototype._normalizeZone2 = function(zone){
	var zWidth = this._args.width, zHeight = this._args.height;
	var zX = zone[0], zY = zone[1];
	var xOffset = zX*zWidth, yOffset = zY*zHeight;
	var nMap = [];
	for(var i=0; i< this.map.length; i++){ //you can do map length or nPoints it does not matter they are the same.
		nMap.push(
		[this.map[i][0]*zWidth,
		this.map[i][1]*zHeight]
		);
		
	//Add offsets and check if zone is negitive.
		if(zone[0]<0){
		nMap[i][0]*=-1;
		nMap[i][0]+=xOffset;
		}else{
		nMap[i][0]+=xOffset;
		}
		
		if(zone[1]<0){
		nMap[i][1]*=-1;
		nMap[i][1]+=yOffset;
		}else{
		nMap[i][1]+=yOffset;
		}
	}
	return nMap;
}

Worley.prototype._normalizeZone3 = function(zone){
	var zWidth = this._args.width, zHeight = this._args.height;
	var zX = zone[0], zY = zone[1];
	var xOffset = zX*zWidth, yOffset = zY*zHeight;
	var nMap = [];
	for(var i=0; i< this.map.length; i++){ //you can do map length or nPoints it does not matter they are the same.
		var tx = Math.cos(this.map[i][0]+((0.5+(zone[0]*0.35)+1.35)+(0.2+(zone[1]*0.25))+0.65));
		tx-=Math.floor(tx);
		var ty = Math.cos(this.map[i][1]+((0.35+(zone[0]*0.65)+1.15)+(0.1+(zone[1]*0.85))+0.25));
		ty-=Math.floor(ty);
		nMap.push(
		[tx*zWidth,
		ty*zHeight]
		);
		
	//Add offsets and check if zone is negitive.
		if(zone[0]<0){
		nMap[i][0]*=-1;
		nMap[i][0]+=xOffset;
		}else{
		nMap[i][0]+=xOffset;
		}
		
		if(zone[1]<0){
		nMap[i][1]*=-1;
		nMap[i][1]+=yOffset;
		}else{
		nMap[i][1]+=yOffset;
		}
	}
	return nMap;
}

Worley.prototype._getValue = function(pos){
	var zWidth = this._args.width, zHeight = this._args.height;
	var x = pos[0], y = pos[1];
	var zID = 
	[
		Math.floor(x/zWidth),
		Math.floor(y/zHeight),
	]
	
	var nMap = this._NormalMap(zID);
	for(var i=0; i<nMap.length; i++){
		nMap[i] = Worley.Distance[this._args.style](pos,nMap[i]);
	}
	nMap.sort(function(a, b){return a-b}); //Sorts Array;
	var minDist = nMap[0];
	var nDist = nMap[this._args.n];
	var range = nDist - minDist;
	return (minDist)/range;	
}

Worley.prototype._getValue2 = function(pos){
	var zWidth = this._args.width, zHeight = this._args.height;
	var x = pos[0], y = pos[1];
	var zID = 
	[
		Math.floor(x/zWidth),
		Math.floor(y/zHeight),
	]
	
	var nMap = this._NormalMap2(zID);
	for(var i=0; i<nMap.length; i++){
		nMap[i] = Worley.Distance[this._args.style](pos,nMap[i]);
	}
	nMap.sort(function(a, b){return a-b}); //Sorts Array;
	var minDist = nMap[0];
	var nDist = nMap[this._args.n];
	var range = nDist - minDist;
	return (minDist)/range;	
}

Worley.prototype._getValue3 = function(pos){
	var zWidth = this._args.width, zHeight = this._args.height;
	var x = pos[0], y = pos[1];
	var zID = 
	[
		Math.floor(x/zWidth),
		Math.floor(y/zHeight),
	]
	
	var nMap = this._NormalMap3(zID);
	for(var i=0; i<nMap.length; i++){
		nMap[i] = Worley.Distance[this._args.style](pos,nMap[i]);
	}
	nMap.sort(function(a, b){return a-b}); //Sorts Array;
	

	var minDist = nMap[0];
	var nDist = nMap[this._args.n];
	var range = nDist - minDist;
	return (minDist)/range;	
}

Worley.Distance = {
	euclidean : function(x,y){
		return Math.sqrt(Math.pow((x[0]-y[0]),2) +  Math.pow((x[1]-y[1]),2))
	},
	manhattan :  function(x,y){
		return Math.abs(x[0]-y[0])+Math.abs(x[1]-y[1]);
	},
	chebyshev : function(x,y){
		return Math.max(Math.abs(x[0]-y[0]), Math.abs(x[1]-y[1]));
	},
	canberra : function(x,y){
		var t=0;
		for(var i=0; i<x.length; i++){
		 t+=(Math.abs(x[i]-y[i]))/(Math.abs(x[i])+Math.abs(y[i]));
		}
		return t;
	},
	braycurtis : function(x,y){
		var t=0, t2=0;
		for(var i=0; i<x.length; i++){
		 t+=(x[i]-y[i]);
		 t2+=(x[i]+y[i]);
		}
		return t/t2;
	}
};




Worley.prototype._Seed = function(s){
	var t=0; //Total of the seeds charicter values.
	s+=""; //Converts what ever the seed is into a string.
	for(var i = 0; i < s.length; i++){
	t+= s.charCodeAt(i); //Add to the total depending on the charicter code value.
	}	
	s = Math.sin(t) * 10000; //gets a Random Number that is predictable.
	return parseFloat(s - Math.floor(s)); //Returns the fractial part of this number to normalize it between 0-1.
};