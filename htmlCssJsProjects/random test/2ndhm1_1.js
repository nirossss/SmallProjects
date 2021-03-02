(function () {
    class randomTest {
        constructor(){
            this.qaArr = [{q: '2*2=? :',a: ['4', '1']},{q: 'my name is=? :',a: ['nir', 'gil', 'niv','ziv']},{q: 'my first car brand:',a: ['ford', 'ferrari', 'mazda']}];
            this.randArrF = [];
            this.strForPromptAnsPart = '';
        }
        randF(qaArr){
            for (let i=0;i<qaArr.length;i++){
                var rand = Math.floor(Math.random() * qaArr.length);
                this.randArrF.push(rand);
            };
            for (let k=0;k<this.randArrF.length;k++){
                for (let x=0;x<this.randArrF.length;x++){
                    if (this.randArrF[k] == this.randArrF[x] && k != x){
                        this.randArrF = [];
                        this.randF(qaArr)
                    }
                }
            }
            return this.randArrF;
        }
        randAFToConAndRes(qaArr,randArr){
            this.strForPromptAnsPart = '';
            let score = 0;
            for (let k=0;k<qaArr.length;k++){
                var qaForAArr = qaArr[randArr[k]].a;
                console.log(qaArr[randArr[k]].q)
                let countForA = 0;
                var randArrForA = this.randF(qaForAArr);
                for (let i=0;i<randArrForA.length;i++){
                    console.log(qaForAArr[randArrForA[i]])
                    this.strForPromptAnsPart += '\n' + (i+1) + ')' + qaForAArr[randArrForA[i]];
                    countForA++;
                    if(randArrForA[i] == 0){
                        var countForP = countForA;
                    }
                }
                let strForPrompt = this.strForPromptAnsPart;
                this.strForPromptAnsPart = '';
                var qPrompt = prompt('please write number to the left of the answer \n' + qaArr[randArr[k]].q + strForPrompt)
                if (countForP == qPrompt){
                    score++;
                }
            }
            console.log('your score: ' + score + '/3');
        };
    };
    
    var test = new randomTest();
    var qaArr = test.qaArr;
    var randArr = test.randF(qaArr);
    test.randAFToConAndRes(qaArr,randArr);
})();