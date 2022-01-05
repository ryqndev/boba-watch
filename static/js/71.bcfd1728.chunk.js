"use strict";(self.webpackChunkboba_watch=self.webpackChunkboba_watch||[]).push([[71],{2071:function(n,e,t){t.r(e),t.d(e,{default:function(){return _}});var r=t(1413),a=t(885),o=t(5987),i=t(2791),c=t(4666),l=t(8559),u=["children","className","id","placeholder","style","whenCreated"];function s(){return s=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},s.apply(this,arguments)}function d(n){var e=n.children,t=n.className,r=n.id,d=n.placeholder,f=n.style,p=n.whenCreated,v=(0,o.Z)(n,u),m=(0,i.useRef)(null),h=function(n,e){var t=(0,i.useState)(null),r=(0,a.Z)(t,2),o=r[0],c=r[1];return(0,i.useEffect)((function(){if(null!==n.current&&null===o){var t=new l.Map(n.current,e);null!=e.center&&null!=e.zoom?t.setView(e.center,e.zoom):null!=e.bounds&&t.fitBounds(e.bounds,e.boundsOptions),null!=e.whenReady&&t.whenReady(e.whenReady),c(t)}}),[n,o,e]),o}(m,v),y=(0,i.useRef)(!1);(0,i.useEffect)((function(){null!=h&&!1===y.current&&null!=p&&(y.current=!0,p(h))}),[h,p]);var x=(0,i.useState)({className:t,id:r,style:f}),g=(0,a.Z)(x,1)[0],b=(0,i.useMemo)((function(){return h?{__version:c.cV,map:h}:null}),[h]),Z=b?i.createElement(c.UO,{value:b},e):null!==d&&void 0!==d?d:null;return i.createElement("div",s({},g,{ref:m}),Z)}var f=t(203),p=t(1003);var v=["url"],m=(0,f.Lf)((function(n,e){var t=n.url,r=(0,o.Z)(n,v);return{instance:new l.TileLayer(t,(0,p.q)(r,e)),context:e}}),(function(n,e,t){var r=e.opacity,a=e.zIndex;null!=r&&r!==t.opacity&&n.setOpacity(r),null!=a&&a!==t.zIndex&&n.setZIndex(a)})),h=t(8182),y=t(6433),x=t(4788),g="Map_container__b72Db",b=t(184),Z=["className","children","center","theme","hasCenterButton"],j=[40.4637,-3.7492],C=function(n){var e=n.className,t=n.children,c=void 0===t?function(){}:t,l=n.center,u=n.theme,s=n.hasCenterButton,f=void 0===s||s,p=(0,o.Z)(n,Z),v=(0,i.useState)(null),C=(0,a.Z)(v,2),_=(C[0],C[1]);return(0,b.jsx)(y.Zb,{className:(0,h.Z)(e),children:(0,b.jsxs)(d,(0,r.Z)((0,r.Z)({className:g,center:null!==l&&void 0!==l?l:j,minZoom:2.5,attributionControl:!1},p),{},{children:[l&&(0,b.jsx)(x.SJ,{center:l}),f&&(0,b.jsx)(x.ul,{setPosition:_}),c,"dark"===u&&(0,b.jsx)(m,{url:"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"}),"light"===u&&(0,b.jsx)(m,{url:"https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"})]}))})},_=(0,i.memo)(C)},4788:function(n,e,t){t.d(e,{SJ:function(){return v},ul:function(){return p},df:function(){return b}});var r=t(8182),a=t(2791),o=t(1768),i=t(500),c=t(5026),l=t(2333),u="UserLocationButton_button__mgCvr",s="UserLocationButton_center__59pZY",d=t(184),f=function(n){var e=n.setPosition,t=(0,c.Z)(),f=(0,o.Sx)(),p=(0,a.useCallback)((function(){if(null===t||void 0===t||!t.lat||null===t||void 0===t||!t.lng)return null;e([t.lat,t.lng]),f.flyTo([t.lat,t.lng],13,{animate:!0,duration:1})}),[t,f,e]);return(0,a.useEffect)(p,[p]),(0,d.jsxs)(d.Fragment,{children:[(null===t||void 0===t?void 0:t.lat)&&(null===t||void 0===t?void 0:t.lng)&&(0,d.jsx)(i.c,{center:[t.lat,t.lng],radius:5,fill:!0,color:"#B64040",fillColor:"#B64040",fillOpacity:"1"}),(0,d.jsx)("button",{className:(0,r.Z)(u,s),onClick:p,children:(0,d.jsx)(l.Z,{})})]})},p=(0,a.memo)(f),v=function(n){var e=n.center,t=(0,o.Sx)();return(0,a.useEffect)((function(){t.flyTo(e,13,{animate:!0,duration:.5})}),[e,t]),(0,d.jsx)("div",{})},m=t(2840),h=t(2690),y=t(1951),x="VisitedLocations_container__kuIJ6",g=function(n){var e=n.drinks,t=(0,h.b)(e).locations;return(0,d.jsx)(d.Fragment,{children:t.map((function(n){var e=n.coordinates,t=n.drinks,r=n.location;return(0,d.jsx)(i.c,{center:e,radius:10,fill:!0,weight:1,color:"#F68080",fillColor:"#F68080",fillOpacity:"0.5",children:(0,d.jsx)(m.G,{children:(0,d.jsxs)("div",{className:x,children:[(0,d.jsx)("h2",{children:r}),(0,d.jsxs)("p",{children:["Visited ",(0,d.jsx)("span",{children:t.length})," times"]}),(0,d.jsx)("p",{children:"Recent visits:"}),t.slice(0,5).map((function(n){var e=n.date;return(0,d.jsx)("div",{children:(0,y.Z)(new Date(e),"MMM d, yyyy h:mm a")},e)}))]})})},JSON.stringify(e)+r)}))})},b=(0,a.memo)(g)},2690:function(n,e,t){t.d(e,{b:function(){return c}});var r=t(5987),a=t(885),o=t(2791),i=["location","id","address","date"],c=function(n){var e=(0,o.useState)([]),t=(0,a.Z)(e,2),c=t[0],l=t[1];return(0,o.useEffect)((function(){l(Object.values(n.reduce((function(n,e){var t=e.location,a=e.id,o=e.address,c=e.date;(0,r.Z)(e,i);if(null===o||void 0===o||!o.lat||null===o||void 0===o||!o.lng)return n;var l=Number(o.lat).toFixed(6),u=Number(o.lng).toFixed(6),s="".concat(l,",").concat(u).concat(t);return isNaN(l)||isNaN(u)||(n.hasOwnProperty(s)?n[s].drinks.push({id:a,date:c}):n[s]={coordinates:[l,u],location:t,address:o,drinks:[{id:a,date:c}]}),n}),{})))}),[n]),{locations:c}}},5026:function(n,e,t){var r=t(1413),a=t(885),o=t(2791);e.Z=function(){var n=(0,o.useState)({}),e=(0,a.Z)(n,2),t=e[0],i=e[1],c=(0,o.useState)(null),l=(0,a.Z)(c,2),u=l[0],s=l[1],d=function(n){s(n.message)},f=function(n){var e=n.coords,t=n.timestamp;i({accuracy:e.accuracy,alt:e.altitude,altitudeAccuracy:e.altitudeAccuracy,heading:e.heading,lat:e.latitude,lng:e.longitude,timestamp:t})};return(0,o.useEffect)((function(){navigator&&navigator.geolocation?navigator.geolocation.getCurrentPosition(f,d,{}):s("Geolocation is not supported")}),[]),(0,r.Z)((0,r.Z)({},t),{},{error:u})}},2333:function(n,e,t){var r=t(5318),a=t(862);e.Z=void 0;var o=a(t(2791)),i=(0,r(t(4894)).default)(o.createElement("path",{d:"M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V2c0-.55-.45-1-1-1s-1 .45-1 1v1.06C6.83 3.52 3.52 6.83 3.06 11H2c-.55 0-1 .45-1 1s.45 1 1 1h1.06c.46 4.17 3.77 7.48 7.94 7.94V22c0 .55.45 1 1 1s1-.45 1-1v-1.06c4.17-.46 7.48-3.77 7.94-7.94H22c.55 0 1-.45 1-1s-.45-1-1-1h-1.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"}),"MyLocationRounded");e.Z=i},2840:function(n,e,t){t.d(e,{G:function(){return i}});var r=t(203),a=t(8559),o=t(2791),i=(0,r.SO)((function(n,e){return{instance:new a.Popup(n,e.overlayContainer),context:e}}),(function(n,e,t,r){var a=t.onClose,i=t.onOpen,c=t.position;(0,o.useEffect)((function(){var t=n.instance;function o(n){n.popup===t&&(t.update(),r(!0),null==i||i())}function l(n){n.popup===t&&(r(!1),null==a||a())}return e.map.on({popupopen:o,popupclose:l}),null==e.overlayContainer?(null!=c&&t.setLatLng(c),t.openOn(e.map)):e.overlayContainer.bindPopup(t),function(){e.map.off({popupopen:o,popupclose:l}),e.map.removeLayer(t)}}),[n,e,r,a,i,c])}))},1768:function(n,e,t){t.d(e,{Sx:function(){return a}});var r=t(4666);t(2791);function a(){return(0,r.mE)().map}}}]);
//# sourceMappingURL=71.bcfd1728.chunk.js.map