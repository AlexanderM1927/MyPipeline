(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"35ca":function(e,t,n){"use strict";var r=n("758b");t["a"]={login:function(e){return Object(r["a"])().post("login",e)},register:function(e){return Object(r["a"])().post("register",e)},getUser:function(e){return Object(r["a"])().get("user",{headers:{Authorization:e.token}})},hasPermiss:function(e){return Object(r["a"])().get("permiss/"+e.type+"/"+e.id,{headers:{Authorization:e.token}})}}},4632:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-layout",{attrs:{view:"lHh Lpr lFf"}},[n("q-page-container",[n("div",{staticClass:"row"},[n("div",{staticClass:"login col-md-4 col-xs-10"},[n("center",[n("img",{attrs:{src:"logo.png"}})]),n("q-form",{on:{submit:e.login}},[n("q-input",{attrs:{color:"grey-3","bg-color":"white","label-color":"orange",filled:"",label:"Correo",required:"",rules:[function(e){return!!e||"Este campo es necesario"}]},scopedSlots:e._u([{key:"append",fn:function(){return[n("q-icon",{attrs:{name:"mail",color:"primary"}})]},proxy:!0}]),model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),n("br"),n("q-input",{attrs:{color:"grey-3","bg-color":"white","label-color":"orange",filled:"",type:e.isPwd?"password":"text",label:"Clave",required:"",rules:[function(e){return!!e||"Este campo es necesario"}]},scopedSlots:e._u([{key:"append",fn:function(){return[n("q-icon",{attrs:{color:"primary",name:e.isPwd?"visibility_off":"visibility"},on:{click:function(t){e.isPwd=!e.isPwd}}})]},proxy:!0}]),model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),n("br"),n("q-btn",{staticClass:"full-width",attrs:{color:"primary",type:"submit",label:"Login"}})],1),n("br"),n("q-btn",{staticClass:"full-width",attrs:{color:"green",type:"submit",label:"Register"},on:{click:function(t){return e.goTo("register")}}})],1)])])],1)},a=[],o=(n("96cf"),n("c973")),i=n.n(o),s=n("35ca"),c=n("9f21"),l={name:"LoginLayout",mixins:[c["a"]],data:function(){return{email:"",password:"",isPwd:!0}},methods:{login:function(){var e=this;return i()(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s["a"].login({email:e.email,password:e.password});case 3:n=t.sent,r=n.data,200===n.status?(localStorage.setItem("token",e.getToken(r)),localStorage.setItem("user",r.user.id),e.goTo("calendar")):e.alert("negative","Credenciales invalidas"),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),e.alert("negative","Credenciales invalidas");case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()}}},u=l,d=n("2877"),p=n("4d5a"),f=n("09e3"),g=n("0378"),m=n("27f9"),b=n("0016"),h=n("9c40"),w=n("eebe"),v=n.n(w),y=Object(d["a"])(u,r,a,!1,null,null,null);t["default"]=y.exports;v()(y,"components",{QLayout:p["a"],QPageContainer:f["a"],QForm:g["a"],QInput:m["a"],QIcon:b["a"],QBtn:h["a"]})},"9f21":function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));n("96cf");var r=n("c973"),a=n.n(r),o=n("cf57"),i=n("4515"),s=n("35ca"),c={data:function(){return{}},methods:{getPermiss:function(e,t){return a()(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,s["a"].hasPermiss({type:e,id:t,token:localStorage.getItem("token")});case 2:return r=n.sent,n.abrupt("return",r.data.permiss);case 4:case"end":return n.stop()}}),n)})))()},alert:function(e,t){this.$q.notify({type:e,message:t})},goTo:function(e){this.$router.push("/"+e).catch((function(e){e._name}))},logout:function(){this.$session.destroy(),location.href="/login"},getToken:function(e){return e.token_type+" "+e.token},activateLoading:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n={message:e};1===t?n.spinner=o["a"]:2===t&&(n.spinner=i["a"]),this.$q.loading.show(n)},disableLoading:function(){this.$q.loading.hide()}}}}}]);