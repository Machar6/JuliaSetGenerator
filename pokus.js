
var canvasper = document.getElementsByClassName("orbitM")[0];
var kontextper = canvasper.getContext("2d")

var list1 = [];
var list2 = [];

  var maxIterP = 10;
  for (var a = 0; a < canvasper.width; a++)
  {
  var xs = a;
  var rE = 2 / (canvasper.width / 2) * (xs - canvasper.width / 2);
  var b = 0;

  for (var b = 0; b < canvasper.height; b++) 
  {
  var ys = b;
  var iM  = 2 / (canvasper.height / 2) * (ys - canvasper.height / 2);
  
  list1[0] = 0;
  list2[0] = 0;

  for(var iteraceP = 0; iteraceP < maxIterP; iteraceP++)
  { 
   l1N = (list1[iteraceP]*list1[iteraceP] - list2[iteraceP]*list2[iteraceP]) + rE;
   console.log(l1N);
   l2N = 2*list1[iteraceP]*list2[iteraceP] + iM;
   
   list1[iteraceP+1] = l1N;
   list2[iteraceP+1] = l2N;
  }
  var hit = false;
  for(var x = 0;x<list1.length - 1;x++)
  {
    for(var y = x+1; y<list1.length; y++)
    {
     if(x > 5 && Math.abs(( list1[x]  - list1[y])) < 0.0001 && Math.abs((list2[x]  - list2[y])) < 0.0001)
     {
      hit = true;
      break;
     }
    }if(hit == true)
    {
    break;
    }
  }

  if(isNaN(list1[x]) == false && isNaN(list2[x]) == false && y - x != 1)
  {
    kontextper.fillStyle = "red";
    kontextper.fillRect(a,b, 1, 1);
  }else if(y - x == 1 && isNaN(list1[x]) == false && isNaN(list2[x]) == false)
  {
    kontextper.fillStyle = "black";
    kontextper.fillRect(a,b, 1, 1);
  }else if(isNaN(list1[x]) == true)
  {
    kontextper.fillStyle = "white";
    kontextper.fillRect(a,b, 1, 1);
  }
}
}
