//zadefinovani pole a propojeni s html souborem. 'triangle' je class canvas v html souboru. 
var canvas = document.getElementsByClassName('triangle')[0];
var kontext = canvas.getContext('2d');

//vykresleni jednoducheho trojuhelnika
function triangle(pos, length){
  kontext.beginPath();
  kontext.moveTo(...pos);  
  kontext.lineTo(pos[0] + length / 2, pos[1] - length * Math.sin(Math.PI / 3)); // cara zleva nahoru
  kontext.lineTo(pos[0] + length, pos[1]); // cara shora dolu
  kontext.lineTo(...pos); // cara zprava doleva
  kontext.closePath();
  kontext.stroke(); 
};
//vykresleni sierpiskeho trojuhelniku pomoci triangle funkce
function sierpinskiTriangle(pos, length, iter){
  var innerTlength = length / 2; 
  var innerPosT = [pos, [pos[0] + innerTlength, pos[1]],[pos[0] + innerTlength / 2, pos[1] - Math.sin(Math.PI / 3) * innerTlength]];
  if (iter == 0)
  {
    innerPosT.forEach((posT) => {
    triangle(posT, innerTlength);
    });
  } else
    {
    innerPosT.forEach((posT) => {
    sierpinskiTriangle(posT, innerTlength, iter-1);
    });
    }
};
sierpinskiTriangle([2, 870], 994, 1);
//sierpinskiTriangle(pozice leveho rohu, delka strany zakladniho trojuhelnika, pocet iteraci);
