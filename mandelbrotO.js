////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Skript pro horní okno v sekci Orbit společně s generátorem orbity, výpisem souřadnic a chováním orbity //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Zjištění pozice kurzoru
function getMousePos(canvas, event) 
{
  return {
    x: event.offsetX,
    y: event.offsetY
  };
}

//Funkce pro vykreslení orbity
function draw_orbit(event)
{
  var mousePos = getMousePos(canvas, event);

  kontext.fillStyle = "red";
  kontext.strokeStyle = "red";
  kontext.beginPath();
  kontext.moveTo((canvas.width) / 2 + posunX, canvas.height / 2);
  kontext.lineTo(mousePos.x, mousePos.y);
  kontext.closePath();
  kontext.stroke();

  var zxp = mousePos.x;
  var zyp = mousePos.y;

  var zxGauss = 0;
  var zyGauss = 0;
  var cxComplex = cmaxX / (canvas.width / 2) * ((zxp - posunX) - canvas.width / 2);
  var cyComplex = -cmaxX / (canvas.height / 2) * (zyp - canvas.height / 2);

  var zx = zxp;
  var zy = zyp;
  for (let i = 0; i < 500; i++)
  {
    kontext.beginPath();
    kontext.fillStyle = "yellow"
    kontext.arc(zx, zy, 3, 0, Math.PI * 2);
    kontext.fill();
    kontext.moveTo(zx, zy);

    var zxN = (zxGauss * zxGauss - zyGauss * zyGauss) + cxComplex;
    var zyN = 2 * zxGauss * zyGauss + cyComplex;

    zxGauss = zxN;
    zyGauss = zyN;

    zx = (canvas.width / 2) * ((zxGauss / cmaxX) + 1) + posunX;
    zy = (canvas.height / 2) * ((zyGauss / -cmaxX) + 1);

    kontext.lineTo(zx, zy);
    kontext.closePath();
    kontext.stroke();
  }
}
//Zadefinování polí a popisků a propojení s html
var canvas = document.getElementsByClassName('orbitM')[0];
var kontext = canvas.getContext('2d');
var imgData = kontext.createImageData(canvas.width, canvas.height);

var canvasm = document.getElementsByClassName("coordinates")[0];
var kontextm = canvasm.getContext("2d")

var canvaspertext = document.getElementsByClassName("pertext")[0];
var kontextpertext = canvaspertext.getContext("2d")
kontextpertext.font = "17px verdana ";
kontextpertext.fillText("Behaviour of orbit:", 3, 21);

var canvasper = document.getElementsByClassName("per")[0];
var kontextper = canvasper.getContext("2d");
kontextper.font = "15px verdana";
//Zadefinování proměnných pro funkce
var ratio = canvas.height / canvas.width;
var maxIter = 255;
var zxN, zyN;
var cmaxX = 1.5;
var posunXcomplex = 0.6;
var posunX = (canvas.width / 2) * ((posunXcomplex / cmaxX) + 1) - canvas.width / 2;
//Funkce pro vygenerování Mandelbrotovy množiny
function draw_mandelbrot()
{
  for (var x = 0; x < canvas.width; x++)
  {
  var cx = x;
  var cxGauss = cmaxX / (canvas.width / 2) * (cx - canvas.width / 2) - posunXcomplex;
  
  var y = 0;
   for (var y = 0; y < canvas.height; y++) 
   {
    var cy = y;
    
    var cyGauss = -cmaxX / (canvas.height / 2) * (cy - canvas.height / 2);
    var zx2 = 0;
    var zy2 = 0;
    var zxGauss = 0;
    var zyGauss = 0;

      var iter = 0;
      while (zx2 + zy2 < 4 && iter < maxIter)
      {
        zx2 = zxGauss * zxGauss;
        zy2 = zyGauss * zyGauss;
        zyGauss = 2 * zxGauss * zyGauss + cyGauss;
        zxGauss = (zx2 - zy2) + cxGauss;
        iter++
      }
      var input = 255 - 255 * iter / 70;
      var idx = (x + y * canvas.width) * 4;
      imgData.data[idx + 0] = input; 
      imgData.data[idx + 1] = input;
      imgData.data[idx + 2] = input; 
      imgData.data[idx + 3] = 255;
   }
  } kontext.putImageData(imgData, 0, 0);
}
draw_mandelbrot();
//uložení souřadnic konstanty c pro vygenerování Juliovy množiny
function coordsj(event)
{
  var mousePos = getMousePos(canvas, event);
  var xComplex = cmaxX / (canvas.width / 2) * (mousePos.x - canvas.width / 2) - posunXcomplex;
  var yComplex = -cmaxX / (canvas.height / 2) * (mousePos.y - canvas.height / 2);
  document.getElementById("souradnice1").value =  Math.round(xComplex * 10000) / 10000;
  document.getElementById("souradnice2").value = Math.round(yComplex * 10000) / 10000;
}
//vypsání souřadnic kurzoru
function coords(event)
{
  var mousePos = getMousePos(canvas, event);
  kontextm.clearRect(0, 0, canvasm.width, canvasm.height);

  var xComplex = cmaxX / (canvas.width / 2) * (mousePos.x - canvas.width / 2) - posunXcomplex;
  var yComplex = -cmaxX / (canvas.height / 2) * (mousePos.y - canvas.height / 2);
  var xCoord = Math.round(xComplex * 10000) / 10000;
  var yCoord = Math.round(yComplex * 10000) / 10000;

  kontextm.font = "16px sans-serif";

  if(yCoord <= 0)
  {
    kontextm.fillText(xCoord + " - " + Math.abs(yCoord) + "i", 13, 21);
  } else {
      kontextm.fillText(xCoord + " + " + Math.abs(yCoord) + "i", 13, 21);
         }
}
//funkce pro vymazání vykreslených orbit
function clear(event)
{
  kontext.clearRect(0, 0, canvas.width, canvas.height);
  draw_mandelbrot();
  kontextm.clearRect(0, 0, canvasm.width, canvasm.height);
}
//zjištění chování orbity
function period(event)
{
  var list = [];
  var maxIterP = 2000;
  var mousePos = getMousePos(canvas, event);

  var rE = cmaxX / (canvas.width / 2) * (mousePos.x - canvas.width / 2) - posunXcomplex;
  var iM  = -cmaxX / (canvas.height / 2) * (mousePos.y - canvas.height / 2);
  var cx = math.complex(rE,iM);
  var z = math.complex(0,0);
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
    }if(hit == true)
    {
    break;
    }
  }

  if(isNaN(list[x].re) == false && isNaN(list[x].im) == false && y - x != 1)
  {
    kontextper.clearRect(0, 0, canvasper.width, canvasper.height);
    kontextper.fillText("period-"+ (y-x), 5, 21);
  }else if(y - x == 1 && isNaN(list[x].re) == false)
  {
    kontextper.clearRect(0, 0, canvasper.width, canvasper.height);
    kontextper.fillText("convergence", 5, 21);
  }else if(isNaN(list[x].re) == true)
  {
    kontextper.clearRect(0, 0, canvasper.width, canvasper.height);
    kontextper.fillText("divergence", 5, 21);
  }
}
//Zadefinování tlačítka reset a propojení s html souborem
var reset = document.getElementById('reset');
//Spuštění jednotlivých funkcí po provedení určité akce myší
reset.addEventListener('click', clear, false);
canvas.addEventListener('click', draw_orbit, false);
canvas.addEventListener('click', coordsj, false);
canvas.addEventListener("mousemove", coords, false);
canvas.addEventListener("mousemove", period, false);

