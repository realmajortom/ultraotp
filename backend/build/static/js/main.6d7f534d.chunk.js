(this["webpackJsonpultraotp-client"]=this["webpackJsonpultraotp-client"]||[]).push([[0],{37:function(e,t,a){e.exports=a(74)},42:function(e,t,a){},43:function(e,t,a){},73:function(e,t,a){},74:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(30),o=a.n(c),s=(a(42),a(6)),l=a(12),i=(a(43),a(2)),u=a.n(i),m=a(10),p=a(1),d=a(8),f=a.n(d),v={zIndex:10,position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)"},h={zIndex:11,position:"fixed",top:0,left:0,width:"100vw",height:"100vh",display:"flex",flexFlow:"column",alignItems:"center",justifyContent:"center"},g={zIndex:12,width:"calc(96% - 40px)",maxWidth:"460px",padding:"10px 20px",borderRadius:"10px",boxShadow:"0 25px 50px -12px rgba(0, 0, 0, 0.25)"},b={width:"100%",display:"flex",justifyContent:"flex-end"},E=function(e){var t=e.message;return r.a.createElement("div",{className:"Alert",style:t.length>0?{display:"block"}:{display:"none"}},r.a.createElement("div",{style:v}),r.a.createElement("div",{style:h},r.a.createElement("div",{style:g,className:"alertBox"},r.a.createElement("h2",null,"Message"),r.a.createElement("p",null,t),r.a.createElement("div",{style:b},r.a.createElement("button",{onClick:function(){return e.close()},className:"primaryBtn alertBtn"},"Ok")))))};function y(e){var t=new TextEncoder;return window.crypto.subtle.importKey("raw",t.encode(e),{name:"PBKDF2"},!1,["deriveBits","deriveKey"])}function w(e,t){return window.crypto.subtle.deriveKey({name:"PBKDF2",salt:t,iterations:1e5,hash:"SHA-256"},e,{name:"AES-GCM",length:256},!0,["encrypt","decrypt"])}var x=function(e,t){var a,n,r;return u.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,u.a.awrap(y(e));case 2:return a=c.sent,c.next=5,u.a.awrap(w(a,t));case 5:return n=c.sent,c.next=8,u.a.awrap(window.crypto.subtle.exportKey("jwk",n));case 8:return r=c.sent,c.abrupt("return",r);case 10:case"end":return c.stop()}}))};var O=function(e){var t=localStorage.getItem("Jwt"),a=localStorage.getItem("cryptoKey"),c=Object(n.useState)(""),o=Object(p.a)(c,2),s=o[0],i=o[1],d=Object(n.useState)(""),v=Object(p.a)(d,2),h=v[0],g=v[1],b=Object(n.useState)(!1),y=Object(p.a)(b,2),w=y[0],O=y[1],S=Object(n.useState)(""),j=Object(p.a)(S,2),N=j[0],k=j[1];return w||t&&a?r.a.createElement(l.a,{push:!0,to:"/list"}):r.a.createElement("div",null,r.a.createElement(E,{message:N,close:function(){return k("")}}),r.a.createElement("h1",null,"Login"),r.a.createElement("form",{className:"entryForm"},r.a.createElement("div",{className:"formGroup"},r.a.createElement("label",{htmlFor:"username"},"Username"),r.a.createElement("input",{type:"text",id:"username",name:"username",value:s,autoComplete:"username",spellCheck:!1,required:!0,className:"primaryInput",onChange:function(e){return i(e.target.value)}})),r.a.createElement("div",{className:"formGroup"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{type:"password",id:"password",name:"password",value:h,autoComplete:"new-password",spellCheck:!1,required:!0,className:"primaryInput",onChange:function(e){return g(e.target.value)}})),r.a.createElement("input",{type:"submit",className:"primaryBtn userBtn",onClick:function(e){return function(e){e.preventDefault(),f.a.post("https://ultraotp.com/api/user/login",{username:s,password:h}).then((function(e){var t;return u.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:if(!e.data.success){a.next=9;break}return a.next=3,u.a.awrap(x(h,Uint8Array.from(Object(m.a)(e.data.malt).map((function(e){return e.charCodeAt()})))));case 3:t=a.sent,localStorage.setItem("cryptoKey",JSON.stringify(t)),localStorage.setItem("JWT",e.data.JWT),O(!0),a.next=10;break;case 9:k(e.data.message);case 10:case"end":return a.stop()}}))}))}(e)},value:"Sign In"})))};var S=function(e){var t=localStorage.getItem("JWT"),a=localStorage.getItem("cryptoKey"),c=Object(n.useState)(!1),o=Object(p.a)(c,2),s=o[0],i=o[1],d=Object(n.useState)(""),v=Object(p.a)(d,2),h=v[0],g=v[1],b=Object(n.useState)(""),y=Object(p.a)(b,2),w=y[0],O=y[1],S=Object(n.useState)(""),j=Object(p.a)(S,2),N=j[0],k=j[1],C=Object(n.useState)(!1),I=Object(p.a)(C,2),T=I[0],A=I[1],W=Object(n.useState)(""),B=Object(p.a)(W,2),J=B[0],F=B[1];return T||t&&a?r.a.createElement(l.a,{push:!0,to:"/list"}):r.a.createElement("div",null,r.a.createElement(E,{message:J,close:function(){return F("")}}),r.a.createElement("h1",null,"Register"),r.a.createElement("form",{className:"entryForm"},r.a.createElement("div",{className:"formGroup"},r.a.createElement("label",{htmlFor:"username"},"Create a Username ",r.a.createElement("span",null,"(4 - 120 chars.)")),r.a.createElement("input",{type:"text",id:"username",name:"username",value:h,autoComplete:"username",spellCheck:!1,required:!0,className:"primaryInput",onChange:function(e){return g(e.target.value)}})),r.a.createElement("div",{className:"formGroup"},r.a.createElement("label",{htmlFor:"password"},"Master Password ",r.a.createElement("span",null,"(12 - 120 chars.)")),r.a.createElement("input",{type:s?"text":"password",id:"password",name:"password",value:w,autoComplete:"new-password",spellCheck:!1,required:!0,className:"primaryInput",onChange:function(e){return O(e.target.value)}}),r.a.createElement("small",null,"The master password is used to encrypt and access your tokens. It is critical that you do not forget your master password; there is no way to recover the password in the event that you forget it.")),r.a.createElement("div",{className:"formGroup"},r.a.createElement("label",{htmlFor:"passwordConf"},"Re-type Master Password ",r.a.createElement("span",null,"(12 - 120 chars.)")),r.a.createElement("input",{type:s?"text":"password",id:"passwordConf",name:"passwordConf",value:N,autoComplete:"new-password",spellCheck:!1,required:!0,className:"primaryInput",onChange:function(e){return k(e.target.value)}}),r.a.createElement("div",{className:"checkContainer"},r.a.createElement("input",{type:"checkbox",id:"passCheck",name:"passCheck",onChange:function(){return i(!s)}}),r.a.createElement("label",{htmlFor:"passCheck"},"Show Password"))),r.a.createElement("input",{type:"submit",className:"primaryBtn userBtn",onClick:function(e){return function(e){var t;return u.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:if(e.preventDefault(),w!==h){a.next=5;break}F("Username and password must not match. Please update and try again."),a.next=17;break;case 5:if(w===N){a.next=9;break}F("Master password confirmation must match. Please update and try again."),a.next=17;break;case 9:if(!(w.length<12)){a.next=13;break}F("Master password must contain at least 12 characters."),a.next=17;break;case 13:return a.next=15,u.a.awrap(window.crypto.getRandomValues(new Uint8Array(16)));case 15:t=a.sent,f.a.post("https://ultraotp.com/api/user/register",{username:h,password:w,malt:String.fromCharCode.apply(String,Object(m.a)(new Uint8Array(t)))}).then((function(e){var a,n;return u.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:if(!e.data.success){r.next=9;break}return r.next=3,u.a.awrap(x(w,t));case 3:a=r.sent,localStorage.setItem("cryptoKey",JSON.stringify(a)),localStorage.setItem("JWT",e.data.JWT),A(!0),r.next=10;break;case 9:e.data.info?(n=e.data.info.u.message+"\n"+e.data.info.p.message,F(n)):F(e.data.message);case 10:case"end":return r.stop()}}))}));case 17:case"end":return a.stop()}}))}(e)},value:"Register"})))},j=a(33),N=a.n(j),k=a(15),C=a.n(k);var I=function(e){var t;return u.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return t=window.crypto.subtle.importKey("jwk",e,{name:"AES-GCM",length:256},!0,["encrypt","decrypt"]),a.abrupt("return",t);case 2:case"end":return a.stop()}}))},T=new TextEncoder;var A=function(e,t){var a,n,r,c,o,s;return u.a.async((function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,u.a.awrap(I(e));case 2:return a=l.sent,n=window.crypto.getRandomValues(new Uint8Array(12)),r=T.encode(t),l.next=7,u.a.awrap(window.crypto.subtle.encrypt({name:"AES-GCM",iv:n},a,r));case 7:return c=l.sent,o=String.fromCharCode.apply(String,Object(m.a)(new Uint8Array(c))),s=String.fromCharCode.apply(String,Object(m.a)(new Uint8Array(n))),l.abrupt("return",{text:o,iv:s});case 11:case"end":return l.stop()}}))};function W(e){var t=Object(n.useState)(!1),a=Object(p.a)(t,2),c=a[0],o=a[1],s=Object(n.useState)(!1),l=Object(p.a)(s,2),i=l[0],u=l[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{className:"entryForm"},r.a.createElement("div",{className:"formGroup"},r.a.createElement("label",{htmlFor:"issuer"},"Issuer"),r.a.createElement("input",{type:"text",id:"issuer",name:"issuer",value:e.issuer,autoComplete:"off",required:!0,className:"primaryInput",onChange:function(t){return e.setIssuer(t.target.value)}})),r.a.createElement("div",{className:"formGroup"},r.a.createElement("label",{htmlFor:"name"},"Label"),r.a.createElement("input",{type:"text",id:"name",name:"name",value:e.name,autoComplete:"off",className:"primaryInput",onChange:function(t){return e.setName(t.target.value)}})),r.a.createElement("div",{className:"formGroup"},r.a.createElement("label",{htmlFor:"name"},"Secret"),r.a.createElement("input",{type:c?"text":"password",id:"secret",name:"secret",value:e.secret,autoComplete:"new-password",required:!0,className:"primaryInput",onChange:function(t){return e.setSecret(t.target.value)}}),r.a.createElement("div",{className:"checkContainer"},r.a.createElement("input",{type:"checkbox",id:"secCheck",name:"secCheck",onChange:function(){return o(!c)}}),r.a.createElement("label",{htmlFor:"secCheck"},"Show Secret"))),r.a.createElement("div",{style:i?{display:"flex"}:{display:"none"},className:"advContainer"},r.a.createElement("div",{className:"formGroup"},r.a.createElement("label",{htmlFor:"type"},"Type"),r.a.createElement("select",{id:"type",name:"type",className:"primarySelect",onChange:function(t){return e.setType(t.target.value)},value:e.type},r.a.createElement("option",{value:"totp"},"TOTP"),r.a.createElement("option",{value:"hotp"},"HOTP"))),r.a.createElement("div",{className:"formGroup"},r.a.createElement("label",{htmlFor:"period"},"hotp"===e.type?"Counter":"Period (in seconds)"," "),r.a.createElement("input",{type:"text",id:"period",name:"period",value:e.period,autoComplete:"off",className:"primaryInput",onChange:function(t){return e.setPeriod(t.target.value)}})),r.a.createElement("div",{className:"formGroup"},r.a.createElement("label",{htmlFor:"digits"},"Digits"),r.a.createElement("select",{id:"digits",name:"digits",className:"primarySelect",onChange:function(t){return e.setDigits(t.target.value)},value:e.digits},r.a.createElement("option",{value:"6"},"6"),r.a.createElement("option",{value:"8"},"8"))),r.a.createElement("div",{className:"formGroup"},r.a.createElement("label",{htmlFor:"algo"},"Algorithm"),r.a.createElement("select",{id:"algo",name:"algo",className:"primarySelect",onChange:function(t){return e.setAlgo(t.target.value)},value:e.algo},r.a.createElement("option",{value:"SHA1"},"SHA1"),r.a.createElement("option",{value:"SHA256"},"SHA256"),r.a.createElement("option",{value:"SHA512"},"SHA512")))),r.a.createElement("div",{className:"formGroup"},r.a.createElement("button",{onClick:function(e){return function(e){e.preventDefault(),u(!i)}(e)},className:"advBtn"},i?"Hide":"More Options")),r.a.createElement("input",{type:"submit",className:"primaryBtn userBtn",onClick:function(t){return e.submit(t)},value:"Submit"})))}var B=function(){var e=Object(n.useState)("totp"),t=Object(p.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(""),s=Object(p.a)(o,2),i=s[0],m=s[1],d=Object(n.useState)(""),v=Object(p.a)(d,2),h=v[0],g=v[1],b=Object(n.useState)("SHA1"),y=Object(p.a)(b,2),w=y[0],x=y[1],O=Object(n.useState)(6),S=Object(p.a)(O,2),j=S[0],k=S[1],I=Object(n.useState)(30),T=Object(p.a)(I,2),B=T[0],J=T[1],F=Object(n.useState)(""),P=Object(p.a)(F,2),M=P[0],H=P[1],z=Object(n.useState)("Scanning..."),K=Object(p.a)(z,2),L=K[0],U=K[1],G=Object(n.useState)(null),R=Object(p.a)(G,2),D=R[0],q=R[1],V=Object(n.useState)(null),_=Object(p.a)(V,2),Q=_[0],$=_[1],X=Object(n.useState)(""),Y=Object(p.a)(X,2),Z=Y[0],ee=Y[1];return Object(n.useEffect)((function(){var e=localStorage.getItem("JWT"),t=localStorage.getItem("cryptoKey");e&&t?navigator.mediaDevices.getUserMedia({video:!0}).then((function(){return $(!0)})).catch((function(){$(!1)})):(localStorage.removeItem("JWT"),localStorage.removeItem("cryptoKey"),q("/"))}),[]),D?r.a.createElement(l.a,{push:!0,to:"".concat(D)}):r.a.createElement("div",null,r.a.createElement(E,{close:function(){return ee("")},message:Z}),r.a.createElement("div",{className:"homeHeader"},r.a.createElement("h1",null,"Add New Token"),r.a.createElement("button",{className:"primaryBtn redirectBtn alertBtn cancelBtn",onClick:function(){return q("list")}},"Cancel")),Q&&r.a.createElement("div",{className:"camWrapper",style:{display:"flex",flexFlow:"column nowrap",alignItems:"center",marginTop:"40px"}},r.a.createElement(N.a,{delay:500,facingMode:"environment",showViewFinder:!0,onError:function(){U("Camera access must be enabled to scan QR codes.")},onScan:function(e){return function(e){if(null!==e&&e.length>14){var t=e.slice(10,14);if("totp"===t||"hotp"===t){var a=e.match(/(?<=secret=).+?(?=&)|(?<=secret=)(.+)/i);if(null===a)ee("Could not parse the OTP secret. Please try manually entering the information.");else{var n=C.a.URI.parse(e);m(n.label||""),g(n.issuer||""),H(a[0]),c(t||"totp"),x(n.algorithm||"SHA1"),k(n.digits||6),J(n.period||n.counter||30),$(!1)}}else ee("OTP data not provided. Please try manually entering the information.")}}(e)},style:{width:"90%",maxWidth:"400px"}}),r.a.createElement("p",null,L)),r.a.createElement("div",{className:"otpFormWrapper",style:!1===Q?{display:"block"}:{display:"none"}},r.a.createElement(W,{algo:w,digits:j,issuer:h,name:i,period:B,secret:M,type:a,submit:function(e){var t,n,r,c;return u.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:if(e.preventDefault(),M){o.next=5;break}ee("No secret provided. Operation not performed."),o.next=24;break;case 5:if(h){o.next=9;break}ee("No issuer provided. Operate not performed."),o.next=24;break;case 9:if(i){o.next=13;break}ee("No label provided. Operation not performed."),o.next=24;break;case 13:return t=JSON.parse(localStorage.getItem("cryptoKey")),o.next=16,u.a.awrap(A(t,M));case 16:return n=o.sent,o.next=19,u.a.awrap(A(t,h));case 19:return r=o.sent,o.next=22,u.a.awrap(A(t,i));case 22:c=o.sent,f.a.post("https://ultraotp.com/api/doc/new",{issuer:{text:r.text,iv:r.iv},name:{text:c.text,iv:c.iv},secret:{text:n.text,iv:n.iv},type:a,algo:w,digits:j,period:B},{headers:{Authorization:"JWT ".concat(localStorage.getItem("JWT"))}}).then((function(e){e.data.success?q("/list"):ee(e.data.message)}));case 24:case"end":return o.stop()}}))},setIssuer:g,setName:m,setSecret:H,setType:c,setPeriod:J,setDigits:k,setAlgo:x})),r.a.createElement("div",{className:"EntryBtn btnExt"},r.a.createElement("button",{className:"CircleLink linkExt",onClick:function(){return $(!Q)}},!1===Q?r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"#ffffff"},r.a.createElement("circle",{cx:"12",cy:"12",r:"3.2"}),r.a.createElement("path",{d:"M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"}),r.a.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})):r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"#ffffff"},r.a.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),r.a.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),r.a.createElement("span",{className:"CircleSpan spanExt spanSmall"},!1===Q?" SCAN":" FORM"))))},J=a(35);var F=function(e){var t=Object(n.useState)(!0),a=Object(p.a)(t,2),c=a[0],o=a[1];return Object(J.useScrollPosition)((function(e){var t=e.prevPos,a=e.currPos,n=a.y>t.y&&a.y>-40;n!==c&&o(n)}),[c],null,!1,300),r.a.createElement("div",{className:"EntryBtn "+(c?"btnExt":"")},r.a.createElement(s.b,{className:"CircleLink "+(c?"linkExt":""),to:"/new"},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},r.a.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",fill:"#ffffff"}),r.a.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),r.a.createElement("span",{className:"CircleSpan "+(c?"spanExt":"")}," CREATE")," "))};function P(e){return r.a.createElement("div",{className:"ToastOuter",style:e.vis?{opacity:"1",visibility:"visible",zIndex:1e3}:{opacity:"0",visibility:"hidden",zIndex:"-1"}},r.a.createElement("div",{className:"Toast"},r.a.createElement("span",null,e.message)))}var M=a(19);function H(){return r.a.createElement("div",{className:"EditIconWrapper"},r.a.createElement("div",{className:"EditIconInner"},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},r.a.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),r.a.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}))))}var z=a(36);function K(e){return r.a.createElement("div",{className:"lineContainer"},r.a.createElement(z.a,{percent:e.timeRemaining/e.period*100,strokeWidth:1,strokeColor:"rgba(50, 232, 117, 0.4)",trailWidth:1,trailColor:"#eeeeee"}))}var L=new TextDecoder;var U=function(e,t,a){var n,r,c,o;return u.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,u.a.awrap(I(e));case 2:return n=s.sent,r=Uint8Array.from(Object(m.a)(t).map((function(e){return e.charCodeAt()}))),c=Uint8Array.from(Object(m.a)(a).map((function(e){return e.charCodeAt()}))),s.next=7,u.a.awrap(window.crypto.subtle.decrypt({name:"AES-GCM",iv:c},n,r));case 7:return o=s.sent,s.abrupt("return",L.decode(o));case 9:case"end":return s.stop()}}))};function G(e,t){return("totp"===e.type?new C.a.TOTP({algorithm:e.algo,digits:e.digits,period:e.period,secret:t}):new C.a.HOTP({algorithm:e.algo,digits:e.digits,counter:e.period,secret:t})).generate()}a(73);var R=function(e){var t=e.token,a=Object(n.useState)(null),c=Object(p.a)(a,2),o=c[0],s=c[1],i=Object(n.useState)(null),m=Object(p.a)(i,2),d=m[0],f=m[1],v=Object(n.useState)(null),h=Object(p.a)(v,2),g=h[0],b=h[1],E=Object(n.useState)(null),y=Object(p.a)(E,2),w=y[0],x=y[1],O=Object(n.useState)(null),S=Object(p.a)(O,2),j=S[0],N=S[1],k=Object(n.useState)(""),C=Object(p.a)(k,2),I=C[0],T=C[1];return Object(n.useEffect)((function(){var e=JSON.parse(localStorage.getItem("cryptoKey"));!function(){var a,n,r;u.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,u.a.awrap(U(e,t.secret.text,t.secret.iv));case 2:return a=c.sent,c.next=5,u.a.awrap(U(e,t.issuer.text,t.issuer.iv));case 5:return n=c.sent,c.next=8,u.a.awrap(U(e,t.name.text,t.name.iv));case 8:r=c.sent,b(a),x(n),N(r);case 12:case"end":return c.stop()}}))}()}),[t]),Object(n.useEffect)((function(){if(g&&f(G(t,g)),"totp"===t.type&&g){var e=(n=Date.now(),(r=t.period)-Math.floor(n/1e3)%r);T(e);var a=setInterval((function(){1===e?(e=t.period,f(G(t,g))):e-=1,T(e)}),1e3)}var n,r;return"totp"!==t.type&&g&&T(null),function(){clearInterval(a)}}),[g,t]),o?r.a.createElement(l.a,{push:!0,to:"/edit/".concat(o)}):g&&w&&j?r.a.createElement(M.SwipeableList,{swipeStartThreshold:10,threshold:.3},r.a.createElement(M.SwipeableListItem,{swipeLeft:{content:r.a.createElement(H,null),action:function(){return window.navigator.vibrate([10,80,10]),void setTimeout((function(){s(t._id)}),120)}}},r.a.createElement("div",{className:"Token",onClick:function(){return function(t){navigator.clipboard.writeText(t).then((function(){return e.complete()}))}(d)}},r.a.createElement("div",{className:"tokenInfo"},r.a.createElement("p",{className:"tIssuer"},w),r.a.createElement("p",{className:"tLabel"},j)),r.a.createElement("div",{className:"tokenCode"},r.a.createElement("h2",null,d),I&&r.a.createElement(K,{timeRemaining:I,period:t.period}))))):r.a.createElement("div",null)};var D=function(){var e=Object(n.useState)([]),t=Object(p.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(null),s=Object(p.a)(o,2),i=s[0],u=s[1],m=Object(n.useState)(""),d=Object(p.a)(m,2),v=d[0],h=d[1],g=Object(n.useState)(!1),b=Object(p.a)(g,2),y=b[0],w=b[1];return Object(n.useEffect)((function(){var e=localStorage.getItem("JWT"),t=localStorage.getItem("cryptoKey");e&&t?f.a.get("https://ultraotp.com/api/doc/tokens",{headers:{Authorization:"JWT ".concat(localStorage.getItem("JWT"))}}).then((function(e){e.data.success?c(e.data.tokens):h(e.data.message)})):(localStorage.removeItem("JWT"),localStorage.removeItem("cryptoKey"),u("/"))}),[]),Object(n.useEffect)((function(){if(y)var e=setTimeout((function(){w(!1)}),2e3);return function(){clearTimeout(e)}}),[y]),i?r.a.createElement(l.a,{to:i}):r.a.createElement("div",null,r.a.createElement(E,{close:function(){return h("")},message:v}),r.a.createElement(P,{message:"Copied!",vis:y}),r.a.createElement("div",{className:"homeHeader"},r.a.createElement("h1",null,"Ultra OTP"),r.a.createElement("button",{className:"primaryBtn logoutBtn redirectBtn",onClick:function(){return localStorage.removeItem("JWT"),localStorage.removeItem("cryptoKey"),void u("/")}},"Log Out")),r.a.createElement("ul",{className:"tokenList"},a.map((function(e){return r.a.createElement("li",{key:e._id},r.a.createElement(R,{token:e,complete:function(){return w(!0)}}))}))),r.a.createElement(F,null))};var q=function(){var e=localStorage.getItem("JWT"),t=localStorage.getItem("cryptoKey");return e&&t?r.a.createElement(l.a,{to:"/list"}):r.a.createElement("div",null,r.a.createElement("div",{className:"homeHeader"},r.a.createElement("div",{className:"homeTitles"},r.a.createElement("h1",null,"Ultra OTP")),r.a.createElement("nav",{className:"homeLinksWrapper"},r.a.createElement(s.b,{to:"/register",className:"primaryBtn alertBtn cancelBtn btnFlex"},"Register"),r.a.createElement(s.b,{to:"/login",className:"primaryBtn alertBtn"},"Sign In"))))};function V(){var e=Object(l.g)().id,t=Object(n.useState)(null),a=Object(p.a)(t,2),c=a[0],o=a[1],s=Object(n.useState)(""),i=Object(p.a)(s,2),m=i[0],d=i[1],v=Object(n.useState)(!1),h=Object(p.a)(v,2),g=h[0],b=h[1],y=Object(n.useState)(""),w=Object(p.a)(y,2),x=w[0],O=w[1],S=Object(n.useState)(""),j=Object(p.a)(S,2),N=j[0],k=j[1],C=Object(n.useState)(""),I=Object(p.a)(C,2),T=I[0],B=I[1],J=Object(n.useState)(""),F=Object(p.a)(J,2),P=F[0],M=F[1],H=Object(n.useState)(""),z=Object(p.a)(H,2),K=z[0],L=z[1],G=Object(n.useState)(""),R=Object(p.a)(G,2),D=R[0],q=R[1],V=Object(n.useState)(""),_=Object(p.a)(V,2),Q=_[0],$=_[1];Object(n.useEffect)((function(){localStorage.getItem("JWT")&&localStorage.getItem("JWT")?f.a.get("https://ultraotp.com/api/doc/token/".concat(e),{headers:{Authorization:"JWT ".concat(localStorage.getItem("JWT"))}}).then((function(e){if(e.data.success){var t=e.data.token;!function(e,t,a,n){var r,c,o;u.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,u.a.awrap(U(e,t.text,t.iv));case 2:return r=s.sent,s.next=5,u.a.awrap(U(e,a.text,a.iv));case 5:return c=s.sent,s.next=8,u.a.awrap(U(e,n.text,n.iv));case 8:o=s.sent,M(r),k(c),q(o);case 12:case"end":return s.stop()}}))}(JSON.parse(localStorage.getItem("cryptoKey")),t.secret,t.issuer,t.name),O(t.digits),B(t.period),L(t.type),$(t.algo),b(!0)}else d(e.data.message)})):o(!0)}),[e]);return c||!e?r.a.createElement(l.a,{to:"/list"}):r.a.createElement("div",null,r.a.createElement(E,{message:m,close:function(){return d("")}}),r.a.createElement("div",{className:"homeHeader"},r.a.createElement("h1",null,"Edit"),r.a.createElement("div",{className:"homeLinksWrapper linkFlexRight"},r.a.createElement("button",{className:"primaryBtn alertBtn cancelBtn btnFlex",onClick:function(){return o(!0)}},"Cancel"),r.a.createElement("button",{className:"primaryBtn logoutBtn",onClick:function(){window.confirm("Are you sure you want to delete this token?")&&f.a.post("https://ultraotp.com/api/doc/delete/".concat(e),null,{headers:{Authorization:"JWT ".concat(localStorage.getItem("JWT"))}}).then((function(e){e.data.success?o(!0):d(e.data.message)}))}},"Delete Token"))),r.a.createElement("div",{className:"otpFormWrapper",style:g?{display:"block"}:{display:"none"}},r.a.createElement(W,{algo:Q,digits:x,issuer:N,name:D,period:T,secret:P,type:K,submit:function(t){var a,n,r,c;return u.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:if(t.preventDefault(),P){s.next=5;break}d("No secret provided. Operation not performed."),s.next=24;break;case 5:if(N){s.next=9;break}d("No issuer provided. Operate not performed."),s.next=24;break;case 9:if(D){s.next=13;break}d("No label provided. Operation not performed."),s.next=24;break;case 13:return a=JSON.parse(localStorage.getItem("cryptoKey")),s.next=16,u.a.awrap(A(a,P));case 16:return n=s.sent,s.next=19,u.a.awrap(A(a,N));case 19:return r=s.sent,s.next=22,u.a.awrap(A(a,D));case 22:c=s.sent,f.a.post("https//ultraotp.com/api/doc/update/".concat(e),{digits:x,period:T,type:K,algo:Q,issuer:{text:r.text,iv:r.iv},name:{text:c.text,iv:c.iv},secret:{text:n.text,iv:n.iv}},{headers:{Authorization:"JWT ".concat(localStorage.getItem("JWT"))}}).then((function(e){e.data.success?o(!0):d(e.data.message)}));case 24:case"end":return s.stop()}}))},setIssuer:k,setName:q,setSecret:M,setType:L,setPeriod:B,setDigits:O,setAlgo:$})))}var _=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Q(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}o.a.render(r.a.createElement((function(){return Object(n.useEffect)((function(){window.matchMedia("(prefers-color-scheme: dark)").matches&&document.querySelector("meta[name=theme-color]").setAttribute("content","#121212")}),[]),r.a.createElement(s.a,null,r.a.createElement("div",{className:"Wrapper"},r.a.createElement("div",{className:"App"},r.a.createElement(l.d,null,r.a.createElement(l.b,{path:"/login"}," ",r.a.createElement(O,null)," "),r.a.createElement(l.b,{path:"/register"}," ",r.a.createElement(S,null)," "),r.a.createElement(l.b,{path:"/new"}," ",r.a.createElement(B,null)," "),r.a.createElement(l.b,{path:"/list"}," ",r.a.createElement(D,null)),r.a.createElement(l.b,{path:"/edit/:id"}," ",r.a.createElement(V,null)," "),r.a.createElement(l.b,{path:"/"},r.a.createElement(q,null))))))}),null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");_?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):Q(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):Q(t,e)}))}}()}},[[37,1,2]]]);
//# sourceMappingURL=main.6d7f534d.chunk.js.map