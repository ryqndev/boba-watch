(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{258:function(e,t,a){},375:function(e,t,a){e.exports=a(716)},380:function(e,t,a){},559:function(e,t,a){},674:function(e,t,a){},710:function(e,t,a){},716:function(e,t,a){"use strict";a.r(t);var n=a(1),o=a.n(n),r=a(24),c=a.n(r),s=(a(380),a(28)),i=a(29),l=a(31),d=a(30),u=a(32),m=a(120),p=a(58),h=a(13),f=a(21),g=a(278),v=a.n(g),E=a(279),b=a.n(E),k=a(280),y=a.n(k),w=a(121),O=(a(559),[{name:"Left",value:38,fill:"#cccccc"},{name:"Used",value:64}]),F=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={totalMoney:200,totalDrinks:12,drinkPercentage:70},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"dashboard-page"},o.a.createElement(h.g,{variant:"h4"},"Monthly Spending"),o.a.createElement(h.d,{className:"chart-holder"},o.a.createElement(w.c,{height:"100%",width:"100%"},o.a.createElement(w.b,{width:730,height:250},o.a.createElement("defs",null,o.a.createElement("linearGradient",{id:"colorUv",x1:"0",y1:"0",x2:"0",y2:"1"},o.a.createElement("stop",{offset:"10%",stopColor:"#2DA08E",stopOpacity:1}),o.a.createElement("stop",{offset:"90%",stopColor:"#aaFF88",stopOpacity:1}))),o.a.createElement(w.a,{data:O,dataKey:"value",nameKey:"name",cx:"50%",cy:"50%",innerRadius:70,outerRadius:100,fill:"url(#colorUv)",label:!1,startAngle:90,endAngle:450,paddingAngle:2}),o.a.createElement("svg",{viewBox:"0 0 500 500"},o.a.createElement("path",{id:"curve",d:"M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97",fillOpacity:"0"}),o.a.createElement("text",{width:"500"},o.a.createElement("textPath",{href:"#curve"},"Total Amount Spent $",4.23)))))),o.a.createElement("div",{className:"stats-holder"},o.a.createElement(h.d,{className:"month-total-money"},o.a.createElement("p",null,"This is how much you\u2019ve spent on boba this month:"),o.a.createElement(h.g,{variant:"h2"},"$",this.state.totalMoney)),o.a.createElement(h.d,{className:"month-drink-limit"},o.a.createElement(h.g,{variant:"h3"},this.state.drinkPercentage,"%"),o.a.createElement("p",null,"to your max number of drinks this month")),o.a.createElement(h.d,{className:"month-total-drinks"},o.a.createElement(h.g,{variant:"h2"},this.state.totalDrinks),o.a.createElement("p",null,"drinks this month"))))}}]),t}(n.Component),N=(a(674),a(281)),j=a(176);function I(){}var A=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={selectedDate:new Date},a.handleDateChange=function(e){a.setState({selectedDate:e})},a.saveDrink=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=(document.getElementById("date-value").value,{drink:{name:document.getElementById("name-value").value,location:document.getElementById("location-value").value,price:document.getElementById("price-value").value,date:"2019-03-30T20:19:57.000Z",photo:"",userId:parseInt(a.props.userId),description:document.getElementById("description-value").value}});fetch("https://api.boba.watch/drinks/"+a.props.accessToken,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)}).then(function(t){alert("Drink Added!"),e(),a.props.toggleSelf()}).catch(function(e){console.log(e)})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"add-modal"},o.a.createElement(h.g,{variant:"h5"},"Add a purchase"),o.a.createElement(h.f,{id:"location-value",className:"add-input",label:"Location"}),o.a.createElement(h.f,{id:"name-value",className:"add-input",margin:"dense",label:"Drink name"}),o.a.createElement(h.f,{id:"price-value",className:"add-input",margin:"dense",label:"Price"}),o.a.createElement(j.b,{utils:N.a},o.a.createElement(j.a,{id:"date-value",className:"add-input",margin:"dense",label:"Date picker",value:this.state.selectedDate,onChange:this.handleDateChange})),o.a.createElement(h.f,{id:"description-value",className:"add-input",label:"Description"}),o.a.createElement("div",{className:"add-button-holder"},o.a.createElement(h.c,{onClick:this.saveDrink,className:"add-button"},"ADD")))}}]),t}(n.Component),C=a(118),S=a.n(C),D=a(115),T=a.n(D),x=a(275),B=a.n(x),M=a(274),P=a.n(M),L=(a(258),function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={open:!1,add:!1},a.toggle=function(){a.setState(function(e){return{open:!e.open}})},a.toggleAdd=function(){a.setState(function(e){return{add:!e.add}})},a.hasImage=function(){if(""!==a.props.data.photo.trim()&&"asdf"!==a.props.data.photo)return o.a.createElement("img",{alt:"drink",src:a.props.data.photo})},a.delete=function(){S.a.post("https://api.boba.watch/drinks/delete/"+a.props.data.id+"/"+a.props.accessToken).then(function(e){a.props.getNewInfo()}).catch(function(e){console.log(e)})},a.edit=function(){a.toggleAdd(a.delete)},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"thaman-color"},o.a.createElement(h.e,{open:this.state.add,onBackdropClick:this.toggleAdd},o.a.createElement("div",null,o.a.createElement(A,{toggleSelf:this.edit}))),o.a.createElement("div",{className:"history-drink-label",onClick:this.toggle},o.a.createElement("p",{className:"drink-place"},this.props.data.location.length>13?this.props.data.location.substr(0,10)+"...":this.props.data.location),o.a.createElement("p",{className:"drink-price"},"$",parseInt(this.props.data.price/100)+"."+(this.props.data.price%100<10?"0"+this.props.data.price%100:this.props.data.price%100)),o.a.createElement("div",{className:"expand-icon"},this.state.open?o.a.createElement(P.a,null):o.a.createElement(B.a,null)),o.a.createElement("p",{className:"drink-name"},this.props.data.name.length>13?this.props.data.name.substr(0,10)+"...":this.props.data.name),o.a.createElement("p",{className:"drink-time"},new Date(this.props.data.date).toDateString().substr(4))),o.a.createElement(T.a,{in:this.state.open},this.hasImage(),o.a.createElement("p",{className:"drink-description"},JSON.stringify(new Date(this.props.data.date))),o.a.createElement("div",{className:"drink-options"},o.a.createElement(h.c,{onClick:this.edit},"EDIT"),o.a.createElement(h.c,{onClick:this.delete},"DELETE"))))}}]),t}(n.Component)),z=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={drinks:[o.a.createElement(h.g,{variant:"h3",key:1},"No Drinks")],sum:0},a.componentDidMount=function(){a.retrieveHistory()},a.retrieveHistory=function(){console.log(a.props.userId),fetch("https://api.boba.watch/drinks/user/"+a.props.userId,{}).then(function(e){return e.json()}).then(function(e){a.generate(e)}).catch(function(e){console.log(e)})},a.generate=function(e){var t=0;e.forEach(function(e){t+=e.price});var n=e.map(function(e,t){return o.a.createElement(L,{key:t,data:e,getNewInfo:a.retrieveHistory,accessToken:a.props.accessToken})});a.setState({drinks:n,sum:t})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"history-page"},o.a.createElement(h.g,{variant:"h3"}," Monthly Spending"),o.a.createElement("div",{id:"history-spending"},this.state.drinks),o.a.createElement(h.g,{variant:"h3",className:"history-total"}," ",o.a.createElement("span",null,"Monthly Total:")," $",parseInt(this.state.sum/100)+"."+(this.state.sum%100<10?"0"+this.state.sum%100:this.state.sum%100)," "))}}]),t}(n.Component),W=a(276),H=a.n(W),R=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={},a.componentDidMount=function(){a.retrieveHistory()},a.retrieveHistory=function(){},a.successfulLogin=function(e,t){a.props.successfulLogin(e,t)},a.responseFacebook=function(e){console.log(e),S.a.post("https://api.boba.watch/users/login",{fbRes:e}).then(function(t){if(!t.data.hasOwnProperty("userId"))throw"Facebok Login Failed";a.setState(function(){return{userId:t.data.userId,accessToken:e.accessToken}}),a.successfulLogin(t.data.userId,e.accessToken)}).catch(function(e){return console.log(e)})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"login-page"},o.a.createElement(h.g,{variant:"h3"},"boba watch"),o.a.createElement(H.a,{appId:"333104870889201",autoLoad:!0,fields:"name,email,picture",callback:this.responseFacebook}),o.a.createElement("p",null,this.state.userId),o.a.createElement("p",null,this.state.accessToken))}}]),t}(n.Component),U=(a(710),Object(f.createMuiTheme)({overrides:{MuiButton:{text:{backgroundColor:"#F68080",borderRadius:3,border:0,color:"white",height:30,padding:"0 30px",margin:"20px",boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",fontFamily:"Poppins",fontWeight:700,fontSize:14}},MuiBottomNavigation:{root:{backgroundColor:"#FFAFA4"}},MuiBottomNavigationAction:{root:{color:"#000000"},iconOnly:{color:"#FF0000"},wrapper:{color:"#FFFFFF "}}},MuiPickers:{root:{backgroundColor:"#FFAFA4"}},MuiCard:{root:{backgroundColor:"#FFAFA4"}},typography:{useNextVariants:!0,h2:{fontFamily:"Poppins",fontWeight:700,color:"#FFFFFF",fontSize:48,margin:0},h3:{fontFamily:"Poppins",fontWeight:700,color:"#F68080",fontSize:24,marginBottom:"16px"},h4:{fontFamily:"Poppins",fontWeight:700,color:"white",fontSize:24},h5:{fontFamily:"Poppins",fontWeight:700,color:"black",fontSize:18},h6:{fontFamily:"Poppins",color:"#F68080",fontSize:12}}})),$=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={add:!1,user:!1,value:"dash",userId:0,accessToken:0},a.toggleAdd=function(){a.setState(function(e){return{add:!e.add}})},a.toggleUser=function(){a.setState(function(e){return{add:!e.user}})},a.handleChange=function(e,t){a.setState({value:t})},a.successfulLogin=function(e,t){a.setState({userId:e,accessToken:t})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement(f.MuiThemeProvider,{theme:U},o.a.createElement(m.a,{basename:""},o.a.createElement("div",{className:"page"},o.a.createElement(p.a,{exact:!0,path:"/dash",component:F}),o.a.createElement(p.a,{path:"/history",render:function(){return console.log(e.state.userId),o.a.createElement(z,{accessToken:e.state.accessToken,userId:e.state.userId})}}),o.a.createElement(p.a,{exact:!0,path:"/",render:function(){return o.a.createElement(R,{successfulLogin:e.successfulLogin})}})),o.a.createElement(h.e,{open:this.state.add,onBackdropClick:this.toggleAdd},o.a.createElement("div",null,o.a.createElement(A,{accessToken:this.state.accessToken,userId:this.state.userId,toggleSelf:this.toggleAdd}))),o.a.createElement(h.e,{open:this.state.user,onBackdropClick:this.toggleUser},o.a.createElement("div",null,o.a.createElement(A,{accessToken:this.state.accessToken,userId:this.state.userId}))),o.a.createElement(h.a,{value:this.state.value,onChange:this.handleChange,className:"bottom-nav"},o.a.createElement(h.b,{label:"Dashboard",value:"dash",component:m.b,to:"/dash",icon:o.a.createElement(v.a,null)}),o.a.createElement(h.b,{value:"add",disableRipple:!0,onClick:this.toggleAdd,onClose:this.refocus,icon:o.a.createElement("div",{className:"center-fab"}," ",o.a.createElement(b.a,{style:{fontSize:50}}))}),o.a.createElement(h.b,{label:"Spending",value:"history",component:m.b,to:"/history",icon:o.a.createElement(y.a,null)}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement($,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[375,1,2]]]);
//# sourceMappingURL=main.d1a60531.chunk.js.map