window.onload = function(){
  html2canvas(document.body, {
    onrendered: function(canvas) {
      document.getElementById('blur').appendChild(canvas);
    }
  });
  $(window).scroll(function() {
    var screenTop = $(document).scrollTop();
    $('#blur canvas').css('top', -screenTop);
  });
};