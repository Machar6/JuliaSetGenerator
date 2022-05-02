//////////////////////////////////////////////////////////////////////////////////////////////////
// Skript pro levé plátno v sekci J vs. J pro vygenerovaní Juliovy množiny pomocí různých metod //
// společně s funkcí pro měření rychlosti metody                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////

//ulozeni souradnic do proměnné
function getInput()
{
  cxGauss1 = Number(document.getElementById("souradnice1").value);
  cyGauss1 = Number(document.getElementById("souradnice2").value);
}
/////////Funkce pro jednotlivé metody/////////////////////

//Distance estimator method
function draw_dem()
{
  kontext.clearRect(0,0,canvas.width,canvas.height);

  if(cxGauss1*cxGauss1+cyGauss1*cyGauss1 > 4)
  {
    r_c = cxGauss1*cxGauss1+cyGauss1*cyGauss1;
  }else r_c = 4;

  var pocitadlo = 0;
  for(var x = 0; x<canvas.width;x++)
  {
  var zx = x;
   for(var y = 0; y < canvas.height; y++)
    {
    var zy = y;

    var zxComplex = cmaxX1/(canvas.width/2)*(zx - canvas.width/2);
    var zyComplex = -cmaxX1/(canvas.height/2)*(zy - canvas.height/2);

    var dzx = 2*zxComplex;
    var dzy = 2*zyComplex; 

    var zx2 = zxComplex*zxComplex;
    var zy2 = zyComplex*zyComplex;
  
    var dzx2 = 0;
    var dzy2 = 0;

    pocitadlo = 0;
    do{
      pocitadlo ++;
      if(zx2 + zy2< r_c)
      {//pokud |z|>threshold radius pak se proces zastavi a vyhodnoti se velikost d
      var zxN = (zxComplex*zxComplex - zyComplex*zyComplex) + cxGauss1;
      var zyN = 2*zxComplex*zyComplex + cyGauss1;
      // dz_new = dz
      var dzxN = 2*zxComplex*dzx - 2*zyComplex*dzy;
      var dzyN = 2*zxComplex*dzy + 2*zyComplex*dzx;
      // z = z_new
      zxComplex = zxN;
      zyComplex = zyN;
      // dz = dz_new
      dzx = dzxN;
      dzy = dzyN;
      // |z|=sqrt(zx^2 + zy^2)
      zx2 = zxComplex*zxComplex;
      zy2 = zyComplex*zyComplex;
      }else break;
    }while(pocitadlo<maxIter1);

    dzx2 = dzx*dzx;
    dzy2 = dzy*dzy;
    var d = 2*(Math.sqrt(zx2 + zy2)*Math.log(Math.sqrt(zx2 + zy2)))/Math.sqrt(dzx2 + dzy2); //2*modulus(z)*log(modulus(z))/modulus(dz)
    var input = - 20*Math.log(d);
    var idx = (x+y*canvas.width) * 4;
    imgData.data[idx + 0] = input; 
    imgData.data[idx + 1] = input;
    imgData.data[idx + 2] = input; 
    imgData.data[idx + 3] = 255;
    }
  } kontext.putImageData(imgData, 0, 0);
}

//inverse iteration method
function draw_iim()
{
  z0 = math.complex(0,1);
  c = math.complex(cxGauss1,cyGauss1); 
  kontext.clearRect(0,0,canvas.width,canvas.height);

  z[0] = math.sqrt(math.add(z0,math.multiply(c,-1)));// +sqrt(z-c)
  z[1] = math.multiply(z[0],-1);//-sqrt(z-c)
  //prevod na sourandice canvas
  zCR[0] = (canvas.width/2)*((z0.re/cmaxX1)+1); 
  zCI[0] = (canvas.height/2)*((z0.im/-cmaxX1)+1);

  kontext.fillStyle = "black";

  var j = 0;
  for(var i = 0; i < 2*Math.pow(2,maxIter)-2; i=i+2)//cyklus pro vypocet vsech hodnot
  {
   z[i] = math.sqrt(math.add(z[j],math.multiply(c,-1))); //reseni pro +sqrt(z-c)
   z[i+1] = math.multiply(z[i],-1); //reseni pro -sqrt(z-c)
   zCR[j] = (canvas.width/2)*((z[j].re/cmaxX1)+1);
   zCI[j] = (canvas.height/2)*((z[j].im/-cmaxX1)+1);
   kontext.fillRect(zCR[j],zCI[j],1,1);//obarveni kazdeho vzpocitaneho bodu v canvas
   j++;
  }
}

