(this["webpackJsonpboba-watch"]=this["webpackJsonpboba-watch"]||[]).push([[14],{264:function(t,e,n){"use strict";n.r(e);var c=n(9),a=n(8),r=n(47),o=n(1),u=n.n(o),l=n(304),i=n(295),s=["children","className","id","placeholder","style","whenCreated"];function b(){return(b=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var c in n)Object.prototype.hasOwnProperty.call(n,c)&&(t[c]=n[c])}return t}).apply(this,arguments)}function d(t){var e=t.children,n=t.className,c=t.id,d=t.placeholder,j=t.style,f=t.whenCreated,O=Object(r.a)(t,s),v=Object(o.useRef)(null),m=function(t,e){var n=Object(o.useState)(null),c=Object(a.a)(n,2),r=c[0],u=c[1];return Object(o.useEffect)((function(){if(null!==t.current&&null===r){var n=new i.Map(t.current,e);null!=e.center&&null!=e.zoom?n.setView(e.center,e.zoom):null!=e.bounds&&n.fitBounds(e.bounds,e.boundsOptions),null!=e.whenReady&&n.whenReady(e.whenReady),u(n)}}),[t,r,e]),r}(v,O),h=Object(o.useRef)(!1);Object(o.useEffect)((function(){null!=m&&!1===h.current&&null!=f&&(h.current=!0,f(m))}),[m,f]);var p=Object(o.useState)({className:n,id:c,style:j}),y=Object(a.a)(p,1)[0],g=Object(o.useMemo)((function(){return m?{__version:l.a,map:m}:null}),[m]),x=g?u.a.createElement(l.b,{value:g},e):null!==d&&void 0!==d?d:null;return u.a.createElement("div",b({},y,{ref:v}),x)}var j=n(497),f=n(326);var O=["url"],v=Object(j.c)((function(t,e){var n=t.url,c=Object(r.a)(t,O);return{instance:new i.TileLayer(n,Object(f.a)(c,e)),context:e}}),(function(t,e,n){var c=e.opacity,a=e.zIndex;null!=c&&c!==n.opacity&&t.setOpacity(c),null!=a&&a!==n.zIndex&&t.setZIndex(a)})),m=n(19),h=n(39),p=n(355),y=n(509),g=n(282),x=n(465),_=n.n(x),w=n(464),z=n.n(w),C=n(2),E=function(t){var e=t.setPosition,n=Object(g.a)(),c=Object(p.a)(),a=Object(o.useCallback)((function(){if(!(null===n||void 0===n?void 0:n.lat)&&!(null===n||void 0===n?void 0:n.lng))return null;e([n.lat,n.lng]),c.flyTo([n.lat,n.lng],13,{animate:!0,duration:1})}),[n,c,e]);return Object(o.useEffect)(a,[a]),Object(C.jsxs)(C.Fragment,{children:[(null===n||void 0===n?void 0:n.lat)&&(null===n||void 0===n?void 0:n.lng)&&Object(C.jsx)(y.a,{center:[n.lat,n.lng],radius:5,fill:!0,color:"#B64040",fillColor:"#B64040",fillOpacity:"1"}),Object(C.jsx)("button",{className:z.a.button,onClick:a,children:Object(C.jsx)(_.a,{})})]})},N=Object(o.memo)(E),k=function(t){var e=t.center,n=Object(p.a)();return Object(o.useEffect)((function(){n.flyTo(e,13,{animate:!0,duration:.5})}),[e,n]),Object(C.jsx)("div",{})},B=n(466),M=n.n(B),R=(n(467),["className","children","center","theme","hasCenterButton"]),P=[40.4637,-3.7492],S=function(t){var e=t.className,n=t.children,u=void 0===n?function(){}:n,l=t.center,i=t.theme,s=t.hasCenterButton,b=void 0===s||s,j=Object(r.a)(t,R),f=Object(o.useState)(null),O=Object(a.a)(f,2),p=O[0],y=O[1];return Object(C.jsx)(h.a,{className:Object(m.a)(e),children:Object(C.jsxs)(d,Object(c.a)(Object(c.a)({className:M.a.container,center:null!==l&&void 0!==l?l:P,minZoom:2.5,attributionControl:!1},j),{},{children:[l&&Object(C.jsx)(k,{center:l}),b&&Object(C.jsx)(N,{setPosition:y}),u(p),"dark"===i&&Object(C.jsx)(v,{url:"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"}),"default"===i&&Object(C.jsx)(v,{url:"https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"})]}))})};e.default=Object(o.memo)(S)},282:function(t,e,n){"use strict";var c=n(9),a=n(8),r=n(1);e.a=function(){var t=Object(r.useState)({}),e=Object(a.a)(t,2),n=e[0],o=e[1],u=Object(r.useState)(null),l=Object(a.a)(u,2),i=l[0],s=l[1],b=function(t){s(t.message)},d=function(t){var e=t.coords,n=t.timestamp;o({accuracy:e.accuracy,alt:e.altitude,altitudeAccuracy:e.altitudeAccuracy,heading:e.heading,lat:e.latitude,lng:e.longitude,timestamp:n})};return Object(r.useEffect)((function(){navigator&&navigator.geolocation?navigator.geolocation.getCurrentPosition(d,b,{}):s("Geolocation is not supported")}),[]),Object(c.a)(Object(c.a)({},n),{},{error:i})}},355:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var c=n(304);n(1);function a(){return Object(c.c)().map}},464:function(t,e,n){t.exports={user:"UserLocationButton_user__G4iya",button:"UserLocationButton_button__zjyku"}},465:function(t,e,n){"use strict";var c=n(72),a=n(74);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n(1)),o=(0,c(n(73)).default)(r.createElement("path",{d:"M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V2c0-.55-.45-1-1-1s-1 .45-1 1v1.06C6.83 3.52 3.52 6.83 3.06 11H2c-.55 0-1 .45-1 1s.45 1 1 1h1.06c.46 4.17 3.77 7.48 7.94 7.94V22c0 .55.45 1 1 1s1-.45 1-1v-1.06c4.17-.46 7.48-3.77 7.94-7.94H22c.55 0 1-.45 1-1s-.45-1-1-1h-1.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"}),"MyLocationRounded");e.default=o},466:function(t,e,n){t.exports={container:"Map_container__2Zv1j"}},467:function(t,e,n){}}]);
//# sourceMappingURL=14.9b4a5085.chunk.js.map