var GCompo = [
    "source-over",
    "source-atop",
    "source-in",
    "source-out",
    "destination-over",
    "destination-atop",
    "destination-in",
    "destination-out",
    "lighter",
    "copy",
    "xor"
]

//http://natureofcode.com/book/processingjs/processing.js
//https://github.com/processing-js/processing-js/blob/master/processing.js
class PVector {
    constructor(x = 0 , y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }


    static dist(v1, v2) {
        return v1.dist(v2)
    }


    static dot(v1, v2) {
        return v1.dist(v2)
    }


    static cross(v1, v2) {
        return v1.cross(v2)
    }

    static fromAngle(angle, v) {
        if (v === undefined || v === null) {
          v = new PVector();
        }
        v.x = Math.cos(angle);
        v.y = Math.sin(angle);
        return v;
    };

    static random2D(v) {
        var PConstants = {};
        PConstants.TWO_PI = 2;

        return PVector.fromAngle(Math.random() * PConstants.TWO_PI, v);
    };

    static angleBetween(v1, v2) {
        return Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
    }

    //Calculates the magnitude (length) of the vector and returns the result as a float

    mag() {
        var x = this.x, y = this.y, z = this.z;
        return Math.sqrt(x * x + y * y + z * z);
    }

    //Sets the x, y, z component of the vector

    set(v, y, z) {
        if (arguments.length === 1) this.set(v.x || v[0] || 0, v.y || v[1] || 0, v.z || v[2] || 0);
        else {
          this.x = v;
          this.y = y;
          this.z = z
        }
    }

    //Gets the x, y, z component of the vector

    get() {
        return new PVector(this.x, this.y, this.z);
    }

    //Adds one vector to another

    add(v, y, z) {
        if (arguments.length === 1) {
          this.x += v.x;
          this.y += v.y;
          this.z += v.z
        } else {
          this.x += v;
          this.y += y;
          this.z += z
        }
    }

    //Subtracts one vector from another

    sub(v, y, z) {
        if (arguments.length === 1) {
          this.x -= v.x;
          this.y -= v.y;
          this.z -= v.z
        } else {
          this.x -= v;
          this.y -= y;
          this.z -= z
        }
    }

    static sub(v) {
        var o = new PVector(this.x-v.x, this.y-v.y);
        return o;
    }

    //Multiplies the vector by a scalar

    mult(v) {
        if (typeof v === "number") {
          this.x *= v;
          this.y *= v;
          this.z *= v
        } else {
          this.x *= v.x;
          this.y *= v.y;
          this.z *= v.z
        }
    }

    //Divides the vector by a scalar

    div(v) {
        if (typeof v === "number") {
          this.x /= v;
          this.y /= v;
          this.z /= v
        } else {
          this.x /= v.x;
          this.y /= v.y;
          this.z /= v.z
        }
    }

    static div(v) {
        //console.info(this.x);
        var o = new PVector(v.x, v.y);
        return o;
    }

    //Calculate the Euclidean distance between two points

    dist(v) {
        var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    //Calculates the dot product

    dot(v, y, z) {
        if (arguments.length === 1) return this.x * v.x + this.y * v.y + this.z * v.z;
        return this.x * v + this.y * y + this.z * z;
    }

    //Calculates the cross product

    cross(v) {
        var x = this.x,
          y = this.y,
          z = this.z;
        return new PVector(y * v.z - v.y * z, z * v.x - v.z * x, x * v.y - v.x * y)
    }

    //Normalizes the vector

    normalize() {
        var m = this.mag();

        if (m > 0) {
            this.div(m);
        }
    }

    //Limits the magnitude of the vector

    limit(max) {

        if (this.mag() > max) {
          this.normalize();
          this.mult(max);
        }
    }

    //Calculates the angle between two vectors

    heading2D() {
        return -Math.atan2(-this.y, this.x)
    }


    toString() {
        return "[" + this.x + ", " + this.y + ", " + this.z + "]"
    }

    //Return a representation of the vector as an array

    array() {
        return [this.x, this.y, this.z]
    }
}

class Util extends PVector {

    constructor(els) {
        super();
        this.now = new Date;
    }

