///////////////////////////////////////////////////////////////////////////////////////////////////
// Skript pro levé plátno v sekci M vs. J pro vykreslení Mandelbrotovy množiny získání souřadnic //
///////////////////////////////////////////////////////////////////////////////////////////////////

// nalezeni pozice kurzoru 
function getMousePos(event) 
{  
  return {
   x: event.offsetX,
   y: event.offsetY
 };
}

//zadefinování pole a propojeni s html
var canvas1 = document.getElementsByClassName('mandelbrot')[0];
var kontext1 = canvas1.getContext('2d');
var imgData = kontext1.createImageData(canvas1.width,canvas1.height);

var canvasMvsJ = document.getElementsByClassName('coordinatesMvsJ')[0];
var kontextMvsJ = canvasMvsJ.getContext('2d');

//zadefinování proměnných pro funkci
var maxIter1 = 255;
var zxN, zyN;
var cmaxX1 = 1.8;
var posunXcomplex = 0.5;
// vykresleni mandelbrotovy mnoziny
function draw_mandelbrot()
{
  for(var x = 0;x < canvas1.width; x++)
  {
  var cx = x;
  var cxGauss = cmaxX1/(canvas1.width/2)*(cx - canvas1.width/2)- posunXcomplex;

   var y = 0;
   for(var y = 0; y < canvas1.height; y++)
    {
      var cy = y;

      var cyGauss = -cmaxX1/(canvas1.height/2)*(cy - canvas1.height/2);

      var zx2 = 0;
      var zy2 = 0;
      var zxGauss = 0;
      var zyGauss = 0;

      var iter = 0;
    while(zx2 + zy2 < 4 && iter < maxIter1)
      {
      zx2 = zxGauss*zxGauss;
      zy2 = zyGauss*zyGauss;
      zyGauss = 2*zxGauss*zyGauss + cyGauss;
      zxGauss = (zx2- zy2) + cxGauss;
      iter++
      }
    var input = 255 - 255*iter/100;
    var idx = (x+y*canvas1.width) * 4;
    imgData.data[idx + 0] = input; 
    imgData.data[idx + 1] = input; 
    imgData.data[idx + 2] = input; 
    imgData.data[idx + 3] = 255;
    }kontext1.putImageData(imgData, 0, 0);
  }
}draw_mandelbrot();

//funkce pro vykreslení červeného bodu po kliknutí myší
function dot(event) 
{
  var mousePos = getMousePos(event);
  kontext1.fillStyle = "red";
  kontext1.fillRect(mousePos.x,mousePos.y,2,2);
}

//vypsání souřadnic kurzoru
function coordsMvsJ(event)
{
  var mousePos = getMousePos(event);
  kontextMvsJ.clearRect(0,0,canvasMvsJ.width,canvasMvsJ.height);

  var xComplex = cmaxX1/(canvas1.width/2)*(mousePos.x - canvas1.width/2)-posunXcomplex;
  var yComplex = -cmaxX1/(canvas1.height/2)*(mousePos.y - canvas1.height/2);
  var xCoord = Math.round(xComplex*10000)/10000;
  var yCoord = Math.round(yComplex*10000)/10000;

  kontextMvsJ.font = "16px sans-serif";

  if(yCoord <= 0)
  {
   kontextMvsJ.fillText(xCoord + " - " +Math.abs(yCoord)+"i", 13, 21);
  }else{
    kontextMvsJ.fillText(xCoord + " + " +Math.abs(yCoord)+"i", 13, 21);
       }
} 

//po provedení jednotlivých akcí myší se provedou určité funkce
canvas1.addEventListener("click",dot,false);
canvas1.addEventListener("mousemove",coordsMvsJ,false);
