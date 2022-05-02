/////////////////////////////////////////////////////////////////////////////////
// Skript pro vygenerování Juliovy množiny pomocí různých vizualizačních metod //
/////////////////////////////////////////////////////////////////////////////////

//Zjištění pozice kurzoru
function getMousePos(event) 
{
  return{
   x: event.offsetX,
   y: event.offsetY
  };
}
/////////////// Jednotlive metody ///////////////////////

// Distance estimator method
function draw_DEM(event)
{
  var mousePos = getMousePos(event);
  kontext.clearRect(0,0,canvas.width,canvas.height);

  var posunX = (canvas.width/2)*((posunXcomplex/cmaxX)+1) - canvas.width/2;
  var cxComplex = cmaxX/(canvas.width/2)*((mousePos.x - posunX) - canvas.width/2);
  var cyComplex= -cmaxX/(canvas.height/2)*(mousePos.y - canvas.height/2);
  var pocitadlo = 0;

  if(cxComplex*cxComplex+cyComplex*cyComplex > 4)
  {
    r_c = cxComplex*cxComplex+cyComplex*cyComplex;
  }else r_c = 4;

  for(var x = 0; x<canvas.width;x++)
  {
   var zx = x;
   for(var y = 0; y < canvas.height; y++)
    {
      var zy = y;

      var zxComplex = cmaxX/(canvas.width/2)*(zx - canvas.width/2);
      var zyComplex = -cmaxX/(canvas.height/2)*(zy - canvas.height/2);

      var dzx = 2*zxComplex;
      var dzy = 2*zyComplex; 

      var zx2 = zxComplex*zxComplex;
      var zy2 = zyComplex*zyComplex;
      
      var dzx2 = 0;
      var dzy2 = 0;

      pocitadlo = 0;
    do{
      pocitadlo ++; 
      if(zx2 + zy2 < r_c)
        {//pokud |z|> Threshold radius pak se proces zastavi a vyhodnoti se velikost d
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
        // |z|=sqrt(zx^2 + zy^2)
        zx2 = zxComplex*zxComplex;
        zy2 = zyComplex*zyComplex;
        }else break;
      }while(pocitadlo<maxIter1);

      dzx2 = dzx*dzx;
      dzy2 = dzy*dzy;
      var d = 2*(Math.sqrt(zx2 + zy2)*Math.log(Math.sqrt(zx2 + zy2)))/Math.sqrt(dzx2 + dzy2);//2*modulus(z)*log(modulus(z))/modulus(dz)
      var input = - 20*Math.log(d);
      var idx = (x+y*canvas.width) * 4;
      imgData.data[idx + 0] = 255-input; 
      imgData.data[idx + 1] = 255-input; 
      imgData.data[idx + 2] = 255-input; 
      imgData.data[idx + 3] = 255;
    }
  } kontext.putImageData(imgData, 0, 0);
}

// Inverse iteration method
function draw_IIM(event)
{
    var mousePos = getMousePos(event);
    kontext.clearRect(0,0,canvas.width,canvas.height);

    var posunX = (canvas.width/2)*((posunXcomplex/cmaxX)+1) - canvas.width/2;
    cxComplex = cmaxX/(canvas.width/2)*((mousePos.x - posunX) - canvas.width/2);
    cyComplex= -cmaxX/(canvas.height/2)*(mousePos.y - canvas.height/2);
    c = math.complex(cxComplex,cyComplex);  

    z[0] = math.sqrt(math.add(z0,math.multiply(c,-1)));// +sqrt(z-c)
    z[1] = math.multiply(z[0],-1);//-sqrt(z-c)
    //prevod na sourandice canvas
    zCR[0] = (canvas.width/2)*((z0.re/cmaxX)+1); 
    zCI[0] = (canvas.height/2)*((z0.im/-cmaxX)+1);
  
  kontext.fillStyle = 'black';

  var j = 0;
  for(var i = 0; i < 2*Math.pow(2,maxIter)-2; i=i+2)
  {
   z[i] = math.sqrt(math.add(z[j],math.multiply(c,-1))); //reseni pro +sqrt(z-c)
   z[i+1] = math.multiply(z[i],-1); //reseni pro -sqrt(z-c)
   zCR[j] = (canvas.width/2)*((z[j].re/cmaxX)+1);
   zCI[j] = (canvas.height/2)*((z[j].im/-cmaxX)+1);
   kontext.fillRect(zCR[j],zCI[j],1,1);//obarveni kazdeho vypocitaneho bodu v canvas
   j++;
  }
}