    random(min, max) {

        if (arguments.length == 2) {
            return Math.round(Math.random() * (max - min + 1) + min);
        } else {
            return Math.floor(Math.random() * min  + 1);
        }
    }

    date (type = ":") {
        var date = this.now;

        return ( date.getMonth() + 1 ) + type +
                (date.getDate()) + type + (date.getFullYear());
    }

    time (type = ":") {
        var now = this.now;

        return now.getHours() + type +
            ((now.getMinutes() < 10)
            ? ("0" + now.getMinutes()) : (now.getMinutes())) + type + ((now.getSeconds() < 10)
            ? ("0" + now.getSeconds()) : (now.getSeconds()));
    }

    type (datatype) {

        return Object.prototype.toString.call(datatype).match(/\[object (\w+)\]/)[1];
    }

    logEach (array) {

        for (var i = 0, length = array.length; i < length; i++)
            this.logs(array[i]);
    }

    range (x, y, arr, action) {

        if(action)
            for (var i = x, len = y; i < len; i++)
                action(arr[i]);
    }

    rC (len, action) {

        if(action)
            for (var i = 0; i < len; i++)
                action(i);
    }

    each (array, action) {

        for (var i = 0, len = array.length; i < len; i++)
            action(array[i], i);
    }

    reduce (action, base, array) {

        this.each(array, function (element) {
            base = action(base, element);
        });

        return base;
    }

    map (func, array) {
        var results = [];

        this.each(array, function (element) {
           results.push(func(element));
        });

        return results;
    }

    group (start, msg) {
        console.group(start);
        console.log(msg);
        console.groupEnd(start);
    }

    // logs

    logs (clr) {

        var tmp =   `<span class="clr-chit">
                        ${clr}
                        <small class="removeclrchit close" style="cursor: pointer;margin: 0 16px;">✖</small>
                    </span>`;

        $(".logs").append(tmp);

    	$(".removeclrchit").on("click", function () {
    		$(this).parent().remove();
    	});
    }

    // assert

    assert(value, desc) {
      var test =  value ? "pass" : "fail";

      var tmp =   `<span class="clr-chit ${test}">
                      ${desc}
                      <small class="removeclrchit close" style="cursor: pointer;margin: 0 16px;">✖</small>
                  </span>`;

      $(".logs").append(tmp);

      $(".removeclrchit").on("click", function () {
        $(this).parent().remove();
      });
    }

    // testing

    profile(name, fn) {
        console.time(name);
        fn();
        console.timeEnd(name);
    }
}



class Canvas extends Util {

    constructor (els) {
        super();
        this.canvas = els;
        this.ctx = els.getContext("2d");
    }

    mode (is) {
        var ctx = this.ctx;

        if (is == "global") {
            for (var key in ctx) {
                if (ctx.hasOwnProperty(key)) {
                    window[key] = ctx[key];
                }
            }
        } else {
            if (is.length > 0) {
                throw "Please enter global as a parameter";
            } else {
                throw "Please enter global if you want to use all method globally";
            }
        }
    }


    // Structure

    set (options) {
        var settings, util = this.util, ctx = this.ctx;

        settings = util.extend({
        }, options);

        for ( var key in settings) {
            if(ctx.hasOwnProperty(key))
                ctx[key] = settings[key];
        }

        return this;
    }

    drawEllipse (centerX, centerY, width, height) {

        var context = this.ctx;

        context.beginPath();
        context.moveTo(centerX, centerY - height/2); // A1
        context.bezierCurveTo(
            centerX + width/2, centerY - height/2, // C1
            centerX + width/2, centerY + height/2, // C2
            centerX, centerY + height/2); // A2
        context.bezierCurveTo(
            centerX - width/2, centerY + height/2, // C3
            centerX - width/2, centerY - height/2, // C4
            centerX, centerY - height/2); // A1
        context.fillStyle = "red";
        context.fill();
        context.closePath();
    }

