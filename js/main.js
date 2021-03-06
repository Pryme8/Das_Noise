
Das_Edit = function(){
	this._fps = 30;
	Das_Edit.Do.setBgColor();
	this.noises = [];
	this.redraw = true;
	this.autoRedraw = true;
	this.activeOut = null;
	//this.selected = null;
	this.canvas = document.getElementById('noiseCanvas');
}

Das_Edit.prototype.Draw = function(parent){
	
	if(parent.redraw == false){return};
	parent.redraw = false;
	console.log(parent);
	if(parent.activeOut.mode = "noise"){
	console.log("Refresh Noise");
	
	var noise = parent.activeOut.noise;
	var c = parent.canvas;
  	var ctx = c.getContext('2d');
	
	
	var imageData = ctx.getImageData(0,0,c.width, c.height);
			var data = imageData.data;
			var i=0;
	var start = (new Date).getTime();
			
			for (var y = 0; y <  c.height; y++) {
			for (var x = 0; x <  c.width; x++) {
			var v = Math.floor(255 * noise.getValue({x:x,y:y}));
			ctx.fillStyle = "rgb("+v+","+v+","+v+")";
			ctx.fillRect(x,y,1,1);
				}
    	}
	var finish = (new Date).getTime() - start;
	console.log("Image took:"+finish+"ms");
		/*var imageData = ctx.getImageData(0,0,c.width, c.height);
  		var data = imageData.data;
		var x=0, y=0;
		
			
    for (var i = 0; i < data.length; i += 4) {
		var v = Math.floor(255 * noise.getValue({x:x,y:y}));
      data[i]     = v;     // red
      data[i + 1] = v; // green
      data[i + 2] = v; // blue
	  x++;
	  if(x>c.width){
	  	y++;
		x=0;
	  }
    }
    ctx.putImageData(imageData, 0, 0);
 	*/
	
	
	}
	
};




//Do Calculations
Das_Edit.prototype.Update = function(){
	
};

Das_Edit.prototype.Start = function(){

this._int = setInterval(this._run, 0);	
}


