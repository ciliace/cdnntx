$('#frame').contents().find('.logoBarWrapper').css({'display':'none'});

$("#frame").on("load", function() {
    let head = $("#frame").contents().find("head");
    let css = '<style>div.logoBar {display:none;}</style>';
    $(head).append(css);
  });