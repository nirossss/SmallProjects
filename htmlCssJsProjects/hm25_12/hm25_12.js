/* 


function rect(x1,y1,x2,y2,type){
    rectArray = [];
    flatR = {
        ulx : x1,
        uly : y1,
        brx : x2,
        bry : y2
    };
    complexR = {
        ulp : {ulx: x1, uly: y1},
        brp : {brx: x2, bry: y2}
    };
    if (type){
        rectArray = flatR;
        console.log(rectArray);
    };
    if (!type){
        rectArray = complexR;
        console.log(rectArray);
    };
    return rectArray
};
rectObject = rect(1,2,3,4,true); */
/* rect(1,2,3,4,true);
console.log('Narray: ' + rectArray);
rect(1,2,3,4,false);
console.log('Narray: ' + rectArray); */

var areaArray = [];

function drawRect(){
    let x1 = document.getElementById('x1').value;
    let y1 = document.getElementById('y1').value;
    let x2 = document.getElementById('x2').value;
    let y2 = document.getElementById('y2').value;
    let rect = {
        ulx : x1,
        uly : y1,
        brx : x2,
        bry : y2
    };
    
    let rectArea = {
            width : (rect.brx - rect.ulx),
            height : (rect.bry - rect.uly),
            area : ((rect.brx - rect.ulx) * (rect.bry - rect.uly))
        };
    if (rectArea.width <= 0 || rectArea.height <= 0){
        alert('x1 or y1 inputs are lower then x2 or y2 inputs!!!');
        return false;
    };
    areaArray.push(rectArea);
    drawRectArray();
    resetRect(rect);
};

function drawRectArray(){
    let str = '';
    for (i=0;i<areaArray.length;i++){
        str += '<canvas id="rectangles" width="' + areaArray[i].width + 'px" height="' + areaArray[i].height + 'px"></canvas><br><div>area=' + areaArray[i].area + 'px</div>';
    };
    document.getElementById('rects').innerHTML = str;
};

function showAlert(){
    let arrString = JSON.stringify(areaArray);
    alert(arrString);
};

// drawRect(rectObject);

function resetRect(){
document.getElementById('x1').value = '';
document.getElementById('y1').value = '';
document.getElementById('x2').value = '';
document.getElementById('y2').value = '';
};

