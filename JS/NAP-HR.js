
// $('iframe.content-control-iframe').contents().find(':root').css({'--is-in-iframe':'0'});

// $("iframe.content-control-iframee").on("load", function() {
//     let head = $("#frame").contents().find("head");
//     let css = '<style>:root {--is-in-iframe:0;}</style>';
//     $(head).append(css);
//   });

//   window.onload = function() {
//     let frame = document.querySelector("iframe.content-control-iframe");
//     let doc = frame.contentDocument;
//     doc.body.innerHTML = doc.body.innerHTML + '<style>:root {--is-in-iframe:0;}</style>';
//  }

//   window.onload = function() {
//     let frame = document.querySelector("div[name='HR-APP'] > div > div > iframe");
//     let doc = frame.contentDocument;
//     //doc.body.innerHTML = doc.body.innerHTML + '<style>:root {--is-in-iframe:0;}</style>';
//  }

 var iframe = document.querySelector("div[name='HR-APP'] > div > div > iframe");
 iframe.addEventListener('load', function() {
   var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
   var itemToChange = iframeDocument.querySelector('body');
   itemToChange.style.setProperty('--is-in-iframe', '0');
 });


// var iframe = document.querySelector("div[name='HR-APP'] > div > div > iframe");
//   iframe.addEventListener('load', function() {
//   var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
//   iframeDocument.body.innerHTML = iframeDocument.body.innerHTML + '<style>:root {--is-in-iframe:0;}</style>';
// });