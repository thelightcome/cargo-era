(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{489:function(d,t,_){var e=_(521);e.__esModule&&(e=e.default),typeof e=="string"&&(e=[[d.i,e,""]]),e.locals&&(d.exports=e.locals);var o=_(24).default,r=o("c850273c",e,!1,{sourceMap:!1})},520:function(d,t,_){"use strict";var e=_(489),o=_.n(e)},521:function(d,t,_){var e=_(23),o=e(function(r){return r[1]});o.push([d.i,".add__product[data-v-1d8712a8]{max-width:450px;margin-bottom:2rem}",""]),o.locals={},d.exports=o},554:function(d,t,_){"use strict";_.r(t);var e=function(){var s=this,a=s._self._c,j=s._self._setupProxy;return a("div",{staticClass:"page add"},[a("div",{staticClass:"container flex-col"},[a("AddProduct",{ref:"form",staticClass:"add__product",on:{onSubmit:s.onSubmit}})],1)])},o=[],r=_(2),l=_(0),u=_.n(l),c=_(503),i=u.a.extend({name:"PageUserIndex",components:{AddProduct:c.a},layout:"user",methods:{onSubmit(n){var s=this;return Object(r.a)(function*(){try{s.$nuxt.$loading.start(),yield s.$repositories.product.addProduct(n),s.$store.dispatch("toast/setToast",{type:"valid",message:"Product added"})}catch(a){s.$store.dispatch("toast/setToast",{type:"error",message:s.$tc(a.error)})}finally{s.$nuxt.$loading.finish()}})()}}}),f=i,p=_(520),v=_(3),m=Object(v.a)(f,e,o,!1,null,"1d8712a8",null),x=t.default=m.exports}}]);
