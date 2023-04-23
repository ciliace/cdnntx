$('#frame').contents().find('.logoBarWrapper').css({'display':'none'});

$("#frame").on("load", function() {
    let head = $("#frame").contents().find("head");
    let css = '<style>div.logoBar {display:none;}</style>';
    $(head).append(css);
  });

  window.onload = function() {
    let frame = document.querySelector("div[name='HR-APP'] > div > div > iframe");
    let doc = frame.contentDocument;
    doc.body.innerHTML = doc.body.innerHTML + '<style>div.logoBar {display:none;}</style>';
 }