//escape time algortihm
function draw_eta(){
  if(cxGauss1*cxGauss1+cyGauss1*cyGauss1 > 4)
  {
    r_c = cxGauss1*cxGauss1+cyGauss1*cyGauss1;
  }else r_c = 4;

  for(var x = 0;x < canvas.width; x++)
  {
   var zx1 = x;
   for(var y = 0; y < canvas.height; y++)
    {
     var zy1 = y;

     var zyGauss1 = -cmaxX1/(canvas.height/2)*(zy1 - canvas.height/2); 
     var zxGauss1 =cmaxX1/(canvas.width/2)*(zx1 - canvas.width/2);

     var zx2 = zxGauss1*zxGauss1;
     var zy2 = zyGauss1*zyGauss1;

     var iter1 = 0;
     while(zx2 + zy2 < r_c && iter1 < maxIter1)
      {
        zx2= zxGauss1*zxGauss1;
        zy2 = zyGauss1*zyGauss1;
        zyGauss1 = 2*zxGauss1*zyGauss1 + cyGauss1;
        zxGauss1 = (zx2 - zy2) + cxGauss1;
        iter1++;
      }
      var input = 255 - 255*iter1/(100);
      var pozice = (x+y*canvas.width) * 4;
      imgData.data[pozice + 0] = input; 
      imgData.data[pozice + 1] = input; 
      imgData.data[pozice + 2] = input; 
      imgData.data[pozice + 3] = 255;
    }    
  }kontext.putImageData(imgData, 0, 0);
}
///// funkce pro měření rychlosti jednotlivých metody /////
function stopwatch1()
{
  var startTime = performance.now();
  draw_dem();
  var endTime = performance.now();

  kontextl.clearRect(0, 0, canvasl.width, canvasl.height);
  kontextl.fillText(Math.round((endTime - startTime)*10)/10 + " ms", 13, 21);
}

function stopwatch2()
{
  var startTime = performance.now();
  draw_iim();
  var endTime = performance.now();

  kontextl.clearRect(0, 0, canvasl.width, canvasl.height);
  kontextl.fillText(Math.round((endTime - startTime)*10)/10 + " ms", 13, 21);
}

function stopwatch3()
{
  var startTime = performance.now();
  draw_eta();
  var endTime = performance.now();

  kontextl.clearRect(0, 0, canvasl.width, canvasl.height);
  kontextl.fillText(Math.round((endTime - startTime)*10)/10 + " ms", 13, 21);
}
//Zadefinování proměnných pro funkce
var cxGauss1;
var cyGauss1;
var z0;
var maxIter1 = 256;
var maxIter = 17;
var zCR = []; 
var zCI = []; 
var z = [];
var c;
var zxN1;
var zyN1;
var cmaxX1 = 2;
//Zadefinování tlačítek, popisků a pláten a propojení s html
var butt = document.getElementById('butt');
var canvas = document.getElementsByClassName("juliaL")[0];
var kontext = canvas.getContext('2d');
kontext.font = "25px verdana";
kontext.fillStyle = "lightgray";
kontext.fillText("1. Select a visualization method", canvas.width/2 - 200, canvas.height/2);
kontext.fillText("2. Enter a constant c", canvas.width/2 - 200, canvas.height/2 + 50);
kontext.font = "20px verdana";
kontext.fillText("I.",20,30);
var imgData = kontext.createImageData(canvas.width,canvas.height);

var canvasl = document.getElementsByClassName("speed1")[0];
var kontextl = canvasl.getContext('2d');
kontextl.font = "20px verdana";

var canvasltext = document.getElementsByClassName("speed1text")[0];
var kontextltext = canvasltext.getContext('2d');
kontextltext.font = "20px verdana";
kontextltext.fillText("Speed:", 2,21);

//Menu pro výběr metody
function metoda(){
  if(document.getElementById("methods").value == "DEM"){
  butt.addEventListener('click', getInput, false);
  butt.removeEventListener("click", draw_iim, false);
  butt.removeEventListener("click",draw_eta, false);
  butt.addEventListener("click", draw_dem, false);
  butt.removeEventListener("click", stopwatch2, false);
  butt.removeEventListener("click", stopwatch3, false);
  butt.addEventListener("click", stopwatch1, false);
  }else if(document.getElementById("methods").value == "IIM"){
  butt.addEventListener('click', getInput, false);
  butt.removeEventListener("click",draw_eta, false);
  butt.removeEventListener("click", draw_dem, false);
  butt.addEventListener("click", draw_iim, false);
  butt.removeEventListener("click", stopwatch1, false);
  butt.removeEventListener("click", stopwatch3, false);
  butt.addEventListener("click", stopwatch2, false);
  }else if(document.getElementById("methods").value == "ETA"){
  butt.addEventListener('click', getInput, false);
  butt.removeEventListener("click", draw_dem, false);
  butt.removeEventListener("click",draw_iim, false);
  butt.addEventListener("click", draw_eta, false);
  butt.removeEventListener("click", stopwatch1, false);
  butt.removeEventListener("click", stopwatch2, false);
  butt.addEventListener("click", stopwatch3, false);    
  }
}

