var iframe = document.querySelector(".content-control-iframe");
iframe.addEventListener('load', function() {
  var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
  var itemToChange = iframeDocument.querySelector('#form1');
  itemToChange.style.setProperty('background', 'none');
});
