window.onload = function(){
var radius = 1;
function draw_circle() {
    let canvas = document.getElementById("my_canvas");
    let context = canvas.getContext("2d");
    radius += 1
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    context.beginPath();
    context.arc( canvasWidth/2, canvasHeight/2, radius, 0, 2 * Math.PI );
    context.stroke(); 
    }
    var t = setInterval(function(){
        draw_circle();
    }, 100);  
    setTimeout(function(){
        clearInterval(t)
    }, 19900);   
};