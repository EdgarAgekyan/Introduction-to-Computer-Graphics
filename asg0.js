// DrawRectangle.js

var ctx;
var canvas;

function main() {
// Retrieve <canvas> element <- (1)
    canvas = document.getElementById('cnv1');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2DCG <- (2)
    ctx = canvas.getContext('2d');
    // Draw a blue rectangle <- (3)
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a blue color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color

    // handleDrawEvent();


    var v1 = new Vector3({0: 2.25, 1:2.25, 2: 0}); // Instantiates vector v1 and sets z=0

    // drawVector(v1, "red");


} 

function drawVector(v, color) {
    // const co = canvas.getContext('2d');
    // context.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.clearRect(0,0, canvas.width, canvas.height)
    // ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a blue color
    // ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color

    ctx.strokeStyle = color;
    ctx.beginPath();
    // ctx.moveTo(0,0);
    // var center = {canvas.width/2, canvas.height/2};

    var center = [canvas.width/2, canvas.height/2]
    // var scale = 20


    ctx.moveTo(center[0], center[1]);

    // total canvas is 400 x 400
    // middle point is 200, 200
    // we want a vector from 200, 200
    //    to 225 to 225

    ctx.lineTo(v.elements[0] * 20 + center[0], center[1] - v.elements[1] * 20)

    // ctx.lineTo(v.elements[0]*20+100, 200-v.elements[1]*20+200);
    // ctx.lineTo(245, 155); //Is it this?

    ctx.stroke();

    ctx.closePath()


}

function handleDrawEvent(v) {

    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a blue color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color


    let xL = document.getElementById("xlabel").value;
    let yL = document.getElementById("ylabel").value;
    let xL2 = document.getElementById("x2label").value;
    let yL2 = document.getElementById("y2label").value;

    // console.log(xL);
    // console.log(yL);

    var v1 = new Vector3({0: xL, 1:yL, 2: 0});
    var v2 = new Vector3({0: xL2, 1:yL2, 2: 0});

    drawVector(v1, "red");
    drawVector(v2, "blue");
}

function handleDrawOperationEvent() {

    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a blue color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color

    let xL = document.getElementById("xlabel").value;
    let yL = document.getElementById("ylabel").value;
    let xL2 = document.getElementById("x2label").value;
    let yL2 = document.getElementById("y2label").value;

    var v1 = new Vector3({0: xL, 1:yL, 2: 0});
    var v2 = new Vector3({0: xL2, 1:yL2, 2: 0});
    var v3 = new Vector3({0:0, 1:0, 2:0});
    var v4 = new Vector3({0:0, 1:0, 2:0});


    var op = document.getElementById("operation-select").value;

    var sc = document.getElementById("scalarLabel").value;
    console.log(sc)

    drawVector(v1, "red");
    drawVector(v2, "blue");

    if(op == "add") {
        v3.add(v1)
        v3.add(v2)
        if (sc) {
            scaling(v3, sc)
        }
        drawVector(v3, "green");
            }
    else if (op == "sub") {
        v3.elements[0] = v1.elements[0]
        v3.elements[1] = v1.elements[1]
        v3.sub(v2)
        if (sc) {
            scaling(v3, sc)
        }
        drawVector(v3, "green");
    }
    else if (op == "mul") {
        //.set for copying stuff over
        v3.set(v1)
        v3.mul(sc)
        v4.set(v2)
        v4.mul(sc)
        drawVector(v3, "green");
        drawVector(v4, "green");
    }
    else if (op == "div") {
        v3.set(v1)
        v3.div(sc)
        v4.set(v2)
        v4.div(sc)
        drawVector(v3, "green");
        drawVector(v4, "green");
    }
    else if (op == "mag") {
        console.log("Magnitude v1: ", v1.magnitude())
        console.log("Magnitude v2: ", v2.magnitude())
    }
    else if (op == "nor") {
        v1.normalize();
        v2.normalize();
        drawVector(v1, "green")
        drawVector(v2, "green")
    }
    else if (op == "ang") {
        var result = angleBetween(v1, v2);
        
        console.log("Angle: ", result);
    }
    else if (op == "are") {

        var result = areaTriangle(v1, v2);

        console.log("Area of the triangle: ", result);

    }


    



}

function areaTriangle(v1, v2) {
    nv = Vector3.cross(v1, v2);

    var result = nv.magnitude();
    console.log(result);
    result = result / 2;
    return result;
}

function angleBetween(v1, v2) {
    var m1 = v1.magnitude();
    var m2 = v2.magnitude();
    var dP = Vector3.dot(v1, v2);
    var result = dP/ (m1 * m2);
    var result = Math.acos(result);
    var result = result * (180/Math.PI);
    return result;
}

function scaling(v, scale) {
    v.elements[0] *= scale;
    v.elements[1] *= scale;
    v.elements[2] *= scale;

}