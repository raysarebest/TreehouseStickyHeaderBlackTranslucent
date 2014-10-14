//Rus on load
var $largeCanvas;
var $smallCanvas;
window.onload = function(){
  drawCanvas("large");
  var lastScrollTop;
  $(window).scroll(function() {
    var screenTop = $(document).scrollTop();
    $('#blur canvas').css('top', -screenTop);
    $('#blur').css('background', 'rgba(0, 0, 0, 0)');
  });
  $(window).bind('mousewheel', function(event) {
    var lastHeight;
    var scroll = 0;
    if (event.originalEvent.wheelDelta >= 0) {
      if(document.getElementsByTagName('header')[0].clientHeight === 72){
        // if(scroll === 0){
        //   removeAllCanvases();
        //   drawCanvas();
        // }
        document.getElementsByTagName('header')[0].style.height = "200px";
        document.getElementById('blur').style.clip = "rect(0px, 2000px, 200px, 0px)";
        document.getElementById('blur').style.height = "200px";
        $("#images li:first-child").css('margin-top', 200);
        if(lastHeight === 200){
          exchangeCanvasToSize('small');
        }
        lastHeight = 72;
        scroll++;
      }
    }
    else{
      if(document.getElementsByTagName('header')[0].clientHeight === 200){
        // if(scroll === 0){
        //   removeAllCanvases();
        //   drawCanvas();
        // }
        document.getElementsByTagName('header')[0].style.height = "72px";
        document.getElementById('blur').style.clip = "rect(0px, 2000px, 72px, 0px)";
        document.getElementById('blur').style.height = "72px";
        $("#images li:first-child").css('margin-top', 72);
        if(lastHeight === 72){
          exchangeCanvasToSize("large");
        }
        lastHeight = 200;
        scroll++;
      }
    }
  });
};

//Functions

function drawCanvas(size){
  if(!document.getElementById("blur").getElementsByTagName('canvas')[0]){
    html2canvas(document.body, {
      onrendered: function(canvas) {
        document.getElementById('blur').appendChild(canvas);
        if(size === "large"){
          $largeCanvas = canvas;
        }
        else{
          $smallCanvas = canvas;
        }
      }
    });
  }
  else{
    removeAllCanvases();
    drawCanvas();
  }
}
function shrinkHeader(){
  if(document.getElementsByTagName('header')[0].clientHeight > 100){
    document.getElementsByTagName('header')[0].style.height = "72px";
    document.getElementById('blur').style.clip = "rect(0px, 2000px, 72px, 0px)";
    document.getElementById('blur').style.height = "72px";
    $("#images li:first-child").css('margin-top', 72);
  }
  else{
    document.getElementsByTagName('header')[0].style.height = "200px";
    document.getElementById('blur').style.clip = "rect(0px, 2000px, 200px, 0px)";
    document.getElementById('blur').style.height = "200px";
    $("#images li:first-child").css('margin-top', 200);
  }
}
function removeAllCanvases(){
  for(var i = 0; i < document.getElementById("blur").getElementsByTagName('canvas').length; i++){  document.getElementById('blur').removeChild(document.getElementById('blur').getElementsByTagName('canvas')[i]);
  }
}
function exchangeCanvasToSize(size){
  if(size === "large"){
    document.getElementById('blur').removeChild(document.getElementById('blur').getElementsByTagName('canvas')[0]);
    document.getElementById('blur').appendChild($largeCanvas);
  }
  else{
    document.getElementById('blur').removeChild(document.getElementById('blur').getElementsByTagName('canvas')[0]);
    if($smallCanvas !== undefined){
      document.getElementById('blur').appendChild($smallCanvas);
    }
    else{
      drawCanvas("small");
    }
  }
}