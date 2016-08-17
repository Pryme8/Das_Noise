//Andrew V Butt Sr. - Pryme8@gmail.com
//Compilation of Standard Noises for Javascript version 1.1.0;
//Pryme8.github.io

function WorleyNoise2D(numPoints, seed, width, height, targetPoint, style){
this._numPoints = numPoints || 1,
this._keyPoints = [],
this._seed = parseInt(seed) || 3241,
this._width = width || 1,
this._height = height || 1;
this._targetPoint = targetPoint || 2;
this._style = window[style] || euclidean;

this._getKeyPoints();

this._normalValues = [];

}


WorleyNoise2D.prototype._getKeyPoints = function(){
	for(var i = 0; i < this._numPoints; i++){
		this._keyPoints.push({x: WorleyNoise2D.Random(this._seed/((i+1)/2)),y: WorleyNoise2D.Random(((this._seed+1)+(i+1)/2)/2)});	
	}
	this._ApplyKeyPointsToMap();
	return;
};

WorleyNoise2D.Random = function(seed){
	var s = Math.sin(seed) * 10000;
	return s - Math.floor(s);	
};

WorleyNoise2D.prototype._ApplyKeyPointsToMap = function(){
	console.log("width: "+this._width+" - height: "+ this._height);
	 for(var i = 0; i < this._keyPoints.length; i++){
		 
		 this._keyPoints[i].x = (this._width*-0.5)+(this._width * this._keyPoints[i].x);
		 this._keyPoints[i].y = (this._height*-0.5)+(this._height * this._keyPoints[i].y);
		 //this._keyPoints[i].x = (this._width * this._keyPoints[i].x)-(this._width/2);
		 //this._keyPoints[i].y = (this._height * this._keyPoints[i].y)-(this._height/2);
	}
	return;
};

WorleyNoise2D.prototype._calculateDistance = function(ix, iy){
	var dist;

	for(var i = 0; i < this._keyPoints.length; i++){
		dist = this._style(ix - this._keyPoints[i].x, iy - this._keyPoints[i].y);
		this._normalValues.push(dist);
	}
	this._normalValues.sort(function(a, b){return a-b});	
};

WorleyNoise2D.prototype._getPointValue = function(ix, iy){
		this._calculateDistance(ix, iy);
		
		var scale = 1 / (this._normalValues[this._normalValues.length-1] - this._normalValues[0]);
			var value = ((this._normalValues[this._targetPoint] - this._normalValues[0]) * scale)/0.1;
			
		value = Math.max(-1, Math.min(1, (value * 2) - 1));
		
	
		this._normalValues = [];
		return value;
}

function euclidean(dx, dy){
	return dx * dx + dy * dy;	
}

function manhattan(dx, dy) {
    return Math.abs(dx) + Math.abs(dy);
}

function manhattan2(dx, dy){
	return Math.abs(dx) - Math.abs(dy);	
}

function euclidean2(dx, dy){
	return dx * dx - dy * dy;	
}

function chebyshevish(dx,dy){
	return Math.max(Math.abs(dx - (dy/2)),Math.abs(dy - (dx/2)));
}

function chebyshevish2(dx,dy){
	return Math.min(Math.abs(dx + (dy/2)),Math.abs(dy + (dx/2)));
}

function chebyshevish3(dx,dy){
	return Math.min(Math.abs(dx - (dy/2)),Math.abs(dy - (dx/2)));
}

function chebyshevish4(dx,dy){
	return Math.max(Math.abs(dx + (dy/2)),Math.abs(dy + (dx/2)));
}

function valentine(dx, dy){
	return Math.min((dx/dy),(dy/dx))/Math.max((dx/dy),(dy/dx));
}

function valentine2(dx, dy){
	return Math.abs(Math.min((dx/-dy),(dy/-dx))/Math.max((dx/-dy),(dy/-dx)));
}

function valentine3(dx, dy){
 	var r = (dx+dy) * Math.cos(Math.min(dx,dy)/Math.max(dx,dy));
	var r2 = (dx+ dy) * Math.sin(Math.min(dx,dy)/Math.max(dx,dy));
	
	return Math.abs((dx - r) + (dy - r2));
}

function valentine4(dx, dy){
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