//Escape time algorithm
function draw_ETA(event)
{
  var mousePos = getMousePos(event);

  var posunX = (canvas.width/2)*((posunXcomplex/cmaxX)+1) - canvas.width/2;
  cxComplex = cmaxX/(canvas.width/2)*((mousePos.x - posunX) - canvas.width/2);
  cyComplex = -cmaxX/(canvas.height/2)*(mousePos.y - canvas.height/2);
    
  if(cxComplex*cxComplex+cyComplex*cyComplex > 4)
  {
    r_c = cxComplex*cxComplex+cyComplex*cyComplex;
  }else r_c = 4;

  for(var x = 0;x < canvas.width; x++)
  {
   var zx = x;
   for(var y = 0; y < canvas.height; y++)
   {
    var zy = y;

    zyGauss = cmaxX/(canvas.height/2)*(zy - canvas.height/2); 
    zxGauss = -cmaxX/(canvas.width/2)*(zx - canvas.width/2);

    var zx2 = zxGauss*zxGauss;
    var zy2 = zyGauss*zyGauss;

    var iter = 0;
    while(zx2 + zy2 < r_c && iter < maxIter1)
        { 
          zx2= zxGauss*zxGauss;
          zy2 = zyGauss*zyGauss;
          zyGauss = 2*zxGauss*zyGauss + cyComplex;
          zxGauss = (zx2 - zy2) + cxComplex;
          iter++;
        }
        var input = 256 - 256*iter/(100);
        var pozice = (x+y*canvas.width) * 4;
        imgData.data[pozice + 0] = input; 
        imgData.data[pozice + 1] = input; 
        imgData.data[pozice + 2] = input; 
        imgData.data[pozice + 3] = 256;
   }    
  }kontext.putImageData(imgData, 0, 0);
}

//Zadefinování tlačítek, popisků a pláten a propojení s html
var triger = document.getElementById('triger');
var canvas = document.getElementsByClassName("julia")[0];
var kontext = canvas.getContext('2d');
var canvas1 = document.getElementsByClassName('mandelbrot')[0];
var kontext1 = canvas1.getContext('2d');
var imgData = kontext.createImageData(canvas.width,canvas.height);

kontext.font = "25px verdana";
kontext.fillStyle = "lightgray";
kontext.fillText("Select a visualization method", canvas.width/2 - 195, canvas.height/2);

//Zadefinování proměnných pro funkce
var maxIter1 = 255;  
var maxIter = 17;
var cyComplex;
var cxComplex;
var c;
var z0 = math.complex(0,1);
var cmaxX = 1.8;
var zCR = []; 
var zCI = []; 
var z = [];
var posunXcomplex = 0.5;
//Menu pro výběr metody
function metoda2(){
  if(document.getElementById("methods2").value == "DEM"){
  canvas1.addEventListener('click',draw_DEM,false);
  canvas1.removeEventListener('click',draw_ETA,false);
  canvas1.removeEventListener('click',draw_IIM,false);
  }else if(document.getElementById("methods2").value == "ETA"){
  canvas1.addEventListener('click',draw_ETA,false);
  canvas1.removeEventListener('click',draw_DEM,false);
  canvas1.removeEventListener('click',draw_IIM,false);
  }else if(document.getElementById("methods2").value == "IIM"){
  canvas1.addEventListener('click',draw_IIM,false);
  canvas1.removeEventListener('click',draw_ETA,false);
  canvas1.removeEventListener('click',draw_DEM,false);
  }    
}

