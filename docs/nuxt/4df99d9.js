(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{549:function(t,e,r){var content=r(557);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(45).default)("7f62a324",content,!1,{sourceMap:!1})},550:function(t,e,r){"use strict";var n=r(15),o=(r(39),r(29),r(51),r(0)),c=r.n(o),l=r(551),d=r.n(l),f=r(552),m=r.n(f),v=r(230),w=r.n(v),h=r(553),y=r.n(h),_=r(554),x=r.n(_),O=r(555),P=r.n(O),j={text:w.a,text2:m.a,email:y.a,password:P.a,phoneNumber:x.a,search:d.a},k=c.a.extend({name:"Input",components:{IconMagniGlass:d.a,IconUser:m.a,IconPen:w.a,IconEmail:y.a,IconPhoneNumber:x.a,IconLock:P.a},props:{id:{type:String,required:!0},name:{type:String,required:!0},auto:{type:Boolean,default:!0},label:{type:String,default:""},type:{type:String,default:"text"},value:{type:String,required:!0},disabled:{type:Boolean,default:!1},error:{type:String,default:""},icon:{type:String,default:""},mask:{type:String,default:""},variant:{type:String,default:"filled"}},data:function(){return{focus:!1,icons:j}},computed:{curIcon:function(){return this.icons[this.icon]},model:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}},methods:{onKeydown:function(t){this.$emit("onKeydown",t)},onFocus:function(t){this.focus=!0,this.$emit("onFocus",t)},onBlur:function(t){this.focus=!1,this.$emit("onBlur",t)}}}),S=(r(556),r(8)),component=Object(S.a)(k,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"field",class:Object(n.a)({focus:t.focus,disabled:t.disabled,error:t.error},t.variant,!0)},[t.label?e("label",{staticClass:"field__label",class:{active:t.value},attrs:{for:t.id}},[t._v(t._s(t.label))]):t._e(),t._v(" "),e("label",{staticClass:"field__body"},["checkbox"===t.type?e("input",{directives:[{name:"model",rawName:"v-model",value:t.model,expression:"model"},{name:"mask",rawName:"v-mask",value:t.mask,expression:"mask"}],staticClass:"field__input",attrs:{id:t.id,name:t.name,disabled:t.disabled,autocomplete:t.auto?"on":"off",type:"checkbox"},domProps:{checked:Array.isArray(t.model)?t._i(t.model,null)>-1:t.model},on:{keydown:t.onKeydown,focus:t.onFocus,blur:t.onBlur,change:function(e){var r=t.model,n=e.target,o=!!n.checked;if(Array.isArray(r)){var c=t._i(r,null);n.checked?c<0&&(t.model=r.concat([null])):c>-1&&(t.model=r.slice(0,c).concat(r.slice(c+1)))}else t.model=o}}}):"radio"===t.type?e("input",{directives:[{name:"model",rawName:"v-model",value:t.model,expression:"model"},{name:"mask",rawName:"v-mask",value:t.mask,expression:"mask"}],staticClass:"field__input",attrs:{id:t.id,name:t.name,disabled:t.disabled,autocomplete:t.auto?"on":"off",type:"radio"},domProps:{checked:t._q(t.model,null)},on:{keydown:t.onKeydown,focus:t.onFocus,blur:t.onBlur,change:function(e){t.model=null}}}):e("input",{directives:[{name:"model",rawName:"v-model",value:t.model,expression:"model"},{name:"mask",rawName:"v-mask",value:t.mask,expression:"mask"}],staticClass:"field__input",attrs:{id:t.id,name:t.name,disabled:t.disabled,autocomplete:t.auto?"on":"off",type:t.type},domProps:{value:t.model},on:{keydown:t.onKeydown,focus:t.onFocus,blur:t.onBlur,input:function(e){e.target.composing||(t.model=e.target.value)}}}),t._v(" "),t.curIcon?[e(t.curIcon,{tag:"component",staticClass:"field__icon"})]:t._e()],2),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.focus&&t.error,expression:"!focus && error"}],staticClass:"field__error"},[t._v(t._s(t.error))])])}),[],!1,null,"a20780a4",null);e.a=component.exports},551:function(t,e,r){var n=r(87),o=r(88),c=["class","staticClass","style","staticStyle","attrs"];function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}r(29),r(25),r(19),r(24),r(7),r(37),r(23),r(38),t.exports={functional:!0,render:function(t,e){var r=e._c,data=(e._v,e.data),d=e.children,f=void 0===d?[]:d,m=data.class,v=data.staticClass,style=data.style,w=data.staticStyle,h=data.attrs,y=void 0===h?{}:h,_=o(data,c);return r("svg",function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){n(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({class:[m,v],style:[style,w],attrs:Object.assign({version:"1.0",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512.000000 512.000000",preserveAspectRatio:"xMidYMid meet"},y)},_),f.concat([r("g",{attrs:{transform:"translate(0.000000,512.000000) scale(0.100000,-0.100000)",fill:"#000000",stroke:"none"}},[r("path",{attrs:{d:"M1741 5105 c-389 -53 -730 -203 -1022 -451 -331 -281 -565 -690 -644\n-1129 -23 -127 -31 -409 -15 -543 105 -905 807 -1602 1712 -1701 353 -39 729\n29 1056 192 l123 61 232 -230 c128 -126 459 -455 737 -731 552 -548 544 -542\n685 -566 166 -28 350 72 422 229 49 107 46 237 -7 346 -28 56 -106 137 -751\n778 -396 393 -720 718 -719 722 0 3 22 42 49 85 215 347 316 740 291 1134 -9\n147 -12 168 -41 305 -43 210 -146 457 -268 641 -259 393 -642 674 -1090 800\n-223 63 -537 87 -750 58z m509 -704 c251 -63 457 -183 629 -367 403 -432 441\n-1102 89 -1576 -366 -494 -1028 -648 -1570 -366 -278 144 -500 403 -601 698\n-41 120 -58 216 -64 355 -20 477 231 914 658 1144 112 61 245 103 419 135 14\n2 99 3 190 1 126 -2 185 -8 250 -24z"}})])]))}}},552:function(t,e,r){var n=r(87),o=r(88),c=["class","staticClass","style","staticStyle","attrs"];function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}r(29),r(25),r(19),r(24),r(7),r(37),r(23),r(38),t.exports={functional:!0,render:function(t,e){var r=e._c,data=(e._v,e.data),d=e.children,f=void 0===d?[]:d,m=data.class,v=data.staticClass,style=data.style,w=data.staticStyle,h=data.attrs,y=void 0===h?{}:h,_=o(data,c);return r("svg",function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){n(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({class:[m,v],style:[style,w],attrs:Object.assign({version:"1.0",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512.000000 512.000000",preserveAspectRatio:"xMidYMid meet"},y)},_),f.concat([r("g",{attrs:{transform:"translate(0.000000,512.000000) scale(0.100000,-0.100000)",fill:"#000000",stroke:"none"}},[r("path",{attrs:{d:"M2285 4675 c-811 -106 -1495 -672 -1749 -1446 -75 -229 -106 -422\n-106 -669 0 -247 31 -440 106 -669 151 -461 457 -854 879 -1131 178 -116 454\n-231 675 -280 211 -47 495 -63 705 -40 382 43 751 191 1065 428 181 137 403\n387 530 596 368 610 401 1386 86 2031 -321 655 -959 1106 -1678 1184 -128 14\n-388 12 -513 -4z m405 -845 c267 -42 501 -211 624 -450 63 -122 87 -211 93\n-356 12 -265 -75 -476 -273 -663 -68 -64 -106 -91 -187 -131 -145 -71 -232\n-92 -387 -92 -96 0 -144 5 -205 21 -320 85 -565 339 -629 653 -20 97 -21 255\n-1 348 93 443 521 740 965 670z m325 -1929 c316 -38 569 -125 677 -232 113\n-113 98 -295 -34 -414 -74 -66 -238 -173 -349 -228 -350 -171 -764 -217 -1146\n-126 -240 57 -496 184 -679 337 -85 70 -124 148 -124 244 0 124 55 198 206\n272 174 86 377 134 664 156 136 11 669 4 785 -9z"}})])]))}}},553:function(t,e,r){var n=r(87),o=r(88),c=["class","staticClass","style","staticStyle","attrs"];function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}r(29),r(25),r(19),r(24),r(7),r(37),r(23),r(38),t.exports={functional:!0,render:function(t,e){var r=e._c,data=(e._v,e.data),d=e.children,f=void 0===d?[]:d,m=data.class,v=data.staticClass,style=data.style,w=data.staticStyle,h=data.attrs,y=void 0===h?{}:h,_=o(data,c);return r("svg",function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){n(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({class:[m,v],style:[style,w],attrs:Object.assign({version:"1.0",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512.000000 512.000000",preserveAspectRatio:"xMidYMid meet"},y)},_),f.concat([r("g",{attrs:{transform:"translate(0.000000,512.000000) scale(0.100000,-0.100000)",fill:"#000000",stroke:"none"}},[r("path",{attrs:{d:"M2445 5054 c-881 -51 -1644 -528 -2062 -1289 -193 -350 -290 -711\n-300 -1115 -7 -281 15 -482 83 -726 244 -891 941 -1566 1839 -1779 196 -47\n314 -60 560 -60 301 0 491 29 760 115 184 59 427 173 533 249 156 114 106 371\n-82 422 -71 19 -122 6 -276 -74 -219 -114 -391 -171 -635 -214 -139 -23 -471\n-23 -610 0 -439 76 -798 259 -1106 566 -769 766 -784 2005 -35 2789 537 562\n1337 763 2071 521 308 -102 579 -272 805 -505 167 -173 270 -319 370 -526 207\n-430 254 -910 134 -1374 -37 -146 -61 -199 -115 -259 -183 -200 -519 -124\n-600 136 -18 58 -19 102 -19 841 0 584 -3 791 -12 822 -26 86 -136 166 -228\n166 -115 0 -240 -116 -240 -223 0 -13 -18 -5 -71 29 -296 192 -674 244 -1009\n138 -190 -59 -339 -151 -486 -298 -163 -162 -262 -335 -322 -559 -25 -94 -27\n-116 -26 -292 0 -172 3 -199 26 -285 151 -559 652 -933 1213 -906 274 13 513\n105 731 281 l31 25 38 -64 c84 -144 251 -285 408 -346 202 -79 427 -77 629 4\n184 75 346 231 432 418 57 123 118 359 148 568 17 122 17 505 0 625 -70 488\n-241 892 -533 1254 -397 495 -993 828 -1614 905 -129 16 -333 25 -430 20z\nm247 -1788 c102 -20 175 -49 260 -105 101 -66 196 -172 247 -274 61 -124 76\n-190 75 -337 -1 -107 -5 -137 -27 -205 -38 -115 -90 -198 -182 -290 -92 -92\n-175 -144 -290 -182 -68 -22 -98 -26 -205 -27 -147 -1 -213 14 -337 75 -145\n72 -287 228 -343 377 -77 204 -59 439 47 622 47 80 178 213 256 259 152 89\n328 120 499 87z"}})])]))}}},554:function(t,e,r){var n=r(87),o=r(88),c=["class","staticClass","style","staticStyle","attrs"];function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}r(29),r(25),r(19),r(24),r(7),r(37),r(23),r(38),t.exports={functional:!0,render:function(t,e){var r=e._c,data=(e._v,e.data),d=e.children,f=void 0===d?[]:d,m=data.class,v=data.staticClass,style=data.style,w=data.staticStyle,h=data.attrs,y=void 0===h?{}:h,_=o(data,c);return r("svg",function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){n(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({class:[m,v],style:[style,w],attrs:Object.assign({version:"1.0",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512.000000 512.000000",preserveAspectRatio:"xMidYMid meet"},y)},_),f.concat([r("g",{attrs:{transform:"translate(0.000000,512.000000) scale(0.100000,-0.100000)",fill:"#000000",stroke:"none"}},[r("path",{attrs:{d:"M1125 5102 c-74 -28 -103 -48 -264 -184 -190 -160 -251 -218 -321\n-303 -217 -265 -336 -571 -359 -923 -20 -310 33 -610 170 -972 48 -126 213\n-446 308 -598 378 -605 983 -1260 1501 -1628 736 -521 1464 -632 2083 -317\n135 69 232 138 389 278 247 220 289 273 307 384 29 182 -82 337 -479 675 -282\n241 -466 336 -642 336 -170 -1 -272 -62 -556 -333 -78 -75 -157 -142 -183\n-154 -223 -110 -518 24 -899 406 -282 283 -532 606 -654 844 -115 226 -139\n398 -73 539 29 62 74 110 177 186 101 75 290 242 334 295 19 24 50 74 67 111\n26 57 33 84 37 160 6 121 -19 221 -97 382 -67 139 -249 431 -350 561 -175 226\n-342 312 -496 255z"}})])]))}}},555:function(t,e,r){var n=r(87),o=r(88),c=["class","staticClass","style","staticStyle","attrs"];function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}r(29),r(25),r(19),r(24),r(7),r(37),r(23),r(38),t.exports={functional:!0,render:function(t,e){var r=e._c,data=(e._v,e.data),d=e.children,f=void 0===d?[]:d,m=data.class,v=data.staticClass,style=data.style,w=data.staticStyle,h=data.attrs,y=void 0===h?{}:h,_=o(data,c);return r("svg",function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){n(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({class:[m,v],style:[style,w],attrs:Object.assign({version:"1.0",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512.000000 512.000000",preserveAspectRatio:"xMidYMid meet"},y)},_),f.concat([r("g",{attrs:{transform:"translate(0.000000,512.000000) scale(0.100000,-0.100000)",fill:"#000000",stroke:"none"}},[r("path",{attrs:{d:"M2420 5114 c-208 -27 -407 -101 -580 -217 -96 -64 -273 -241 -337\n-337 -92 -137 -155 -282 -195 -450 -19 -77 -21 -125 -25 -497 l-5 -413 -107 0\nc-64 0 -131 -6 -166 -15 -172 -45 -305 -179 -350 -352 -22 -86 -22 -2380 0\n-2466 45 -173 178 -307 350 -352 52 -13 244 -15 1555 -15 1646 0 1549 -4 1671\n61 115 62 214 197 239 328 6 35 10 469 10 1220 0 1270 2 1218 -56 1333 -36 71\n-123 159 -193 197 -84 45 -159 61 -282 61 l-107 0 -5 413 c-4 372 -6 420 -25\n497 -62 257 -170 450 -351 631 -185 185 -380 293 -631 350 -83 19 -331 33\n-410 23z m310 -438 c94 -20 215 -69 289 -118 194 -127 339 -342 380 -563 7\n-35 11 -205 11 -427 l0 -368 -850 0 -850 0 0 373 c0 406 4 440 59 582 100 260\n336 459 616 520 80 18 264 18 345 1z m-24 -2357 c148 -56 249 -180 275 -338\n23 -145 -42 -304 -161 -395 l-49 -37 -3 -279 -3 -278 -30 -44 c-97 -138 -306\n-118 -370 34 -12 31 -15 86 -15 302 l0 264 -51 38 c-118 90 -183 250 -160 393\n36 226 234 384 456 364 33 -3 83 -14 111 -24z"}})])]))}}},556:function(t,e,r){"use strict";r(549)},557:function(t,e,r){var n=r(44)((function(i){return i[1]}));n.push([t.i,'.field[data-v-a20780a4]{position:relative;width:100%;padding-top:20px;font-size:1rem;font-family:"arial",sans-serif}.field__label[data-v-a20780a4]{position:absolute;top:0;left:0;padding-left:10px;font-size:1rem;font-family:inherit;z-index:1;transform:translateY(26px);transition:all .2s linear}.field.focus .field__label[data-v-a20780a4],.field__label.active[data-v-a20780a4]{font-size:.75rem;transform:translateY(0)}.field__body[data-v-a20780a4]{position:relative;display:flex;justify-content:space-between;align-items:center;padding:6px 12px;border-top-right-radius:5px;border-top-left-radius:5px;background:#f1f1f1}.field__body[data-v-a20780a4]:after,.field__body[data-v-a20780a4]:before{content:"";position:absolute;left:0;bottom:0;height:1px}.field__body[data-v-a20780a4]:before{width:100%;background:#ebebeb}.field__body[data-v-a20780a4]:after{width:0;background:#2c8eff;z-index:1;transition:width .5s ease-in-out}.field.transparent .field__body[data-v-a20780a4]{background:transparent}.field.error .field__body[data-v-a20780a4]:after{background:#ff2d2d}.field.focus .field__body[data-v-a20780a4]:after{width:100%}.field__input[data-v-a20780a4]{width:100%;border:none;outline:none;padding:0;background:transparent;font-size:inherit;font-family:inherit;font-weight:inherit;letter-spacing:.05rem;flex-grow:1;margin-right:.6rem;-webkit-appearance:none;-moz-appearance:none;appearance:none}.field__icon[data-v-a20780a4]{width:1rem;height:1rem;min-width:1rem}.field__error[data-v-a20780a4]{margin-top:5px;padding:0 8px 10px;font-size:.875rem;font-family:"arial",sans-serif;color:#ff2d2d}',""]),n.locals={},t.exports=n},568:function(t,e,r){var content=r(603);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(45).default)("376a89fe",content,!1,{sourceMap:!1})},569:function(t,e,r){var content=r(605);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(45).default)("1f96b7af",content,!1,{sourceMap:!1})},602:function(t,e,r){"use strict";r(568)},603:function(t,e,r){var n=r(44)((function(i){return i[1]}));n.push([t.i,'.form[data-v-6054f844]{max-width:600px;display:flex;flex-direction:row;justify-content:center;align-items:flex-start;flex-wrap:wrap;grid-gap:20px 30px;gap:20px 30px;font-family:"arial",sans-serif}.form__field[data-v-6054f844]{flex-grow:1}@media(min-width:780px){.form__field[data-v-6054f844]{max-width:46%}}.form__field--btn[data-v-6054f844]{display:flex;padding-top:20px;justify-content:center;align-items:center;box-sizing:border-box}.form__button[data-v-6054f844]{width:100%}@media(min-width:780px){.form__button[data-v-6054f844]{max-width:60%}}',""]),n.locals={},t.exports=n},604:function(t,e,r){"use strict";r(569)},605:function(t,e,r){var n=r(44)((function(i){return i[1]}));n.push([t.i,".respawn-form[data-v-7b8cee04]{margin-bottom:20px}",""]),n.locals={},t.exports=n},629:function(t,e,r){"use strict";r.r(e);var n=r(3),o=(r(41),r(0)),c=r.n(o),l=r(550),d=r(89),f=c.a.extend({name:"RespawnForm",components:{Input:l.a,Button:d.a},data:function(){return{code:"",codeError:"",password:"",passwordError:"",confirmPassword:"",confirmPasswordError:"",errors:{required:this.$tc("required"),password:this.$tc("password"),sameText:this.$tc("sameText")}}},computed:{isFilled:function(){return!!(this.code&&this.password&&this.confirmPassword)},isHasError:function(){return!!(this.codeError||this.passwordError||this.confirmPasswordError)},getParseData:function(){var t,e;return{email:encodeURI((null===(e=null===(t=this.$route)||void 0===t?void 0:t.query)||void 0===e?void 0:e.email)||""),code:this.code,password:this.password}}},mounted:function(){this.$route.query.email||this.$router.push(this.localePath("/auth"))},methods:{onBlur:function(t){this.check(t)},check:function(t){t&&"code"!==t||(this.codeError=this.$services.formValidation.getError(this.$services.formValidation.text(this.code),this.errors)),t&&"password"!==t||(this.passwordError=this.$services.formValidation.getError(this.$services.formValidation.password(this.password),this.errors)),t&&"confirmPassword"!==t||(this.confirmPasswordError=this.$services.formValidation.getError(this.$services.formValidation.confirmPassword(this.confirmPassword,this.password),this.errors))},onSubmit:function(){this.check(),this.isHasError||this.$emit("onSubmit",this.getParseData)}}}),m=(r(602),r(8)),v=Object(m.a)(f,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("form",{staticClass:"form",on:{submit:function(t){t.preventDefault()}}},[e("Input",{staticClass:"form__field",attrs:{id:"code",label:"Code",name:"code",icon:"text",type:"text",disabled:!1,error:t.codeError},on:{onBlur:function(e){return t.onBlur("code")}},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),t._v(" "),e("Input",{staticClass:"form__field",attrs:{id:"password",label:"Password",name:"password",icon:"password",type:"password",disabled:!1,error:t.passwordError},on:{onBlur:function(e){return t.onBlur("password")}},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),e("Input",{staticClass:"form__field",attrs:{id:"confirmPassword",label:"Confirm Password",name:"confirmPassword",icon:"password",type:"password",disabled:!1,error:t.confirmPasswordError},on:{onBlur:function(e){return t.onBlur("confirmPassword")}},model:{value:t.confirmPassword,callback:function(e){t.confirmPassword=e},expression:"confirmPassword"}}),t._v(" "),e("div",{staticClass:"form__field form__field--btn"},[e("Button",{staticClass:"form__button",attrs:{disabled:!t.isFilled||t.isHasError},on:{click:t.onSubmit}},[t._v("Send")])],1)],1)}),[],!1,null,"6054f844",null).exports,w=c.a.extend({name:"PageRespawn",components:{RespawnForm:v},layout:"auth",methods:{onSubmit:function(data){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.$nuxt.$loading.start(),e.next=4,t.$repositories.auth.respawn(data);case 4:t.$router.push(t.localePath("/auth")),t.$store.dispatch("toast/setToast",{type:"valid",message:"Email was activated"}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),t.$store.dispatch("toast/setToast",{type:"error",message:t.$tc(e.t0.error)});case 11:return e.prev=11,t.$nuxt.$loading.finish(),e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[0,8,11,14]])})))()}}}),h=(r(604),Object(m.a)(w,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"page"},[e("div",{staticClass:"container flex-col"},[e("h1",[t._v("Respawn")]),t._v(" "),e("RespawnForm",{staticClass:"respawn-form",on:{onSubmit:t.onSubmit}}),t._v(" "),e("NuxtLink",{attrs:{to:t.localePath("/auth")}},[t._v("Login")])],1)])}),[],!1,null,"7b8cee04",null));e.default=h.exports}}]);