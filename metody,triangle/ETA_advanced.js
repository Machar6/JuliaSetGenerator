var canvas = document.getElementsByClassName('orbitM')[0];
var kontext = canvas.getContext('2d');
var imgData = kontext.createImageData(canvas.width,canvas.height);

var maxIter = 1000;
var cMaxX = 2;
var r = 450;
var zx2,zy2;
var posunXcomplex = 0;
var posunYcomplex = 0;

var posunX = (canvas.width / 2) * ((posunXcomplex / cMaxX) + 1) - canvas.width / 2;
var posunY = (canvas.height / 2) * ((posunYcomplex / -cMaxX) + 1) - canvas.height / 2;


function draw_eta(cx,cy)
{  
  if(cx*cx+cy*cy > 4){
    r_c = cx*cx+cy*cy;
  }else r_c = 4;
  var polomer = Math.sqrt(cx*cx + cy*cy);
  console.log(polomer);
  var polomer1 = (canvas.width/2)*((polomer/cMaxX));
  var polomer2 = (canvas.width/2)*((2/cMaxX));
  console.log(polomer1);
for(var x = 0;x < canvas.width; x++)
{
  for(var y = 0; y < canvas.height; y++)
  {//az budu kreslit, za cx, cy dosadit hodnoty aby to bylo na stredu
      var zxComplex = cMaxX/(canvas.width/2)*(x - canvas.width/2);
      var zyComplex = -cMaxX/(canvas.height/2)*(y - canvas.height/2);  
      var iter = 0;
      do{
        zx2 = zxComplex*zxComplex;
        zy2 = zyComplex*zyComplex;
        zyComplex = 2*zxComplex*zyComplex + cy;
        zxComplex = (zx2 - zy2) + cx;
        iter++
        }
        while(zx2 + zy2 <= r_c && iter < maxIter);
        
        var input = 255 - 255*iter/(120);//pochopit proc?????
        var pozice = (x+y*canvas.width) * 4;
       /* imgData.data[pozice + 0] = 200 - input; // 255*customColor(scaled_it_cnt,"r");
        imgData.data[pozice + 1] = 40 - input; // 255*customColor(scaled_it_cnt,"g");
        imgData.data[pozice + 2] = input; // 255*customColor(scaled_it_cnt,"b");
        imgData.data[pozice + 3] = 255;*/
        imgData.data[pozice + 0] = input; // 255*customColor(scaled_it_cnt,"r");
        imgData.data[pozice + 1] = input; // 255*customColor(scaled_it_cnt,"g");
        imgData.data[pozice + 2] = input; // 255*customColor(scaled_it_cnt,"b");
        imgData.data[pozice + 3] = 255;
        }    
    }kontext.putImageData(imgData, 0, 0);
   /* kontext.strokeStyle = "yellow"
    kontext.arc(500, 500, polomer1, 0, Math.PI * 2);
    kontext.arc(500, 500, polomer2, 0, Math.PI * 2);
    kontext.stroke();*/
} performance.mark("startTask1");
draw_eta(0.25,0);
performance.mark("endTask1");
performance.measure('duration1', 'startTask1', 'endTask1');
console.log(performance.getEntriesByType("measure"));

function onLoad() { 
  var now = new Date().getTime();
  var pageLoadTime = now - performance.timing.navigationStart;
  console.log("Načtení trvalo: " + pageLoadTime + "ms");
}

window.addEventListener('load', onLoad, false);

//kontext.beginPath();
//kontext.fillStyle = "red"

//kontext.fill();
//kontext.closePath();
//kontext.beginPath();
//kontext.strokeStyle = "red"
//kontext.arc( (canvas.width / 2) * ((-0.77568377 / cMaxX) + 1) - posunX, (canvas.height / 2) * ((0.13646737 / -cMaxX) + 1) - posunY, r, 0, Math.PI * 2);
//kontext.arc( (canvas.width / 2) * ((-0.77568377 / cMaxX) + 1) - posunX, (canvas.height / 2) * ((0.13646737 / -cMaxX)+ 1) - posunY, 1+r, 0, Math.PI * 2);
//kontext.arc( (canvas.width / 2) * ((-0.77568377 / cMaxX) + 1) - posunX, (canvas.height / 2) * ((0.13646737 / -cMaxX) + 1) - posunY, 2+r, 0, Math.PI * 2);
//kontext.stroke();

//kontext.closePath();
/*
kontext.beginPath();
kontext.strokeStyle = "red"
kontext.stroke();
kontext.closePath();
kontext.beginPath();
kontext.strokeStyle = "red"

kontext.arc( (canvas.width / 2) * ((-0.562203/ cMaxX) + 1) - posunX, (canvas.height / 2) * ((0.642818 / -cMaxX) + 1) - posunY, r, 0, Math.PI * 2);
kontext.arc( (canvas.width / 2) * ((-0.562203/ cMaxX) + 1) - posunX, (canvas.height / 2) * ((0.642818 / -cMaxX) + 1) - posunY, 1+r, 0, Math.PI * 2);
kontext.arc( (canvas.width / 2) * ((-0.562203/ cMaxX) + 1) - posunX, (canvas.height / 2) * ((0.642818 / -cMaxX) + 1) - posunY, 2+r, 0, Math.PI * 2);
kontext.stroke();
kontext.closePath();*/
/*
kontext.beginPath();
kontext.fillStyle = "red"

kontext.fill();
kontext.closePath();
kontext.beginPath();
kontext.strokeStyle = "red"

kontext.arc( (canvas.width / 2) * ((0/ cMaxX) + 1) - posunX, (canvas.height / 2) * ((1 / -cMaxX) + 1) - posunY, r, 0, Math.PI * 2);
kontext.arc( (canvas.width / 2) * ((0/ cMaxX) + 1) - posunX, (canvas.height / 2) * ((1 / -cMaxX) + 1) - posunY, 1+r, 0, Math.PI * 2);
kontext.arc( (canvas.width / 2) * ((0/ cMaxX) + 1) - posunX, (canvas.height / 2) * ((1 / -cMaxX) + 1) - posunY, 2+r, 0, Math.PI * 2);
kontext.stroke();
kontext.closePath();*/
/*kontext.strokeStyle = "red";
kontext.beginPath();
kontext.moveTo(0,500 );
kontext.lineTo(1000, 500);
kontext.moveTo(500,0);
kontext.lineTo(500, 1000);
kontext.closePath();
kontext.stroke();
kontext.font = "30px verdana";
  kontext.fillStyle = "Red";
  kontext.fillText("Re", 950, canvas.height/2+30);
  kontext.fillText("Im", canvas.width/2 - 50, 40);*/