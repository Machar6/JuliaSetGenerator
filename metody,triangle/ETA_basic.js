var canvas = document.getElementsByClassName('orbitM')[0];
var kontext = canvas.getContext('2d');

var maxIter = 100;
var zx2,zy2;
var cMax = 5;
function draw_eta(cx,cy) 
{ 
var polomer = Math.sqrt(cx*cx + cy*cy);
console.log(polomer);
var polomer1 = (canvas.width/2)*((polomer/cMax))
console.log(polomer1);
for(var x = 0;x < canvas.width; x++)
{   
  for(var y = 0; y < canvas.height; y++)
  {
      var zxComplex = cMax/(canvas.width/2)*(x - canvas.width/2);
      var zyComplex = -cMax/(canvas.height/2)*(y - canvas.height/2);  
      var iter = -2;
      do{
        zx2 = zxComplex*zxComplex;
        zy2 = zyComplex*zyComplex;
        zyComplex = 2*zxComplex*zyComplex + cy;
        zxComplex = (zx2 - zy2) + cx;
        iter++
        }
        while(zx2 + zy2 <= 4 && iter < maxIter);
        
    if(iter == maxIter){
        kontext.fillStyle = "black";
        kontext.fillRect(x,y,1,1);
    }else{ kontext.fillStyle = "white";
        kontext.fillRect(x,y,1,1);}
  }
  
}
kontext.beginPath();
    kontext.strokeStyle = "yellow"
    kontext.arc(500, 500, polomer1, 0, Math.PI * 2);
    kontext.arc(500, 500, 200, 0, Math.PI * 2);
    kontext.stroke();
} draw_eta(-1.2,0.24);


