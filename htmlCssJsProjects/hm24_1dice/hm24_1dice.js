
function promiseFunc(){
    let clientGuess = document.getElementById('numSelect').value;
    var diceRez = Math.ceil(Math.random() * 6);
    timerClock();
    let p = new Promise((res,rej)=>{
        setTimeout(() => {
            document.getElementById('showRez').innerHTML= diceRez;
            if (clientGuess==diceRez){
                res("Exellent. you got it");
            }else rej(':( Try again');
        }, 5000);
    });
    return p;
};

function showRez(){
    promiseFunc().then(e=>{
        document.getElementById('showRez').className = 'alert alert-dismissible alert-success'
        alert(e)//what i get from res
    }).catch(r=>{
        document.getElementById('showRez').className = 'alert alert-dismissible alert-danger'
        alert(r)//what i get from rej
    });
};

function timerClock(){
    document.getElementById('timerClock').innerHTML= 5;
    setTimeout(() => {
        document.getElementById('timerClock').innerHTML= 4;
        setTimeout(() => {
            document.getElementById('timerClock').innerHTML= 3;
            setTimeout(() => {
                document.getElementById('timerClock').innerHTML= 2;
                setTimeout(() => {
                    document.getElementById('timerClock').innerHTML= 1;
                    setTimeout(() => {
                        document.getElementById('timerClock').innerHTML= '!!!!!!!!!!!!';
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}
