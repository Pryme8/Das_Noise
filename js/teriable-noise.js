//Andrew V Butt Sr. - Pryme8@gmail.com
//Compilation of Standard Noises for Javascript version 1.1.0;
//Some of these were for other langues, and some of them I made
//up so yeah...
//Pryme8.github.io
//Special Thanks to Stefan Gustavson (stegu@itn.liu.se),
//and Peter Eastman (peastman@drizzle.stanford.edu)
/* Some of this code was placed in the public domain by its original author,
 * Stefan Gustavson. You may use it as you see fit, but
 * attribution is appreciated.*/
//******************************************************//

Teriable = {} || Teriable;
Teriable.Noise = function(type,seed,args){
	if(this._type){this._type = type}else{this._type = "Simple2"};
	this._seed = {_initial : seed,
				  _clean : this._cleanSeed(seed)};
	this.args = args;
	console.log("New "+type+" Init: seed._initial-"+this._seed._initial+", seed._clean-"+this._seed._clean);
	
	switch (this._type) {
	case "Simple2": this.sP(); break;
	case "Simple3": this.sP(); break;
	case "Perlin3": this.sP(); break;
	}
}

Teriable.Noise.prototype._cleanSeed = function(seed){
	var t=0;
	seed+="";
	for(var i = 0; i < seed.length; i++){
	t+= seed.charCodeAt(i);
	}
	seed = t;	
	var s = Math.sin(seed) * 10000;
	return parseFloat(s - Math.floor(s));
};

Teriable.Noise.Grad = function(x, y, z) {
    this.x = x; this.y = y; this.z = z;
};

Teriable.Noise.Grad.prototype.dot2 = function(x, y) {
    return this.x*x + this.y*y;
};

Teriable.Noise.Grad.prototype.dot3 = function(x, y, z) {
    return this.x*x + this.y*y + this.z*z;
};

Teriable.Noise._CreateGrad = function(){
	var Grad = Teriable.Noise.Grad;
	return [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
               new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
               new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];
}


Teriable.Noise.prototype.getValue = function(args){
	//this.args is the Core Object, args is just this Get value constructors
	if(typeof this.args.frequency == 'undefined' || this.args.frequency == 0){this.args.frequency = 1;}
	if(typeof this.args.amplitude == 'undefined' || this.args.amplitude == 0){this.args.amplitude = 1;}
	if(typeof this.args.octives == 'undefined' || this.args.octives == 0){this.args.octives = 1;}
	if(typeof this.args.persistence == 'undefined' || this.args.persistence == 0){this.args.persistence = 1;}
	var maxValue = 0;
	var value = 0;
	var freq = this.args.frequency, amp = this.args.amplitude, oct = this.args.octives, pers = this.args.persistence;
	

	switch (this._type) {
	case "Simple2": 
	if(typeof args.x == 'undefined' && typeof args.y == 'undefined'){return "Error Please input {x:?,y:?}"}
		 	for(var i=0;i < oct;i++) {
        			value += this.Simple2_Get(args.x * freq, args.y * freq) * amp;
        			 maxValue += amp;
        
        			amp *= pers;
       		 		freq *= 2;
    			}
				return value;
	break;
	case "Simple3": 
	if(typeof args.x == 'undefined' && typeof args.y == 'undefined' && typeof args.z == 'undefined'){return "Error Please input {x:?,y:?,z:?}"}
		 	for(var i=0;i < oct;i++) {
        			value += this.Simple3_Get(args.x * freq, args.y * freq, args.z * freq) * amp;
        			 maxValue += amp;
        
        			amp *= pers;
       		 		freq *= 2;
    			}
				return value; 
	break;
	case "Perlin2": 
	if(typeof args.x == 'undefined' && typeof args.y == 'undefined'){return "Error Please input {x:?,y:?}"}
	 	for(var i=0;i < oct;i++) {
        			value += this.Perlin2_Get(args.x * freq, args.y * freq) * amp;
        			 maxValue += amp;
        
        			amp *= pers;
       		 		freq *= 2;
    			}
				return value;
	break;
	case "Perlin3": 
	if(typeof args.x == 'undefined' && typeof args.y == 'undefined' && typeof args.z == 'undefined'){return "Error Please input {x:?,y:?,z:?}"}
	 	for(var i=0;i < oct;i++) {
        			value += this.Perlin3_Get(args.x * freq, args.y * freq, args.z * freq) * amp;
        			 maxValue += amp;
        
        			amp *= pers;
       		 		freq *= 2;
    			}
				return value;
	break;
	}
};