    rect (x, y, width, height, radius) {
        var ctx = this.ctx, xwidth = x + width, yheight = y + height;

        function bRect (ctx) {
            ctx.moveTo(x + radius, y);
            ctx.lineTo(xwidth - radius, y);
            ctx.quadraticCurveTo(xwidth, y, xwidth, y + radius);
            ctx.lineTo(xwidth, y + height - radius);
            ctx.quadraticCurveTo(xwidth, yheight, xwidth - radius, yheight);
            ctx.lineTo(x + radius, yheight);
            ctx.quadraticCurveTo(x, yheight, x, yheight - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
        }

        ctx.beginPath();

        if( radius ) bRect(ctx);
        else ctx.rect(x, y, width, height);

        ctx.stroke();
        ctx.closePath();

        return this;
    };


    ellipse (x, y, width, height) {
        var ctx = this.ctx;
        ctx.beginPath();

        x = x || 0;
        y = y || 0;

    	if (width == height) {

            ctx.arc(x, y, width/2, 0, Math.PI * 2, false);
    	} else {

       	    ctx.moveTo(x, y-height/2);

            ctx.bezierCurveTo(
        		x + width/2, y - height/2, // C1
        		x + width/2, y + height/2, // C2
        		x, y + height/2); // A2

      	 ctx.bezierCurveTo(
        		x - width/2, y + height/2, // C3
        		x - width/2, y - height/2, // C4
        		x, y - height/2); // A1
    	}

      ctx.stroke();
      ctx.closePath();

      return this;
    }


    //line property

    line (x, y, x1, y1) {
        var ctx = this.ctx;

        this.path("begin");
        this.move(x, y);
        this.mLine(x1, y1);
        this.stroke();
        this.path();
    }


    background (clr) {

        this.canvas.style.backgroundColor = clr;
    };


    // Dimenstion


    height (arg) {

        if(arg) { this.canvas.height = arg; this.canvas.style.height = arg + "px"; }
        else return this.canvas.height;
    }

    width (arg) {

        if(arg) this.canvas.width = arg;
        else return this.canvas.width;
    }

    halfHeight () {

        return this.canvas.height/2;
    }

    halfWidth () {

        return this.canvas.width/2;
    }

    pFill () {

        var ctx = this.ctx;

        return ctx.fill();
    }

    stroke(clr = "black") {

        var ctx = this.ctx;

        ctx.strokeStyle = clr;
        ctx.stroke();
        return this;
    }

    point(x, y, shape) {
      var ctx = this.ctx;

      if (shape == "line") {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x+1, y+1);
          ctx.stroke();
      } else if (shape == "srect") {
          ctx.strokeRect(x,y,1,1);
      } else if (shape == "frect") {
          ctx.strokeRect(x,y,1,1);
      } else if (shape == "circle") {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, 2 * Math.PI, true);
          ctx.fill();
      }
    }

    strokeWeight(weight = 1) {
        this.ctx.lineWidth = weight;
    }

    path (arg) {

        var ctx = this.ctx;

        if(arg == "begin") return ctx.beginPath();
        else return ctx.closePath();
    }

    arc (x,y,r,sAngle,eAngle,counterclockwise) {

        var ctx = this.ctx;

        return ctx.arc(x,y,r,sAngle,eAngle,counterclockwise);
    }

    gCompo(com) {
        this.ctx.globalCompositeOperation = com;
    }

    gAlpha(val) {
        this.ctx.globalAlpha = val;
    }

    rColor() {
        var cformat = "";
        var ctx = this.ctx;
        var o = Math.round, r = Math.random, s = 255;
        cformat = 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
        ctx.fillStyle = ""+cformat+"";
        ctx.fill();
    }

    color(r, g, b, a) {

        var cformat = "";
        var ctx = this.ctx;

        console.info(arguments.length);

        cformat =  (arguments.length < 4) ?
                `rgb(${r}, ${g}, ${b})` :
                `rgba(${r}, ${g}, ${b}, ${a})`;

         console.info(cformat);

         ctx.fillStyle = ""+cformat+"";
         ctx.fill();
    }

    gClr(x, y, x1, y1, arr) {
        var my_gradient = this.ctx.createLinearGradient(x, y, x1, y1);

        for (var i = 0; i < arr; i++) {
            my_gradient.addColorStop(i, arr[i]);
        }

        return my_gradient;
    }

