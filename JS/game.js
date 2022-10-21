//***************Refresh Button****************//
const refreshButton = document.querySelector('.refresh-button');
const refreshPage = () => {
  location.reload();
}
refreshButton.addEventListener('click', refreshPage);

//***************Position Status***************//
const initial={
  1:{x:565, y:25, occupied:0, id:"po1",prev:""},
  2:{x:220, y:208, occupied:0, id:"po2",prev:""},
  3:{x:472.768, y:208, occupied:0, id:"po3",prev:""},
  4:{x:663.088, y:208, occupied:0, id:"po4",prev:""},
  5:{x:910, y:208, occupied:0, id:"po5",prev:""},
  6:{x:410.395, y:331.757, occupied:0, id:"po6",prev:""},
  7:{x:570.149, y:435.597, occupied:0, id:"po7",prev:""},
  8:{x:728.308, y:329.679, occupied:0, id:"po8",prev:""},
  9:{x:250, y:650, occupied:0, id:"po9",prev:""},
  10:{x:900, y:650, occupied:0, id:"po10",prev:""}, 
}

const logger={
  0:"Box",
  1:"A",
  2:"B",
  3:"C",
  4:"D",
  5:"E",
  6:"F",
  7:"G",
  8:"H",
  9:"I",
  10:"J"
}

//**************killed crows position************//
const final={
  1:{x:1130,y:440},
  2:{x:1190,y:440},
  3:{x:1250,y:440},
  4:{x:1130,y:510},
  5:{x:1190,y:510},
  6:{x:1250,y:510},
  7:{x:1130,y:580}
}

//***********id and corresponding values***********//
const temp={
  A:1,
  B:2,
  C:3,
  D:4,
  E:5,
  F:6,
  G:7
}

//***********crow's previous position Status**********//
const prevPos={
  A:0,
  B:0,
  C:0,
  D:0,
  E:0,
  F:0,
  G:0
}

//*************Some global variables***************//
let vultureLastPos=0;
var killedCrows=0;
var startX,startY,eltName,limit=50,startX,startY,currPos,currCrow,currElt;
var turn="c";
var currCrow;
var vulture=0;
let total_crows=0;

//*****************initial Call**************//
function init() {
  Snap("#A").drag(dragMovable, dragStart, test);
  Snap("#B").drag(dragMovable, dragStart, test);
  Snap("#C").drag(dragMovable, dragStart, test);
  Snap("#D").drag(dragMovable, dragStart, test);
  Snap("#E").drag(dragMovable, dragStart, test);
  Snap("#F").drag(dragMovable, dragStart, test);
  Snap("#G").drag(dragMovable, dragStart, test);
  Snap("#H").drag(dragMovable, dragStart, test);
}

//***************Drag function****************//
function dragStart(x, y, evt) {
  if(killedCrows==4){
    window.alert("Yeah!! Vulture Won");
    var mg="Yeah!! Vulture Won";
    loggerStatus=loggerStatus+mg+"\n";
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([loggerStatus], { type: "text/plain" }));
    a.download = "logger.txt";
    document.body.appendChild(a);
    a.click();
    window.location.reload();
    return ;
  }
  eltName = evt.target.id;
  startX = parseInt(Snap("#"+eltName).attr("cx"), 10);
  startY = parseInt(Snap("#"+eltName).attr("cy"), 10);
  currPos = parseInt(evt.target.name, 10);
  currCrow = Snap("#"+eltName).attr("id");
}

//*************Move Function*****************//
function dragMovable(dx, dy, x, y, evt) {
  Snap("#"+eltName).attr({ cx: startX + dx, cy: startY + dy });
}

//*****************Delete crow function***********//
function deleteCrow(id){
  var p=document.getElementById(`${initial[id].prev}`);
  var q=p.id;
  Snap("#"+q).attr({cx:final[temp[q]].x, cy:final[temp[q]].y});
}

//******************Logger capture**************//
var loggerStatus="";
function msg(c,p,q,status){
  var a=logger[p];
  var b=logger[q];
  if(c=="H"){
    var mg=`vulture move from ${a} to ${b}`;
    loggerStatus=loggerStatus+mg+"\n";
  }
  else{
    var mg=`crow move from ${a} to ${b}`;
    loggerStatus=loggerStatus+mg+"\n";
  }
  if(status==1){
    var mg="Vulture killed Crow";
    loggerStatus=loggerStatus+mg+"\n";
  }
}