Teriable.Noise.prototype.sP = function(){
this.grad3 = new Teriable.Noise._CreateGrad();
this.p = new Teriable.Noise.Const._p();
var temp = new Teriable.Noise.gradPerm(this._seed._clean,new Array(512),new Array(512), this.p, this.grad3);
this.perm = temp.perm;
this.gradP = temp.gradP;
};


Teriable.Noise.prototype.Simple2_Get = function(xin, yin){
	if(typeof this.args.scale !== 'undefined' && this.args.scale != 0){
		xin = xin/this.args.scale;
		yin = yin/this.args.scale;
		if(this.args.scaleFloor == true){
			xin = Math.floor(xin);	
			yin = Math.floor(yin);	
		}
	}

	
	
	var F2 = Teriable.Noise.Const._F2,
	    G2 = Teriable.Noise.Const._G2,
		F3 = Teriable.Noise.Const._F3,
		G3 = Teriable.Noise.Const._G3,
		n0, n1, n2; 
    	s = (xin+yin)*F2,
    	i = Math.floor(xin+s),
    	j = Math.floor(yin+s),
    	t = (i+j)*G2,
    	y0 = yin-j+t,
		x0 = xin-i+t;
	//console.log("s:"+s);	
	//console.log("i:"+i);	
	//console.log("j:"+j);
	//console.log("t:"+t);
    //
	//console.log("x0:"+x0);
	//console.log("y0:"+y0);
	
	
    var i1, j1;
    if(x0>y0) {
      i1=1; j1=0;
    } else {
      i1=0; j1=1;
    }
    var x1 = x0 - i1 + G2, 
	
    	y1 = y0 - j1 + G2,
		
    	x2 = x0 - 1 + 2 * G2,
		
    	y2 = y0 - 1 + 2 * G2;
	//console.log("x1:"+x1);
	//console.log("y1:"+y1);
	//console.log("x2:"+x2);
	//console.log("y2:"+y2);
    i &= 255,
    j &= 255;
	//console.log("i:"+i);
	//console.log("j:"+j);
    var gi0 = this.gradP[i+this.perm[j]];
	//console.log("gi0:"),console.log(gi0);
    var gi1 = this.gradP[i+i1+this.perm[j+j1]];
	//console.log("gi1:"),console.log(gi1);
    var gi2 = this.gradP[i+1+this.perm[j+1]];
	//console.log("gi2:"),console.log(gi2);

    var t0 = 0.5 - x0*x0-y0*y0;
	//console.log("t0:"+t0);
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot2(x0, y0); 
    }
	//console.log("t0:"+t0);
	//console.log("n0:"+n0);
	
    var t1 = 0.5 - x1*x1-y1*y1;
	//console.log("t1:"+t1);
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot2(x1, y1);
    }
	//console.log("t1:"+t1);
	//console.log("n1:"+n1);
	
    var t2 = 0.5 - x2*x2-y2*y2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot2(x2, y2);
    }
	
	//console.log("t2:"+t2);
	//console.log("n2:"+n2);
	var value = (70 * (n0 + n1 + n2)+1)/2;
	
    return value;
}

