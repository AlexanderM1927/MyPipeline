(function(e){function t(t){for(var r,a,i=t[0],c=t[1],u=t[2],l=0,f=[];l<i.length;l++)a=i[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&f.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);d&&d(t);while(f.length)f.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(s.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={3:0},o={3:0},s=[];function i(e){return c.p+"js/"+({}[e]||e)+"."+{1:"94deed96",2:"ab3ddb19",4:"b7e0faf7",5:"d672def2"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={1:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{1:"a9d02db1",2:"31d6cfe0",4:"31d6cfe0",5:"31d6cfe0"}[e]+".css",o=c.p+r,s=document.getElementsByTagName("link"),i=0;i<s.length;i++){var u=s[i],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===o))return t()}var f=document.getElementsByTagName("style");for(i=0;i<f.length;i++){u=f[i],l=u.getAttribute("data-href");if(l===r||l===o)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||o,s=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=r,delete a[e],d.parentNode.removeChild(d),n(s)},d.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var s=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=s);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=i(e);var f=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",f.name="ChunkLoadError",f.type=r,f.request=a,n[1](f)}o[e]=void 0}};var d=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var f=0;f<u.length;f++)t(u[f]);var d=l;s.push([0,0]),n()})({0:function(e,t,n){e.exports=n("2f39")},"2f39":function(e,t,n){"use strict";n.r(t);n("d3b7"),n("e6cf"),n("ac1f"),n("5319"),n("96cf");var r=n("c973"),a=n.n(r),o=(n("5c7d"),n("7d6e"),n("e54f"),n("985d"),n("31cd"),n("2b0e")),s=n("1f91"),i=n("42d2"),c=n("b05d"),u=n("2a19"),l=n("436b"),f=n("f508");o["a"].use(c["a"],{config:{},lang:s["a"],iconSet:i["a"],plugins:{Notify:u["a"],Dialog:l["a"],Loading:f["a"]}});var d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"q-app"}},[n("router-view")],1)},p=[],b={name:"App"},m=b,h=n("2877"),j=Object(h["a"])(m,d,p,!1,null,null,null),g=j.exports,v=(n("45fc"),n("b0c0"),n("8c4f")),k=n("25cc"),y=[{name:"login",path:"/",component:function(){return Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"4632"))},meta:{title:"Login"}},{path:"/login",component:function(){return Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"4632"))},meta:{title:"Login"}},{name:"register",path:"/register",component:function(){return Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"868f"))},meta:{title:"Register"}},{name:"calendar",path:"/calendar",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"713b"))},props:{view:"calendar"},meta:{title:"Calendario",requireSession:!0}},{name:"clients",path:"/clients",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"713b"))},props:{view:"clients"},meta:{title:"Clientes",requireSession:!0}},{name:"reports",path:"/reports",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"713b"))},props:{view:"reports"},meta:{title:"Informes",requireSession:!0}},{name:"client",path:"/client/:id",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"713b"))},props:{view:"client"},meta:{title:"Cliente",requireSession:!0}},{name:"proyect",path:"/proyect/:id",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"713b"))},props:{view:"proyect"},meta:{title:"Proyecto",requireSession:!0}},{name:"phase",path:"/phase/:id",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"713b"))},props:{view:"phase"},meta:{title:"Fase",requireSession:!0}},{name:"logout",path:"/logout",meta:{title:"logout",requireSession:!0}},{path:"*",component:function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"e51e"))}}],w=y,x=n("7dab");o["a"].use(v["a"]),o["a"].use(k["b"]);var S=function(){var e=new v["a"]({scrollBehavior:function(){return{x:0,y:0}},routes:w,mode:"history",base:"/"});return e.beforeEach(function(){var e=a()(regeneratorRuntime.mark((function e(t,n,r){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(document.title=t.meta.title,"logout"!==t.name){e.next=15;break}if(e.prev=2,null===localStorage.getItem("token")||void 0===localStorage.getItem("token")){e.next=6;break}return e.next=6,x["a"].dropToken({token:localStorage.getItem("token")});case 6:localStorage.removeItem("user"),localStorage.removeItem("token"),e.next=14;break;case 10:e.prev=10,e.t0=e["catch"](2),localStorage.removeItem("user"),localStorage.removeItem("token");case 14:location.href="login";case 15:a=t.matched.some((function(e){return e.meta.requireSession})),a?localStorage.getItem("token")?r():r({name:"login"}):"login"===t.name&&localStorage.getItem("token")?r({name:"calendar"}):r();case 17:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(t,n,r){return e.apply(this,arguments)}}()),e},P=function(){return z.apply(this,arguments)};function z(){return z=a()(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("function"!==typeof S){e.next=6;break}return e.next=3,S({Vue:o["a"]});case 3:e.t0=e.sent,e.next=7;break;case 6:e.t0=S;case 7:return t=e.t0,n={router:t,render:function(e){return e(g)}},n.el="#q-app",e.abrupt("return",{app:n,router:t});case 11:case"end":return e.stop()}}),e)}))),z.apply(this,arguments)}var O=n("9483");Object(O["a"])("/service-worker.js",{ready:function(){},registered:function(){},cached:function(){},updatefound:function(){},updated:function(){},offline:function(){},error:function(){}});var R=n("758b");/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream&&window.navigator.standalone&&n.e(0).then(n.t.bind(null,"a0db",7));var I="/";function E(){return T.apply(this,arguments)}function T(){return T=a()(regeneratorRuntime.mark((function e(){var t,n,r,a,s,i,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,P();case 2:t=e.sent,n=t.app,r=t.router,a=!1,s=function(e){a=!0;var t=Object(e)===e?r.resolve(e).route.fullPath:e;window.location.href=t},i=window.location.href.replace(window.location.origin,""),c=[R["a"]],u=0;case 10:if(!(!1===a&&u<c.length)){e.next=28;break}if("function"===typeof c[u]){e.next=13;break}return e.abrupt("continue",25);case 13:return e.prev=13,e.next=16,c[u]({app:n,router:r,Vue:o["a"],ssrContext:null,redirect:s,urlPath:i,publicPath:I});case 16:e.next=25;break;case 18:if(e.prev=18,e.t0=e["catch"](13),!e.t0||!e.t0.url){e.next=23;break}return window.location.href=e.t0.url,e.abrupt("return");case 23:return console.error("[Quasar] boot error:",e.t0),e.abrupt("return");case 25:u++,e.next=10;break;case 28:if(!0!==a){e.next=30;break}return e.abrupt("return");case 30:new o["a"](n);case 31:case"end":return e.stop()}}),e,null,[[13,18]])}))),T.apply(this,arguments)}E()},"31cd":function(e,t,n){},4678:function(e,t,n){var r={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function a(e){var t=o(e);return n(t)}function o(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}a.keys=function(){return Object.keys(r)},a.resolve=o,e.exports=a,a.id="4678"},"758b":function(e,t,n){"use strict";var r=n("bc3a"),a=n.n(r),o=(n("96cf"),n("c973")),s=n.n(o),i=n("59ca"),c=n.n(i),u=(n("741f"),n("ea7b"),n("7dab"));function l(){return f.apply(this,arguments)}function f(){return f=s()(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t={apiKey:"AIzaSyChrMEk9YKl0laLDD0QC2D2JNTa5diyliE",authDomain:"mypipeline-94ebd.firebaseapp.com",databaseURL:"https://mypipeline-94ebd.firebaseio.com",projectId:"mypipeline-94ebd",storageBucket:"mypipeline-94ebd.appspot.com",messagingSenderId:"798608606039",appId:"1:798608606039:web:e00e7c9791fa5b7f743412",measurementId:"G-HM0B9E4Z3C"},c.a.initializeApp(t),n=c.a.messaging(),e.next=5,navigator.serviceWorker.register("/firebase-messaging-sw.js").then((function(e){c.a.messaging().useServiceWorker(e)}));case 5:Notification.requestPermission().then(function(){var e=s()(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:"granted"===t&&(n.getToken().then(function(){var e=s()(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t&&d(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log("err",e),alert("An error occurred while retrieving token. "+JSON.stringify(e))})),n.onTokenRefresh((function(){n.getToken().then(function(){var e=s()(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:d(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){alert("Unable to retrieve refreshed token "+JSON.stringify(e))}))})),n.onMessage((function(e){alert("Message received.  "+JSON.stringify(e))})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 6:case"end":return e.stop()}}),e)}))),f.apply(this,arguments)}function d(e){return p.apply(this,arguments)}function p(){return p=s()(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(null==localStorage.getItem("user")){e.next=3;break}return e.next=3,u["a"].saveToken(t);case 3:case"end":return e.stop()}}),e)}))),p.apply(this,arguments)}l();t["a"]=function(){return a.a.create({baseURL:"https://mypipeline.soft-corp.online/v1/"})}},"7dab":function(e,t,n){"use strict";var r=n("758b");t["a"]={saveToken:function(e){return Object(r["a"])().post("user/push-token",{id:localStorage.getItem("user"),token:e})},dropToken:function(e){return Object(r["a"])().post("user/drop-token",{id:localStorage.getItem("user")},{headers:{Authorization:e.token}})}}}});