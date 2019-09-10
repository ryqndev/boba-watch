(window["webpackJsonpboba-watch"]=window["webpackJsonpboba-watch"]||[]).push([[0],{163:function(e,t,a){},164:function(e,t,a){},242:function(e,t,a){e.exports=a(417)},247:function(e,t,a){},259:function(e,t,a){},384:function(e,t,a){},414:function(e,t,a){},415:function(e,t,a){},416:function(e,t,a){},417:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(24),i=a.n(o),c=(a(247),a(41)),l=a(25),s=a(56),d=a(18),u=a(19),m=a(21),p=a(20),h=a(22),g=a(44),f=a(7),b=a(49);var v={toMoney:function(e){return arguments.length>1&&void 0!==arguments[1]&&arguments[1]?parseInt(e/100):Number(e/100).toFixed(2)}},y=(a(259),a(127),["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]),k=["1 AM","2 AM","3 AM","4 AM","5 AM","6 AM","7 AM","8 AM","9 AM","10 AM","11 AM","12 AM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM","9 PM","10 PM","11 PM","12 PM"],S=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={time:e.data,width:e.width},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"parseTimeData",value:function(e){var t=[],a=[];e.forEach(function(e){a.push(Math.max.apply(null,e))});var n=Math.max.apply(null,a);return e.forEach(function(e,a){e.forEach(function(e,r){t.push({x:y[a],y:k[r],color:"rgba(246, 128, 128, ".concat(0===e?.1:e/n,")")})})}),t}},{key:"render",value:function(){var e=this.props.width;return r.a.createElement(f.d,{className:"daily-chart"},r.a.createElement(b.d,{xType:"ordinal",yType:"ordinal",margin:60,width:e,height:1.8*e},r.a.createElement(b.c,{orientation:"top"}),r.a.createElement(b.e,null),r.a.createElement(b.a,{colorType:"literal",style:{stroke:"white",strokeWidth:"2px",rectStyle:{rx:10,ry:10}},data:this.parseTimeData(this.props.data)})))}}]),t}(n.Component),E=function(e){function t(e){var a;Object(d.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).update=function(){var e=JSON.parse(localStorage.getItem("metrics")),t=JSON.parse(localStorage.getItem("completeMetrics")),n=localStorage.getItem("userDrinkMax");a.setState({totalCost:e.tc,totalDrinks:e.td,drinkPercentage:parseInt(e.td/n*100),userDrinkMax:n,userSpendMax:localStorage.getItem("userSpendMax"),sunburstData:{size:0,color:"#FFFFFF",children:[{title:"Progress",size:e.tc,color:"#32de44",children:[{title:"Padding",size:0,color:"#FFFFFF"}]},{title:"Until Limit",size:localStorage.getItem("userSpendMax")-e.tc,color:"#F4F4F4"}]},cmetrics:t,screenWidth:window.innerWidth-40})},a.componentDidMount=function(){window.addEventListener("resize",function(){a.setState({screenWidth:window.innerWidth-40})})},a.isLandscape=function(){return window.innerWidth/window.innerHeight>1.625&&window.innerHeight>700&&window.innerWidth>1200};var n=JSON.parse(localStorage.getItem("metrics")),r=JSON.parse(localStorage.getItem("completeMetrics")),o=localStorage.getItem("userDrinkMax");return a.state={totalCost:n.tc,totalDrinks:n.td,drinkPercentage:parseInt(n.td/o*100),userDrinkMax:o,userSpendMax:localStorage.getItem("userSpendMax"),sunburstData:{size:0,color:"#FFFFFF",children:[{title:"Progress",size:n.tc,color:"#32de44",children:[{title:"Padding",size:0,color:"#FFFFFF"}]},{title:"Until Limit",size:localStorage.getItem("userSpendMax")-n.tc,color:"#F4F4F4"}]},cmetrics:r,screenWidth:window.innerWidth-40},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.state,t=e.screenWidth,a=this.isLandscape()?.9*window.innerHeight:t;return r.a.createElement("div",{className:"dashboard-page"},r.a.createElement(f.k,{variant:"h4",className:"dashboard-page--title"},"Monthly Spending"),r.a.createElement(f.d,{id:"chart-holder"},r.a.createElement("div",{className:"chart-holder-description"},"MONTHLY LIMIT: $",v.toMoney(e.userSpendMax,e.userSpendMax/1e4>1),r.a.createElement("br",null),r.a.createElement("span",null,"$",v.toMoney(e.totalCost,e.totalCost/1e4>1)),r.a.createElement("br",null),"REMAINING: $",v.toMoney(e.userSpendMax-e.totalCost)),r.a.createElement(b.b,{height:a-(this.isLandscape()?105:45),width:a-45,data:e.sunburstData,padAngle:.06,animation:!0,colorType:"literal"})),r.a.createElement(f.d,{className:"month-total-money"},r.a.createElement("p",null,"This is how much you\u2019ve spent on boba this month:"),r.a.createElement(f.k,{variant:"h2"},"$",v.toMoney(e.totalCost,e.totalCost/1e4>1))),r.a.createElement(f.d,{className:"month-drink-limit",style:{backgroundPositionY:2.7*(100-e.drinkPercentage)}},r.a.createElement(f.k,{variant:"h3"},e.drinkPercentage,"%"),r.a.createElement("p",null,"to your max number of drinks this month")),r.a.createElement(f.d,{className:"month-total-drinks"},r.a.createElement(f.k,{variant:"h2"},e.totalDrinks),r.a.createElement("p",null,"drinks this month")),r.a.createElement(S,{data:e.cmetrics.d,width:this.isLandscape()?t/4+20:t}))}}]),t}(n.Component),F=a(26),w=a.n(F),O=(a(384),a(176)),N=a(124),M=a(57),I=a.n(M);function D(){for(var e={td:0,tc:0,ad:0,d:Array(7)},t=0;t<7;t++)e.d[t]=Array(24).fill(0);return e}function j(e,t){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];t.td+=a?1:-1,t.tc+=a?parseFloat(e.price):-1*parseFloat(e.price),t.ad=parseFloat(t.tc)/parseFloat(t.td);var n=new Date(e.date);t.d[n.getDay()][n.getHours()-1]+=a?1:-1}var x,C,P={getDefaultMetrics:D,recalculateMetrics:function(e){var t=D(),a=D(),n=new Date,r=n.getMonth(),o=n.getFullYear();return e.forEach(function(e){var n=new Date(e.date);n.getMonth()===r&&n.getFullYear()===o&&j(e,t),j(e,a)}),localStorage.setItem("metrics",JSON.stringify(t)),localStorage.setItem("completeMetrics",JSON.stringify(a)),t},updateMetrics:j,addDrink:function(e,t){var a=JSON.parse(localStorage.getItem("metrics")),n=JSON.parse(localStorage.getItem("completeMetrics")),r=JSON.parse(localStorage.getItem("drinkids"));e.drink.id=t,r.length?function e(t,a,n,r,o){if(o<=r)return n.splice(a<new Date(JSON.parse(localStorage.getItem(n[r])).date)?r+1:r,0,t);var i=parseInt((o-r)/2+r),c=new Date(JSON.parse(localStorage.getItem(n[i])).date);return a.getTime()===c.getTime()?n.splice(i+1,0,t):a<c?e(t,a,n,i+1,o):e(t,a,n,r,i-1)}(t,new Date(e.drink.date),r,0,r.length-1):r.push(t),j(e.drink,a),j(e.drink,n),localStorage.setItem(t,JSON.stringify(e.drink)),localStorage.setItem("metrics",JSON.stringify(a)),localStorage.setItem("completeMetrics",JSON.stringify(n)),localStorage.setItem("drinkids",JSON.stringify(r))},deleteDrink:function(e){var t=JSON.parse(localStorage.getItem("metrics")),a=JSON.parse(localStorage.getItem("completeMetrics")),n=JSON.parse(localStorage.getItem("drinkids")),r=JSON.parse(localStorage.getItem(e)),o=new Date,i=o.getMonth(),c=o.getFullYear(),l=new Date(r.date);l.getMonth()===i&&l.getFullYear()===c&&j(r,t,!1),j(r,a,!1);var s=n.indexOf(e);s>-1&&n.splice(s,1),localStorage.removeItem(e),localStorage.setItem("metrics",JSON.stringify(t)),localStorage.setItem("completeMetrics",JSON.stringify(a)),localStorage.setItem("drinkids",JSON.stringify(n))}},A=a(38);a(385),a(387);function L(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function J(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?L(a,!0).forEach(function(t){Object(s.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):L(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var T=function(){},W={init:function(){return{drinks:[],drinkids:[]}},each:function(e){return localStorage.setItem(e.id,JSON.stringify(J({},e.data().drink,{id:e.id}))),[{key:"drinks",value:J({},e.data().drink,{id:e.id})},{key:"drinkids",value:e.id}]},end:function(e){localStorage.setItem("drinkids",JSON.stringify(e.drinkids)),P.recalculateMetrics(e.drinks)}},z=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:T;x.collection("users").doc(localStorage.getItem("uid")).collection("user").doc("stats").set(e).then(function(e){t(e)}).catch(function(e){w()("Error!","".concat(e),"error"),t(e)})},B={init:function(){(x=A.firestore()).enablePersistence(),C=new A.auth.FacebookAuthProvider},login:{isLoggedIn:function(e){A.auth().onAuthStateChanged(function(t){e(!!t)})},attempt:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T;A.auth().signInWithRedirect(C).then(function(t){e(t)}).catch(function(e){w()("Error!","Login Unsuccessful: ".concat(e),"error")})},check:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:T;A.auth().getRedirectResult().then(function(a){a.credential?e(a):t()}).catch(function(e){w()("Error!","Login Unsuccessful: ".concat(e),"error")})}},logout:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T;A.auth().signOut().then(function(){e()}).catch(function(e){w()("Error!","Login Unsuccessful: ".concat(e),"error")})},user:{setup:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t={budget:1e4,maxDrinks:15,public:!1};x.collection("users").doc(localStorage.getItem("uid")).collection("user").doc("profile").set(t).then(function(a){localStorage.setItem("userSpendMax",t.budget),localStorage.setItem("userDrinkMax",t.maxDrinks),localStorage.setItem("userPublic",t.public),e(a)}).catch(function(e){w()("Error!","Error setting up your account: ".concat(e),"error")})},get:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T;x.collection("users").doc(localStorage.getItem("uid")).collection("user").doc("profile").get().then(function(t){var a=t.data();localStorage.setItem("userSpendMax",parseInt(a.budget)),localStorage.setItem("userDrinkMax",parseInt(a.limit)),localStorage.setItem("userPublic",a.public),e(t)}).catch(function(e){w()("Error!","".concat(e),"error")})},update:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:T,a={public:e.userPublic,budget:100*parseFloat(e.userSpendMax),limit:parseInt(e.userDrinkMax)};isNaN(a.budget)||isNaN(a.limit)?w()("Error!","Please enter valid numbers","error"):x.collection("users").doc(localStorage.getItem("uid")).collection("user").doc("profile").set(a).then(function(e){localStorage.setItem("userSpendMax",a.budget),localStorage.setItem("userDrinkMax",a.limit),localStorage.setItem("userPublic",a.public),w()("Success!","Your settings have been updated","success").then(function(a){t(a,e)})}).catch(function(e){w()("Error!","".concat(e),"error")})},updateStats:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t=JSON.parse(localStorage.getItem("metrics")),a=JSON.parse(localStorage.getItem("completeMetrics"));delete t.d,t.ctd=a.td,t.ctc=a.tc,t.cad=a.ad,t.d=JSON.stringify(a.d),t.fn=localStorage.getItem("fname"),z(t,e)}},drinks:{get:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:W,a=t.init();x.collection("users/".concat(localStorage.getItem("uid"),"/drinks")).orderBy("drink.date","desc").get().then(function(n){n.forEach(function(e){t.each(e).forEach(function(e){a[e.key].push(e.value)})}),t.end(a),e()})},add:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:T;x.collection("users/".concat(localStorage.getItem("uid"),"/drinks")).add(e).then(function(e){w()("Done!","Drink has been added","success"),t(e)}).catch(function(e){w()("Error!","".concat(e),"error")})},delete:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:T;x.collection("users/".concat(localStorage.getItem("uid"),"/drinks")).doc(e).delete().then(function(e){w()("Done!","Drink has been deleted","success"),t()}).catch(function(e){console.log(e),w()("Error!","Couldn't delete your drink. Try again later!","error")})}}},U=function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={selectedDate:new Date},a.handleDateChange=function(e){a.setState({selectedDate:e})},a.update=function(e){document.getElementById("add-drink--button").disabled=!1,e.get().then(function(e){a.addLocally(e.data(),e.id)})},a.addLocally=function(e,t){P.addDrink(e,t),B.user.updateStats(),a.props.close(),a.setState({selectedDate:new Date})},a.addDrink=function(){document.getElementById("add-drink--button").disabled=!0;var e={drink:{name:document.getElementById("name-value").value,location:document.getElementById("location-value").value,price:parseInt(100*parseFloat(document.getElementById("price-value").value)),date:new Date(document.getElementById("date-value").value).toISOString(),description:document.getElementById("description-value").value}};if(isNaN(e.drink.price))return w()("Error!","Please enter a valid price to add drink","error"),void(document.getElementById("add-drink--button").disabled=!1);B.drinks.add(e,a.update)},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(f.g,{open:this.props.open},r.a.createElement("div",{className:"add-modal"},r.a.createElement(f.f,{color:"secondary",className:"close-button",onClick:this.props.close},r.a.createElement(I.a,{color:"secondary",style:{fontSize:14}})),r.a.createElement(f.k,{variant:"h5",style:{textAlign:"center"}},"Add a purchase"),r.a.createElement(f.j,{id:"location-value",className:"add-input",label:"Location",inputProps:{maxLength:250}}),r.a.createElement(f.j,{id:"name-value",className:"add-input",margin:"dense",label:"Drink name",inputProps:{maxLength:80}}),r.a.createElement(f.j,{id:"price-value",className:"add-input",margin:"dense",label:"Price",inputProps:{maxLength:30},type:"number",pattern:"^-?[0-9]\\d*\\.?\\d*$"}),r.a.createElement(N.b,{utils:O.a},r.a.createElement(N.a,{id:"date-value",className:"add-input",margin:"dense",format:"M/d/yyyy h:mm a",label:"Date picker",value:this.state.selectedDate,onChange:this.handleDateChange,inputProps:{maxLength:100}})),r.a.createElement(f.j,{id:"description-value",className:"add-input",label:"Description",inputProps:{maxLength:1e3}}),r.a.createElement("div",{className:"add-button-holder"},r.a.createElement(f.c,{id:"add-drink--button",onClick:this.addDrink,className:"add-button"},"ADD"))))}}]),t}(n.Component),R=Object(g.f)(U),$=a(169),Y=a(170),H=a.n(Y),G=(a(414),function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={copiedNotification:!1},a.closeSnackbar=function(){a.setState({copiedNotification:!1})},a.copy=function(){a.setState({copiedNotification:!0})},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"clipboard"},r.a.createElement("div",{className:"clipboard-text",id:"copy-me"},this.props.text),r.a.createElement($.CopyToClipboard,{text:this.props.text},r.a.createElement(f.f,{style:{padding:0},className:"clipboard-icon",onClick:this.copy},r.a.createElement(H.a,{style:{fontSize:14}}))),r.a.createElement(f.h,{anchorOrigin:{vertical:"bottom",horizontal:"center"},open:this.state.copiedNotification,autoHideDuration:6e3,onClose:this.closeSnackbar,message:r.a.createElement("span",null,"Link Copied!")}))}}]),t}(n.Component)),Q=(a(415),{color:"#FF0000",border:"1px solid red",boxShadow:"none",backgroundColor:"#FFFFFF"}),V=function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).defaultState=function(){return{userSpendMax:localStorage.getItem("userSpendMax")/100,userDrinkMax:localStorage.getItem("userDrinkMax"),userPublic:"true"===localStorage.getItem("userPublic")}},a.state=a.defaultState(),a.logout=function(){B.logout(function(){localStorage.clear(),window.location=window.location.origin})},a.handleChange=function(e){return function(t){a.setState(Object(s.a)({},e,t.target.value))}},a.handleToggle=function(){a.setState(function(e){return{userPublic:!e.userPublic}},function(){B.user.update(a.state,a.close)})},a.close=function(){a.props.close(),a.setState(a.defaultState())},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.state;return r.a.createElement(f.g,{open:this.props.open},r.a.createElement("div",{className:"user-modal",style:{height:t.userPublic?385:350}},r.a.createElement(f.f,{color:"secondary",className:"close-button",onClick:function(){e.close()}},r.a.createElement(I.a,{color:"secondary",style:{fontSize:14}})),r.a.createElement("img",{src:localStorage.getItem("avatar"),className:"user-avatar",alt:"user"}),r.a.createElement(f.k,{variant:"h5",style:{textAlign:"center"}},"User settings"),r.a.createElement(f.j,{id:"monthly-spending-input",type:"tel",pattern:"^-?[0-9]\\d*\\.?\\d*$",className:"user-input",variant:"outlined",margin:"normal",onChange:this.handleChange("userSpendMax"),value:t.userSpendMax,label:"Monthly Spending Limit"}),r.a.createElement(f.j,{id:"monthly-drinking-limit",type:"tel",pattern:"^-?[0-9]\\d*\\.?\\d*$",className:"user-input",margin:"dense",variant:"outlined",onChange:this.handleChange("userDrinkMax"),value:t.userDrinkMax,label:"Max of drinks / month"}),r.a.createElement("div",{className:"user-share-profile"},"Share Profile:",r.a.createElement(f.i,{checked:t.userPublic,onClick:this.handleToggle,label:"Share Profile",color:"primary"})),r.a.createElement(f.e,{in:t.userPublic},r.a.createElement(G,{text:"https://share.boba.watch/#/".concat(localStorage.getItem("uid"))})),r.a.createElement("div",{className:"update-button-holder"},r.a.createElement(f.c,{className:"logout-button",variant:"text",onClick:this.logout,style:Q},"LOGOUT"),r.a.createElement(f.c,{className:"update-button",onClick:function(){B.user.update(t,e.close)}},"UPDATE"))))}}]),t}(n.Component),X=a(80),_=a.n(X),q=a(172),K=a.n(q),Z=a(171),ee=a.n(Z),te=(a(163),function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(a=Object(m.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).state={open:!1,add:!1},a.toggle=function(){a.setState(function(e){return{open:!e.open}})},a.toggleAdd=function(){a.setState(function(e){return{add:!e.add}})},a.hasImage=function(){if(null!==a.props.data.photo&&""!==a.props.data.photo.trim())return r.a.createElement("img",{alt:"drink",src:a.props.data.photo})},a.delete=function(){B.drinks.delete(a.props.data.id,a.removeLocally)},a.removeLocally=function(){P.deleteDrink(a.props.data.id),a.props.update(),B.user.updateStats()},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=new Date(this.props.data.date);return r.a.createElement("div",{className:"thaman-color"},r.a.createElement("div",{className:"history-drink-label",onClick:this.toggle},r.a.createElement("p",{className:"drink-place"},this.props.data.location.length>13?this.props.data.location.substr(0,10)+"...":this.props.data.location),r.a.createElement("p",{className:"drink-price"},"$",v.toMoney(this.props.data.price)),r.a.createElement("div",{className:"expand-icon"},this.state.open?r.a.createElement(ee.a,null):r.a.createElement(K.a,null)),r.a.createElement("p",{className:"drink-name"},this.props.data.name.length>13?this.props.data.name.substr(0,10)+"...":this.props.data.name),r.a.createElement("p",{className:"drink-time"},new Date(this.props.data.date).toDateString().substr(4))),r.a.createElement(_.a,{in:this.state.open,className:"drink-collapse"},r.a.createElement("p",{className:"drink-label"},this.props.data.name,r.a.createElement("br",null),r.a.createElement("span",null,"@",this.props.data.location)),r.a.createElement("p",{className:"drink-description"},this.props.data.description),r.a.createElement("p",{className:"drink-date"},r.a.createElement("span",null,"on")," ",e.toDateString()),r.a.createElement("div",{className:"drink-options"},r.a.createElement(f.c,{onClick:this.delete},"DELETE"))))}}]),t}(n.Component)),ae=function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(a=Object(m.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).state={monthly:{drinks:[r.a.createElement(f.k,{variant:"h3",key:1},"No drinks this month :(")],sum:0},complete:{drinks:[r.a.createElement(f.k,{variant:"h3",key:1},"Add a drink to start!")],sum:0},monthlyDisplay:10,completeDisplay:5},a.update=function(){var e=JSON.parse(localStorage.getItem("drinkids"));if(Array.isArray(e)&&e.length){e=e.map(function(e){return JSON.parse(localStorage.getItem(e))});var t=[],n=[],o=0,i=0,c=new Date,l=c.getMonth(),s=c.getFullYear(),d=a.state.monthlyDisplay,u=a.state.completeDisplay;e.forEach(function(e,c){var m=new Date(e.date);m.getMonth()===l&&m.getFullYear()===s?(d>0&&(t.push(r.a.createElement(te,{key:e.id,data:e,update:a.update})),d-=1),o+=parseFloat(e.price)):u>0&&(n.push(r.a.createElement(te,{key:e.id,data:e,update:a.update})),u-=1),i+=parseFloat(e.price)}),d<=0&&t.push(r.a.createElement("div",{className:"thaman-color"},r.a.createElement("div",{className:"history-load-more",onClick:a.displayMoreMonthly},"\u2022 \u2022 \u2022"))),u<=0&&n.push(r.a.createElement("div",{className:"thaman-color"},r.a.createElement("div",{className:"history-load-more",onClick:a.displayMoreOverall},"\u2022 \u2022 \u2022"))),a.setState({monthly:{drinks:t,sum:o},complete:{drinks:n,sum:i}})}},a.displayMoreMonthly=function(){a.setState(function(e){return{monthlyDisplay:e.monthlyDisplay+10}},a.update)},a.displayMoreOverall=function(){a.setState(function(e){return{completeDisplay:e.completeDisplay+10}},a.update)},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.update()}},{key:"render",value:function(){return r.a.createElement("div",{className:"history-page"},r.a.createElement(f.k,{variant:"h3"}," Monthly Spending"),r.a.createElement("div",{className:"history-spending"},this.state.monthly.drinks),r.a.createElement(f.k,{variant:"h3",className:"history-total"},r.a.createElement("span",null,"Monthly Total:")," $",v.toMoney(this.state.monthly.sum)),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(f.k,{variant:"h3"}," Overall Spending"),r.a.createElement("div",{className:"history-spending"},this.state.complete.drinks),r.a.createElement(f.k,{variant:"h3",className:"history-total"},r.a.createElement("span",null,"Complete Total:")," $",v.toMoney(this.state.complete.sum)))}}]),t}(n.Component),ne=(a(416),function(){return window.innerHeight/window.innerWidth<1.2}),re=function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={ar:ne()},a.componentDidMount=function(){window.addEventListener("resize",function(){return a.setState({ar:ne()})})},a.handleClose=function(){a.setState({ar:!1})},a.loggedIn=function(e){a.props.successfulLogin(e)},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"login-page"},r.a.createElement("div",{className:"login-logo"}),r.a.createElement(f.k,{variant:"h1"},"boba watch"),r.a.createElement(f.h,{open:this.state.ar,message:["Looks like you're using a desktop / landscape mode. Although we're working hard on designing an intuitive desktop mode, there isn't one at the moment. For the best experience, download our progressive web app on your phone! Find more info here: ",r.a.createElement("a",{key:"help-link",href:"https://info.boba.watch/",rel:"noopener noreferrer",target:"_blank",style:{color:"#FFDCDC"}},"https://info.boba.watch/")],action:r.a.createElement(f.f,{key:"close","aria-label":"Close",style:{position:"fixed",top:0,right:0,color:"#FFFFFF"},onClick:this.handleClose},r.a.createElement(I.a,null))}),r.a.createElement("button",{className:"fb-button",onClick:function(){return B.login.attempt(e.loggedIn)}}," Log in with Facebook "))}}]),t}(n.Component),oe=Object(g.f)(re),ie=a(173),ce=a.n(ie),le=a(174),se=a.n(le),de=a(175),ue=a.n(de),me=(a(164),function(e){function t(){return Object(d.a)(this,t),Object(m.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(f.a,{value:this.props.value,onChange:this.props.handleChange,className:"bottom-nav"},r.a.createElement(f.b,{label:"Dashboard",value:"dash",component:c.b,to:"/dash",icon:r.a.createElement(ce.a,null)}),r.a.createElement(f.b,{value:"add",disableRipple:!0,onClick:this.props.toggleAdd,onClose:this.refocus,icon:r.a.createElement("div",{className:"center-fab"},r.a.createElement(se.a,{style:{fontSize:50}}))}),r.a.createElement(f.b,{label:"Spending",value:"history",component:c.b,to:"/history",icon:r.a.createElement(ue.a,null)}))}}]),t}(n.Component)),pe=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={add:!1,user:!1,value:""},a.toggle=function(e){a.setState(function(t){return Object(s.a)({},e,!t[e])}),a.update.current.update()},a.handleChange=function(e,t){a.setState({value:t})},a.loading=function(){var e=document.createElement("div");return e.className="loading-background",e.insertAdjacentHTML("beforeend",'<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>'),document.body.appendChild(e),e},a.finishLoad=function(){document.body.removeChild(a.load)},a.successfulLogin=function(e){localStorage.clear(),localStorage.setItem("avatar",e.additionalUserInfo.profile.picture.data.url),localStorage.setItem("fname",e.additionalUserInfo.profile.first_name),localStorage.setItem("uid",e.user.uid),e.additionalUserInfo.isNewUser?B.user.setup(a.getDrinksAndRedirect):B.user.get(a.getDrinksAndRedirect)},a.getDrinksAndRedirect=function(){B.drinks.get(function(){a.redirect()})},a.redirect=function(){a.props.history.push("dash"),a.finishLoad()},a.componentDidCatch=function(){B.logout(function(){localStorage.clear(),window.location=window.location.origin})},B.init(),a.load=a.loading(),B.login.isLoggedIn(function(e){e&&localStorage.getItem("uid")?a.redirect(e):B.login.check(a.successfulLogin,a.finishLoad)}),a.update=r.a.createRef(),a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.state;return r.a.createElement(g.c,null,r.a.createElement(g.a,{exact:!0,strict:!0,path:"/",render:function(){return r.a.createElement(oe,{successfulLogin:e.successfulLogin})}}),r.a.createElement(g.a,{strict:!0,path:"/:page",render:function(){return r.a.createElement("div",{className:"app"},r.a.createElement("div",{className:"page"},r.a.createElement("img",{src:localStorage.getItem("avatar"),alt:"user-settings",className:"avatar-button",onClick:function(){return e.toggle("user")}}),r.a.createElement(g.a,{exact:!0,path:"/dash",render:function(){return r.a.createElement(E,{ref:e.update})}}),r.a.createElement(g.a,{exact:!0,path:"/history",render:function(){return r.a.createElement(ae,{ref:e.update})}})),r.a.createElement(R,{open:t.add,close:function(){return e.toggle("add")}}),r.a.createElement(V,{open:t.user,close:function(){return e.toggle("user")}}),r.a.createElement(me,{value:t.value,handleChange:e.handleChange,toggleAdd:function(){return e.toggle("add")}}))}}),r.a.createElement(g.a,{render:function(){return r.a.createElement(oe,{successfulLogin:e.successfulLogin})}}))}}]),t}(n.Component),he=Object(g.f)(pe),ge=Object(l.createMuiTheme)({overrides:{MuiButton:{text:{backgroundColor:"#F68080",borderRadius:3,border:0,color:"white",height:30,padding:"0 30px",margin:"20px",boxShadow:"0 3px 5px 2px rgba(255, 105, 135, 0.3)",fontFamily:"Poppins",fontWeight:700,fontSize:14,"&:hover":{backgroundColor:"#FFDCDC"}}},MuiBottomNavigation:{root:{backgroundColor:"#FFAFA4"}},MuiBottomNavigationAction:{root:{color:"#000000"},iconOnly:{color:"#FF0000"},wrapper:{color:"#FFFFFF "}},MuiDialogActions:{action:{color:"#FFFFFF"}}},palette:{primary:{main:"#F68080",light:"#FFDCDC",contrastText:"#FFFFFF"},secondary:{main:"#FFFFFF",contrastText:"#F68080"}},typography:{useNextVariants:!0,h1:{fontFamily:"Poppins",fontWeight:700,color:"#FFFFFF",fontSize:44,marginBottom:20},h2:{fontFamily:"Poppins",fontWeight:700,color:"#FFFFFF",fontSize:48,margin:0},h3:{fontFamily:"Poppins",fontWeight:700,color:"#F68080",fontSize:24,marginBottom:"16px"},h4:{fontFamily:"Poppins",fontWeight:700,color:"#FFFFFF",fontSize:24},h5:{fontFamily:"Poppins",fontWeight:700,color:"#000000",fontSize:18},h6:{fontFamily:"Poppins",color:"#F68080",fontSize:12}}}),fe=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function be(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}A.initializeApp({apiKey:"AIzaSyBePNJQYVteyh1Ll9fqnXbXc-S8fmJlbTQ",authDomain:"boba-watch-firebase.firebaseapp.com",databaseURL:"https://boba-watch-firebase.firebaseio.com",projectId:"boba-watch-firebase",storageBucket:"",messagingSenderId:"674375234614",appId:"1:674375234614:web:fdaf98c291204b9c"}),i.a.render(r.a.createElement(l.MuiThemeProvider,{theme:ge},r.a.createElement(c.a,{basename:""},r.a.createElement(he,null))),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("","/service-worker.js");fe?(!function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):be(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):be(t,e)})}}()}},[[242,1,2]]]);
//# sourceMappingURL=main.fe20c1a1.chunk.js.map