Teriable.Noise.prototype.Simple3_Get = function(xin, yin, zin) {
		if(typeof this.args.scale !== 'undefined' && this.args.scale != 0){
		xin = xin/this.args.scale;
		yin = yin/this.args.scale;
		zin = zin/this.args.scale;
			if(this.args.scaleFloor == true){
			xin = Math.floor(xin);	
			yin = Math.floor(yin);
			zin = Math.floor(zin);
			}
		}
    var n0, n1, n2, n3; // Noise contributions from the four corners

    // Skew the input space to determine which simplex cell we're in
    var s = (xin+yin+zin)*F3; // Hairy factor for 2D
    var i = Math.floor(xin+s);
    var j = Math.floor(yin+s);
    var k = Math.floor(zin+s);

    var t = (i+j+k)*G3;
    var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
    var y0 = yin-j+t;
    var z0 = zin-k+t;

    // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
    // Determine which simplex we are in.
    var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
    var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
    if(x0 >= y0) {
      if(y0 >= z0)      { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
      else if(x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
      else              { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
    } else {
      if(y0 < z0)      { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
      else if(x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
      else             { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
    }
    // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
    // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
    // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
    // c = 1/6.
    var x1 = x0 - i1 + G3; // Offsets for second corner
    var y1 = y0 - j1 + G3;
    var z1 = z0 - k1 + G3;

    var x2 = x0 - i2 + 2 * G3; // Offsets for third corner
    var y2 = y0 - j2 + 2 * G3;
    var z2 = z0 - k2 + 2 * G3;

    var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
    var y3 = y0 - 1 + 3 * G3;
    var z3 = z0 - 1 + 3 * G3;

    // Work out the hashed gradient indices of the four simplex corners
    i &= 255;
    j &= 255;
    k &= 255;
    var gi0 = this.gradP[i+   this.perm[j+   this.perm[k   ]]];
    var gi1 = this.gradP[i+i1+this.perm[j+j1+this.perm[k+k1]]];
    var gi2 = this.gradP[i+i2+this.perm[j+j2+this.perm[k+k2]]];
    var gi3 = this.gradP[i+ 1+this.perm[j+ 1+this.perm[k+ 1]]];

    // Calculate the contribution from the four corners
    var t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot3(x0, y0, z0);  // (x,y) of grad3 used for 2D gradient
    }
    var t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
    }
    var t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
    }
    var t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
    if(t3<0) {
      n3 = 0;
    } else {
      t3 *= t3;
      n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
    }
   
   var value = (32 * (n0 + n1 + n2 + n3)+1)/2;
    
  return value;
  };

Teriable.Noise.prototype.Perlin2_Get = function(x, y) {
	if(typeof this.args.scale !== 'undefined' && this.args.scale != 0){
		x = x/this.args.scale;
		y = y/this.args.scale;
		if(this.args.scaleFloor == true){
			x = Math.floor(x);	
			y = Math.floor(y);
			
			}
	}
    var X = Math.floor(x), Y = Math.floor(y);
    // Get relative xy coordinates of point within that cell
    x = x - X; y = y - Y;
    X = X & 255; Y = Y & 255;

    var n00 = this.gradP[X+this.perm[Y]].dot2(x, y);
    var n01 = this.gradP[X+this.perm[Y+1]].dot2(x, y-1);
    var n10 = this.gradP[X+1+this.perm[Y]].dot2(x-1, y);
    var n11 = this.gradP[X+1+this.perm[Y+1]].dot2(x-1, y-1);

    // Compute the fade curve value for x
    var u = this.fade(x);

    // Interpolate the four results
    return this.lerp(
        this.lerp(n00, n10, u),
        this.lerp(n01, n11, u),
       this.fade(y));
  };

Teriable.Noise.prototype.Perlin3_Get = function(x, y, z) {
	if(typeof this.args.scale !== 'undefined' && this.args.scale != 0){
		x = x/this.args.scale;
		y = y/this.args.scale;
		z = z/this.args.scale;
		if(this.args.scaleFloor == true){
			x = Math.floor(x);	
			y = Math.floor(y);
			z = Math.floor(z);
			}
	}
    // Find unit grid cell containing point
    var X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z);
    // Get relative xyz coordinates of point within that cell
    x = x - X; y = y - Y; z = z - Z;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255; Y = Y & 255; Z = Z & 255;

    // Calculate noise contributions from each of the eight corners
    var n000 = this.gradP[X+  this.perm[Y+  this.perm[Z  ]]].dot3(x,   y,     z);
    var n001 = this.gradP[X+  this.perm[Y+  this.perm[Z+1]]].dot3(x,   y,   z-1);
    var n010 = this.gradP[X+  this.perm[Y+1+this.perm[Z  ]]].dot3(x,   y-1,   z);
    var n011 = this.gradP[X+  this.perm[Y+1+this.perm[Z+1]]].dot3(x,   y-1, z-1);
    var n100 = this.gradP[X+1+this.perm[Y+  this.perm[Z  ]]].dot3(x-1,   y,   z);
    var n101 = this.gradP[X+1+this.perm[Y+  this.perm[Z+1]]].dot3(x-1,   y, z-1);
    var n110 = this.gradP[X+1+this.perm[Y+1+this.perm[Z  ]]].dot3(x-1, y-1,   z);
    var n111 = this.gradP[X+1+this.perm[Y+1+this.perm[Z+1]]].dot3(x-1, y-1, z-1);

    // Compute the fade curve value for x, y, z
    var u = this.fade(x);
    var v = this.fade(y);
    var w = this.fade(z);

    // Interpolate
    return this.lerp(
        this.lerp(
          this.lerp(n000, n100, u),
          this.lerp(n001, n101, u), w),
        this.lerp(
          this.lerp(n010, n110, u),
          this.lerp(n011, n111, u), w),
       v);
  };
  
  
  
 Teriable.Noise.fade = function(t) {
    return t*t*t*(t*(t*6-15)+10);
  }

 Teriable.Noise.lerp = function(a, b, t) {
    return (1-t)*a + t*b;
  }


Teriable.Noise.gradPerm = function(seed, gradP, perm, p, grad3){
	if(seed > 0 && seed < 1) {
      // Scale the seed out
      seed *= 65536;
    }

    seed = Math.floor(seed);
    if(seed < 256) {
      seed |= seed << 8;
    }

    for(var i = 0; i < 256; i++) {
      var v;
      if (i & 1) {
        v = p[i] ^ (seed & 255);
      } else {
        v = p[i] ^ ((seed>>8) & 255);
      }

      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
	
	this.perm = perm;
	this.gradP = gradP;	
};

Teriable.Noise.Const= {};
Teriable.Noise.Const._p = function(){return [151,160,137,91,90,15,
  131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
  190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
  88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
  77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
  102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
  135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
  5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
  223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
  129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
  251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
  49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
};

Teriable.Noise.Const._F2 = 0.5*(Math.sqrt(3)-1);
Teriable.Noise.Const._G2 = (3-Math.sqrt(3))/6;
Teriable.Noise.Const._F3 = 1/3;
Teriable.Noise.Const._G3 = 1/6;






/*
Teriable.Noise.prototype.Worley2 = function(){
	console.log("Worley GO!");
	if(!this.args.nPoints){this.args.nPoints = 20;}
	if(!this.args.width){this.args.width = 100;}
	if(!this.args.height){this.args.height = 100;}
	if(!this.args.scale){this.args.scale = 100;}
	if(!this.args.n){this.args.n = 4;}
	if(!this.args.style){this.args.style = 'euclidean';}
	console.log(this.args);
	this.data = {keyPoints : []};
	
	this._getKeyPoints();
	this._ApplyKeyPointsToMap();
	console.log(this);
};

Teriable.Noise.prototype._getKeyPoints = function(){
	for(var i = 0; i < this.args.nPoints; i++){
		this.data.keyPoints.push({x:this._cleanSeed((1+(i*(i*0.5)))*this._seed._clean),y:this._cleanSeed((1 + (i+i))*(this._seed._clean*0.95))});	
	}
};

Teriable.Noise.prototype._ApplyKeyPointsToMap = function(){
	 for(var i = 0; i < this.data.keyPoints; i++){		 
		this.data.keyPoints[i].x = (this.args.width*-0.5)+(this.args.width * this._keyPoints[i].x);
		this.data.keyPoints[i].y = (this.args.height*-0.5)+(this.args.height * this._keyPoints[i].y);
	}
};

Teriable.Noise.prototype.getValue = function(loc){
	switch (this._type) {
	case "Worley2": return this._Worly2D_Calc(loc); break;
	}
};

Teriable.Noise.prototype._Worly2D_Calc = function(loc){
		var dist;
		var ix = loc.x, iy = loc.y;
		this.data.normalValues = [];
		for(var i = 0; i < this.data.keyPoints.length; i++){
		dist = this.Worley2[this.args.style](ix - this.data.keyPoints[i].x, iy - this.data.keyPoints[i].y);
		this.data.normalValues.push(dist);
		}
		this.data.normalValues.sort(function(a, b){return a-b});

		this.data.value = ((this.data.normalValues[this.args.n] - this.data.normalValues[0]));
		
		this.data.value*=this.args.scale;
		
		return this.data.value;
};

Teriable.Noise.prototype.Worley2.euclidean = function(dx, dy){
	return Math.abs(Math.sqrt((dy - dx) * (dy - dx)));	
}

Teriable.Noise.prototype.Worley2.manhattan = function(dx, dy) {
    return Math.abs(dx) + Math.abs(dy);
}

Teriable.Noise.prototype.Worley2.manhattan2 = function(dx, dy){
	return Math.abs(dx) - Math.abs(dy);	
}

Teriable.Noise.prototype.Worley2.euclidean2 = function(dx, dy){
	return dx * dx - dy * dy;	
}

Teriable.Noise.prototype.Worley2.chebyshevish = function(dx,dy){
	return Math.max(Math.abs(dx - (dy/2)),Math.abs(dy - (dx/2)));
}

Teriable.Noise.prototype.Worley2.chebyshevish2 = function(dx,dy){
	return Math.min(Math.abs(dx + (dy/2)),Math.abs(dy + (dx/2)));
}

Teriable.Noise.prototype.Worley2.chebyshevish3 = function(dx,dy){
	return Math.min(Math.abs(dx - (dy/2)),Math.abs(dy - (dx/2)));
}

Teriable.Noise.prototype.Worley2.chebyshevish4 = function(dx,dy){
	return Math.max(Math.abs(dx + (dy/2)),Math.abs(dy + (dx/2)));
}

Teriable.Noise.prototype.Worley2.valentine = function(dx, dy){
	return Math.min((dx/dy),(dy/dx))/Math.max((dx/dy),(dy/dx));
}

Teriable.Noise.prototype.Worley2.valentine2 = function(dx, dy){
	return Math.abs(Math.min((dx/-dy),(dy/-dx))/Math.max((dx/-dy),(dy/-dx)));
}

Teriable.Noise.prototype.Worley2.valentine3 = function(dx, dy){
 	var r = (dx+dy) * Math.cos(Math.min(dx,dy)/Math.max(dx,dy));
	var r2 = (dx+ dy) * Math.sin(Math.min(dx,dy)/Math.max(dx,dy));
	
	return Math.abs((dx - r) + (dy - r2));
}

Teriable.Noise.prototype.Worley2.valentine4 = function(dx, dy){
 	var r = (dx+dy) * Math.cos(Math.min(dx,dy)/Math.max(dx,dy));
	var r2 = (dx+ dy) * Math.sin(Math.min(dx,dy)/Math.max(dx,dy));
	
	return Math.abs(Math.min((dx - r) / (dy - r2),(dx + r) / (dy + r2) ));
}



function sNoise2(xy, seed){
	var grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
                 new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
                 new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];
	var p = [151,160,137,91,90,15,
  131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
  190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
  88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
  77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
  102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
  135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
  5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
  223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
  129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
  251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
  49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
  
  var perm = new Array(512);
  var gradP = new Array(512);
  
  
  sf = function(s) {
    if(s > 0 && s < 1) {
      // Scale the seed out
      s *= 65536;
    }

    s = Math.floor(s);
    if(s < 256) {
      s |= s << 8;
    }

    for(var i = 0; i < 256; i++) {
      var v;
      if (i & 1) {
        v = p[i] ^ (s & 255);
      } else {
        v = p[i] ^ ((s>>8) & 255);
      }

      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
  };
  
  sf(seed);
  var F2 = 0.5*(Math.sqrt(3)-1);
  var G2 = (3-Math.sqrt(3))/6;

  var F3 = 1/3;
  var G3 = 1/6;
  
  var xin = xy.x;
  var yin = xy.y;
  
  var n0, n1, n2; 
    var s = (xin+yin)*F2;
    var i = Math.floor(xin+s);
    var j = Math.floor(yin+s);
    var t = (i+j)*G2;
    var x0 = xin-i+t;
    var y0 = yin-j+t;
 
    var i1, j1; 
    if(x0>y0) { 
      i1=1; j1=0;
    } else {   
      i1=0; j1=1;
    }
    
    var x1 = x0 - i1 + G2; 
    var y1 = y0 - j1 + G2;
    var x2 = x0 - 1 + 2 * G2; 
    var y2 = y0 - 1 + 2 * G2;
   
    i &= 255;
    j &= 255;
    var gi0 = gradP[i+perm[j]];
    var gi1 = gradP[i+i1+perm[j+j1]];
    var gi2 = gradP[i+1+perm[j+1]];
   
    var t0 = 0.5 - x0*x0-y0*y0;
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot2(x0, y0);  
    }
    var t1 = 0.5 - x1*x1-y1*y1;
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot2(x1, y1);
    }
    var t2 = 0.5 - x2*x2-y2*y2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot2(x2, y2);
    }
    
    return 70 * (n0 + n1 + n2);
};

Grad = function(x, y, z){
	this.x = x; this.y = y; this.z = z;
};

Grad.prototype.dot2 = function(x, y) {
    return this.x*x + this.y*y;
};

Grad.prototype.dot2 = function(x, y) {
    return this.x*x + this.y*y;
};

Grad.prototype.dot3 = function(x, y, z) {
    return this.x*x + this.y*y + this.z*z;
};




 sNoise3 = function(xyz, seed) {
	 
	 var grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
                 new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
                 new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];
	var p = [151,160,137,91,90,15,
  131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
  190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
  88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
  77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
  102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
  135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
  5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
  223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
  129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
  251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
  49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
  
  var perm = new Array(512);
  var gradP = new Array(512);
  
  
  sf = function(s) {
    if(s > 0 && s < 1) {
      // Scale the seed out
      s *= 65536;
    }

    s = Math.floor(s);
    if(s < 256) {
      s |= s << 8;
    }

    for(var i = 0; i < 256; i++) {
      var v;
      if (i & 1) {
        v = p[i] ^ (s & 255);
      } else {
        v = p[i] ^ ((s>>8) & 255);
      }

      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
  };
  
  sf(seed);
  var F2 = 0.5*(Math.sqrt(3)-1);
  var G2 = (3-Math.sqrt(3))/6;

  var F3 = 1/3;
  var G3 = 1/6;
  
  var xin = xyz.x;
  var yin = xyz.y;
  var zin = xyz.z;
   
   console.log(xin+":"+yin+":"+zin)
   
    var n0, n1, n2, n3;
    
	
    var s = (xin+yin+zin)*F3; 
    var i = Math.floor(xin+s);
    var j = Math.floor(yin+s);
    var k = Math.floor(zin+s);

    var t = (i+j+k)*G3;
    var x0 = xin-i+t; 
    var y0 = yin-j+t;
    var z0 = zin-k+t;

    var i1, j1, k1; 
    var i2, j2, k2; 
    if(x0 >= y0) {
      if(y0 >= z0)      { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
      else if(x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
      else              { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
    } else {
      if(y0 < z0)      { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
      else if(x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
      else             { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
    }

    var x1 = x0 - i1 + G3; 
    var y1 = y0 - j1 + G3;
    var z1 = z0 - k1 + G3;

    var x2 = x0 - i2 + 2 * G3; 
    var y2 = y0 - j2 + 2 * G3;
    var z2 = z0 - k2 + 2 * G3;

    var x3 = x0 - 1 + 3 * G3; 
    var y3 = y0 - 1 + 3 * G3;
    var z3 = z0 - 1 + 3 * G3;

    i &= 255;
    j &= 255;
    k &= 255;
    var gi0 = gradP[i+   perm[j+   perm[k   ]]];
    var gi1 = gradP[i+i1+perm[j+j1+perm[k+k1]]];
    var gi2 = gradP[i+i2+perm[j+j2+perm[k+k2]]];
    var gi3 = gradP[i+ 1+perm[j+ 1+perm[k+ 1]]];

    var t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot3(x0, y0, z0);  
    }
    var t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
    }
    var t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
    }
    var t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
    if(t3<0) {
      n3 = 0;
    } else {
      t3 *= t3;
      n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
    }

    return 32 * (n0 + n1 + n2 + n3);

  };
  
  function fade(t) {
	  return t*t*t*(t*(t*6-15)+10);
  	}

  function lerp(a, b, t) {
    	return (1-t)*a + t*b;
  	}

 
  sPerlin2 = function(xy, seed) {
	var grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
                 new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
                 new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];
				 
	var p = [151,160,137,91,90,15,
  131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
  190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
  88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
  77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
  102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
  135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
  5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
  223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
  129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
  251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
  49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
  
  var perm = new Array(512);
  var gradP = new Array(512);
  
  
  sf = function(s) {
    if(s > 0 && s < 1) {
      // Scale the seed out
      s *= 65536;
    }

    s = Math.floor(s);
    if(s < 256) {
      s |= s << 8;
    }

    for(var i = 0; i < 256; i++) {
      var v;
      if (i & 1) {
        v = p[i] ^ (s & 255);
      } else {
        v = p[i] ^ ((s>>8) & 255);
      }

      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
  };
  
  sf(seed);
  var F2 = 0.5*(Math.sqrt(3)-1);
  var G2 = (3-Math.sqrt(3))/6;

  var F3 = 1/3;
  var G3 = 1/6;
  
  var x = xy.x;
  var y = xy.y;
    var X = Math.floor(x), Y = Math.floor(y);
    x = x - X; y = y - Y;
    X = X & 255; Y = Y & 255;
	
	console.log(x);
	console.log(X);

    var n00 = gradP[X+perm[Y]].dot2(x, y);
    var n01 = gradP[X+perm[Y+1]].dot2(x, y-1);
    var n10 = gradP[X+1+perm[Y]].dot2(x-1, y);
    var n11 = gradP[X+1+perm[Y+1]].dot2(x-1, y-1);
	console.log('n00:'+n00);
	console.log('n01:'+n01);
	console.log('n10:'+n10);
	console.log('n11:'+n11);
    var u = fade(x);
	console.log(u);

    return lerp(
        lerp(n00, n10, u),
        lerp(n01, n11, u),
       fade(y));
  };

  // 3D Perlin Noise
  sPerlin3 = function(xyz, seed) {
	  
	  var grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
                 new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
                 new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];
				 
	var p = [151,160,137,91,90,15,
  131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
  190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
  88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
  77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
  102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
  135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
  5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
  223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
  129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
  251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
  49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
  
  var perm = new Array(512);
  var gradP = new Array(512);
  
  
  sf = function(s) {
    if(s > 0 && s < 1) {
      // Scale the seed out
      s *= 65536;
    }

    s = Math.floor(s);
    if(s < 256) {
      s |= s << 8;
    }

    for(var i = 0; i < 256; i++) {
      var v;
      if (i & 1) {
        v = p[i] ^ (s & 255);
      } else {
        v = p[i] ^ ((s>>8) & 255);
      }

      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
  };
  
  sf(seed);
  
  var F2 = 0.5*(Math.sqrt(3)-1);
  var G2 = (3-Math.sqrt(3))/6;

  var F3 = 1/3;
  var G3 = 1/6;
  
  var x = xyz.x;
  var y = xyz.y;
  var z = xyz.z;

    var X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z);

    x = x - X; y = y - Y; z = z - Z;

    X = X & 255; Y = Y & 255; Z = Z & 255;

    var n000 = gradP[X+  perm[Y+  perm[Z  ]]].dot3(x,   y,     z);
    var n001 = gradP[X+  perm[Y+  perm[Z+1]]].dot3(x,   y,   z-1);
    var n010 = gradP[X+  perm[Y+1+perm[Z  ]]].dot3(x,   y-1,   z);
    var n011 = gradP[X+  perm[Y+1+perm[Z+1]]].dot3(x,   y-1, z-1);
    var n100 = gradP[X+1+perm[Y+  perm[Z  ]]].dot3(x-1,   y,   z);
    var n101 = gradP[X+1+perm[Y+  perm[Z+1]]].dot3(x-1,   y, z-1);
    var n110 = gradP[X+1+perm[Y+1+perm[Z  ]]].dot3(x-1, y-1,   z);
    var n111 = gradP[X+1+perm[Y+1+perm[Z+1]]].dot3(x-1, y-1, z-1);

    var u = fade(x);
    var v = fade(y);
    var w = fade(z);

    return lerp(
        lerp(
          lerp(n000, n100, u),
          lerp(n001, n101, u), w),
        lerp(
          lerp(n010, n110, u),
          lerp(n011, n111, u), w),
       v);
  };







*/


