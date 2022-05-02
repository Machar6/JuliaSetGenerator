//#####################################################//
// Mandelbrot pomoci Distance estimator//////////////////
/////////////////////////////////////////////////////////



var canvas = document.getElementsByClassName('myCanvas')[0];
var kontext = canvas.getContext('2d');
var imgData = kontext.createImageData(canvas.width,canvas.height);

//definovani promennych
var zxComplex = 0;
var zyComplex = 0;
var dzx = 2*zxComplex + 1;
var dzy = 2*zyComplex;
var cxComplex = 0;
var cyComplex = 0;
var maxIter = 100;
var cMaxX = 1.5;//musi byt stejne s juliovkou, proc je to jine nez xmax a ymax????????????
var cminX = -1.5;
var cMaxY = cMaxX;
var cminY = cminX;
var pocitadlo = 0;
var zx2 = zxComplex*zxComplex;
var zy2 = zyComplex*zyComplex;
// co delat s NaN pri c = 0 + 0i
for(var x = 0; x<canvas.width;x++){
var cx = x;
var cxComplex = cMaxX/(canvas.width/2)*(cx - canvas.width/2)- 0.5;
var y = 0;
for(var y = 0; y < canvas.height; y++){
var cy = y;
var cyComplex = -cMaxY/(canvas.height/2)*(cy - canvas.height/2);
var zx2 = 0;
var zy2 = 0;
var zxComplex = 0;
var zyComplex = 0;
pocitadlo = 0;
var dzx2 = 0;
var dzy2 = 0;
do{
pocitadlo ++;
 //zxN = zx^2 + c
if(Math.sqrt(zx2 + zy2)<=2)
var zxN = (zxComplex*zxComplex - zyComplex*zyComplex) + cxComplex;
var zyN = 2*zxComplex*zyComplex + cyComplex;
// dz_new = dz
var dzxN = 2*zxComplex*dzx - 2*zyComplex*dzy + 1;
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

}while(pocitadlo<maxIter && Math.sqrt(zx2 + zy2)<=2);
//modulus(z)*log(modulus(z))/modulus(dz)
dzx2 = dzx*dzx;
dzy2 = dzy*dzy;
var d = (Math.sqrt(zx2 + zy2)*Math.log(Math.sqrt(zx2 + zy2)))/Math.sqrt(dzx2 + dzy2);

if(d<0.0001 || isNaN(d)){//pokud chci jen border pak chci vybarvit vse vzdalenost [0,delta] kde delta je okoli 0;
  //is NaN je pro hodnoty kde Math.sqrt(zx2 + zy2) je nula
  kontext.fillStyle = "black"
 console.log(-10*Math.log(d));
 kontext.fillRect(cx,cy,1,1);
 kontext.fillRect(cx,canvas.height - cy,1,1);
}}}

/*var input = - 15*Math.log(d);
var idx = (x+y*canvas.width) * 4;
imgData.data[idx + 0] = 5*input; // 255*customColor(scaled_it_cnt,"r");
imgData.data[idx + 1] = input; // 255*customColor(scaled_it_cnt,"g");
imgData.data[idx + 2] = input; // 255*customColor(scaled_it_cnt,"b");
imgData.data[idx + 3] = 255;
}
} kontext.putImageData(imgData, 0, 0);*/
/*kontext.font = "45px verdana";
kontext.fillStyle = "purple";
kontext.fillText("KAROLÍNKA",canvas.width/2-50,canvas.height/2+20);*/



