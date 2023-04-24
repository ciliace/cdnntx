
 var iframe = document.querySelector("div[name='HR-APP'] > div > div > iframe");
 iframe.addEventListener('load', function() {
   var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
   var iframeRoot = iframe.contentDocument.documentElement;
   iframeRoot.setAttribute('is-in-iframe', 1);
 });

 var iframe = document.querySelector("div[name='HR-APP'] > div > div > iframe");
 iframe.addEventListener('load', function() {
   var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
   var iframeRoot = iframe.contentDocument.documentElement;
   iframeRoot.setAttribute('is-in-iframe', 1);
 });

 const divElement = document.querySelector("div[name='navigation']");

 divElement.addEventListener('click', function() {
   // Get the data-options attribute and parse it as a JSON object
   const options = JSON.parse(divElement.getAttribute('data-options'));
   
   // Get the value property of the options object
   const optionValue = options.value;
   
   // Your code to handle the option value here
   console.log('The option value is:', optionValue);
 });

