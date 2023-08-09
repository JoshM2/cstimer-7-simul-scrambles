var scramble=document.getElementById("scrambleTxt");
var scrambleSize=scramble.style.fontSize;
var previousScramble = ""
var currentScramble = ""

var newScramble='<h1 id="newScramble" style="font-weight: normal"></h1>';
scramble.insertAdjacentHTML('afterend', newScramble);

checkEvent();

function checkEvent(){
    var events = document.getElementsByTagName("select");
    if (events[events.length -10].value=="clkwca"){
        scramble.style.fontSize = "0px";
        waitFor(_ => document.getElementById("scrambleTxt").innerText != "Scrambling...")
            .then(_ => {
                var currentScramble = document.getElementById("scrambleTxt").innerText;
                if (currentScramble!=previousScramble){
                    previousScramble=currentScramble;
                    document.getElementById("newScramble").innerText=convertScramble(currentScramble);
                }
            });
    }
    else {
        document.getElementById("newScramble").innerText="";
        scramble.style.fontSize=scrambleSize;
    }
}

const matrix = [['0','1','-1','-1','0','0','0','0','0','0','0','0','-1','0'],['0','0','0','0','0','0','0','0','0','0','0','1','0','-1'],['0','-1','0','1','0','0','0','0','0','0','0','0','0','0'],['0','0','0','0','0','0','0','0','0','0','0','0','-1','1'],['0','1','0','0','-1','0','0','0','0','0','0','0','0','0'],['-1','0','0','1','0','0','0','0','0','0','0','0','1','-1'],['0','-1','1','0','1','0','1','-1','0','0','1','0','1','0'],['1','0','0','-1','0','-1','0','0','1','1','0','-1','0','1'],['0','0','0','0','-1','0','0','1','0','0','0','0','0','0'],['0','0','0','0','0','1','0','0','-1','-1','1','0','0','0'],['0','0','0','0','0','1','0','-1','0','0','0','0','0','0'],['0','0','0','0','0','0','0','0','0','1','-1','0','0','0'],['0','0','0','0','0','-1','-1','1','0','0','-1','0','0','0'],['0','0','0','0','0','0','0','0','0','-1','0','1','0','0']]
pins = ["all", "ALL", "UL", "UR", "DL", "DR", "ul", "ur", "dl", "dr", "U", "L", "D", "R", "\\", "/"]
const l = ['L','A','B','C','D','E','F','G','H','I','J','K','L']
function convertScramble(s){
    let scramble = convert(s)
    let tempArray = [];
    for (let i=0; i<14; i++) {
        let x = 0;
        for (let n=0; n<14; n++) {
            x += scramble[n]*parseInt(matrix[i][n])
        }
        tempArray.push((x+144)%12);
    }
    let newScramble = l[12-tempArray[1]]+l[12-tempArray[0]]+" "+l[12-tempArray[3]]+l[12-tempArray[2]]+" "+l[12-tempArray[5]]+l[12-tempArray[4]]+" "+l[12-tempArray[6]]+l[12-tempArray[7]]+" "+l[12-tempArray[8]]+l[12-tempArray[9]]+" "+l[12-tempArray[10]]+l[12-tempArray[11]]+" "+l[12-tempArray[12]]+l[12-tempArray[13]]+" "+pins[Math.floor(Math.random() * 16)]
    newScramble += " -- "+l[tempArray[1]]+l[tempArray[0]]+" "+l[tempArray[3]]+l[tempArray[2]]+" "+l[tempArray[5]]+l[tempArray[4]]+" "+l[tempArray[6]]+l[tempArray[7]]+" "+l[tempArray[8]]+l[tempArray[9]]+" "+l[tempArray[10]]+l[tempArray[11]]+" "+l[tempArray[12]]+l[tempArray[13]]
    return newScramble;
}

function convert(s){
    n=[0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let effects = [[0, 9, 11, 12], [6, 11, 12, 13], [8, 10, 11, 13], [2, 9, 10, 11], [0, 2, 9, 10, 11, 12], [0, 6, 9, 11, 12, 13], [6, 8, 10, 11, 12, 13], [2, 8, 9, 10, 11, 13], [0, 2, 6, 8, 9, 10, 11, 12, 13], [0, 1, 2, 3, 4, 5], [1, 2, 4, 5, 7, 8], [3, 4, 5, 6, 7, 8], [0, 1, 3, 4, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7, 8]];
    moves = ["5-","4-","3-","2-","1-","0+","1+","2+","3+","4+","5+","6+"];
    scr = s.split(" ");
    scr.splice(9, 1);
    for(let i=0; i<14; i++){
        for(let x=0; x<effects[i].length; x++){
            if (i<=8 && [0,2,6,8].includes(effects[i][x])){
                n[effects[i][x]]-=moves.indexOf(scr[i].substr(-2))-5;  
            }
            else{
                n[effects[i][x]]+=moves.indexOf(scr[i].substr(-2))-5;
            }
        }
    }
    let originalArray = n.map(num => (num+144) % 12);
    return originalArray.slice(0, -5).concat(originalArray.slice(-5).reverse());

}

var mutationObserver = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation){
        checkEvent();
    });
});

mutationObserver.observe(document.getElementById("scrambleTxt"), {
    attributes: true,
    childList: true,
    subtree: true,
    attributeOldValue: true, 
    characterDataOldValue: true
})

function waitFor(conditionFunction) {

    const poll = resolve => {
      if(conditionFunction()) resolve();
      else setTimeout(_ => poll(resolve), 400);
    }
  
    return new Promise(poll);
}