function draw_circle() {
    var the_radius = document.getElementById('radius')
    let canvas = document.getElementById("canvas_id");
    let context = canvas.getContext("2d");
    var pattern = /^([0-9]|[1-9][0-9]|1[0-9][0-9])$/;

    if (pattern.test(the_radius.value)) {
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;
        context.beginPath();
        context.arc( canvasWidth/2, canvasHeight/2, the_radius.value, 0, 2 * Math.PI );
        context.stroke(); 
    }
    else {
        alert('Please put Numbers only AND no more then 199px');
        return false;
    }
    
    document.getElementById('ball_valume').innerText = ball_volume( the_radius ) + ' mm^3';

    the_radius.value = '';
};

function ball_volume( the_radius ){
    let pixels_in_mm = 0.26458333
    let radius_in_mm = (the_radius.value * pixels_in_mm)
    let ball_valume = (4 * Math.PI * Math.pow(radius_in_mm,3))/3;
    let ball_valume_rounded = ball_valume.toFixed(2);
    return ball_valume_rounded;
};

function clear_circle(){
    let canvas = document.getElementById("canvas_id");
    let context = canvas.getContext("2d");
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    context.beginPath();
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    document.getElementById('ball_valume').innerText = ''
};
