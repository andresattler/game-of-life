!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(){k.width=window.innerWidth,k.height=.9*window.innerHeight,R.size=k.width/R.width}function a(){R.size=Math.sqrt(window.innerWidth*(.9*window.innerHeight)/R.nrOfCells),R.width=Math.floor(window.innerWidth/R.size),R.height=R.nrOfCells/R.width}function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R.pattern;R.pattern=e.slice(),(0,C.default)((0,O.default)(R))}function d(e,t,n){var r=R.pattern.slice(),o=k.width/R.width,i=Math.floor(t/R.size),a=Math.floor(e/o-1),d=a+i*R.width+1;r[d]=!!n||!r[d],c(r)}function u(){R.play=!1,S.classList.toggle("fa-play"),S.classList.toggle("fa-pause")}function l(){var e=void 0;e||(e=setTimeout(function(){e=null,i(),c()}))}function f(e){R.speed<1e3&&(R.speed+=50)}function s(){R.speed>50&&(R.speed-=50)}function m(){a();c(function(e){return Array.from(new Array(e),function(){return Math.random()>.75})}(R.nrOfCells))}function h(e){function t(e){return new Promise(function(t){return setTimeout(t,e)})}R.play=!R.play,S.classList.toggle("fa-play"),S.classList.toggle("fa-pause");!function e(){t(R.speed).then(function(){c((0,T.default)(x(),R.pattern)),R.play&&e()})}()}function p(){console.log(x()),c((0,T.default)(x(),R.pattern))}function v(){a(),R.play&&u(),c(Array.from(new Array(R.nrOfCells),function(){return!1}))}function g(e){var t=e.target.dataset.filename;t&&fetch("./patterns/"+t+".json").then(function(e){return e.json()}).then(function(e){for(var t=Array.from(new Array(e.data.y*R.width),function(){return!1}),n=0,r=0;r<e.data.y;r++)for(var i=0;i<e.data.x;i++)t[i+10+r*R.width]=e.pattern[n],n++;c([].concat(o(Array.from(new Array(10*R.width),function(){return!1})),o(t),o(Array.from(new Array(R.nrOfCells-t.length-10*R.width),function(){return!1})))),y()})}function y(){document.getElementById("modal-add").classList.toggle("visible")}function w(e){d(e.clientX,e.clientY)}function E(e){function t(){e.target.removeEventListener("mousemove",n)}function n(e){d(e.clientX,e.clientY,!0)}e.target.addEventListener("touchmove",function(e){return n(e.changedTouches[0])}),e.target.addEventListener("mousemove",n),e.target.addEventListener("touchend",function(e){return t(e.changedTouches[0])}),e.target.addEventListener("mouseup",t)}var A=n(1);n(2);var L=n(3),B=r(L),I=n(4),T=r(I),_=n(5),O=r(_),b=n(6),C=r(b);(0,A.install)();var R={play:!1,speed:250,pattern:Array.from(new Array(115e3),function(){return!1}),width:500,height:230,nrOfCells:115e3},k=document.getElementById("field"),S=document.getElementById("play-pause-icon"),x=function(){return(0,B.default)(R.width,R.height)};fetch("./patterns/index.json").then(function(e){return e.json()}).then(function(e){var t=e.fileInf,n=document.getElementById("name-list");t.forEach(function(e){var t=document.createElement("div");t.innerHTML=e.name,t.className="name",t.dataset.filename=e.filename,n.appendChild(t)})}),i(),a(),c(),window.addEventListener("resize",l),document.getElementById("speed-up").addEventListener("click",s),document.getElementById("speed-down").addEventListener("click",f),document.getElementById("random").addEventListener("click",m),document.getElementById("play-pause").addEventListener("click",h),document.getElementById("next").addEventListener("click",p),document.getElementById("clear").addEventListener("click",v),document.getElementById("add-modal-btn").addEventListener("click",y),document.getElementById("name-list").addEventListener("click",g),document.getElementById("modal-add").addEventListener("click",function(e){e.target===e.currentTarget&&y()}),document.getElementById("modal-add").addEventListener("touchstart",function(e){e.target===e.currentTarget&&y()}),document.getElementById("field").addEventListener("click",w),document.getElementById("field").addEventListener("touchstart",function(e){E(e.changedTouches[0])}),document.getElementById("field").addEventListener("mousedown",E)},function(e,t){function n(){return"serviceWorker"in navigator&&(window.fetch||"imageRendering"in document.documentElement.style)&&("https:"===window.location.protocol||"localhost"===window.location.hostname||0===window.location.hostname.indexOf("127."))}function r(e){if(e||(e={}),n()){navigator.serviceWorker.register("/game-of-life/sw.js")}else if(window.applicationCache){var t=function(){var e=document.createElement("iframe");e.src="/game-of-life/appcache/manifest.html",e.style.display="none",a=e,document.body.appendChild(e)};return void("complete"===document.readyState?setTimeout(t):window.addEventListener("load",t))}}function o(e,t){}function i(){if(n()&&navigator.serviceWorker.getRegistration().then(function(e){if(e)return e.update()}),a)try{a.contentWindow.applicationCache.update()}catch(e){}}var a;t.install=r,t.applyUpdate=o,t.update=i},function(e,t){},function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t,n){var r=t*n-1;return 0===e?[t-1,r,r-t+1,r-t+2,1,t+1,t,2*t-1]:e===t-1?[t-2,r-1,r,r-t+1,0,e+t,e+t-1]:e===r-t+1?[r,r-t,e-t,e-t+1,e+1,1,0,t-1]:e===r?[e-1,e-t-1,e-t,r-2*t+1,r-t+1,0,t-1,t-2]:e<t?[e-1,r-(t-1-e)-1,r-(t-1-e),r-(t-1-e)+1,e+1,e+t+1,e+t,e+t-1]:e>r-t?[e-1,e-t-1,e-t,e-t+1,e+1,t-1-(r-e)+1,t-1-(r-e),t-1-(r-e)-1]:(e+1)%t==0?[e-1,e-t-1,e-t,e-(2*t-1),e+1-t,e+1,e+t,e+t-1]:e%t==0?[e+t-1,e-1,e-t,e-t+1,e+1,e+t+1,e+t,e+2*t-1]:[e-1,e-t-1,e-t,e-t+1,e+1,e+t+1,e+t,e+t-1]},i=function(e,t){return[].concat(r(Array(e*t).keys())).map(function(n,r){return{id:r,neighbors:o(r,e,t)}})};t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e,t){for(var n=[],r=0;r<e.length;r++){n.push(function(e,n){var r=n.reduce(function(e,n){return t[n]?e+1:e},0);return!(e&&r<2)&&(!!(e&&r>=2&&r<=3)||!e&&3===r)}(t[r],e[r].neighbors))}return n};t.default=r},function(e,t,n){"use strict";function r(e){for(var t=[],n=0,r=0,o=0,i=e.size,a=0;a<e.nrOfCells;a+=1)e.pattern[a]&&t.push(r,o,r+i,o,r,o+i,r,o+i,r+i,o+i,r+i,o),r+=i,a===e.width*(n+1)-1&&(n++,o+=i,r=0);return t}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,n){"use strict";function r(e){if(i.clearColor(.21,.25,.28,1),i.clear(i.COLOR_BUFFER_BIT),e.length>0){var t=i.createShader(i.VERTEX_SHADER);i.shaderSource(t,"\n      attribute vec2 position;\n      uniform vec2 resolution;\n      void main() {\n        // convert the position from pixels to 0.0 to 1.0\n        vec2 zeroToOne = position / resolution;\n        // convert from 0->1 to 0->2\n        vec2 zeroToTwo = zeroToOne * 2.0;\n        // convert from 0->2 to -1->+1 (clipspace)\n        vec2 clipSpace = zeroToTwo - 1.0;\n           gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\n      }"),i.compileShader(t);var n=i.createShader(i.FRAGMENT_SHADER);i.shaderSource(n,"\n      precision highp float;\n      uniform vec4 color;\n      void main() {\n        gl_FragColor = color;\n      }"),i.compileShader(n);var r=i.createProgram();i.attachShader(r,t),i.attachShader(r,n),i.linkProgram(r);var o=Float32Array.from(e),a=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,a),i.bufferData(i.ARRAY_BUFFER,o,i.STATIC_DRAW),i.useProgram(r),r.color=i.getUniformLocation(r,"color"),i.uniform4fv(r.color,[1,1,1,1]),r.resolution=i.getUniformLocation(r,"resolution"),i.uniform2f(r.resolution,i.canvas.width,i.canvas.height),r.position=i.getAttribLocation(r,"position"),i.enableVertexAttribArray(r.position),i.vertexAttribPointer(r.position,2,i.FLOAT,!1,0,0),i.viewport(0,0,i.canvas.width,i.canvas.height),i.drawArrays(i.TRIANGLES,0,o.length/2)}}Object.defineProperty(t,"__esModule",{value:!0});var o=document.getElementById("field"),i=o.getContext("webgl");i.clearColor(.21,.25,.28,1),i.clear(i.COLOR_BUFFER_BIT),t.default=r}]);
//# sourceMappingURL=bundle.084a3d.js.map