    gAdd(obj, area, clr) {
        obj.addColorStop(area, clr);

        return obj;
    }

    arcTo (x1,y1,x2,y2,r) {

        var ctx = this.ctx;

        return ctx.arcTo(x1,y1,x2,y2,r);
    }

    mLine (x, y) {

        var ctx = this.ctx;

        return ctx.lineTo(x, y);
    }

    move (x, y) {

        var ctx = this.ctx;

        return ctx.moveTo(x, y);
    }

    fill (clr) {

        this.ctx.fillStyle = clr;
        this.ctx.fill();

        return this;
    }

    bezier (cp1x,cp1y,cp2x,cp2y,x,y) {

        var ctx = this.ctx;

        return ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
    }

    inPath (x, y) {

        var ctx = this.ctx;

        return ctx.isPointInPath(x, y);
    }

    quadratic (cpx,cpy,x,y) {

        var ctx = this.ctx;

        return ctx.quadraticCurveTo(cpx,cpy,x,y);
    }


    lineCap (lineCap) {

        var ctx = this.ctx;

        return this;
    }

    lineWidth (lineWidth) {

        var ctx = this.ctx;

        ctx.lineWidth = lineWidth;

        return this;
    }

    miterLimit (miterLimit) {

        var ctx = this.ctx;
        ctx.miterLimit = miterLimit;

        return this;
    }

    // text

    text (style, msg, x, y) {

        var ctx = this.ctx, len = arguments.length;

        if(style) ctx.font = style;
        if(msg && x && y ) ctx.fillText(msg, x, y);
    }


    scale (x, y) {

        this.ctx.scale(x,y);

        return this;
    }

    flipH (x) {
        var ctx = this.ctx;

        ctx.translate(x, 0);
        ctx.scale(-1, 1);
        ctx.translate(x, 0);

        return this;
    }

    rotate (angle) {

        this.ctx.rotate(angle);

        return this;
    }

    translate (x, y) {

        this.ctx.translate(x, y);

        return this;
    }

    transform (a,b,c,d,e,f) {

        this.ctx.transform(a,b,c,d,e,f);

        return this;
    }

    setTransform (a,b,c,d,e,f) {

        this.ctx.setTransform(a,b,c,d,e,f);

        return this;
    }

    save () {

        this.ctx.save();

        return this;
    }

    restore () {

        this.ctx.restore();

        return this;
    }

    clear () {

        this.ctx.clearRect(0, 0, this.width(), this.height());

        return this;
    }

    shadow (clr, width) {

        var ctx = this.ctx, len = arguments.length;

        if (len == 2 ) {
            ctx.shadowBlur = width;
            ctx.shadowColor = clr;
        } else if (clr) {
            ctx.shadowColor = clr;
        } else {
            ctx.shadowBlur = width;
        }

        return this;
    }


    img (img, x, y, width, height, destX, destY, destWidth, destHeight) {
    	var ctx = this.ctx;

    	if (arguments.length === 3) {
    		ctx.drawImage(img, x, y);
    	} else if (arguments.length === 5) {
    	   ctx.drawImage(img, x, y, width, height);
    	} else {
    	   ctx.drawImage(img, x, y, width, height, destX, destY, destWidth, destHeight);
    	}
    }

    // Events

    on (event, callback, el) {

        if (!el) el = document.getElementById("canvas");

        el.addEventListener(event, callback, false);
    }
}

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame     ||
        window.webkitRequestAnimationFrame  ||
        window.mozRequestAnimationFrame     ||
        window.oRequestAnimationFrame       ||
        window.msRequestAnimationFrame      ||

    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

 window.anim = function (callback, options) {

    if(arguments.length > 0)
        requestID = requestAnimFrame(callback);
    else
        cancelAnimationFrame(requestID);
};



 window._ = function(selector) {
    var selectorType = 'querySelectorAll', els;

    if (selector.indexOf('#') === 0) {
        selectorType = 'getElementById';
        selector = selector.substr(1, selector.length);
    }

    els = document[selectorType](selector);

    return new Canvas(els);
};