//**************if vulture is on the corner points***********//
function vultureCorner(pos,cor,ad1,ad2,ad3,ad4){
  if(initial[ad1].occupied==1 && initial[ad3].occupied==1){
    //all positions blocked crow wins
    if( initial[ad2].occupied==1 && initial[ad4].occupied==1){
        window.alert("Cow!! Cow!! Crows Won");
        var mg="Cow!! Cow!! Crows Won";
        loggerStatus=loggerStatus+mg+"\n";
        var a = window.document.createElement("a");
        a.href = window.URL.createObjectURL(new Blob([loggerStatus], { type: "text/plain" }));
        a.download = "logger.txt";
        document.body.appendChild(a);
        a.click();
        window.location.reload();              
        return ;
    }

    else if(initial[ad2].occupied==1 && initial[ad4].occupied==0){
      // killed ad3 and move to ad4
      if(pos.clientX >=initial[ad4].x - limit && pos.clientX <=initial[ad4].x  + limit && pos.clientY >=initial[ad4].y - limit && pos.clientY <=initial[ad4].y+ limit){
        vultureLastPos=ad4;
        Snap("#"+eltName).attr({cx:initial[ad4].x, cy:initial[ad4].y});
        turn="c";
        initial[ad4].occupied=1;
        initial[ad3].occupied=0;
        initial[cor].occupied=0;
        killedCrows++;
        deleteCrow(ad3);
        msg(eltName,cor,ad4,1);
      }
      else{
        window.alert("Kill The Crow !!");
        Snap("#"+eltName).attr({cx:startX, cy: startY});
      }
    }
    else if(initial[ad2].occupied==0 && initial[ad4].occupied==1){ 
        //killed ad1 and move to ad2
        if(pos.clientX >=initial[ad2].x - limit && pos.clientX <=initial[ad2].x  + limit && pos.clientY >=initial[ad2].y - limit && pos.clientY <=initial[ad2].y+ limit){
        vultureLastPos=ad2;
        Snap("#"+eltName).attr({cx:initial[ad2].x, cy:initial[ad2].y});
        turn="c";
        initial[ad2].occupied=1;
        initial[ad1].occupied=0;
        initial[cor].occupied=0;
        killedCrows++;
        deleteCrow(ad1);
        msg(eltName,cor,ad2,1);
        }
        else{
          window.alert("Kill The Crow !!");
          Snap("#"+eltName).attr({cx:startX, cy: startY});
        }
    }
    else{
      //either kill ad1 or ad3
      if(pos.clientX >=initial[ad2].x - limit && pos.clientX <=initial[ad2].x  + limit && pos.clientY >=initial[ad2].y - limit && pos.clientY <=initial[ad2].y+ limit && initial[ad2].occupied==0){
        vultureLastPos=ad2;
        Snap("#"+eltName).attr({cx: initial[ad2].x, cy:initial[ad2].y});
        turn="c";
        initial[ad2].occupied=1;
        initial[ad1].occupied=0;
        initial[cor].occupied=0;
        killedCrows++;
        deleteCrow(ad1);
        msg(eltName,cor,ad2,1);
      }
      else if(pos.clientX >=initial[ad4].x - limit && pos.clientX <=initial[ad4].x  + limit && pos.clientY >=initial[ad4].y - limit && pos.clientY <=initial[ad4].y+ limit && initial[ad4].occupied==0){
        vultureLastPos=ad4;
        Snap("#"+eltName).attr({cx: initial[ad4].x, cy:initial[ad4].y});
        turn="c";
        initial[ad4].occupied=1;
        initial[ad3].occupied=0;
        initial[cor].occupied=0;
        killedCrows++;
        deleteCrow(ad3);
        msg(eltName,cor,ad4,1);
      }
      else{
        window.alert("Kill The Crow !!");
        Snap("#"+eltName).attr({cx:startX, cy: startY});
      }
    }
  }
  else if(initial[ad1].occupied==1 && initial[ad3].occupied==0){
      if(initial[ad2].occupied==1){
        //move to ad4
        vultureLastPos=ad3;
        Snap("#"+eltName).attr({cx:initial[ad3].x, cy:initial[ad3].y});
        turn="c";
        initial[ad3].occupied=1;
        initial[cor].occupied=0;
        msg(eltName,cor,ad3,0);
      }
      else {
        // kill ad1 and move to ad2
        if(pos.clientX >=initial[ad2].x - limit && pos.clientX <=initial[ad2].x  + limit && pos.clientY >=initial[ad2].y - limit && pos.clientY <=initial[ad2].y+ limit){
          vultureLastPos=ad2;
          Snap("#"+eltName).attr({cx:initial[ad2].x, cy:initial[ad2].y});
          turn="c";
          initial[ad2].occupied=1;
          initial[ad1].occupied=0;
          initial[cor].occupied=0;
          killedCrows++;
          deleteCrow(ad1);
          msg(eltName,cor,ad2,1);
        }
        else{
          window.alert("Kill The Crow !!");
          Snap("#"+eltName).attr({cx:startX, cy: startY});
        }
      }
  }
  else if(initial[ad1].occupied==0 && initial[ad3].occupied==1){
      if(initial[ad4].occupied==1){
        //move to ad1
        vultureLastPos=ad1;
        Snap("#"+eltName).attr({cx: initial[ad1].x, cy:initial[ad1].y});
        turn="c";
        initial[ad1].occupied=1;
        initial[cor].occupied=0;
        msg(eltName,cor,ad1,0);
      }
      else{
        //kill ad3 and move to ad4
      if(pos.clientX >=initial[ad4].x - limit && pos.clientX <=initial[ad4].x  + limit && pos.clientY >=initial[ad4].y - limit && pos.clientY <=initial[ad4].y+ limit){
          vultureLastPos=ad4;
          Snap("#"+eltName).attr({cx:initial[ad4].x, cy:initial[ad4].y});
          turn="c";
          initial[ad4].occupied=1;
          initial[ad3].occupied=0;
          initial[cor].occupied=0;
          killedCrows++;
          deleteCrow(ad3);
          msg(eltName,cor,ad4,1);
      }
      else{
        window.alert("Kill The Crow !!");
        Snap("#"+eltName).attr({cx:startX, cy: startY});
      }
      }
  }
  else{ 
    //either move ad1 or ad3
    if(pos.clientX >=initial[ad1].x - limit && pos.clientX <=initial[ad1].x  + limit && pos.clientY >=initial[ad1].y - limit && pos.clientY <=initial[ad1].y+ limit &&initial[ad1].occupied==0){
      vultureLastPos=ad1;
      Snap("#"+eltName).attr({cx: initial[ad1].x, cy:initial[ad1].y});
      turn="c";
      initial[ad1].occupied=1;
      initial[cor].occupied=0;
      msg(eltName,cor,ad1,0);
    }
    else if(pos.clientX >=initial[ad3].x - limit && pos.clientX <=initial[ad3].x  + limit && pos.clientY >=initial[ad3].y - limit && pos.clientY <=initial[ad3].y+ limit && initial[ad3].occupied==0){
      vultureLastPos=ad3;
      Snap("#"+eltName).attr({cx: initial[ad3].x, cy:initial[ad3].y});
      turn="c";
      initial[ad3].occupied=1;
      initial[cor].occupied=0;
      msg(eltName,cor,ad3,0);
    }
    else{
      window.alert("Invalid Move !! Please Move to adjacent places");
      Snap("#"+eltName).attr({cx:startX, cy: startY});
    }
}
}

