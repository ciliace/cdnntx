
 var iframe = document.querySelector("div[name='HR-APP'] > div > div > iframe");
 iframe.addEventListener('load', function() {
   var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
   var iframeRoot = iframe.contentDocument.documentElement;
   iframeRoot.style.setProperty('--is-in-iframe', '0');
 });

