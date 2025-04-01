//////////////////////////////////////////////////////////////////////////
////////Funkce pro rolovací odstavce textu v jedtlivých pasážích//////////
//////////////////////////////////////////////////////////////////////////

//Orbit
function textO()
{
    var checkO = document.getElementById("checkO");
    var showMoreTextO = document.getElementById("moreTextO");
    var buttonTextO = document.getElementById("textButtonO");
    if (checkO.style.display === "none")
    {
        showMoreTextO.style.display = "none";
        checkO.style.display = "inline";
        buttonTextO.innerHTML = "<h3 align = left>+ &emsp; Description</h3>";
    }
    else {
        showMoreTextO.style.display = "inline";
        checkO.style.display = "none";
        buttonTextO.innerHTML = "<h3 align = left>- &thinsp;&thinsp;&emsp; Description</h3>";
         }
}
function textO1()
{ 
    var checkO1 = document.getElementById("checkO1"); 
    var showMoreTextO1 = document.getElementById("moreTextO1");
    var buttonTextO1 = document.getElementById("textButtonO1");
    if (checkO1.style.display === "none")
    {
        showMoreTextO1.style.display = "none";
        checkO1.style.display = "inline";
        buttonTextO1.innerHTML = "<h3 align = left>+ &emsp; Treshold radius</h3>";
    }
    else {
        showMoreTextO1.style.display = "inline";
        checkO1.style.display = "none";
        buttonTextO1.innerHTML = "<h3 align = left>- &thinsp;&thinsp;&emsp; Treshold radius</h3>";
         }
}
function textO2()
{
    var checkO2 = document.getElementById("checkO2");
    var showMoreTextO2 = document.getElementById("moreTextO2");
    var buttonTextO2 = document.getElementById("textButtonO2");
    if (checkO2.style.display === "none")
    {
        showMoreTextO2.style.display = "none";
        checkO2.style.display = "inline";
        buttonTextO2.innerHTML = "<h3 align = left>+ &emsp; Period of bulbs</h3>";
    }
    else {
        showMoreTextO2.style.display = "inline";
        checkO2.style.display = "none";
        buttonTextO2.innerHTML = "<h3 align = left>- &thinsp;&thinsp;&emsp; Period of bulbs</h3>";
         }
}
function textO3()
{
    var checkO3 = document.getElementById("checkO3");
    var showMoreTextO3 = document.getElementById("moreTextO3");
    var buttonTextO3 = document.getElementById("textButtonO3");
    if (checkO3.style.display === "none")
    {
        showMoreTextO3.style.display = "none";
        checkO3.style.display = "inline";
        buttonTextO3.innerHTML = "<h3 align = left>+ &emsp; Behaviour of the orbit</h3>";
    }
    else {
        showMoreTextO3.style.display = "inline";
        checkO3.style.display = "none";
        buttonTextO3.innerHTML = "<h3 align = left>- &thinsp;&thinsp;&emsp; Behaviour of the orbit</h3>";
         }
}
//M vs. J
function textMvsJ()
{
    var checkMvsJ =  document.getElementById("checkMvsJ");
    var showMoreTextMvsJ = document.getElementById("moreTextMvsJ");
    var buttonTextMvsJ = document.getElementById("textButtonMvsJ");
    if (checkMvsJ.style.display === "none")
    {
        showMoreTextMvsJ.style.display = "none";
        checkMvsJ.style.display = "inline";
        buttonTextMvsJ.innerHTML = "<h3 align = left>+ &emsp; Description</h3>";
    }
    else {
        showMoreTextMvsJ.style.display = "inline";
        checkMvsJ.style.display = "none";
        buttonTextMvsJ.innerHTML = "<h3 align = left>- &thinsp;&thinsp;&emsp; Description</h3>";
         }
}
function textMvsJ1()
{
    var checkMvsJ1 = document.getElementById("checkMvsJ1");
    var showMoreTextMvsJ1 = document.getElementById("moreTextMvsJ1");
    var buttonTextMvsJ1 = document.getElementById("textButtonMvsJ1");
    if (checkMvsJ1.style.display === "none")
    {
        showMoreTextMvsJ1.style.display = "none";
        checkMvsJ1.style.display = "inline";
        buttonTextMvsJ1.innerHTML = "<h3 align = left>+ &emsp; Mandelbrot set - Map for Julia Sets</h3>";
    }
    else {
        showMoreTextMvsJ1.style.display = "inline";
        checkMvsJ1.style.display = "none";
        buttonTextMvsJ1.innerHTML = "<h3 align = left>- &thinsp;&thinsp;&emsp; Mandelbrot set - Map for Julia Sets</h3>";
         }
}  
function textMvsJ2()
{
    var checkMvsJ2 = document.getElementById("checkMvsJ2");
    var showMoreTextMvsJ2 = document.getElementById("moreTextMvsJ2");
    var buttonTextMvsJ2 = document.getElementById("textButtonMvsJ2");
    if (checkMvsJ2.style.display === "none") 
    {
        showMoreTextMvsJ2.style.display = "none";
        checkMvsJ2.style.display = "inline";
        buttonTextMvsJ2.innerHTML = "<h3 align = left>+ &emsp; Escape time algorithm</h3>";
    }
    else {
        showMoreTextMvsJ2.style.display = "inline";
        checkMvsJ2.style.display = "none";
        buttonTextMvsJ2.innerHTML = "<h3 align = left>- &thinsp;&thinsp;&emsp; Escape time algorithm</h3>";
         }
} 
function textMvsJ3()
{
    var checkMvsJ3 = document.getElementById("checkMvsJ3");
    var showMoreTextMvsJ3 = document.getElementById("moreTextMvsJ3");
    var buttonTextMvsJ3 = document.getElementById("textButtonMvsJ3");
    if (checkMvsJ3.style.display === "none")
    {
        showMoreTextMvsJ3.style.display = "none";
        checkMvsJ3.style.display = "inline";
        buttonTextMvsJ3.innerHTML = "<h3 align = left>+ &emsp; Distance estimator method</h3>";
    }
    else {
        showMoreTextMvsJ3.style.display = "inline";
        checkMvsJ3.style.display = "none";
        buttonTextMvsJ3.innerHTML = "<h3 align = left>- &thinsp;&thinsp;&emsp; Distance estimator method</h3>";
         }
}  
function textMvsJ4()
{
    var checkMvsJ4 = document.getElementById("checkMvsJ4");
    var showMoreTextMvsJ4 = document.getElementById("moreTextMvsJ4");
    var buttonTextMvsJ4 = document.getElementById("textButtonMvsJ4");
    if (checkMvsJ4.style.display === "none")
    {
        showMoreTextMvsJ4.style.display = "none";
        checkMvsJ4.style.display = "inline";
        buttonTextMvsJ4.innerHTML = "<h3 align = left>+ &emsp; Inverse iteration method</h3>";
    }
    else {
        showMoreTextMvsJ4.style.display = "inline";
        checkMvsJ4.style.display = "none";
        buttonTextMvsJ4.innerHTML = "<h3 align = left>- &thinsp;&thinsp;&emsp; Inverse iteration method</h3>";
         }
}   
//J vs. J
function textJvsJ() 
{
    var checkJvsJ = document.getElementById("checkJvsJ");
    var showMoreText = document.getElementById("moreText");
    var buttonText = document.getElementById("textButtonJvsJ");
    if (checkJvsJ.style.display === "none") 
    {
        showMoreText.style.display = "none";
        checkJvsJ.style.display = "inline";
        buttonText.innerHTML = "<h3 align = left>+ &emsp; Description</h3>";
    }
    else {
        showMoreText.style.display = "inline";
        checkJvsJ.style.display = "none";
        buttonText.innerHTML = "<h3 align = left>- &thinsp;&thinsp;&emsp; Description</h3>";
         }
 }