//************ If vulture is not on corner points*************//
function vultureInside(pos,cor,ad1,ad2,ad3,ad4,ad5,ad6){
  if(initial[ad1].occupied==1 && initial[ad2].occupied==1 && initial[ad3].occupied==1 && initial[ad4].occupied==1 && initial[ad5].occupied==1 &&initial[ad6].occupied==1){
    window.alert("Cow!! Cow!! Crows Won")     //if all positions blocked
    var mg="Cow!! Cow!! Crows Won";
    loggerStatus=loggerStatus+mg+"\n";
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([loggerStatus], { type: "text/plain" }));
    a.download = "logger.txt";
    document.body.appendChild(a);
    a.click();
    window.location.reload();   
    return; 
  }
  else if(initial[ad6].occupied==1 && initial[ad5].occupied==0){
    //there is a possibility of killing crow's
    if(pos.clientX >=initial[ad5].x - limit && pos.clientX <=initial[ad5].x  + limit && pos.clientY >=initial[ad5].y - limit && pos.clientY <=initial[ad5].y+ limit){
      vultureLastPos=ad5;
      Snap("#"+eltName).attr({cx:initial[ad5].x, cy:initial[ad5].y});
      turn="c";
      initial[ad5].occupied=1;
      initial[ad6].occupied=0;
      initial[cor].occupied=0;
      killedCrows++;
      deleteCrow(ad6);
      msg(eltName,cor,ad5,1);
    }
    else{
      window.alert("Kill The Crow !!");
      Snap("#"+eltName).attr({cx:startX, cy: startY});
    }
  }
  else if(initial[ad3].occupied==1 && initial[ad4].occupied==0){
    if(pos.clientX >=initial[ad4].x - limit && pos.clientX <=initial[ad4].x  + limit && pos.clientY >=initial[ad4].y - limit && pos.clientY <=initial[ad4].y+ limit){
      vultureLastPos=ad4;
      Snap("#"+eltName).attr({cx:initial[ad4].x, cy:initial[ad4].y});
      turn="c";
      initial[ad4].occupied=1;
      initial[ad3].occupied=0;
      initial[cor].occupied=0;
      killedCrows++;
      deleteCrow(ad3);
      msg(eltName,cor,ad4,1);
    }
    else{
      window.alert("Kill The Crow !!");
      Snap("#"+eltName).attr({cx:startX, cy: startY});
    }
  }
  else{
    //No possibility of killing crow then move to adajacent places
    if(pos.clientX >=initial[ad1].x - limit && pos.clientX <=initial[ad1].x  + limit && pos.clientY >=initial[ad1].y - limit && pos.clientY <=initial[ad1].y+ limit && initial[ad1].occupied==0){
      vultureLastPos=ad1;
      Snap("#"+eltName).attr({cx: initial[ad1].x, cy:initial[ad1].y});
      turn="c";
      initial[ad1].occupied=1;
      initial[cor].occupied=0;
      msg(eltName,cor,ad1,0);
    }
    else if(pos.clientX >=initial[ad2].x - limit && pos.clientX <=initial[ad2].x  + limit && pos.clientY >=initial[ad2].y - limit && pos.clientY <=initial[ad2].y+ limit && initial[ad2].occupied==0){
      vultureLastPos=ad2;
      Snap("#"+eltName).attr({cx: initial[ad2].x, cy:initial[ad2].y});
      turn="c";
      initial[ad2].occupied=1;
      initial[cor].occupied=0;
      msg(eltName,cor,ad2,0);
    }
    else if(pos.clientX >=initial[ad3].x - limit && pos.clientX <=initial[ad3].x  + limit && pos.clientY >=initial[ad3].y - limit && pos.clientY <=initial[ad3].y+ limit && initial[ad3].occupied==0){
      vultureLastPos=ad3;
      Snap("#"+eltName).attr({cx: initial[ad3].x, cy:initial[ad3].y});
      turn="c";
      initial[ad3].occupied=1;
      initial[cor].occupied=0;
      msg(eltName,cor,ad3,0);
    }
    else if(pos.clientX >=initial[ad6].x - limit && pos.clientX <=initial[ad6].x  + limit && pos.clientY >=initial[ad6].y - limit && pos.clientY <=initial[ad6].y+ limit && initial[ad6].occupied==0){
      vultureLastPos=ad6;
      Snap("#"+eltName).attr({cx: initial[ad6].x, cy:initial[ad6].y});
      turn="c";
      initial[ad6].occupied=1;
      initial[cor].occupied=0;
      msg(eltName,cor,ad6,0);
    }
    else{
      window.alert("Invalid Move !! Please Move to adjacent places");
      Snap("#"+eltName).attr({cx:startX, cy: startY});
    }
  } 
}

