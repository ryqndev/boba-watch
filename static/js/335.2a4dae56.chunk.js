"use strict";(self.webpackChunkboba_watch=self.webpackChunkboba_watch||[]).push([[335],{2690:function(e,n,t){t.d(n,{b:function(){return s}});var a=t(5987),r=t(885),i=t(2791),o=["location","id","address","date"],s=function(e){var n=(0,i.useState)([]),t=(0,r.Z)(n,2),s=t[0],c=t[1];return(0,i.useEffect)((function(){c(Object.values(e.reduce((function(e,n){var t=n.location,r=n.id,i=n.address,s=n.date;(0,a.Z)(n,o);if(null===i||void 0===i||!i.lat||null===i||void 0===i||!i.lng)return e;var c=Number(i.lat).toFixed(6),u=Number(i.lng).toFixed(6),l="".concat(c,",").concat(u).concat(t);return isNaN(c)||isNaN(u)||(e.hasOwnProperty(l)?e[l].drinks.push({id:r,date:s}):e[l]={coordinates:[c,u],location:t,address:i,drinks:[{id:r,date:s}]}),e}),{})))}),[e]),{locations:s}}},2495:function(e,n,t){t.d(n,{Fy:function(){return a.Z},M7:function(){return r.Z},tx:function(){return i.Z}});t(5691);var a=t(9312),r=t(1748),i=t(3568);t(5026),t(2791),t(6831),t(7426),t(8228)},1748:function(e,n,t){var a=t(885),r=t(2791);n.Z=function(){var e=(0,r.useState)([]),n=(0,a.Z)(e,2),t=n[0],i=n[1],o=(0,r.useState)([]),s=(0,a.Z)(o,2),c=s[0],u=s[1],l=(0,r.useCallback)((function(){i(JSON.parse(localStorage.getItem("drinkids")))}),[]);return(0,r.useEffect)(l,[l]),(0,r.useEffect)((function(){u(t.map((function(e){return JSON.parse(localStorage.getItem(e))})))}),[t]),{drinkids:t,drinks:c,update:l}}},3568:function(e,n,t){var a=t(2791);n.Z=function(){var e=(0,a.useCallback)((function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},a="https://us-central1-boba-watch-firebase.cloudfunctions.net/locator";fetch(a+"?"+new URLSearchParams(e).toString()).then((function(e){return e.json()})).then(n).catch(t)}),[]),n=(0,a.useCallback)((function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},a="https://us-central1-boba-watch-firebase.cloudfunctions.net/nearbyLocations";fetch(a+"?"+new URLSearchParams(e).toString()).then((function(e){return e.json()})).then(n).catch(t)}),[]);return{getLocationsNearby:e,getLocationsByText:n}}},5026:function(e,n,t){var a=t(1413),r=t(885),i=t(2791);n.Z=function(){var e=(0,i.useState)({}),n=(0,r.Z)(e,2),t=n[0],o=n[1],s=(0,i.useState)(null),c=(0,r.Z)(s,2),u=c[0],l=c[1],d=function(e){l(e.message)},f=function(e){var n=e.coords,t=e.timestamp;o({accuracy:n.accuracy,alt:n.altitude,altitudeAccuracy:n.altitudeAccuracy,heading:n.heading,lat:n.latitude,lng:n.longitude,timestamp:t})};return(0,i.useEffect)((function(){navigator&&navigator.geolocation?navigator.geolocation.getCurrentPosition(f,d,{}):l("Geolocation is not supported")}),[]),(0,a.Z)((0,a.Z)({},t),{},{error:u})}},7426:function(e,n,t){var a=t(885),r=t(2791),i=t(5135),o=t(242),s=t(4674),c=t(4796);n.Z=function(e){var n=(0,r.useState)((0,c.Qe)()),t=(0,a.Z)(n,2),u=t[0],l=t[1],d=(0,r.useContext)(s.Z),f=(0,a.Z)(d,1)[0];return(0,r.useEffect)((function(){if(void 0===e||f.uid===e)return l(JSON.parse(localStorage.getItem("metrics")));l({}),i.Fs.collection("users/".concat(e,"/user")).doc("stats").get().then((function(e){l(e.data())})).catch(o.qQ)}),[e,f.uid]),u}},4672:function(e,n,t){t.d(n,{IH:function(){return v},eP:function(){return m},Od:function(){return h},bC:function(){return p}});var a=t(1413),r=t(5861),i=t(7757),o=t.n(i),s=t(1830),c=t.n(s),u=t(8368),l=t(5135),d=t(910),f=t(4796),v=function(){var e=(0,r.Z)(o().mark((function e(n,t){var r,i,s,c;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.Fs.collection("users/".concat(t,"/drinks")).add((0,a.Z)({created:l.wC.firestore.FieldValue.serverTimestamp(),edited:l.wC.firestore.FieldValue.serverTimestamp()},n));case 3:return r=e.sent,e.next=6,r.get();case 6:return i=e.sent,s=i.data(),c=(0,a.Z)({id:i.id,edited:null===s||void 0===s?void 0:s.edited,created:null===s||void 0===s?void 0:s.created},s.drink),e.abrupt("return",_(c,t));case 12:return e.prev=12,e.t0=e.catch(0),e.abrupt("return",(0,d.WB)(e.t0));case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(n,t){return e.apply(this,arguments)}}(),m=function(){var e=(0,r.Z)(o().mark((function e(n,t,r){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.Fs.collection("users/".concat(r,"/drinks")).doc(t).set((0,a.Z)({edited:l.wC.firestore.FieldValue.serverTimestamp()},n));case 3:return(0,f.Tq)(t),e.abrupt("return",_((0,a.Z)({id:t},n.drink),r,!0));case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",(0,d.WB)(e.t0));case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(n,t,a){return e.apply(this,arguments)}}(),h=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};try{l.Fs.collection("users/".concat(n,"/drinks")).doc(e).delete().then((function(){var a=(0,f.Tq)(e);a.d=JSON.stringify(a.d),l.Fs.collection("users/".concat(n,"/user")).doc("stats").set(a).finally((function(){(0,d.b7)(),t()}))})).catch((function(e){(0,d.bI)(e)}))}catch(a){return(0,d.WB)(a)}},p=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};try{l.Fs.collection("users/".concat(n,"/user")).doc("autofill").set({data:JSON.stringify(e)}).then((function(){localStorage.setItem("autofill",JSON.stringify(e)),t()})).catch((function(e){(0,d.WB)(e)}))}catch(a){return(0,d.WB)(a)}},_=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=(0,f.Ng)(e,e.id);a.d=JSON.stringify(a.d),l.Fs.collection("users/".concat(n,"/user")).doc("stats").set(a).finally((function(){c().fire(u.Z.t("Done!"),u.Z.t(t?"Drink updated":"Drink added"),"success")}))}},4813:function(e,n,t){t.d(n,{Um:function(){return k},wC:function(){return E},Hp:function(){return H},Ur:function(){return ie},Q7:function(){return qe}});var a=t(1413),r=t(2791),i=t(6433),o=t(9512),s=t(885),c=t(8182),u=t(1477),l=t(6086),d=t(6116),f="SavedItemCard_container__0vQT+",v="SavedItemCard_tag__ASCA5",m="SavedItemCard_star__GCc8U",h="SavedItemCard_actions__1q7+n",p="SavedItemCard_show__EyLCn",_="SavedItemCard_fill__7xaIc",g="SavedItemCard_delete__uTxL-",x=t(184),b=function(e){var n=e.entry,t=e.set,a=e.remove,o=(0,r.useState)(!1),b=(0,s.Z)(o,2),j=b[0],Z=b[1];return(0,x.jsxs)(i.Zb,{className:f,children:[n.name&&(0,x.jsxs)("p",{children:[(0,x.jsx)("span",{children:"name "})," ",n.name]}),n.location&&(0,x.jsxs)("div",{children:[(0,x.jsx)("span",{children:"location "})," ",(0,x.jsx)(i.el,{className:v,address:null===n||void 0===n?void 0:n.address}),n.location]}),(0===n.price||n.price)&&(0,x.jsxs)("p",{children:[(0,x.jsx)("span",{children:"price "})," $",(n.price/100).toFixed(2)]}),(0===n.rating||n.rating)&&(0,x.jsxs)("p",{children:[(0,x.jsx)("span",{children:"rating "})," ",n.rating,(0,x.jsx)(u.Z,{className:m})]}),(0,x.jsxs)("div",{className:(0,c.default)(h,j&&p),onMouseEnter:function(){return Z(!0)},onMouseLeave:function(){return Z(!1)},children:[(0,x.jsx)("button",{className:_,onClick:t(n),children:(0,x.jsx)(d.Z,{})}),(0,x.jsx)("button",{className:g,onClick:function(){return a(n.value)},children:(0,x.jsx)(l.Z,{})})]})]})},j=(0,r.memo)(b),Z="AutofillManager_scrollable__-MJyV",N="AutofillManager_container__zB1ma",y="AutofillManager_create__10gBn",C="AutofillManager_empty__o60EU",S=t(3168),w=function(e){var n=e.form,t=e.setForm,r=(0,S.$)().t,s=(0,o.Z)(),c=s.autofill,u=s.add,l=s.remove,d=function(e){return function(n){n.preventDefault(),t((function(n){return(0,a.Z)((0,a.Z)((0,a.Z)({},n),e),{},{price:null!==e&&void 0!==e&&e.price?e.price/100:n.price})}))}};return(0,x.jsx)("div",{className:Z,children:(0,x.jsxs)("div",{className:N,children:[(0,x.jsxs)("div",{className:y,onClick:function(e){e.preventDefault();var t=(0,a.Z)((0,a.Z)({},n),{},{price:100*n.price});delete t.id,delete t.date,delete t.edited,delete t.created,u(t)},children:[(0,x.jsxs)("h3",{children:["+ ",r("create")]}),(0,x.jsx)("p",{children:r("create button description")})]}),0===(null===c||void 0===c?void 0:c.length)&&(0,x.jsx)(i.Zb,{className:C,children:r("no drinks saved")}),c.map((function(e){return(0,x.jsx)(j,{entry:e,set:d,remove:l},e.value)}))]})})},k=(0,r.memo)(w),L=t(2124),I=t(8655),F=t(9669),O=t(1614),P="BasicFields_container__HT30B",D="BasicFields_tag__Jj3Xj",T="BasicFields_divider__lSCwV",B="BasicFields_rating__wNfAG",M=function(e){var n,t,a=e.form,r=e.setForm,o=e.handleChange,s=e.editForm,c=(0,S.$)().t,u=(0,O.Z)().getCurrentLocale;return(0,x.jsxs)("div",{className:P,children:[(0,x.jsx)(i.el,{className:D,address:null===a||void 0===a?void 0:a.address}),(0,x.jsx)(qe,{form:a,onChange:s,setForm:r}),(0,x.jsx)(i.oi,{value:null!==(n=a.name)&&void 0!==n?n:"",onChange:o("name",150),label:c("drink name")}),(0,x.jsx)(i.oi,{value:null!==(t=a.price)&&void 0!==t?t:0,onChange:o("price",(function(e){return e.match(/^-?\d*\.?\d*$/)&&e.length<10})),label:c("price"),type:"text"}),(0,x.jsxs)("div",{className:T,children:[(0,x.jsx)(L.M,{utils:F.Z,locale:u(),children:(0,x.jsx)(I.x,{label:c("date"),value:a.date,format:"M/dd/yy - h:mm a",onChange:function(e){return s("date",e,30)},inputProps:{maxLength:100}})}),(0,x.jsx)(i.ZF,{className:B,rating:a.rating,setRating:function(e){return s("rating",e)}})]})]})},E=(0,r.memo)(M),J=t(1502),A=t(3534),U=t.n(A),V="DescriptionEditor_container__0RITe",W="DescriptionEditor_editor__UzmmK",$="DescriptionEditor_preview__VtWSW",q=function(e){var n=e.description,t=e.setDescription,a=(0,S.$)().t,r=new(U());return J.default.unuse(J.Plugins.Image),J.default.unuse(J.Plugins.Link),J.default.unuse(J.Plugins.Clear),J.default.unuse(J.Plugins.ModeToggle),J.default.unuse(J.Plugins.BlockCodeBlock),J.default.unuse(J.Plugins.BlockCodeInline),J.default.unuse(J.Plugins.FontUnderline),(0,x.jsxs)("div",{className:V,children:[(0,x.jsx)(i.Zb,{children:(0,x.jsx)(J.default,{id:W,renderHTML:function(e){return e},view:{html:!1},table:{maxRow:12,maxCol:8},canView:{hideMenu:!1},value:n,onChange:function(e){e.html;var n=e.text;t(n)},placeholder:a("how was your drink?")})}),(0,x.jsx)("h2",{children:a("preview")}),(0,x.jsx)(i.Zb,{className:$,children:(0,x.jsx)(J.default,{id:$,view:{menu:!1,md:!1},readOnly:!0,renderHTML:function(e){return r.render(e)},canView:{menu:!1,md:!1,html:!1,fullScreen:!1,hideMenu:!1},value:n})})]})},H=(0,r.memo)(q),G=t(5861),R=t(7757),K=t.n(R),Q=t(1830),z=t.n(Q),X=t(5613),Y=t(5135),ee=t(4674),ne=t(242),te="ImageUpload_container__Wr79a",ae="ImageUpload_preview__89+rw",re=function(e){var n=e.image,t=e.setImage,a=e.className,i=(0,S.$)().t,o=(0,r.useContext)(ee.Z),u=(0,s.Z)(o,1)[0],l=(0,r.useState)(""),d=(0,s.Z)(l,2),f=d[0],v=d[1],m=(0,r.useState)(-1),h=(0,s.Z)(m,2),p=h[0],_=h[1],g=(0,r.useRef)(null);(0,r.useEffect)((function(){n&&(0,G.Z)(K().mark((function e(){var t;return K().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,X.Vq)(n);case 2:t=e.sent,_(100),v(t);case 5:case"end":return e.stop()}}),e)})))()}),[n]);var b=function(){var e=(0,G.Z)(K().mark((function e(a){var r,i,o,s,c;return K().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!((o=null===g||void 0===g||null===(r=g.current)||void 0===r||null===(i=r.files)||void 0===i?void 0:i[0]).size>5e6)){e.next=5;break}return z().fire("File too large","Try a smaller image less than 5MB. Appreciate the high quality images but to keep Boba Watch free, we gotta do it like this. :(","error"),g.current.value="",e.abrupt("return");case 5:""!==f&&(0,X.ao)(n),s="drinks/".concat(u.uid,"/post-").concat((new Date).valueOf()),(c=Y.wC.storage().ref().child(s).put(o)).on("state_changed",(function(e){_(parseInt(e.bytesTransferred/e.totalBytes*100))}),(function(e){"storage/canceled"===e.code?_(-1):(0,ne.qQ)(JSON.stringify(e))}),(function(){t(s),c.snapshot.ref.getDownloadURL().then((function(e){v(e)}))}));case 9:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return p<0?e:p<100?n:t};return(0,x.jsxs)("label",{className:(0,c.default)(te,j("","uploading","uploaded"),a),children:[f&&(0,x.jsx)("img",{className:ae,src:f,alt:"upload-preview"}),j(i("UPLOAD AN IMAGE"),i("UPLOADING...")),(0,x.jsx)("input",{type:"file",ref:g,onChange:b,accept:"image/png,image/jpeg"}),(0,x.jsx)("br",{}),j("",(0,x.jsx)("progress",{max:"100",value:j(0,p,100)}))]})},ie=(0,r.memo)(re),oe=t(2495),se=t(3521),ce=t(4509),ue={container:"LocationPreview_container__2uKCC",title:"LocationPreview_title__NOkTq",divider:"LocationPreview_divider__dACoO","name-container":"LocationPreview_name-container__CYu2B",tag:"LocationPreview_tag__DADWp",select:"LocationPreview_select__q-EYu",expand:"LocationPreview_expand__q7LAK",selected:"LocationPreview_selected__mOs49",actions:"LocationPreview_actions__Ys-Su",cancel:"LocationPreview_cancel__RjUkG",confirm:"LocationPreview_confirm__XoHEa"},le=function(e){var n,t=e.form,r=e.setForm,o=e.setShow,s=e.tab,u=e.setTab,l=(0,S.$)().t;return(0,x.jsxs)("div",{className:ue.container,children:[(0,x.jsx)("h3",{className:ue.title,children:l("location")}),(0,x.jsxs)("h4",{children:[l("Select a location from"),":"]}),(0,x.jsxs)("div",{className:(0,c.default)(ue.select,"nearby"===s&&ue.selected),onClick:function(){return u("nearby")},children:[(0,x.jsx)("h5",{children:l("nearby locations")}),"nearby"===s&&(0,x.jsx)(ce.Z,{className:ue.expand})]}),(0,x.jsxs)("div",{className:(0,c.default)(ue.select,"previous"===s&&ue.selected),onClick:function(){return u("previous")},children:[(0,x.jsx)("h5",{children:l("previously used")}),"previous"===s&&(0,x.jsx)(ce.Z,{className:ue.expand})]}),(0,x.jsx)("div",{className:ue.divider}),(0,x.jsxs)("h4",{children:[l("or manually enter a location"),":"]}),(0,x.jsxs)("div",{className:ue["name-container"],children:[(0,x.jsx)(i.el,{className:ue.tag,address:null===t||void 0===t?void 0:t.address}),(0,x.jsx)(i.oi,{label:l("name"),value:null!==(n=null===t||void 0===t?void 0:t.location)&&void 0!==n?n:"",onChange:function(e){r((function(n){var t=(0,a.Z)((0,a.Z)({},n),{},{location:e.target.value});return delete t.address,t}))},className:ue.name})]}),(0,x.jsxs)("div",{className:ue.actions,children:[(0,x.jsx)("button",{type:"button",className:ue.cancel,onClick:function(){r((function(e){var n=(0,a.Z)({},e);return delete n.address,delete n.location,n})),o(!1)},children:(0,x.jsx)(se.Z,{})}),(0,x.jsx)("button",{className:ue.confirm,type:"button",onClick:function(){return o(!1)},children:(0,x.jsx)(d.Z,{})})]})]})},de=(0,r.memo)(le),fe=t(5026),ve=t(3568),me="NearbyLocationList_container__b13VK",he="NearbyLocationList_search__J9sK3",pe="NearbyLocationList_awaiting-location__x1xIn",_e="NearbyLocationList_scrollable__g8WSV",ge="NearbyLocationList_list__1JaJC",xe="NearbyLocationList_listing__hlc8F",be=function(e){var n=e.onChange,t=(0,S.$)().t,o=(0,fe.Z)(),u=(0,r.useState)(null),l=(0,s.Z)(u,2),d=l[0],f=l[1],v=(0,r.useState)(""),m=(0,s.Z)(v,2),h=m[0],p=m[1],_=(0,r.useState)(!1),g=(0,s.Z)(_,2),b=g[0],j=g[1],Z=(0,ve.Z)(),N=Z.getLocationsByText,y=Z.getLocationsNearby;(0,r.useEffect)((function(){var e=setTimeout((function(){return j(!0)}),400);return function(){return clearTimeout(e)}}),[h]),(0,r.useEffect)((function(){if(b&&o.lat&&o.lng){var e={lat:o.lat,lng:o.lng};j(!1),0===h.length?y((0,a.Z)({coffee:!0},e),(function(e){return f(e.response.groups[0].items.map((function(e){return e.venue})))}),(function(){return f([])})):N((0,a.Z)({input:h},e),(function(e){return f(e.response.minivenues)}),(function(){return f([])}))}}),[h,b,o,N,y]);return(0,x.jsxs)("div",{className:me,children:[(0,x.jsx)("h3",{children:t("nearby locations")}),(0,x.jsx)("div",{className:he,children:(0,x.jsx)(i.oi,{label:t("search by name"),value:h,onChange:function(e){e.preventDefault(),p(e.target.value)}})}),(0,x.jsx)("div",{className:_e,children:(0,x.jsxs)("div",{className:ge,children:[d&&d.map((function(e){var t,a,r,o,s=e.name,c=e.location;return(0,x.jsxs)(i.Zb,{className:xe,onClick:function(){return function(e,t){n("location",e,250),n("address",t,(function(){return!0}))}(s,c)},children:[(0,x.jsx)("h4",{children:s}),null!==(t=null===c||void 0===c?void 0:c.address)&&void 0!==t?t:"",(null===c||void 0===c?void 0:c.address)&&(0,x.jsx)("br",{}),null!==(a=null===c||void 0===c?void 0:c.city)&&void 0!==a?a:"",", ",null!==(r=null===c||void 0===c?void 0:c.state)&&void 0!==r?r:"",","," ",null!==(o=null===c||void 0===c?void 0:c.country)&&void 0!==o?o:""]},JSON.stringify(s)+JSON.stringify(c))})),(!d||!d.length)&&(0,x.jsx)(i.Zb,{className:(0,c.default)(xe,pe),children:t(d?"nothing found matching your search":"allow location access to get nearby locations")})]})})]})},je=(0,r.memo)(be),Ze=t(1748),Ne=t(2690),ye="PreviousLocationList_container__Ja8z3",Ce="PreviousLocationList_scrollable__TcZM1",Se="PreviousLocationList_list__mLW6u",we="PreviousLocationList_empty__roaZI",ke="PreviousLocationList_listing__by+gQ",Le=function(e){var n=e.onChange,t=(0,S.$)().t,a=(0,Ze.Z)().drinks,r=(0,Ne.b)(a).locations;return(0,x.jsxs)("div",{className:ye,children:[(0,x.jsx)("h3",{children:t("previously used")}),(0,x.jsx)("div",{className:Ce,children:(0,x.jsxs)("div",{className:Se,children:[r&&r.map((function(e){var t,a,r,o,s=e.coordinates,c=e.location,u=e.address;return(0,x.jsxs)(i.Zb,{className:ke,onClick:function(){return function(e,t){n("location",e,250),n("address",t,(function(){return!0}))}(c,u)},children:[(0,x.jsx)("h4",{children:c}),null!==(t=u.address)&&void 0!==t?t:"",u.address&&(0,x.jsx)("br",{}),null!==(a=null===u||void 0===u?void 0:u.city)&&void 0!==a?a:"",", ",null!==(r=null===u||void 0===u?void 0:u.state)&&void 0!==r?r:"",","," ",null!==(o=null===u||void 0===u?void 0:u.country)&&void 0!==o?o:""]},JSON.stringify(s)+JSON.stringify(c))})),0===r.length&&(0,x.jsx)(i.Zb,{className:we,children:t("no saved drinks with tagged location")})]})})]})},Ie=(0,r.memo)(Le),Fe="MobileLocationInput_container__19c9G",Oe="MobileLocationInput_input-container__vuCyp",Pe="MobileLocationInput_preview__tnn9S",De="MobileLocationInput_select__V+nEX",Te="MobileLocationInput_back__VeDbI",Be=function(e){var n,t=e.form,a=e.onChange,o=e.setForm,c=(0,S.$)().t,u=(0,r.useState)(!1),l=(0,s.Z)(u,2),d=l[0],f=l[1],v=(0,r.useState)("default"),m=(0,s.Z)(v,2),h=m[0],p=m[1],_=function(){a.apply(void 0,arguments),p("default")};return(0,x.jsxs)("div",{className:Fe,children:[(0,x.jsx)(i.u_,{open:d,setOpen:f,children:(0,x.jsx)("div",{className:Oe,children:(0,x.jsxs)(i.Zb,{className:"default"===h?Pe:De,children:["default"===h&&(0,x.jsx)(de,{form:t,setForm:o,tab:h,setTab:p,setShow:f}),"default"!==h&&(0,x.jsx)("button",{className:Te,onClick:function(){return p("default")},children:"BACK"}),"nearby"===h&&(0,x.jsx)(je,{onChange:_}),"previous"===h&&(0,x.jsx)(Ie,{onChange:_})]})})}),(0,x.jsx)(i.oi,{value:null!==(n=null===t||void 0===t?void 0:t.location)&&void 0!==n?n:"",label:c("location"),readOnly:!0,onFocus:function(){return f(!0)}})]})},Me=(0,r.memo)(Be),Ee="DesktopLocationInput_container__vu2O1",Je="DesktopLocationInput_input-container__KCH7X",Ae="DesktopLocationInput_preview__k4WEG",Ue="DesktopLocationInput_select__ACBvb",Ve=function(e){var n,t=e.form,a=e.onChange,o=e.setForm,c=(0,S.$)().t,u=(0,r.useState)(!1),l=(0,s.Z)(u,2),d=l[0],f=l[1],v=(0,r.useState)("nearby"),m=(0,s.Z)(v,2),h=m[0],p=m[1];return(0,x.jsxs)("div",{className:Ee,children:[(0,x.jsx)(i.u_,{open:d,setOpen:f,children:(0,x.jsxs)("div",{className:Je,children:[(0,x.jsx)(i.Zb,{className:Ae,children:(0,x.jsx)(de,{form:t,setForm:o,tab:h,setTab:p,setShow:f})}),(0,x.jsx)(i.Zb,{className:Ue,children:"nearby"===h?(0,x.jsx)(je,{onChange:a}):(0,x.jsx)(Ie,{onChange:a})})]})}),(0,x.jsx)(i.oi,{value:null!==(n=null===t||void 0===t?void 0:t.location)&&void 0!==n?n:"",label:c("location"),readOnly:!0,onFocus:function(){return f(!0)}})]})},We=(0,r.memo)(Ve),$e=function(e){return"phone"===(0,oe.Fy)()?(0,x.jsx)(Me,(0,a.Z)({},e)):(0,x.jsx)(We,(0,a.Z)({},e))},qe=(0,r.memo)($e)},9512:function(e,n,t){var a=t(1413),r=t(2982),i=t(885),o=t(2791),s=t(4672),c=t(4674),u=t(910);n.Z=function(){var e,n=(0,o.useContext)(c.Z),t=(0,i.Z)(n,1)[0],l=(0,o.useState)(null!==(e=JSON.parse(localStorage.getItem("autofill")))&&void 0!==e?e:[]),d=(0,i.Z)(l,2),f=d[0],v=d[1],m=(0,o.useCallback)((function(){var e;v(null!==(e=JSON.parse(localStorage.getItem("autofill")))&&void 0!==e?e:[])}),[]),h=(0,o.useCallback)((function(e){var n=[(0,a.Z)((0,a.Z)({},e),{},{value:e.name+(new Date).toISOString()})].concat((0,r.Z)(f));(0,s.bC)(n,t.uid,(function(){(0,u.yg)(),m()}))}),[f,t.uid,m]),p=(0,o.useCallback)((function(e){var n=(0,r.Z)(f).filter((function(n){return n.value!==e}));(0,s.bC)(n,t.uid,(function(){(0,u.__)(),m()}))}),[f,t.uid,m]);return{autofill:f,add:h,remove:p}}},1097:function(e,n,t){t.d(n,{H:function(){return m},p:function(){return h.Z}});var a=t(5861),r=t(4942),i=t(1413),o=t(885),s=t(7757),c=t.n(s),u=t(2791),l=t(6871),d=t(4674),f=t(4672),v={image:"",price:0,date:(new Date).toISOString()},m=function(){var e=(0,l.TH)().state,n=(0,l.s0)(),t=(0,l.UO)().id,s=(0,u.useContext)(d.Z),m=(0,o.Z)(s,1)[0],h=(0,u.useState)(v),p=(0,o.Z)(h,2),_=p[0],g=p[1],x=(0,u.useState)(!1),b=(0,o.Z)(x,2),j=b[0],Z=b[1],N=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:80;if("function"===typeof t){if(!t(n))return}else if(n.length>=t)return;g((function(t){return(0,i.Z)((0,i.Z)({},t),{},(0,r.Z)({},e,n))}))},y=function(){var e=(0,a.Z)(c().mark((function e(a){var r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),Z(!0),r=(0,i.Z)((0,i.Z)({},_),{},{date:new Date(_.date).toISOString(),price:parseInt(100*parseFloat(_.price))}),t){e.next=8;break}return e.next=6,(0,f.IH)({drink:r},m.uid);case 6:e.next=10;break;case 8:return e.next=10,(0,f.eP)({drink:r},t,m.uid);case 10:g(v),Z(!1),n("/history");case 13:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,u.useEffect)((function(){if(t){var e=JSON.parse(localStorage.getItem(t));if(!e)return n("/add");e.price=e.price/100,g(e)}}),[t,n]),(0,u.useEffect)((function(){null!==e&&void 0!==e&&e.address&&null!==e&&void 0!==e&&e.location&&g((0,i.Z)((0,i.Z)({},v),{},{address:e.address,location:e.location}))}),[e]),{disabled:j,form:_,id:t,setForm:g,editForm:N,handleChange:function(e,n){return function(t){t.preventDefault(),N(e,t.target.value,n)}},submit:y}},h=t(9512)}}]);
//# sourceMappingURL=335.2a4dae56.chunk.js.map