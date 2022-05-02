//#####################################################//
/////////// Juliovka Distance estimator//////////////////
/////////////////////////////////////////////////////////

function getMousePos(/*canvas,*/ event) 
{ 
  //var rect = canvas.getBoundingClientRect(); 
   return {
    x: event.offsetX,
    y: event.offsetY
  };
}

var maxIter = 256;
var cMaxX = 1.8;//musi byt stejne s mandelbrotem, proc je to jine nez xmax a ymax????????????
var cminX = -1.8;
var cMaxY = cMaxX;
var cminY = cminX;
var posunXcomplex = 0.5;
var posunYcomplex = 0;
var canvas1 = document.getElementsByClassName("mandelbrot")[0];
var kontext1 = canvas1.getContext('2d');
var canvas = document.getElementsByClassName("julia")[0];
var kontext = canvas.getContext('2d');

canvas.addEventListener('click',function(event) {
  var mousePos = getMousePos(event);
  var xComplex = cMaxX/(canvas.width/2)*(mousePos.x - canvas.width/2);
  var yComplex = cminY/(canvas.height/2)*(mousePos.y - canvas.height/2);
  var xCoord = Math.round(xComplex*10000)/10000;
  var yCoord = Math.round(yComplex*10000)/10000;
  kontext.font = "12px sans-serif";
  kontext.strokeStyle = "black";
  kontext.clearRect(0,0,120,30);

  kontext.strokeRect(0,0,120,30);
  if(yCoord <= 0){
  kontext.fillText(xCoord + " - " +Math.abs(yCoord)+"i", 12, 17);
}else{
  kontext.fillText(xCoord + " + " +Math.abs(yCoord)+"i", 12, 17);
}
},false);



//definovani promennych
canvas1.addEventListener('click', function(event) //click pro pouze kliknuti, mousemove pro pohyb po platne plynul
  {//click pro pouze kliknuti, mousemove pro pohyb po platne ply
var mousePos = getMousePos(event);
kontext1.fillStyle = "red";
kontext1.fillRect(mousePos.x,mousePos.y,2,2);
kontext.clearRect(0,0,canvas.width,canvas.height); //aby se obrazce neprekryval
var posunX = (canvas.width/2)*((posunXcomplex/cMaxX)+1) - canvas.width/2;
var posunY = (canvas.height/2)*((posunYcomplex/-cMaxY)+1) - canvas.height/2;
var cxComplex = cMaxX/(canvas.width/2)*((mousePos.x - posunX) - canvas.width/2);
var cyComplex= -cMaxY/(canvas.height/2)*(mousePos.y - canvas.height/2);
var pocitadlo = 0;
//kontext.fillStyle = "black";
//kontext.fillRect(canvas.height/2,canvas.width/2,1,1);// co delat s NaN pri c = 0 + 0i
for(var x = 0; x<canvas.width;x++)
{
var zx = x;//- posunXcomplex
for(var y = 0; y < canvas.height; y++)
{
var zy = y;
var zxComplex = cMaxX/(canvas.width/2)*(zx - canvas.width/2);
var zyComplex = -cMaxY/(canvas.height/2)*(zy - canvas.height/2);
var dzx = 2*zxComplex;
var dzy = 2*zyComplex; 
var zx2 = zxComplex*zxComplex;
var zy2 = zyComplex*zyComplex;
pocitadlo = 0;
var dzx2 = 0;
var dzy2 = 0;
do{
pocitadlo ++;
 //zxN = zx^2 + c
if(Math.sqrt(zx2 + zy2)<=2){
var zxN = (zxComplex*zxComplex - zyComplex*zyComplex) + cxComplex;
var zyN = 2*zxComplex*zyComplex + cyComplex;
// dz_new = dz
var dzxN = 2*zxComplex*dzx - 2*zyComplex*dzy;
var dzyN = 2*zxComplex*dzy + 2*zyComplex*dzx;
// z = z_new
zxComplex = zxN;
zyComplex = zyN;
// dz = dz_new
dzx = dzxN;
dzy = dzyN;
//pokud |z|>critical radius (2) pak se proces zastavi a vyhodnoti se velikost d
// |z|=sqrt(zx^2 + zy^2)
zx2 = zxComplex*zxComplex;
zy2 = zyComplex*zyComplex;
}
else break;
}while(pocitadlo<maxIter);
//modulus(z)*log(modulus(z))/modulus(dz)
dzx2 = dzx*dzx;
dzy2 = dzy*dzy;
var d = (Math.sqrt(zx2 + zy2)*Math.log(Math.sqrt(zx2 + zy2)))/Math.sqrt(dzx2 + dzy2);
if(Math.abs(d)<0.002 || isNaN(d)){//pokud chci jen border pak chci vybarvit vse vzdalenost [0,delta] kde delta je okoli 0;
  kontext.fillStyle = "black";
  kontext.fillRect(zx,zy,1,1);
}
}}},false);