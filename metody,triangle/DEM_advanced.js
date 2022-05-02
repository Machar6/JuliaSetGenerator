var canvas = document.getElementsByClassName("orbitM")[0];
var kontext = canvas.getContext('2d');
var imgData = kontext.createImageData(canvas.width,canvas.height);

var maxIter = 100;
var cMax = 2;

function draw_dem(cxGauss1 ,cyGauss1) 
{
    if(cxGauss1*cxGauss1+cyGauss1*cyGauss1 > 4){
        r_c = cxGauss1*cxGauss1+cyGauss1*cyGauss1;
    }else r_c = 4;
var d;
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
var iter = 0;
do
{ 
var dzxN = 2*zxComplex*dzx - 2*zyComplex*dzy;
var dzyN = 2*zxComplex*dzy + 2*zyComplex*dzx;

var zxN = (zxComplex*zxComplex - zyComplex*zyComplex) + cxGauss1;
var zyN = 2*zxComplex*zyComplex + cyGauss1;

zxComplex = zxN;
zyComplex = zyN;

dzx = dzxN;
dzy = dzyN;

zx2 = zxComplex*zxComplex;
zy2 = zyComplex*zyComplex;

iter ++;
}
while(iter < maxIter && zx2 + zy2 <= r_c);

var dzx2 = dzx*dzx;
var dzy2 = dzy*dzy;

d = 2*((Math.sqrt(zx2 + zy2)*Math.log(Math.sqrt(zx2 + zy2)))/Math.sqrt(dzx2 + dzy2));

var input =  -20*Math.log(d);
var idx = (x+y*canvas.width) * 4;
imgData.data[idx + 0] = 255-input; 
imgData.data[idx + 1] = 255-input; 
imgData.data[idx + 2] = 255-input; 
imgData.data[idx + 3] = 255;
    }
} kontext.putImageData(imgData, 0, 0);}
performance.mark("startTask1");
draw_dem(0.25, 0);
performance.mark("endTask1");
performance.measure('duration1', 'startTask1', 'endTask1');
console.log(performance.getEntriesByType("measure"));

function onLoad() { 
  var now = new Date().getTime();
  var pageLoadTime = now - performance.timing.navigationStart;
  console.log("Načtení trvalo: " + pageLoadTime + "ms");
}

window.addEventListener('load', onLoad, false);

