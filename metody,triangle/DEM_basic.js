var canvas = document.getElementsByClassName("myCanvas")[0];
var kontext = canvas.getContext('2d');

var maxIter = 300;
var cMax = 1.8;

function draw_dem(cx,cy) 
{
var iter = 0;

for(var x = 0; x<canvas.width;x++)
{
for(var y = 0; y < canvas.height; y++)
{
var zxComplex = cMax/(canvas.width/2)*(x - canvas.width/2);
var zyComplex = -cMax/(canvas.height/2)*(y - canvas.height/2);
var dzx = 2*zxComplex;
var dzy = 2*zyComplex; 
var zx2 = zxComplex*zxComplex;
var zy2 = zyComplex*zyComplex;
iter = 0;
var dzx2 = 0;
var dzy2 = 0;
do{

 zx2 = zxComplex*zxComplex;
 zy2 = zyComplex*zyComplex;

var dzxN = 2*zxComplex*dzx - 2*zyComplex*dzy;
var dzyN = 2*zxComplex*dzy + 2*zyComplex*dzx;

zyComplex = 2*zxComplex*zyComplex + cy;
zxComplex = (zx2 - zy2) + cx;

dzx = dzxN;
dzy = dzyN;
iter ++;
}while(iter < maxIter && zx2 + zy2 <= 4);

dzx2 = dzx*dzx;
dzy2 = dzy*dzy;
var d = (Math.sqrt(zx2 + zy2)*Math.log(Math.sqrt(zx2 + zy2)))/Math.sqrt(dzx2 + dzy2);
//var input = -10*Math.log(d);
if(Math.abs(d) < 0.00025){
    kontext.fillStyle = "black";
    kontext.fillRect(x,y,2,2);
}
}
}}
draw_dem(-0.1226,0.7545);