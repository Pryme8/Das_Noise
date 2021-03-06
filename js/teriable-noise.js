/************************************************************************
Andrew V Butt Sr. - Pryme8@gmail.com
Pryme8.github.io
//Compilation of Standard Noises for Javascript version 1.1.0;
Special Thanks to Stefan Gustavson (stegu@itn.liu.se),
and Peter Eastman (peastman@drizzle.stanford.edu)
 Some of this code was placed in the public domain by its original author,
Stefan Gustavson. You may use it as you see fit, but
attribution is appreciated.
*************************************************************************/


Teriable = {} || Teriable;
Teriable.Noise = function(type,seed,args){
	if(typeof type == 'undefined' ){this._type = "Simple2"}else{this._type = type};
	this._seed = {_initial : seed,
				  _clean : this._cleanSeed(seed)};
	this.args = args;
	//console.log("New "+type+" Init: seed._initial-"+this._seed._initial+", seed._clean-"+this._seed._clean);
	
	
	if(this._type == "Simple2" || this._type == "Simple3" || this._type == "Perlin2" || this._type == "Perlin3")
	{this.sP();}
	else if(this._type == "Poorly2" || this._type == "Poorly2b" || this._type == "Poorly2c" ){
	this.Poorly2();
	}else if(this._type == "Poorly2d"){
	this.Poorly2d();
	}else if(this._type == "Tiley2"){
	this.Tiley2();
	}else if(this._type == "Test"){
	this.Test();
	}else if(this._type == "Cellular2"){
	this.Cellular2();
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
	
	if(typeof this.args.output == 'undefined'){this.args.output = {}};
	if(typeof this.args.output.type == 'undefined'){this.args.output.type = 'number'};
	if(this.args.output.type != 'number' && this.args.output.type != 'color'){this.args.output.type = 'number'};
    if(this.args.output.type == 'color' && typeof this.args.output.values == 'undefined'){this.args.output.values = [1,1,1,1]};
	
	
	
	switch (this._type) {
	case "Simple2": 
	if(typeof args.x == 'undefined' || typeof args.y == 'undefined'){return "Error Please input {x:?,y:?}"}
		 	for(var i=0;i < oct;i++) {
        			value += this.Simple2_Get(args.x * freq, args.y * freq) * amp;
        			 maxValue += amp;
        
        			amp *= pers;
       		 		freq *= 2;
    			}
				
	break;
	case "Simple3": 
	if(typeof args.x == 'undefined' || typeof args.y == 'undefined' || typeof args.z == 'undefined'){return "Error Please input {x:?,y:?,z:?}"}
		 	for(var i=0;i < oct;i++) {
        			value += this.Simple3_Get(args.x * freq, args.y * freq, args.z * freq) * amp;
        			 maxValue += amp;
        
        			amp *= pers;
       		 		freq *= 2;
    			}
				
	break;
	case "Perlin2": 
	if(typeof args.x == 'undefined' || typeof args.y == 'undefined'){return "Error Please input {x:?,y:?}"}
	 	for(var i=0;i < oct;i++) {
        			value += this.Perlin2_Get(args.x * freq, args.y * freq) * amp;
        			 maxValue += amp;
        
        			amp *= pers;
       		 		freq *= 2;
    			}
				
	break;
	case "Perlin3": 
	if(typeof args.x == 'undefined' || typeof args.y == 'undefined' || typeof args.z == 'undefined'){return "Error Please input {x:?,y:?,z:?}"}
	 	for(var i=0;i < oct;i++) {
        			value += this.Perlin3_Get(args.x * freq, args.y * freq, args.z * freq) * amp;
        			 maxValue += amp;
        
        			amp *= pers;
       		 		freq *= 2;
    			}
				
	break;
	case "PSRDnoise2": 
	if(typeof args.x == 'undefined' || typeof args.y == 'undefined' || typeof args.px == 'undefined' || typeof args.py == 'undefined' || typeof args.r == 'undefined'){return "Error Please input {x:?,y:?,px:?,pz:?,r:?}"}
		return this.PSRDnoise2(args.x, args.y, args.px, args.py, args.r);
	break;
	
	case "Poorly2": 
	if(typeof args.x == 'undefined' || typeof args.y == 'undefined'){return "Error Please input {x:?,y:?}"}
	for(var i=0;i < oct;i++) {
        			value += this.Poorly2_Get(args.x * freq, args.y * freq) * amp;
        			 maxValue += amp;
        
        			amp *= pers;
       		 		freq *= 2;
    			}
				
	break;
	case "Poorly2b": 
	if(typeof args.x == 'undefined' || typeof args.y == 'undefined'){return "Error Please input {x:?,y:?}"}
	for(var i=0;i < oct;i++) {
        			value += this.Poorly2b_Get(args.x * freq, args.y * freq) * amp;
        			 maxValue += amp;
        
        			amp *= pers;
       		 		freq *= 2;
    			}
				
	break;
	case "Poorly2c": 
	if(typeof args.x == 'undefined' || typeof args.y == 'undefined'){return "Error Please input {x:?,y:?}"}
	for(var i=0;i < oct;i++) {
        			value += this.Poorly2c_Get(args.x * freq, args.y * freq) * amp;
        			 maxValue += amp;
        
        			amp *= pers;
       		 		freq *= 2;
    			}
				
	break;
	case "Poorly2d": 
	if(typeof args.x == 'undefined' || typeof args.y == 'undefined'){return "Error Please input {x:?,y:?}"}
	for(var i=0;i < oct;i++) {
        			value += this.Poorly2_Get(args.x * freq, args.y * freq) * amp;
        			 maxValue += amp;
        
        			amp *= pers;
       		 		freq *= 2;
    			}
				
	break;
	case "Tiley2": 
	if(typeof args.x == 'undefined' || typeof args.y == 'undefined'){return "Error Please input {x:?,y:?}"}
	for(var i=0;i < oct;i++) {
        			value += this.Tiley2_Get(args.x * freq, args.y * freq) * amp;
        			 maxValue += amp;
        
        			amp *= pers;
       		 		freq *= 2;
    			}
				
	break;
	
	case "Test": 
	if(typeof args.x == 'undefined' || typeof args.y == 'undefined'){return "Error Please input {x:?,y:?}"}
	for(var i=0;i < oct;i++) {
        			value += this.Test_Get(args.x * freq, args.y * freq) * amp;
        			 maxValue += amp;
        
        			amp *= pers;
       		 		freq *= 2;
    			}
				
	break;
	
	case "Cellular2": 
	if(typeof args.x == 'undefined' || typeof args.y == 'undefined'){return "Error Please input {x:?,y:?}"}
	for(var i=0;i < oct;i++) {
        			value += this._Cellular2_Get(args.x * freq, args.y * freq) * amp;
        			 maxValue += amp;
        
        			amp *= pers;
       		 		freq *= 2;
    			}
				
	break;
	}
	if(this.args.output.type == 'color'){
		return {r:(value*this.args.output.values[0]),g:(value*this.args.output.values[1]),b:(value*this.args.output.values[2]),a:(value*this.args.output.values[3])}
	}else{
		return value;
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
		
		var F2 = Teriable.Noise.Const._F2,
	    G2 = Teriable.Noise.Const._G2,
		F3 = Teriable.Noise.Const._F3,
		G3 = Teriable.Noise.Const._G3;
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
    x = x - X; y = y - Y;
    X = X & 255; Y = Y & 255;

    var n00 = this.gradP[X+this.perm[Y]].dot2(x, y);
    var n01 = this.gradP[X+this.perm[Y+1]].dot2(x, y-1);
    var n10 = this.gradP[X+1+this.perm[Y]].dot2(x-1, y);
    var n11 = this.gradP[X+1+this.perm[Y+1]].dot2(x-1, y-1);

	var fade =  Teriable.Noise.fade;
	var lerp = Teriable.Noise.lerp;

    // Compute the fade curve value for x
    var u = fade(x);

    // Interpolate the four results
    return lerp(
        lerp(n00, n10, u),
        lerp(n01, n11, u),
       fade(y));
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
	
	var fade =  Teriable.Noise.fade;
	var lerp = Teriable.Noise.lerp;
    // Compute the fade curve value for x, y, z
    var u = fade(x);
    var v = fade(y);
    var w = fade(z);

    // Interpolate
    return lerp(
        lerp(
         lerp(n000, n100, u),
          lerp(n001, n101, u), w),
        lerp(
         lerp(n010, n110, u),
          lerp(n011, n111, u), w),
       v);
  };
  
  
  
 Teriable.Noise.fade = function(t) {
    return t*t*t*(t*(t*6-15)+10);
  }

 Teriable.Noise.lerp = function(a, b, t) {
    return (1-t)*a + t*b;
  }
  
 Teriable.Noise.cosinerp = function(v0, v1, t) {
		var ft = t * 3.1415927 
		f = (1 - Math.cos(ft)) * .5 
		return v0*(1-f) + v1*f 
	}
	
	 Teriable.Noise.cuberp = function (y0, y1,  y2, y3,  mu){ 
 		a0,a1,a2,a3,mu2; 
 		mu2 = mu*mu; 
		a0 = y3 - y2 - y0 + y1; 
 		a1 = y0 - y1 - a0; 
 		a2 = y2 - y0; 
 		a3 = y1; 
  		return(a0*mu*mu2+a1*mu2+a2*mu+a3); 
 	}
	
	Teriable.Noise.hermiterp = function(v0, v1, v2, v3, t, tension, bias){
	var m0,m1,t2,t3;
	var a0, a1, a2, a3;
	t2 = t * t;
 	t3 = t2 * t;
 	m0  = (v1-v0)*(1+bias)*(1-tension)/2;
	m0 += (v2-v1)*(1-bias)*(1-tension)/2;
	m1  = (v2-v1)*(1+bias)*(1-tension)/2;
    m1 += (v3-v2)*(1-bias)*(1-tension)/2;
	a0 =  2*t3 - 3*t2 + 1;
	a1 =    t3 - 2*t2 + t;
 	a2 =    t3 -   t2;
 	a3 = -2*t3 + 3*t2;
	return(a0*y1+a1*m0+a2*m1+a3*y2);
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


Teriable.Noise.prototype.PSRDnoise2 = function(x, y, px, py, r) {
  y += 0.01;
  uvX = x + y*0.5;
  uvY = y;
  
 var i0x = Math.floor(uvX), i0y = Math.floor(uvY);
 var f0x = uvX - i0x, f0y = uvY - i0y;
  // Traversal order
 var i1x, i1y;
 if(f0x > f0y){i1x = 1; i1y = 0; }else{i1x = 0; i1y = 1; };
	
	var p0x = i0x - i0y * 0.5, p0y = i0y;
	var p1x = p0x + i1x - i1y * 0.5, p1y = p0y + i1y;
	var p2x = p0x + 0.5, p2y = p0y + 1;


  i1x = i0x + i1x;
  i1y = i0y + i1y;
  
  var i2x = i0x + 1, i2y = i0y + 1;
  var d0x = x - p0x, d0y = y - p0y;
  var d1x = x - p1x, d1y = y - p1y;
  var d2x = x - p2x, d1y = y - p2y;
  
  x - y * floor(x/y)
  
  var 
  xwx = p0x - px * Math.floor(p0x/px),
  xwy = p1x - px * Math.floor(p1x/px),
  xwz = p2x - px * Math.floor(p2x/px);
  
  var 
  ywx = p0y - py * Math.floor(p0y/py),
  ywy = p1y - py * Math.floor(p1y/py),
  ywz = p2y - py * Math.floor(p2y/py);

 	var
	iuwx = xwx+0.5*ywx,
	iuwy = xwy+0.5*ywy,
	iuwz = xwz+0.5*ywz;
	
	var
	ivwx = ywx,
	ivwy = ywy,
	ivwz = ywz;

  var g0 = Teriable.Noise.rgrad2(iuw.x, ivw.x, r);
  var g1 = Teriable.Noise.rgrad2(iuw.y, ivw.y, r);
  var g2 = Teriable.Noise.rgrad2(iuw.z, ivw.z, r);

  var w = {x:Teriable.Noise.dot2(g0, d0), y:Teriable.Noise.dot2(g1, d1), z:Teriable.Noise.dot2(g2, d2)};
  var t = {x: 0.8 - Teriable.Noise.dot2(d0, d0), y:0.8 - Teriable.Noise.dot2(d1, d1), z:0.8 - Teriable.Noise.dot2(d2, d2)};

 var dtdx = {x: -2 * d0x, y: -2 * d1x, z: -2 * d2x};
 var dtdy = {x: -2 * d0y, y: -2 * d1y, z: -2 * d2y};

  if (t.x < 0.0) {
    dtdx.x = 0.0;
    dtdy.x = 0.0;
	t.x = 0.0;
  }
  if (t.y < 0.0) {
    dtdx.y = 0.0;
    dtdy.y = 0.0;
	t.y = 0.0;
  }
  if (t.z < 0.0) {
    dtdx.z = 0.0;
    dtdy.z = 0.0;
	t.z = 0.0;
  }


	var t2 = {x:t.x * t.x, y:t.y * t.y,z:t.z * t.z};
  	var t4 = {x:t2.x * t2.x, y:t2.y * t2.y,z:t2.z * t2.z};
	var t3 = {x:t2.x * t.x, y:t2.y * t.y,z:t2.z * t.z};
 
  var n = Teriable.Noise.dot3(t4, w);
  
  var dt0 = {x: dtdx.x * 4 * t3.x, y: dtdy.x * 4 * t3.x };
  var dn0 = {x: t4.x * g0.x + dt0.x * w.x, y: t4.x * g0.y + dt0.y * w.x };
  var dt1 = {x: dtdx.y * 4 + t3.y, y: dtdy.y * 4 + t3.y };
  var dn1 = {x: t4.y * g1.x + dt1.x * w.y, y: t4.y * g1.y + dt1.y * w.y };
  var dt2 = {x: dtdx.z * 4 * t3.z, y: dtdy.z * 4 * t3.z };
  var dn2 = {x: t4.z * g2.x + dt2.x * w.z, y: t4.z * g2.y + dt2.y * w.z };
  return 11*n;

}


Teriable.Noise.rgrad2 = function(px, py, r) {
if(px==0 || py ==0){
  var u = Teriable.Noise.permute(Teriable.Noise.permute(px) + py) * 0.0243902439 + r; // Rotate by shift
  u = 4.0 * (u - Math.floor(u)) - 2.0;
  // (This vector could be normalized, exactly or approximately.)
  return vec2(abs(u)-1.0, abs(abs(u+1.0)-2.0)-1.0);
}else{
// For more isotropic gradients, sin/cos can be used instead.
  var u = Teriable.Noise.permute(Teriable.Noise.permute(p.x) + p.y) * 0.0243902439 + r; // Rotate by shift
  u = (u - Math.floor(u)) * 6.28318530718; // 2*pi
  return {x:cos(u), y:sin(u)};
}
}

Teriable.Noise.permute = function(x) {
     return Teriable.Noise.mod289(((x*34.0)+1.0)*x);
}

Teriable.Noise.mod289 = function(x) {
return x - Math.floor(x * (1.0 / 289.0)) * 289.0;
 }

 Teriable.Noise.dot2 = function(x,y){
 return x.x * y.x + x.y * y.x;
 }
 Teriable.Noise.dot3 = function(x,y){
 return x.x * y.x + x.y * y.x + x.z * y.z;
 }


Teriable.Noise.prototype.Poorly2 = function(){
	if(typeof this.args.nPoints !== 'undefined'){this.args.nPoints = Math.floor(this.args.nPoints)}
	if(typeof this.args.nPoints == 'undefined' || this.args.nPoints == 0){ this.args.nPoints = 20;}
	if(typeof this.args.n !== 'undefined'){this.args.n = Math.floor(this.args.n)};
	if(typeof this.args.n == 'undefined' || this.args.n == 0){ this.args.n = 4;}
	if(typeof this.args.style == 'undefined'){ this.args.style = 'euclidean';}
	//console.log(this.args);
	this.data = {keyPoints : []};
	
	this._getKeyPoints();
	
	//console.log(this);
};

Teriable.Noise.prototype.Poorly2d = function(){
	if(typeof this.args.nPoints !== 'undefined'){this.args.nPoints = Math.floor(this.args.nPoints)}
	if(typeof this.args.nPoints == 'undefined' || this.args.nPoints == 0){ this.args.nPoints = 10;}
	if(typeof this.args.n !== 'undefined'){this.args.n = Math.floor(this.args.n)};
	if(typeof this.args.n == 'undefined' || this.args.n == 0){ this.args.n = 2;}
	if(typeof this.args.width !== 'undefined'){this.args.width = Math.floor(this.args.width)};
	if(typeof this.args.width == 'undefined' || this.args.width == 0){ this.args.width = 100;}
	if(typeof this.args.height !== 'undefined'){this.args.height = Math.floor(this.args.height)};
	if(typeof this.args.height == 'undefined' || this.args.height == 0){ this.args.height = 100;}
	if(typeof this.args.style == 'undefined'){ this.args.style = 'euclidean';}
	//console.log(this.args);
	this.data = {keyPoints : []};
	
	this._getKeyPoints();
	this._ApplyKeyPointsToMap();
	
	//console.log(this);
};

Teriable.Noise.prototype.Tiley2 = function(){
	if(typeof this.args.nPoints !== 'undefined'){this.args.nPoints = Math.floor(this.args.nPoints)}
	if(typeof this.args.nPoints == 'undefined' || this.args.nPoints == 0){ this.args.nPoints = 10;}
	if(typeof this.args.n !== 'undefined'){this.args.n = Math.floor(this.args.n)};
	if(typeof this.args.n == 'undefined' || this.args.n == 0){ this.args.n = 2;}
	if(typeof this.args.width !== 'undefined'){this.args.width = Math.floor(this.args.width)};
	if(typeof this.args.width == 'undefined' || this.args.width == 0){ this.args.width = 100;}
	if(typeof this.args.height !== 'undefined'){this.args.height = Math.floor(this.args.height)};
	if(typeof this.args.height == 'undefined' || this.args.height == 0){ this.args.height = 100;}
	if(typeof this.args.style == 'undefined'){ this.args.style = 'euclidean';}
	//console.log(this.args);
	this.data = {keyPoints : []};
	
	this._getKeyPoints();
	this._ApplyKeyPointsToMap();
	
	//console.log(this);
};

Teriable.Noise.prototype._getKeyPoints = function(){
	for(var i = 0; i < this.args.nPoints; i++){
		this.data.keyPoints.push({x:this._cleanSeed((1+(i*(i*0.5)))*this._seed._clean),y:this._cleanSeed((1 + (i+i))*(this._seed._clean*0.95))});	
	}
};

Teriable.Noise.prototype._ApplyKeyPointsToMap = function(){
	
	 for(var i = 0; i < this.data.keyPoints.length; i++){
		this.data.keyPoints[i].x = (this.args.width * this.data.keyPoints[i].x);
		this.data.keyPoints[i].y = (this.args.height * this.data.keyPoints[i].y);
	 }
	return;
};


Teriable.Noise.prototype.Poorly2d_Get = function(ix, iy){
			if(typeof this.args.scale !== 'undefined' && this.args.scale != 0){
				ix = ix/this.args.scale;
				iy = iy/this.args.scale;
				if(this.args.scaleFloor == true){
					ix = Math.floor(ix);	
					iy = Math.floor(iy);	
				}
			}
	
		var dist;
		this.data.normalValues = [];
		
		for(var i = 0; i < this.data.keyPoints.length; i++){
		dist = this[this.args.style](Math.cos(ix) - this.data.keyPoints[i].x, Math.cos(iy) - this.data.keyPoints[i].y);
		this.data.normalValues.push(dist);
		}
		this.data.normalValues.sort(function(a, b){return a-b});

		this.data.value = ((this.data.normalValues[this.args.n] - this.data.normalValues[0]));
		
		var range = this.data.normalValues[this.data.normalValues.length-1] - this.data.normalValues[0];
		this.data.value = (this.data.value)/range;	
		
		return this.data.value;
};

Teriable.Noise.prototype.Tiley2_Get = function(ix, iy){
			if(typeof this.args.scale !== 'undefined' && this.args.scale != 0){
				ix = ix/this.args.scale;
				iy = iy/this.args.scale;
				if(this.args.scaleFloor == true){
					ix = Math.floor(ix);	
					iy = Math.floor(iy);	
				}
			}
	
		var dist;
		this.data.normalValues = [];
		
		for(var i = 0; i < this.data.keyPoints.length; i++){
		dist = this[this.args.style](Math.tan(ix) - this.data.keyPoints[i].x, Math.tan(iy) - this.data.keyPoints[i].y);
		this.data.normalValues.push(dist);
		}
		this.data.normalValues.sort(function(a, b){return a-b});

		this.data.value = ((this.data.normalValues[this.args.n] - this.data.normalValues[0]));
		
		var range = this.data.normalValues[this.data.normalValues.length-1] - this.data.normalValues[0];
		this.data.value = (this.data.value)/range;	
		
		return this.data.value;
};


Teriable.Noise.prototype.Poorly2_Get = function(ix, iy){
			if(typeof this.args.scale !== 'undefined' && this.args.scale != 0){
				ix = ix/this.args.scale;
				iy = iy/this.args.scale;
				if(this.args.scaleFloor == true){
					ix = Math.floor(ix);	
					iy = Math.floor(iy);	
				}
			}
	
		var dist;
		this.data.normalValues = [];
		
		for(var i = 0; i < this.data.keyPoints.length; i++){
		dist = this[this.args.style](Math.cos(ix) - this.data.keyPoints[i].x, Math.cos(iy) - this.data.keyPoints[i].y);
		this.data.normalValues.push(dist);
		}
		this.data.normalValues.sort(function(a, b){return a-b});

		this.data.value = ((this.data.normalValues[this.args.n] - this.data.normalValues[0]));
		
		var range = this.data.normalValues[this.data.normalValues.length-1] - this.data.normalValues[0];
		this.data.value = (this.data.value)/range;	
		
		return this.data.value;
};

Teriable.Noise.prototype.Poorly2b_Get = function(ix, iy){
			if(typeof this.args.scale !== 'undefined' && this.args.scale != 0){
				ix = ix/this.args.scale;
				iy = iy/this.args.scale;
				if(this.args.scaleFloor == true){
					ix = Math.floor(ix);	
					iy = Math.floor(iy);	
				}
			}
	
		var dist;
		this.data.normalValues = [];
		
		for(var i = 0; i < this.data.keyPoints.length; i++){
		dist = this[this.args.style](Math.cos(ix) + this.data.keyPoints[i].x, Math.cos(iy) + this.data.keyPoints[i].y);
		this.data.normalValues.push(dist);
		}
		this.data.normalValues.sort(function(a, b){return a-b});

		this.data.value = ((this.data.normalValues[this.args.n] - this.data.normalValues[0]));
		
		var range = this.data.normalValues[this.data.normalValues.length-1] - this.data.normalValues[0];
		this.data.value = (this.data.value-this.data.normalValues[0])/range;	
		
		return this.data.value;
};

Teriable.Noise.prototype.Poorly2c_Get = function(ix, iy){
			if(typeof this.args.scale !== 'undefined' && this.args.scale != 0){
				ix = ix/this.args.scale;
				iy = iy/this.args.scale;
				if(this.args.scaleFloor == true){
					ix = Math.floor(ix);	
					iy = Math.floor(iy);	
				}
			}
	
		var dist;
		this.data.normalValues = [];
		
		for(var i = 0; i < this.data.keyPoints.length; i++){
		dist = this[this.args.style](Math.cos(ix) * this.data.keyPoints[i].x, Math.cos(iy) * this.data.keyPoints[i].y);
		this.data.normalValues.push(dist);
		}
		this.data.normalValues.sort(function(a, b){return a-b});

		this.data.value = ((this.data.normalValues[this.args.n] - this.data.normalValues[0]));
		
		var range = this.data.normalValues[this.data.normalValues.length-1] - this.data.normalValues[0];
		this.data.value = (this.data.value)/range;	
		
		return this.data.value;
};

Teriable.Noise.prototype.euclidean = function(dx, dy){
	return Math.sqrt(Math.pow(dy - dx, 2));
}

Teriable.Noise.prototype.manhattan = function(dx, dy){
	var max = Math.max(dx,dy);
	var min = Math.min(dx,dy)
	return (max - min) * (max - min);
	
}

Teriable.Noise.prototype.badclidean = function(dx, dy){
	return Math.abs(Math.sqrt((dy - dx)) * Math.sqrt((dy - dx)));	
}

Teriable.Noise.prototype.badhattan = function(dx, dy) {
    return Math.abs(dx) + Math.abs(dy);
}

Teriable.Noise.prototype.badhattan2 = function(dx, dy){
	return Math.abs(dx) - Math.abs(dy);	
}

Teriable.Noise.prototype.badclidean2 = function(dx, dy){
	return dx * dx - dy * dy;	
}

Teriable.Noise.prototype.chebyshevish = function(dx,dy){
	return Math.max(Math.abs(dx - (dy/2)),Math.abs(dy - (dx/2)));
}

Teriable.Noise.prototype.chebyshevish2 = function(dx,dy){
	return Math.min(Math.abs(dx + (dy/2)),Math.abs(dy + (dx/2)));
}

Teriable.Noise.prototype.chebyshevish3 = function(dx,dy){
	return Math.min(Math.abs(dx - (dy/2)),Math.abs(dy - (dx/2)));
}

Teriable.Noise.prototype.chebyshevish4 = function(dx,dy){
	return Math.max(Math.abs(dx + (dy/2)),Math.abs(dy + (dx/2)));
}


//I made these ones up...
Teriable.Noise.prototype.valentine = function(dx, dy){
	return Math.cos(Math.max((dx*dy),(dy*dx)));
}

Teriable.Noise.prototype.valentine2 = function(dx, dy){
	return Math.cos(Math.min((dx/-dy),(dy/-dx))/Math.max((dx/-dy),(dy/-dx)));
}

Teriable.Noise.prototype.valentine2b = function(dx, dy){
	var a = Math.min((dx/-dy),(dy/-dx))/Math.max((dx/-dy),(dy/-dx));
	var b = Math.max((dx/-dy),(dy/-dx))/Math.min((dx/-dy),(dy/-dx));
	return Math.cos(Math.max(a*b, a/b)/Math.min((a*b, a/b)));
}

Teriable.Noise.prototype.valentine3 = function(dx, dy){
 	var r = (dx+dy) * Math.cos(Math.min(dx,dy)/Math.max(dx,dy));
	var r2 = (dx+ dy) * Math.sin(Math.min(dx,dy)/Math.max(dx,dy));
	
	return Math.abs((dx - r) + (dy - r2));
}

Teriable.Noise.prototype.valentine4 = function(dx, dy){
 	var r = 1/((1/(dx+dy)) *  (1/(Math.min(dx,dy)/Math.max(dx,dy))));
	var r2 = 1/((1/(dx+ dy)) * (1/(Math.min(dx,dy)/Math.max(dx,dy))));
	
	return 1/Math.min((dx - r) / (dy - r2),(dx + r) / (dy + r2));
}

Teriable.Noise.prototype.valentine5 = function(dx, dy){
 	var r = (1 /(dx+dy)) *( 1/ (Math.max(dx,dy)/Math.min(dx,dy)));
	var r2 = (1 /(dx+ dy)) * ( 1 / (Math.max(dx,dy)/Math.min(dx,dy)));
	
	return 1 / ((dx - r) + (dy - r2));
}

Teriable.Noise.prototype.rachel = function(dx, dy){
 return Teriable.Noise.lerp(dx, dy, 1/(dx+dy));
}
Teriable.Noise.prototype.pythagorean  = function(dx, dy){
 return Math.sqrt(((dx*dx)+(dy*dy)));
}

Teriable.Noise.prototype.pi  = function(dx, dy){
 return 1/(360/(((dx*dx)+(dy*dy))/Math.PI));
}


Teriable.Mix = function (a, b, p){	
	return a*(1-p)+b*p;
};
Teriable.Multiply = function (a, b){
	return a*b;
}
Teriable.Average_Add = function (a, b){
	return (a+b)*0.5;
}
Teriable.Average_Sub = function (a, b){
	return (a-b)*0.5;
}
Teriable.Divide = function(a,b){
	var min = Math.min(a, b),
	 	max = Math.max(a, b);
		
		return min/max;
	
}


Teriable.Noise.prototype.Test = function(){
	if(typeof this.args.nPoints !== 'undefined'){this.args.nPoints = Math.floor(this.args.nPoints)}
	if(typeof this.args.nPoints == 'undefined' || this.args.nPoints == 0){ this.args.nPoints = 10;}
	if(typeof this.args.n !== 'undefined'){this.args.n = Math.floor(this.args.n)};
	if(typeof this.args.n == 'undefined' || this.args.n == 0){ this.args.n = 6;}
	if(typeof this.args.width !== 'undefined'){this.args.width = Math.floor(this.args.width)};
	if(typeof this.args.width == 'undefined' || this.args.width == 0){ this.args.width = 100;}
	if(typeof this.args.height !== 'undefined'){this.args.height = Math.floor(this.args.height)};
	if(typeof this.args.height == 'undefined' || this.args.height == 0){ this.args.height = 100;}
	if(typeof this.args.style == 'undefined'){ this.args.style = 'euclidean';}
	
	this.data = {keyPoints : []};
	this._getKeyPoints();
	this._ApplyKeyPointsToMap();	
}


Teriable.Noise.prototype.Test_Get = function(ix, iy){
			if(typeof this.args.scale !== 'undefined' && this.args.scale != 0){
				ix = ix/this.args.scale;
				iy = iy/this.args.scale;
				if(this.args.scaleFloor == true){
					ix = Math.floor(ix);	
					iy = Math.floor(iy);	
				}
			}
	
		var dn10, dn00, dn01, dm10, dm00, dm01, ds10, ds00, ds01;
		this.data.normalValues = [];
		var offsets = {};
		offsets.n10 = {x:(Math.floor(ix/this.args.width)*this.args.width)-this.args.width,
					   y:(Math.floor(iy/this.args.height)*this.args.height)+this.args.height};
		offsets.n00 = {x:(Math.floor(ix/this.args.width)*this.args.width),
					   y:(Math.floor(iy/this.args.height)*this.args.height)+this.args.height};
		offsets.n01 = {x:(Math.floor(ix/this.args.width)*this.args.width)+this.args.width,
					   y:(Math.floor(iy/this.args.height)*this.args.height)+this.args.height};
		offsets.m10 = {x:(Math.floor(ix/this.args.width)*this.args.width)-this.args.width,
					   y:(Math.floor(iy/this.args.height)*this.args.height)};
		offsets.m00 = {x:(Math.floor(ix/this.args.width)*this.args.width),
					   y:(Math.floor(iy/this.args.height)*this.args.height)};
		offsets.m01 = {x:(Math.floor(ix/this.args.width)*this.args.width)+this.args.width,
					   y:(Math.floor(iy/this.args.height)*this.args.height)};
		offsets.s10 = {x:(Math.floor(ix/this.args.width)*this.args.width)-this.args.width,
					   y:(Math.floor(iy/this.args.height)*this.args.height)-this.args.height};
		offsets.s00 = {x:(Math.floor(ix/this.args.width)*this.args.width),
					   y:(Math.floor(iy/this.args.height)*this.args.height)-this.args.height};
		offsets.s01 = {x:(Math.floor(ix/this.args.width)*this.args.width)+this.args.width,
					   y:(Math.floor(iy/this.args.height)*this.args.height)-this.args.height};
		//console.log(offsets);
		
					   
		for(var i = 0; i < this.data.keyPoints.length; i++){
		
		dn10 = this[this.args.style](ix - (this.data.keyPoints[i].x+offsets.n10.x), iy - (this.data.keyPoints[i].y+offsets.n10.y));
		dn00 = this[this.args.style](ix - (this.data.keyPoints[i].x+offsets.n00.x), iy - (this.data.keyPoints[i].y+offsets.n00.y));
		dn01 = this[this.args.style](ix - (this.data.keyPoints[i].x+offsets.n01.x), iy - (this.data.keyPoints[i].y+offsets.n01.y));
		dm10 = this[this.args.style](ix - (this.data.keyPoints[i].x+offsets.m10.x), iy - (this.data.keyPoints[i].y+offsets.m10.y));
		dm00 = this[this.args.style](ix - (this.data.keyPoints[i].x+offsets.m00.x), iy - (this.data.keyPoints[i].y+offsets.m00.y));
		dm01 = this[this.args.style](ix - (this.data.keyPoints[i].x+offsets.m01.x), iy - (this.data.keyPoints[i].y+offsets.m01.y));
		ds10 = this[this.args.style](ix - (this.data.keyPoints[i].x+offsets.s10.x), iy - (this.data.keyPoints[i].y+offsets.s10.y));
		ds00 = this[this.args.style](ix - (this.data.keyPoints[i].x+offsets.s00.x), iy - (this.data.keyPoints[i].y+offsets.s00.y));
		ds01 = this[this.args.style](ix - (this.data.keyPoints[i].x+offsets.s01.x), iy - (this.data.keyPoints[i].y+offsets.s01.y));
	
		this.data.normalValues.push(dn10, dn00, dn01, dm10, dm00, dm01, ds10, ds00, ds01);

		}
		this.data.normalValues.sort(function(a, b){return a-b});
		
		this.data.value = ((this.data.normalValues[this.args.n] - this.data.normalValues[0]));
		
		var range = this.data.normalValues[this.data.normalValues.length-1] - this.data.normalValues[0];
		this.data.value = (this.data.value/range);
		
		//console.log(this.data.value);	
		
		return this.data.value;
};


Teriable.Noise.prototype.Cellular2 = function() {
	if(typeof this.args.nPoints !== 'undefined'){this.args.nPoints = Math.floor(this.args.nPoints)}
	if(typeof this.args.nPoints == 'undefined' || this.args.nPoints == 0){ this.args.nPoints = 6;}
	if(typeof this.args.n !== 'undefined'){this.args.n = Math.floor(this.args.n)};
	if(typeof this.args.n == 'undefined' || this.args.n == 0){ this.args.n = 2;}
	if(typeof this.args.width !== 'undefined'){this.args.width = Math.floor(this.args.width)};
	if(typeof this.args.width == 'undefined' || this.args.width == 0){ this.args.width = 100;}
	if(typeof this.args.height !== 'undefined'){this.args.height = Math.floor(this.args.height)};
	if(typeof this.args.height == 'undefined' || this.args.height == 0){ this.args.height = 100;}
	if(typeof this.args.style == 'undefined'){ this.args.style = 'euclidean';}
	this._Cellular2_init();

}

Teriable.Noise.prototype._Cellular2_init = function () {
	var i;
	this.data ={};
    this._points = [];

    for (i = 0; i < this.args.nPoints; ++i) {
        var x = Math.sin(i + 1) * this._seed._clean,
            y = Math.cos(i + 1) * this._seed._clean;
        this._points.push({
            x: x - Math.floor(x),
            y: y - Math.floor(y)
        });
}
console.log(this._points);

};

Teriable.Noise.prototype._Cellular2_Get = function (x, y) {
		if(typeof this.args.scale !== 'undefined' && this.args.scale != 0){
				x = x/this.args.scale;
				y = y/this.args.scale;
				if(this.args.scaleFloor == true){
					x = Math.floor(x);	
					y = Math.floor(y);	
				}
			}
	

	
	var temp = [];
	var offsets = {};
		//offsets.n10 = {x:(Math.floor(x/this.args.width)*this.args.width)-this.args.width,
					  // y:(Math.floor(y/this.args.height)*this.args.height)+this.args.height};
		//offsets.n00 = {x:(Math.floor(x/this.args.width)*this.args.width),
					 //  y:(Math.floor(y/this.args.height)*this.args.height)+this.args.height};
		//offsets.n01 = {x:(Math.floor(x/this.args.width)*this.args.width)+this.args.width,
					 //  y:(Math.floor(y/this.args.height)*this.args.height)+this.args.height};
		//offsets.m10 = {x:(Math.floor(x/this.args.width)*this.args.width)-this.args.width,
					 //  y:(Math.floor(y/this.args.height)*this.args.height)};
		offsets.m00 = {x:(Math.floor(x/this.args.width)*this.args.width),
					   y:(Math.floor(y/this.args.height)*this.args.height)};
		//offsets.m01 = {x:(Math.floor(x/this.args.width)*this.args.width)+this.args.width,
					 //  y:(Math.floor(y/this.args.height)*this.args.height)};
		//offsets.s10 = {x:(Math.floor(x/this.args.width)*this.args.width)-this.args.width,
					//   y:(Math.floor(y/this.args.height)*this.args.height)-this.args.height};
		//offsets.s00 = {x:(Math.floor(x/this.args.width)*this.args.width),
					//   y:(Math.floor(y/this.args.height)*this.args.height)-this.args.height};
		//offsets.s01 = {x:(Math.floor(x/this.args.width)*this.args.width)+this.args.width,
					//   y:(Math.floor(y/this.args.height)*this.args.height)-this.args.height};
	
    for (var i = 0; i < this.args.nPoints; ++i) {
		//dn10 = this[this.args.style](x - (this._points[i].x+offsets.n10.x), y - (this._points[i].y+offsets.n10.y));
		//dn00 = this[this.args.style](x - (this._points[i].x+offsets.n00.x), y - (this._points[i].y+offsets.n00.y));
		//dn01 = this[this.args.style](x - (this._points[i].x+offsets.n01.x), y - (this._points[i].y+offsets.n01.y));
		//dm10 = this[this.args.style](x - (this._points[i].x+offsets.m10.x), y - (this._points[i].y+offsets.m10.y));
		dm00 = this[this.args.style](x - (this._points[i].x-offsets.m00.x), y - (this._points[i].y-offsets.m00.y));
		//dm01 = this[this.args.style](x - (this._points[i].x+offsets.m01.x), y - (this._points[i].y+offsets.m01.y));
		//ds10 = this[this.args.style](x - (this._points[i].x+offsets.s10.x), y - (this._points[i].y+offsets.s10.y));
		//ds00 = this[this.args.style](x - (this._points[i].x+offsets.s00.x), y - (this._points[i].y+offsets.s00.y));
		//ds01 = this[this.args.style](x - (this._points[i].x+offsets.s01.x), y - (this._points[i].y+offsets.s01.y));
	
		temp.push(dm00);
	}
	
		temp.sort(function(a, b){return a-b});
		
		//console.log(temp);
		this.data.value = ((temp[this.args.n] - temp[0]));
		
		var range = temp[temp.length-1] - temp[0];
		this.data.value = (this.data.value/range);
		
		//console.log(this.data.value);	
		
		return this.data.value; 
	
   
};





