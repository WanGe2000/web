var table = document.getElementById('box');
var squareWidth = 50; //方块大小
var square = 10; //每行每列各多少个方块
var squareList = [];//方块集合
var choose;
var score = document.getElementById('score');
var now_score = document.getElementById('now_score');
var basic = 5;
var add = 10;
var totalScore = 0;
var targetScore = 1000;
window.onload = function (){
    init();
}
function accomplish (){
    var flag = true;
    for (var i = 0 ; i < squareList.length ; i ++) {
        for (var j = 0 ; j < squareList[i].length ; j ++) {
            var temp = [];
            checkLink(squareList[i][j], temp);
            if (temp.length > 1) {
                return false;
            }
        }
    }
    return flag;
}
function createSquare(value,row,col){
    var temp = document.createElement('div');
    temp.style.width = squareWidth + 'px';
    temp.style.height = squareWidth + 'px';
    temp.style.position = 'absolute';
    temp.style.borderRadius = '12px';
    temp.style.display = 'inline-block';
    temp.style.boxSizing = 'border-box';
    temp.row = row;
    temp.col = col;
    temp.num = value;
    return temp;
}
function refresh(){
    for(var i = 0;i < squareList.length;i++){
        for(var j = 0 ;j < squareList[i].length;j++){
            if(squareList[i][j] == null){
                continue;
            }
            squareList[i][j].row = i;
            squareList[i][j].col = j;
            squareList[i][j].style.transition = 'left 0.3s,bottom 0.3s';
            squareList[i][j].style.backgroundImage = "url('./pic/"+ squareList[i][j].num +".png')";
            squareList[i][j].style.left = j * squareWidth + 'px';
            squareList[i][j].style.bottom = i * squareWidth + 'px';
            squareList[i][j].style.transform = 'scale(0.95)';
            squareList[i][j].style.backgroundSize = 'cover'; 
            // squareList[i][j].style.transform = null;
        }
    }
}
function mouseOver(obj){
    choose = [];
    checkLink(obj,choose);
    if(choose.length <= 1){
        // choose = [];
        return;
    }
    shanyishan();
    showScore();
}
function showScore(){
    score.style.transition = null;
    var score2 = 0;
    for(var i = 0;i < choose.length;i ++){
        score2 += basic + i * add;
    }
    score.innerHTML = choose.length + '块 ' + score2 +'分';
    score.style.opacity = 1;
    setTimeout(function(){
        score.style.transition = 'opacity 1.5s linear';
        score.style.opacity = 0;
    },1500)
}
function shanyishan(){
    for(var i = 0;i < squareList.length;i++){
        for(var j = 0;j < squareList[i].length;j++){
            if(squareList[i][j] == null){
                continue;
            }
            squareList[i][j].classList.remove('shanyishan');
        }
    }
    for(var i = 0;i < choose.length;i++){
        choose[i].classList.add('shanyishan');
    }
}
function click(){
    if(choose.length <= 1){
        choose = [];
        return;
    }
    for(var i = 0;i < choose.length;i++){
        table.removeChild(choose[i]);
        squareList[choose[i].row][choose[i].col] = null;
    }
    addScore(choose);
    move();
    var win = accomplish();
    if(win){
        setTimeout(function(){
            if(totalScore >= targetScore){
                alert('恭喜获胜');
            }else{
                alert('游戏失败');
            }
        },300)
    }
}
function move(){
    for(var i = 0;i < square;i++){
        var pointer = 0;
        for(var j = 0;j < square;j++){
            if(squareList[j][i] != null){
                if(j != pointer){
                    squareList[pointer][i] = squareList[j][i];
                    squareList[j][i].row = pointer;
                    squareList[j][i] = null;
                }
                pointer++;
            }
        }
    }
    for (var i = 0 ; i < squareList[0].length; ) {
        if (squareList[0][i] == null) {
            for (var j = 0 ; j < square ; j ++) {
                // console.log(squareList[j]);
                squareList[j].splice(i, 1);
            }
            continue;
        }
        i++;
    }
    refresh();
}
function addScore (arr){
    for(var i = 0;i < arr.length;i ++){
        totalScore += basic + i * add;
    }
    now_score.innerHTML = '当前分数:' + totalScore;
}
function checkLink (obj,arr){
    if(obj == null){
        return;
    }
    arr.push(obj);
    if(obj.col > 0 && squareList[obj.row][obj.col - 1] && squareList[obj.row][obj.col - 1].num == obj.num && arr.indexOf(squareList[obj.row][obj.col - 1]) == -1){
        checkLink(squareList[obj.row][obj.col - 1],arr);
    }
    if(obj.col < square - 1 && squareList[obj.row][obj.col + 1] && squareList[obj.row][obj.col + 1].num == obj.num && arr.indexOf(squareList[obj.row][obj.col + 1]) == -1){
        checkLink(squareList[obj.row][obj.col + 1],arr);
    }
    if(obj.row > 0 && squareList[obj.row - 1][obj.col] && squareList[obj.row - 1][obj.col].num == obj.num && arr.indexOf(squareList[obj.row - 1][obj.col]) == -1){
        checkLink(squareList[obj.row - 1][obj.col],arr);
    }
    if(obj.row < square - 1 && squareList[obj.row + 1][obj.col] && squareList[obj.row + 1][obj.col].num == obj.num && arr.indexOf(squareList[obj.row + 1][obj.col]) == -1){
        checkLink(squareList[obj.row + 1][obj.col],arr);
    }
}
function init(){  //初始化
    for(var i = 0;i < square;i ++){
        squareList[i] = new Array();
        for(var j = 0;j < square;j ++){
            var temp = createSquare(Math.floor(Math.random() * 5),i,j);
            squareList[i][j] = temp;
            table.appendChild(temp);
            squareList[i][j].onmouseover = function(){
                mouseOver(this);
            }
            squareList[i][j].onclick = function(){
                click(this);
            }
        }
    }
    refresh();
}