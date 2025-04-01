//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Skript pro spodní interaktivní okno v sekci Orbit spolenčně s generátorem orbity, výpisem souřadnic a chováním orbity//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Zjištění pozice kurzoru
function getMousePos(event)
{
  return{
   x: event.offsetX,
   y: event.offsetY
 };
}
//Uložení reálné a imaginární konstanty c části do proměných
function getInput(event)
{
  cxGaussJ = Number(document.getElementById("souradnice1").value);
  cyGaussJ = Number(document.getElementById("souradnice2").value);
}
//Funkce pro vygenerování Juliovy množiny pomocí ETA 
function juliaset()
{
  if(cxGaussJ*cxGaussJ+cyGaussJ*cyGaussJ > 4)
  {
    r_c = cxGaussJ*cxGaussJ+cyGaussJ*cyGaussJ;
  }else r_c = 4;

  for(var x = 0;x < canvas1.width; x++)
  {
   var zx1 = x;
    for(var y = 0; y < canvas1.height; y++)
    {
     var zy1 = y;

     var zxGauss1 =cmaxX1/(canvas1.width/2)*(zx1 - canvas1.width/2);
     var zyGauss1 = -cmaxX1/(canvas1.height/2)*(zy1 - canvas1.height/2); 

     var zx2 = zxGauss1*zxGauss1;
     var zy2 = zyGauss1*zyGauss1;

    var iter1 = 0;
    while(zx2 + zy2 < r_c && iter1 < maxIter1)
    { 
      zx2= zxGauss1*zxGauss1;
      zy2 = zyGauss1*zyGauss1;
      zyGauss1 = 2*zxGauss1*zyGauss1 + cyGaussJ;
      zxGauss1 = (zx2 - zy2) + cxGaussJ;
      iter1++;   
    }
    var input = 255 - 255*iter1/(100);
    var pozice = (x+y*canvas1.width) * 4;
    imgData.data[pozice + 0] = input; 
    imgData.data[pozice + 1] = input; 
    imgData.data[pozice + 2] = input; 
    imgData.data[pozice + 3] = 255;
    }    
  }kontext1.putImageData(imgData, 0, 0);
}
//Funkce pro vygenerování orbity
function orbit(event)
{
  var mousePos = getMousePos(canvas1, event);

  kontext1.fillStyle = "red";
  kontext1.strokeStyle = "red";

  var zxGauss1 = cmaxX1/(canvas1.width/2)*(mousePos.x - canvas1.width/2);
  var zyGauss1 = -cmaxX1/(canvas1.height/2)*(mousePos.y - canvas1.height/2);

  var zx = mousePos.x;
  var zy = mousePos.y;
  for(let i = 0; i<500;i++)
  {
   kontext1.beginPath();
   kontext1.fillStyle = "yellow"
   kontext1.arc(zx, zy, 3, 0, Math.PI * 2);
   kontext1.fill();
   kontext1.moveTo(zx,zy);
   var zxN1 = (zxGauss1*zxGauss1 - zyGauss1*zyGauss1) + cxGaussJ;   
   var zyN1 = 2*zxGauss1*zyGauss1 + cyGaussJ;   
   zxGauss1 = zxN1;
   zyGauss1 = zyN1;
   zx = (canvas1.width/2)*((zxGauss1/cmaxX1)+1);
   zy = (canvas1.width/2)*((zyGauss1/-cmaxX1)+1);
   kontext1.lineTo(zx,zy);
   kontext1.closePath();
   kontext1.stroke();
  }
}
//Zjištění souřadnic kurzoru
function coordsj1(event)
{
  var mousePos = getMousePos(canvas1,event);
  kontextj1.clearRect(0,0,canvasj1.width,canvasj1.height);

  var xComplex = cmaxX1/(canvas1.width/2)*(mousePos.x - canvas1.width/2);
  var yComplex = -cmaxX1/(canvas1.height/2)*(mousePos.y - canvas1.height/2);
  var xCoord = Math.round(xComplex*10000)/10000;
  var yCoord = Math.round(yComplex*10000)/10000;

  kontextj1.font = "16px sans-serif";
  
  if(yCoord <= 0)
  {
   kontextj1.fillText(xCoord + " - " + Math.abs(yCoord)+"i", 13, 21);
  }else{
    kontextj1.fillText(xCoord + " + " + Math.abs(yCoord)+"i", 13, 21);
       }
} 
//Zjištění chování orbity
function period1(event)
{
  var list = [];
  var maxIterP = 2000;
  var mousePos = getMousePos(canvas1, event);

  var rE = cmaxX1 / (canvas1.width / 2) * (mousePos.x - canvas1.width / 2);
  var iM  = -cmaxX1 / (canvas1.height / 2) * (mousePos.y - canvas1.height / 2);
  var cx = math.complex(cxGaussJ,cyGaussJ);
  var z = math.complex(rE,iM);
  list[0] = z;

  for(var iteraceP = 1; iteraceP < maxIterP; iteraceP++)
  {
   list[iteraceP] = math.add(cx,math.multiply(list[iteraceP-1],list[iteraceP-1]));
  }

  var hit = false;
  for(var x = 0;x<list.length - 1;x++)
  {
    for(var y = x+1; y<list.length;y++)
    {
     if(x > 1000 && Math.abs(( list[x].re  - list[y].re)) < 0.0001 && Math.abs((list[x].im  - list[y].im)) < 0.0001)
     {
      hit = true;
      break;
     }
    }
    if(hit == true)
    {
      break;
    }
  }

  if(isNaN(list[x].re) == false && isNaN(list[x].im) == false && y - x != 1)
  {
    kontextper1.clearRect(0, 0, canvasper1.width, canvasper1.height);
    kontextper1.fillText("period-" + (y-x), 5, 21);
  }else if(y - x == 1 && isNaN(list[x].re) == false)
  {
    kontextper1.clearRect(0, 0, canvasper1.width, canvasper1.height);
    kontextper1.fillText("convergence", 5, 21);
  }else if(isNaN(list[x].re) == true)
  {
    kontextper1.clearRect(0, 0, canvasper1.width, canvasper1.height);
    kontextper1.fillText("divergence", 5, 21);
  }
}
//Zadefinování tlačítek, popisků a pláten a propojení s html souborem
var butt = document.getElementById('butt');
var reset1 = document.getElementById('reset1'); 
var canvas1 = document.getElementsByClassName("orbitJ")[0];
var kontext1 = canvas1.getContext('2d');
kontext1.font = "30px verdana";
kontext1.fillStyle = "lightgray";
kontext1.fillText("Enter a constant c", canvas1.width/2 - 135, canvas1.height/2 +10);

var canvaspertext1 = document.getElementsByClassName("pertext1")[0];
var kontextpertext1 = canvaspertext1.getContext("2d")
kontextpertext1.font = "17px verdana ";
kontextpertext1.fillText("Behaviour of orbit:", 3, 21);

var canvasper1 = document.getElementsByClassName("per1")[0];
var kontextper1 = canvasper1.getContext('2d');
kontextper1.font = "15px verdana";

var canvasj1 = document.getElementsByClassName("coordinatesJ1")[0];
var kontextj1 = canvasj1.getContext('2d');
var imgData = kontext1.createImageData(canvas1.width,canvas1.height);
//Zadefinování proměnných pro funkce
var cxGaussJ; 
var cyGaussJ;
var maxIter1 = 1000;
var zxN1
var zyN1
var cmaxX1 = 2;
//Spuštění jednotlivých funkcí po provedení určité akce myší... (mousemove - pohyb, click - kliknutí)
canvas1.addEventListener('click', orbit, false);
canvas1.addEventListener('mousemove', period1, false);
canvas1.addEventListener('mousemove', coordsj1, false);
butt.addEventListener('click', getInput, false);
butt.addEventListener("click", juliaset, false);
reset1.addEventListener('click',juliaset,false);