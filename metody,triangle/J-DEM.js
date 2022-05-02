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


  cxComplex = -0.5;
  cyComplex = 0.5;


//definovani promennych
function draw_dem() //click pro pouze kliknuti, mousemove pro pohyb po platne ply
{
kontext.clearRect(0,0,canvas.width,canvas.height); //aby se obrazce neprekryvaly
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
pocitadlo ++;
}
else break;
}while(pocitadlo<maxIter);
//modulus(z)*log(modulus(z))/modulus(dz)
dzx2 = dzx*dzx;
dzy2 = dzy*dzy;
var d = (Math.sqrt(zx2 + zy2)*Math.log(Math.sqrt(zx2 + zy2)))/Math.sqrt(dzx2 + dzy2);
if(Math.abs(d)<0.003){//pokud chci jen border pak chci vybarvit vse vzdalenost [0,delta] kde delta je okoli 0;
  kontext.fillStyle = "black";
  kontext.fillRect(zx,zy,1,1);
}
}}}


var butt = document.getElementById('butt');
var canvas = document.getElementsByClassName("myCanvas")[0];
var kontext = canvas.getContext('2d');
kontext.font = "35px sans-serif";
kontext.fillText("Nejprve zvol konstantu c", canvas.width/2 - 180, canvas.height/2);

var cxComplex, cyComplex;
var maxIter = 0;
var cMaxX = 2;//musi byt stejne s juliovkou, proc je to jine nez xmax a ymax????????????
var cminX = -2;
var cMaxY = cMaxX;
var cminY = cminX;
draw_dem();
//butt.addEventListener('click', getInput, false);
//butt.addEventListener("click", draw_dem, false);