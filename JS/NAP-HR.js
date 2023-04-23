
$('#frame').contents().find(':root').css({'--is-in-iframe':'0'});

$("#frame").on("load", function() {
    let head = $("#frame").contents().find("head");
    let css = '<style>:root {--is-in-iframe:0;}</style>';
    $(head).append(css);
  });

//   window.onload = function() {
//     let frame = document.querySelector("iframe.content-control-iframe");
//     let doc = frame.contentDocument;
//     doc.body.innerHTML = doc.body.innerHTML + '<style>:root {--is-in-iframe:0;}</style>';
//  }