Das_Edit.Do = {
	setBgColor : function(){
		$('.canvas-wrap').css('background-color', 'rgba('+$('#bg-r').val()+','+$('#bg-g').val()+','+$('#bg-b').val()+','+$('#bg-a').val()+')');
	},
	createNewNoise : function(parent){
		    parent.noises.push(new Das_Edit.Noise());
			var newNoise =
			$('<div class="item selectable">'+
			'<div class="input-large"><span>Name:</span><span><input id="noise-name" type="text" value="New Noise" /></span></div>'+
			'<div class="input-large"><span>Seed:</span><span><input id="noise-seed" type="text" value="New Seed" /></span></div>'+
			'<div class="input-large"><span>Type:</span><span>'+
			'<select id="noise-type">'+
			'<option value="#Simple2D">Simple 2D</option>'+
			'<option value="#Perlin2D">Perlin 2D</option>'+
			'<option value="#Poorly2D">Poorly 2D</option>'+
			'<option value="#Poorly2Db">Poorly 2Db</option>'+
			'<option value="#Poorly2Dc">Poorly 2Dc</option>'+
			'<option value="#Poorly2Dd">Poorly 2Dd</option>'+
			'<option value="#Tiley2">Tiley2</option>'+
			'<option value="#Test">Test</option>'+
			'<option value="#Cellular2">Cellular2</option>'+
			
			//'<option value="#Simple3D">Simple 3D</option>'+
			//'<option value="#Perlin3D">Perlin 3D</option>'+
			'</select>'+
			'</span></div>'+
			'<div id="noise-settings" class="menu-sub-pane">'+
			'<div class="input-small"><span>Scale:</span><input id="scale" type="number" min="0.01"  step="0.01" value="1" /></div><BR />'+
			'<div class="input-small"><span>Floor Scale:</span><input id="scaleFloor" type="checkbox" /></div><BR />'+
			'<div class="input-small"><span>frequency:</span><input id="frequency" type="number" min="0.01"  step="0.01" value="1" /></div><BR />'+
			'<div class="input-small"><span>amplitude:</span><input id="amplitude" type="number" min="0.01"  step="0.01" value="1" /></div><BR />'+
			'<div class="input-small"><span>octives:</span><input id="octives" type="number" min="1"  step="1" value="1" /></div><BR />'+
			'<div class="input-small"><span>persistence:</span><input id="persistence" type="number" min="0.01"  step="0.01" value="1" /></div><BR />'+
			'<div class="input-small"><span>nPoints*:</span><input id="nPoints" type="number" min="4"  step="1" value="12" /></div><BR />'+
			'<div class="input-small"><span>n*:</span><input id="n" type="number" min="1"  step="1" value="4" /></div><BR />'+
			'<div class="input-small"><span>width*:</span><input id="width" type="number" min="1"  step="1" value="100" /></div><BR />'+
			'<div class="input-small"><span>height*:</span><input id="height" type="number" min="1"  step="1" value="100" /></div><BR />'+
			'</div>'+
			'<select id="m-style">'+
			'<option value="euclidean">euclidean</option>'+
			'<option value="manhattan">manhattan</option>'+
			'<option value="badclidean">badclidean</option>'+
			'<option value="badclidean2">badclidean2</option>'+
			'<option value="badhattan">badhattan</option>'+
			'<option value="badhattan2">badhattan2</option>'+
			'<option value="chebyshevish">chebyshevish</option>'+
			'<option value="chebyshevish2">chebyshevish2</option>'+
			'<option value="chebyshevish3">chebyshevish3</option>'+
			'<option value="chebyshevish4">chebyshevish4</option>'+
			'<option value="valentine">valentine</option>'+
			'<option value="valentine2b">valentine2b</option>'+
			'<option value="valentine3">valentine3</option>'+
			'<option value="valentine4">valentine4</option>'+
			'<option value="valentine5">valentine5</option>'+
			'<option value="rachel">rachel</option>'+
			'<option value="pythagorean">pythagorean</option>'+
			'<option value="pi">pi</option>'+
			'</select>'+
			'<div id="ouptput-settings" class="menu-sub-pane">'+
			'<div class="input-small"><span>Value:</span><input name="out-put" type="radio" id="value-out" checked/></div><BR />'+
			'<div class="input-small"><span>Color:</span><input name="out-put" type="radio" id="color-out" /></div><BR />'+
			'<div class="input-small"><span>r:</span><input id="red" type="number" min="0" max="1" step="0.01" value="1" /></div><BR />'+
			'<div class="input-small"><span>b:</span><input id="blue" type="number" min="0" max="1" step="0.01" value="1" /></div><BR />'+
			'<div class="input-small"><span>g:</span><input id="green" type="number" min="0" max="1" step="0.01" value="1" /></div><BR />'+
			'<div class="input-small"><span>a:</span><input id="alpha" type="number" min="0" max="1" step="0.01" value="1" /></div><BR />'+
			
			'</div>'+
			'<hr />');
			
			
			$('#noise-list').append(newNoise);
			var noise = parent.noises[parent.noises.length-1];
			var newOut = Das_Edit.Do.createNewOutput(noise);
			Das_Edit.Do.makeNoise('#Simple2D', noise, parent);
			
			if(Das_Edit.Do.checkActive()){
				
			}else{
			$('#out-list').find('div#'+noise.name.replace(" ", "_")+' input[type="radio"]').click();
			parent.redraw = true;
			parent.activeOut = noise;
			parent.Start();			
			}
			
			newNoise.find('#noise-name').change(function(e){
				noise.name = $(e.target).val();
				newOut.attr('id',noise.name.replace(" ", "_"));
				newOut.find('#name-span').text(noise.name);
				
			});
			
			newNoise.find('#noise-seed').change(function(e){
				noise.seed = $(e.target).val();
				noise.noise = new Teriable.Noise(noise.type,noise.seed,{scale:noise.settings.scale, scaleFloor: noise.settings.scaleFloor, frequency:noise.settings.frequency, amplitude:noise.settings.amplitude, octives:noise.settings.octives, persistence:noise.settings.persistence, style:noise.settings.style, nPoints:noise.settings.nPoints, n:noise.settings.n, width:noise.settings.width, height:noise.settings.height});
				parent.redraw = true;
			});

			newNoise.find('#noise-settings input').change(function(e){
				console.log($(e.target));
				noise.settings[$(e.target).attr('id')] = $(e.target).val();
				noise.noise.args[$(e.target).attr('id')] = $(e.target).val();
				parent.redraw = true;
			});
			
			newNoise.find('select#noise-type').change(function(e){
				var type = $(e.target).val();
				Das_Edit.Do.makeNoise(type, noise, parent);
				parent.redraw = true;			
			});
			
			newNoise.find('select#m-style').change(function(e){
				var style = $(e.target).val();
				noise.settings.style = $(e.target).val();
				noise.noise.args.style = $(e.target).val();
				parent.redraw = true;			
			});
			
			newOut.find('input[type="radio"]').on('click', function(){
				parent.activeOut = noise;
				parent.redraw = true;		
			});
						
	},
	createNewOutput : function(noise){
		    var newOut =
			$('<div class="item out" id="'+noise.name.replace(" ", "_")+'">'+
			'<div class="input-large"><span id="name-span">'+noise.name+'</span></div>'+
			'<div class="input-large"><span>Active:</span><span><input id="'+noise.name.replace(" ", "_")+'" name="active-noise" type="radio"/></span></div>'+	
			'</div><hr />');
			$('#out-list').append(newOut);
			return newOut;
			
			
	},
	makeNoise : function(type, obj, parent){
		console.log(type);
		switch(type){
			case '#Simple2D':
			console.log("make Simple 2d");
			obj.type = "Simple2"
			obj.noise = new Teriable.Noise(obj.type,obj.seed,{scale:obj.settings.scale, scaleFloor: obj.settings.scaleFloor, frequency:obj.settings.frequency, amplitude:obj.settings.amplitude, octives:obj.settings.octives, persistence:obj.settings.persistence});
			break;
			
			case '#Perlin2D':
			console.log("make Perlin2D");
			obj.type = "Perlin2"
			obj.noise = new Teriable.Noise(obj.type,obj.seed,{scale:obj.settings.scale, scaleFloor: obj.settings.scaleFloor, frequency:obj.settings.frequency, amplitude:obj.settings.amplitude, octives:obj.settings.octives, persistence:obj.settings.persistence});
			break;	
			
			case '#Poorly2D':
			console.log("make Poorly2D");
			obj.type = "Poorly2"
			obj.noise = new Teriable.Noise(obj.type,obj.seed,{scale:obj.settings.scale, scaleFloor: obj.settings.scaleFloor, frequency:obj.settings.frequency, amplitude:obj.settings.amplitude, octives:obj.settings.octives, persistence:obj.settings.persistence, style:obj.settings.style, nPoints:obj.settings.nPoints, n:obj.settings.n});
			break;
		
			case '#Poorly2Db':
			console.log("make Poorly2Db");
			obj.type = "Poorly2b"
			obj.noise = new Teriable.Noise(obj.type,obj.seed,{scale:obj.settings.scale, scaleFloor: obj.settings.scaleFloor, frequency:obj.settings.frequency, amplitude:obj.settings.amplitude, octives:obj.settings.octives, persistence:obj.settings.persistence, style:obj.settings.style, nPoints:obj.settings.nPoints, n:obj.settings.n});
			break;
			
			case '#Poorly2Dc':
			console.log("make Poorly2Dc");
			obj.type = "Poorly2c"
			obj.noise = new Teriable.Noise(obj.type,obj.seed,{scale:obj.settings.scale, scaleFloor: obj.settings.scaleFloor, frequency:obj.settings.frequency, amplitude:obj.settings.amplitude, octives:obj.settings.octives, persistence:obj.settings.persistence, style:obj.settings.style, nPoints:obj.settings.nPoints, n:obj.settings.n});
			break;
			
			case '#Poorly2Dd':
			console.log("make Poorly2d");
			obj.type = "Poorly2d"
			obj.noise = new Teriable.Noise(obj.type,obj.seed,{scale:obj.settings.scale, scaleFloor: obj.settings.scaleFloor, frequency:obj.settings.frequency, amplitude:obj.settings.amplitude, octives:obj.settings.octives, persistence:obj.settings.persistence, style:obj.settings.style, nPoints:obj.settings.nPoints, n:obj.settings.n, width:obj.settings.width, height:obj.settings.height });
			break;
			
			case '#Tiley2':
			console.log("make Tiley");
			obj.type = "Tiley2"
			obj.noise = new Teriable.Noise(obj.type,obj.seed,{scale:obj.settings.scale, scaleFloor: obj.settings.scaleFloor, frequency:obj.settings.frequency, amplitude:obj.settings.amplitude, octives:obj.settings.octives, persistence:obj.settings.persistence, style:obj.settings.style, nPoints:obj.settings.nPoints, n:obj.settings.n, width:obj.settings.width, height:obj.settings.height });
			break;
			
			case '#Test':
			console.log("make Test");
			obj.type = "Test"
			obj.noise = new Teriable.Noise(obj.type,obj.seed,{scale:obj.settings.scale, scaleFloor: obj.settings.scaleFloor, frequency:obj.settings.frequency, amplitude:obj.settings.amplitude, octives:obj.settings.octives, persistence:obj.settings.persistence, style:obj.settings.style, nPoints:obj.settings.nPoints, n:obj.settings.n, width:obj.settings.width, height:obj.settings.height });
			break;
			
			case '#Cellular2':
			console.log("make Cellular");
			obj.type = "Cellular2"
			obj.noise = new Teriable.Noise(obj.type,obj.seed,{scale:obj.settings.scale, scaleFloor: obj.settings.scaleFloor, frequency:obj.settings.frequency, amplitude:obj.settings.amplitude, octives:obj.settings.octives, persistence:obj.settings.persistence, style:obj.settings.style, nPoints:obj.settings.nPoints, n:obj.settings.n, width:obj.settings.width, height:obj.settings.height });
			break;
		}
		
	},
	checkActive : function(){
		if($('#auto-out').not(':checked')){
			return false;
		}
		if($('.item.out').find('input[type="radio"]:checked').length){
			return true;
		}else{
			return false;	
		}
	},
};

Das_Edit.Noise = function(){
		this.name = "New Noise";
		this.seed = "New Seed";
		this.type = 'Simple2';
		this.mode = "noise";
		this.settings = {
			scale : 1,
			frequency : 1,
			amplitude: 1,
			octives: 1,
			persistence : 1,
			scaleFloor : 0,
			style : "euclidean",			
		};
		return this;
};




Das_Edit.prototype._run = (function(){ 
		var parent = Das_Edit.prototype;
		console.log(parent);
		var loop = 0, skipTicks = 1000/ parent._fps, maxFrameSkip = 10, nextTick =(new Date).getTime(); 
		
		return function(){
			loop = 0;	
			
			while((new Date).getTime() > nextTick && loop < maxFrameSkip){
				parent.Update(); // do Calculations
				nextTick += skipTicks;
				loop ++;
				
			}
			
			
			if (!loop) {
      		parent.Draw(editor);//Draw scene on screen...
    		}
			
			
		};	
	})();




