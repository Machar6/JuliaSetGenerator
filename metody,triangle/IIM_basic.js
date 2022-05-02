var canvas = document.getElementsByClassName("orbitM")[0];
var kontext = canvas.getContext('2d');

function draw_iim(cCR,cCI,x,y)
{
  var cMax = 1.3;
  var zCR = []; 
  var zCI = []; 
  var z = [];
  var maxIter = 15;
  var z0 = math.complex(x,y);
  var c = math.complex(cCR,cCI); 
  kontext.clearRect(0,0,canvas.width,canvas.height); 
 
  z[0] = math.sqrt(math.add(z0,math.multiply(c,-1)));
  z[1] = math.multiply(z[0],-1);
  
  zCR[0] = (canvas.width/2)*((z0.re/cMax)+1); 
  zCI[0] = (canvas.height/2)*((z0.im/-cMax)+1);

  var j = 0;

  for(var i = 0; i < 2*Math.pow(2,maxIter); i=i+2)
    {
    z[i] = math.sqrt(math.add(z[j],math.multiply(c,-1)));
    z[i+1] = math.multiply(z[i],-1); 
    zCR[j] = (canvas.width/2)*((z[j].re/cMax) + 1);
    zCI[j] = (canvas.height/2)*((z[j].im/-cMax) + 1);
    kontext.fillRect(zCR[j],zCI[j],3,3);
    j++;
    }
}
draw_iim(0.36,0.1,1,0);

////////////////////////////////////////////////////////////
//     použité funkce z rozšířující knihovny math.js      //
////////////////////////////////////////////////////////////  
// math.complex(x,y) - zápis komplexního čísla x + yi     //
// math.sqrt(x,y) -  odmocnina z komplexního čísla x + yi //
// math.multiply(x,y) - roznásobení dvou hodnot x a y     //
// math.add(x,y) - funkce pro soucet hodnot x a y         //
////////////////////////////////////////////////////////////