//********check how many crow's are present on the board*******//
var crowCurrentlyOnBoard=[];
function validMoveOfCrow(){
  return crowCurrentlyOnBoard.includes(currCrow);
}

//****************Main Function**************//
function test(pos){
  if(turn=='v'){ 
    //*********************vulture's movement****************//
    if(eltName!='H'){  
      Snap("#"+eltName).attr({cx:startX, cy: startY});  
      window.alert("Vulture's Chance");
    }
    else{   
      //vulture is not present on the star
      if(vulture==0){  
        if(pos.clientX >= 565 - limit && pos.clientX <= 565 + limit && pos.clientY >= 25 - limit && pos.clientY <= 25 + limit && initial[1].occupied==0){
          vultureLastPos=1;
          Snap("#"+eltName).attr({cx: 565, cy:25});
          turn="c";
          initial[1].occupied=1;
          vulture=1;
          msg(eltName,0,1,0);
        }

        else if(pos.clientX >= 220 - limit && pos.clientX <= 220 + limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[2].occupied==0){
          vultureLastPos=2;
          Snap("#"+eltName).attr({cx: 220, cy:208});
          turn="c";
          initial[2].occupied=1;
          vulture=1;
          msg(eltName,0,2,0);
        }

        else if(pos.clientX >= 472.768 - limit && pos.clientX <= 472.768 + limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[3].occupied==0){
          vultureLastPos=3;
          Snap("#"+eltName).attr({cx: 472.768, cy:208});
          turn="c";
          initial[3].occupied=1;
          vulture=1;
          msg(eltName,0,3,0);
        }

        else if(pos.clientX >= 663.088 - limit && pos.clientX <= 663.088 + limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[4].occupied==0){
          vultureLastPos=4;
          Snap("#"+eltName).attr({cx:663.088, cy:208});
          turn="c";
          initial[4].occupied=1;
          vulture=1;
          msg(eltName,0,4,0);
        }

        else if(pos.clientX >= 910 - limit && pos.clientX <= 910+ limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[5].occupied==0){
          vultureLastPos=5;
          Snap("#"+eltName).attr({cx:910, cy:208});
          turn="c";
          initial[5].occupied=1;
          vulture=1;
          msg(eltName,0,5,0);
        }

        else if(pos.clientX >= 410.395 - limit && pos.clientX <= 410.395+ limit && pos.clientY >= 331.757 - limit && pos.clientY <= 331.757 + limit && initial[6].occupied==0){
          vultureLastPos=6;
          Snap("#"+eltName).attr({cx:410.395, cy:331.757});
          turn="c";
          initial[6].occupied=1;
          vulture=1;
          msg(eltName,0,6,0);
        }

        else if(pos.clientX >= 570.149 - limit && pos.clientX <= 570.149+ limit && pos.clientY >= 435.597 - limit && pos.clientY <= 435.597+ limit && initial[7].occupied==0){
          vultureLastPos=7;
          Snap("#"+eltName).attr({cx:570.149, cy:435.597});
          turn="c";
          initial[7].occupied=1;
          vulture=1;
          msg(eltName,0,7,0);
        }

        else if(pos.clientX >= 728.308 - limit && pos.clientX <= 728.308+ limit && pos.clientY >= 329.679- limit && pos.clientY <= 329.679+ limit && initial[8].occupied==0){
          vultureLastPos=8;
          Snap("#"+eltName).attr({cx:728.308, cy:329.679});
          turn="c";
          initial[8].occupied=1;
          vulture=1;
          msg(eltName,0,8,0);
        }

        else if(pos.clientX >= 250 - limit && pos.clientX <=250+ limit && pos.clientY >= 650- limit && pos.clientY <= 650+ limit && initial[9].occupied==0){
          vultureLastPos=9;
          Snap("#"+eltName).attr({ cx:250, cy:650});
          turn="c";
          initial[9].occupied=1;
          vulture=1;
          msg(eltName,0,9,0);
        }

        else if(pos.clientX >= 900 - limit && pos.clientX <=900+ limit && pos.clientY >= 650- limit && pos.clientY <= 650+ limit && initial[10].occupied==0){
          vultureLastPos=10;
          Snap("#"+eltName).attr({cx:900, cy:650});
          turn="c";
          initial[10].occupied=1;
          vulture=1;
          msg(eltName,0,10,0);
        }

        else{
          window.alert("Invalid Move !!");
          Snap("#"+eltName).attr({cx:startX,cy:startY});
        }
      }
      //vulture is present on the board
    //movement of vulture within Board
    else{
        //checking there is possibility to kill the crows
        if(vultureLastPos==1){   //if vulture's last position is 1;
          vultureCorner(pos,1,3,6,4,8);
        }
        else if(vultureLastPos==2){  //if vulture's last position is 2;
          vultureCorner(pos,2,6,7,3,4);
        }  
        else if(vultureLastPos==9){  //if vulture's last position is 9;
          vultureCorner(pos,9,7,8,6,3);
        }
        else if(vultureLastPos==10){  //if vulture's last position is 10;
          vultureCorner(pos,10,8,4,7,6);
        }
        else if(vultureLastPos==5){  //if vulture's last position is 5;
          vultureCorner(pos,5,4,3,8,7);
        }
        else if(vultureLastPos==3){ //if vulture's last position is 3;
          vultureInside(pos,3,1,2,6,9,5,4);
        }
        else if(vultureLastPos==4){  //if vulture's last position is 4;
          vultureInside(pos,4,5,1,3,2,10,8);
        }
        else if(vultureLastPos==6){  //if vulture's last position is 6;
          vultureInside(pos,6,2,9,7,10,1,3)
        }
        else if(vultureLastPos==7){   //if vulture's last position is 7;
          vultureInside(pos,7,9,10,8,5,2,6);
        }
        else{    //if vulture's last position is 8;
          vultureInside(pos,8,10,5,4,1,9,7);
        }
      }
    }
  }

  //***************if crow's Movement****************//
  else{
    if(eltName=="H"){   //if crow's chance and it is vulture
      Snap("#"+eltName).attr({cx:startX, cy: startY});
      window.alert("Crows's chance");
    }
    else{
      //if All the crows are not present on board;
      if(total_crows!=7){
          if(!validMoveOfCrow()){
            if(pos.clientX >= 565 - limit && pos.clientX <= 565 + limit && pos.clientY >= 25 - limit && pos.clientY <= 25 + limit && initial[1].occupied==0){
              Snap("#"+eltName).attr({cx: 565, cy:25});
              crowCurrentlyOnBoard.push(currCrow);
              turn="v";
              initial[1].occupied=1;
              initial[1].prev=currCrow;
              prevPos[currCrow]=1;
              total_crows++;
              msg(eltName,0,1,0);
            }
    
            else if(pos.clientX >= 220 - limit && pos.clientX <= 220 + limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[2].occupied==0){
              Snap("#"+eltName).attr({cx: 220, cy:208});
              crowCurrentlyOnBoard.push(currCrow);
              turn="v";
              initial[2].occupied=1;
              initial[2].prev=currCrow;
              prevPos[currCrow]=2;
              total_crows++;
              msg(eltName,0,2,0);
            }
    
            else if(pos.clientX >= 472.768 - limit && pos.clientX <= 472.768 + limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[3].occupied==0){
              Snap("#"+eltName).attr({cx: 472.768, cy:208});
              crowCurrentlyOnBoard.push(currCrow);
              turn="v";
              initial[3].occupied=1;
              initial[3].prev=currCrow;
              prevPos[currCrow]=3;
              total_crows++;
              msg(eltName,0,3,0);
            }
    
            else if(pos.clientX >= 663.088 - limit && pos.clientX <= 663.088 + limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[4].occupied==0){
              Snap("#"+eltName).attr({cx: 663.088, cy:208});
              crowCurrentlyOnBoard.push(currCrow);
              turn="v";
              initial[4].occupied=1;
              initial[4].prev=currCrow;
              prevPos[currCrow]=4;
              total_crows++;
              msg(eltName,0,4,0);
            }
    
            else if(pos.clientX >= 910 - limit && pos.clientX <= 910+ limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[5].occupied==0){
              Snap("#"+eltName).attr({cx: 910, cy:208});
              crowCurrentlyOnBoard.push(currCrow);
              turn="v";
              initial[5].occupied=1;
              initial[5].prev=currCrow;
              prevPos[currCrow]=5;
              total_crows++;
              msg(eltName,0,5,0);
            }
    
            else if(pos.clientX >= 410.395 - limit && pos.clientX <= 410.395+ limit && pos.clientY >= 331.757 - limit && pos.clientY <= 331.757 + limit && initial[6].occupied==0){
              Snap("#"+eltName).attr({cx: 410.395, cy:331.757});
              crowCurrentlyOnBoard.push(currCrow);
              turn="v";
              initial[6].occupied=1;
              initial[6].prev=currCrow;
              prevPos[currCrow]=6;
              total_crows++;
              msg(eltName,0,6,0);
            }
    
            else if(pos.clientX >= 570.149 - limit && pos.clientX <= 570.149+ limit && pos.clientY >= 435.597 - limit && pos.clientY <= 435.597+ limit && initial[7].occupied==0){
              Snap("#"+eltName).attr({cx:570.149, cy:435.597});
              crowCurrentlyOnBoard.push(currCrow);
              turn="v";
              initial[7].occupied=1;
              initial[7].prev=currCrow;
              prevPos[currCrow]=7;
              total_crows++;
              msg(eltName,0,7,0);
            }
    
            else if(pos.clientX >= 728.308 - limit && pos.clientX <= 728.308+ limit && pos.clientY >= 329.679- limit && pos.clientY <= 329.679+ limit && initial[8].occupied==0){
              Snap("#"+eltName).attr({cx:728.308, cy:329.679});
              crowCurrentlyOnBoard.push(currCrow);
              turn="v";
              initial[8].occupied=1;
              initial[8].prev=currCrow;
              prevPos[currCrow]=8;
              total_crows++;
              msg(eltName,0,8,0);
            }
    
            else if(pos.clientX >= 250 - limit && pos.clientX <=250+ limit && pos.clientY >= 650- limit && pos.clientY <= 650+ limit && initial[9].occupied==0){
              Snap("#"+eltName).attr({ cx:250, cy:650});
              crowCurrentlyOnBoard.push(currCrow);
              turn="v";
              initial[9].occupied=1;
              initial[9].prev=currCrow;
              prevPos[currCrow]=9;
              total_crows++;
              msg(eltName,0,9,0);
            }
    
            else if(pos.clientX >= 900 - limit && pos.clientX <=900+ limit && pos.clientY >= 650- limit && pos.clientY <= 650+ limit && initial[10].occupied==0){
              Snap("#"+eltName).attr({cx:900, cy:650});
              crowCurrentlyOnBoard.push(currCrow);
              turn="v";
              initial[10].occupied=1;
              initial[10].prev=currCrow;
              prevPos[currCrow]=10;
              total_crows++;
              msg(eltName,0,10,0);
            }
            else{
              window.alert("Invalid Move");
              Snap("#"+eltName).attr({cx:startX,cy:startY});
            }
          }
      else{
        window.alert('Invalid move, First place all the seven crows on the board!');
        Snap("#"+eltName).attr({ cx:startX, cy:startY });
      }
    }
    else{
      //***********All crows are present on the board ***********//
      var currPos=prevPos[currCrow];
      if(currPos==1){
        //crow can move to pos 3,4
        if(pos.clientX >= 472.768 - limit && pos.clientX <= 472.768 + limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[3].occupied==0){
          Snap("#"+eltName).attr({cx: 472.768, cy:208});
          turn="v";
          initial[3].occupied=1;     
          initial[3].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=3;
          msg(eltName,1,3,0);
        }
        else if(pos.clientX >= 663.088 - limit && pos.clientX <= 663.088 + limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[4].occupied==0){
          Snap("#"+eltName).attr({cx: 663.088, cy:208});
          turn="v";
          initial[4].occupied=1;
          initial[4].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=4;
          msg(eltName,1,4,0);
        }
        else{
          window.alert("Invalid Move");
          Snap("#"+eltName).attr({cx:startX,cy:startY});
        }
      }
      else if(currPos==2){
        //crow can move to 3,6
        if(pos.clientX >= 472.768 - limit && pos.clientX <= 472.768 + limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[3].occupied==0){
          Snap("#"+eltName).attr({cx: 472.768, cy:208});
          turn="v";
          initial[3].occupied=1;     
          initial[3].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=3;
          msg(eltName,2,3,0);
        }
        else if(pos.clientX >= 410.395 - limit && pos.clientX <= 410.395+ limit && pos.clientY >= 331.757 - limit && pos.clientY <= 331.757 + limit && initial[6].occupied==0){
          Snap("#"+eltName).attr({cx: 410.395, cy:331.757});
          turn="v";
          initial[6].occupied=1;
          initial[6].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=6;
          msg(eltName,2,6,0);
        }
        else{
          window.alert("Invalid Move");
          Snap("#"+eltName).attr({cx:startX,cy:startY});
        }
      }
      else if(currPos==3){
        //crow can move to 1,2,4,6
        if(pos.clientX >= 565 - limit && pos.clientX <= 565 + limit && pos.clientY >= 25 - limit && pos.clientY <= 25 + limit && initial[1].occupied==0){
          Snap("#"+eltName).attr({cx: 565, cy:25});
          turn="v";
          initial[1].occupied=1;
          initial[1].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=1;
          msg(eltName,3,1,0);
        }
        else if(pos.clientX >= 220 - limit && pos.clientX <= 220 + limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[2].occupied==0){
          Snap("#"+eltName).attr({cx: 220, cy:208});
          turn="v";
          initial[2].occupied=1;
          initial[2].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=2;
          msg(eltName,3,2,0);
        }
        else if(pos.clientX >= 663.088 - limit && pos.clientX <= 663.088 + limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[4].occupied==0){
          Snap("#"+eltName).attr({cx: 663.088, cy:208});
          turn="v";
          initial[4].occupied=1;
          initial[4].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=4;
          msg(eltName,3,4,0);
        }
        else if(pos.clientX >= 410.395 - limit && pos.clientX <= 410.395+ limit && pos.clientY >= 331.757 - limit && pos.clientY <= 331.757 + limit && initial[6].occupied==0){
          Snap("#"+eltName).attr({cx: 410.395, cy:331.757});
          turn="v";
          initial[6].occupied=1;
          initial[6].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=6;
          msg(eltName,3,6,0);
        }
        else{
          window.alert("Invalid Move");
          Snap("#"+eltName).attr({cx:startX,cy:startY});
        }
      }
      else if(currPos==4){
        // Crow can move to 1, 3, 5 or 8
        if(pos.clientX >= 565 - limit && pos.clientX <= 565 + limit && pos.clientY >= 25 - limit && pos.clientY <= 25 + limit && initial[1].occupied==0){
          Snap("#"+eltName).attr({cx: 565, cy:25});
          turn="v";
          initial[1].occupied=1;
          initial[1].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=1;
          msg(eltName,4,1,0);
        }
        else if(pos.clientX >= 472.768 - limit && pos.clientX <= 472.768 + limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[3].occupied==0){
          Snap("#"+eltName).attr({cx: 472.768, cy:208});
          turn="v";
          initial[3].occupied=1;     
          initial[3].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=3;
          msg(eltName,4,3,0);
        }
        else if(pos.clientX >= 910 - limit && pos.clientX <= 910+ limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[5].occupied==0){
          Snap("#"+eltName).attr({cx: 910, cy:208});
          turn="v";
          initial[5].occupied=1;
          initial[5].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=5;
          msg(eltName,4,5,0);
        }
        else if(pos.clientX >= 728.308 - limit && pos.clientX <= 728.308+ limit && pos.clientY >= 329.679- limit && pos.clientY <= 329.679+ limit && initial[8].occupied==0){
          Snap("#"+eltName).attr({cx:728.308, cy:329.679});
          turn="v";
          initial[8].occupied=1;
          initial[8].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=8;
          msg(eltName,4,8,0);
        }
        else{
          window.alert("Invalid Move");
          Snap("#"+eltName).attr({cx:startX,cy:startY});
        }
      }
      else if(currPos==5){
        // Crow can move to 4 or 8
        if(pos.clientX >= 663.088 - limit && pos.clientX <= 663.088 + limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[4].occupied==0){
          Snap("#"+eltName).attr({cx: 663.088, cy:208});
          turn="v";
          initial[4].occupied=1;
          initial[4].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=4;
          msg(eltName,5,4,0);
        }
        else if(pos.clientX >= 728.308 - limit && pos.clientX <= 728.308+ limit && pos.clientY >= 329.679- limit && pos.clientY <= 329.679+ limit && initial[8].occupied==0){
          Snap("#"+eltName).attr({cx:728.308, cy:329.679});
          turn="v";
          initial[8].occupied=1;
          initial[8].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=8;
          msg(eltName,5,8,0);
        }
        else{
          window.alert("Invalid Move");
          Snap("#"+eltName).attr({cx:startX,cy:startY});
        }
      }
      else if(currPos==6){
        // Crow can move to 2, 3, 7 or 9
        if(pos.clientX >= 220 - limit && pos.clientX <= 220 + limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[2].occupied==0){
          Snap("#"+eltName).attr({cx: 220, cy:208});
          turn="v";
          initial[2].occupied=1;
          initial[2].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=2;
          msg(eltName,6,2,0);
        }
        else if(pos.clientX >= 472.768 - limit && pos.clientX <= 472.768 + limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[3].occupied==0){
          Snap("#"+eltName).attr({cx: 472.768, cy:208});
          turn="v";
          initial[3].occupied=1;     
          initial[3].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=3;
          msg(eltName,6,3,0);
        }
        else if(pos.clientX >= 570.149 - limit && pos.clientX <= 570.149+ limit && pos.clientY >= 435.597 - limit && pos.clientY <= 435.597+ limit && initial[7].occupied==0){
          Snap("#"+eltName).attr({cx:570.149, cy:435.597});
          turn="v";
          initial[7].occupied=1;
          initial[7].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=7;
          msg(eltName,6,7,0);
        }
        else if(pos.clientX >= 250 - limit && pos.clientX <=250+ limit && pos.clientY >= 650- limit && pos.clientY <= 650+ limit && initial[9].occupied==0){
          Snap("#"+eltName).attr({ cx:250, cy:650});
          turn="v";
          initial[9].occupied=1;
          initial[9].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=9;
          msg(eltName,6,9,0);
        }
        else{
          window.alert("Invalid Move");
          Snap("#"+eltName).attr({cx:startX,cy:startY});
        }
      }
      else if(currPos==7){
        // Crow can move to 6, 8, 9 or 10
        if(pos.clientX >= 410.395 - limit && pos.clientX <= 410.395+ limit && pos.clientY >= 331.757 - limit && pos.clientY <= 331.757 + limit && initial[6].occupied==0){
          Snap("#"+eltName).attr({cx: 410.395, cy:331.757});
          turn="v";
          initial[6].occupied=1;
          initial[6].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=6;
          msg(eltName,7,6,0);
        }
        else if(pos.clientX >= 728.308 - limit && pos.clientX <= 728.308+ limit && pos.clientY >= 329.679- limit && pos.clientY <= 329.679+ limit && initial[8].occupied==0){
          Snap("#"+eltName).attr({cx:728.308, cy:329.679});
          turn="v";
          initial[8].occupied=1;
          initial[8].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=8;
          msg(eltName,7,8,0);
        }
        else if(pos.clientX >= 250 - limit && pos.clientX <=250+ limit && pos.clientY >= 650- limit && pos.clientY <= 650+ limit && initial[9].occupied==0){
          Snap("#"+eltName).attr({ cx:250, cy:650});
          turn="v";
          initial[9].occupied=1;
          initial[9].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=9;
          msg(eltName,7,9,0);
        }
        else if(pos.clientX >= 900 - limit && pos.clientX <=900+ limit && pos.clientY >= 650- limit && pos.clientY <= 650+ limit && initial[10].occupied==0){
          Snap("#"+eltName).attr({cx:900, cy:650});
          turn="v";
          initial[10].occupied=1;
          initial[10].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=10;
          msg(eltName,7,10,0);
        }
        else{
          window.alert("Invalid Move");
          Snap("#"+eltName).attr({cx:startX,cy:startY});
        }
      }
      else if(currPos==8){
         // Crow can move to 4, 5, 7 or 10
         if(pos.clientX >= 663.088 - limit && pos.clientX <= 663.088 + limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[4].occupied==0){
          Snap("#"+eltName).attr({cx: 663.088, cy:208});
          turn="v";
          initial[4].occupied=1;
          initial[4].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=4;
          msg(eltName,8,4,0);
        }
        else if(pos.clientX >= 910 - limit && pos.clientX <= 910+ limit && pos.clientY >= 208 - limit && pos.clientY <= 208 + limit && initial[5].occupied==0){
          Snap("#"+eltName).attr({cx: 910, cy:208});
          turn="v";
          initial[5].occupied=1;
          initial[5].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=5;
          msg(eltName,8,5,0);
        }
        else if(pos.clientX >= 570.149 - limit && pos.clientX <= 570.149+ limit && pos.clientY >= 435.597 - limit && pos.clientY <= 435.597+ limit && initial[7].occupied==0){
          Snap("#"+eltName).attr({cx:570.149, cy:435.597});
          turn="v";
          initial[7].occupied=1;
          initial[7].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=7;
          msg(eltName,8,7,0);
        }
        else if(pos.clientX >= 900 - limit && pos.clientX <=900+ limit && pos.clientY >= 650- limit && pos.clientY <= 650+ limit && initial[10].occupied==0){
          Snap("#"+eltName).attr({cx:900, cy:650});
          turn="v";
          initial[10].occupied=1;
          initial[10].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=10;
          msg(eltName,8,10,0);
        }
        else{
          window.alert("Invalid Move");
          Snap("#"+eltName).attr({cx:startX,cy:startY});
        }
      }
      else if(currPos==9){
        // Crow can move to 6 or 7
        if(pos.clientX >= 410.395 - limit && pos.clientX <= 410.395+ limit && pos.clientY >= 331.757 - limit && pos.clientY <= 331.757 + limit && initial[6].occupied==0){
          Snap("#"+eltName).attr({cx: 410.395, cy:331.757});
          turn="v";
          initial[6].occupied=1;
          initial[6].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=6;
          msg(eltName,9,6,0);
        }
        else if(pos.clientX >= 570.149 - limit && pos.clientX <= 570.149+ limit && pos.clientY >= 435.597 - limit && pos.clientY <= 435.597+ limit && initial[7].occupied==0){
          Snap("#"+eltName).attr({cx:570.149, cy:435.597});
          turn="v";
          initial[7].occupied=1;
          initial[7].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=7;
          msg(eltName,9,7,0);
        }
        else{
          window.alert("Invalid Move");
          Snap("#"+eltName).attr({cx:startX,cy:startY});
        }
      }
      else if(currPos==10){
        // Crow can move to 7 or 8
        if(pos.clientX >= 570.149 - limit && pos.clientX <= 570.149+ limit && pos.clientY >= 435.597 - limit && pos.clientY <= 435.597+ limit && initial[7].occupied==0){
          Snap("#"+eltName).attr({cx:570.149, cy:435.597});
          turn="v";
          initial[7].occupied=1;
          initial[7].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=7;
          msg(eltName,10,7,0);
        }
        else if(pos.clientX >= 728.308 - limit && pos.clientX <= 728.308+ limit && pos.clientY >= 329.679- limit && pos.clientY <= 329.679+ limit && initial[8].occupied==0){
          Snap("#"+eltName).attr({cx:728.308, cy:329.679});
          turn="v";
          initial[8].occupied=1;
          initial[8].prev=currCrow;
          initial[currPos].occupied=0;
          prevPos[currCrow]=8;
          msg(eltName,10,8,0);
        }
        else{
          window.alert("Invalid Move");
          Snap("#"+eltName).attr({cx:startX,cy:startY});
        }
      }
    }
  }
}

  var blog=document.getElementById("blog");
  if(turn=="v"){
    blog.innerHTML=`Vulture's Chance!!!`;
  }
  else{
    blog.innerHTML=`Crow's Chance!!!`;
  }
}