(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{156:function(e,t,a){},239:function(e,t,a){e.exports=a(422)},244:function(e,t,a){},256:function(e,t,a){},374:function(e,t,a){},415:function(e,t,a){},416:function(e,t,a){},422:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(18),c=a.n(r),s=(a(244),a(22)),i=a(23),l=a(25),d=a(24),u=a(26),m=a(80),p=a(42),h=a(9),f=a(16),g=a(165),E=a.n(g),v=a(166),b=a.n(v),y=a(167),k=a.n(y),F=a(43),N=(a(256),a(257),[{x:0,y:8},{x:1,y:5},{x:2,y:4},{x:3,y:9},{x:4,y:1},{x:5,y:7},{x:6,y:6},{x:7,y:3},{x:8,y:2},{x:9,y:0}]),w=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={totalMoney:200,totalDrinks:12,drinkPercentage:70},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"dashboard-page"},o.a.createElement(h.g,{variant:"h4"},"Monthly Spending"),o.a.createElement(h.d,{className:"chart-holder"},o.a.createElement(F.e,{height:300,width:900},o.a.createElement(F.a,null),o.a.createElement(F.c,null),o.a.createElement(F.b,{data:N}),o.a.createElement(F.d,null),o.a.createElement(F.f,null))),o.a.createElement("div",{className:"stats-holder"},o.a.createElement(h.d,{className:"month-total-money"},o.a.createElement("p",null,"This is how much you\u2019ve spent on boba this month:"),o.a.createElement(h.g,{variant:"h2"},"$",this.state.totalMoney)),o.a.createElement(h.d,{className:"month-drink-limit"},o.a.createElement(h.g,{variant:"h3"},this.state.drinkPercentage,"%"),o.a.createElement("p",null,"to your max number of drinks this month")),o.a.createElement(h.d,{className:"month-total-drinks"},o.a.createElement(h.g,{variant:"h2"},this.state.totalDrinks),o.a.createElement("p",null,"drinks this month"))))}}]),t}(n.Component),O=a(159),j=a.n(O),I=(a(374),a(168)),S=a(116),C=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={selectedDate:new Date},a.handleDateChange=function(e){a.setState({selectedDate:e})},a.saveDrink=function(){var e={drink:{name:document.getElementById("name-value").value,location:document.getElementById("location-value").value,price:parseInt(100*document.getElementById("price-value").value),date:new Date(document.getElementById("date-value").value).toISOString(),photo:"",userId:parseInt(a.props.userId),description:document.getElementById("description-value").value}};fetch("https://api.boba.watch/drinks/"+a.props.accessToken,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)}).then(function(e){j()("Done!","Drink has been added","success"),a.props.toggleSelf()}).catch(function(e){console.log(e)})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"add-modal"},o.a.createElement(h.g,{variant:"h5"},"Add a purchase"),o.a.createElement(h.f,{id:"location-value",className:"add-input",label:"Location"}),o.a.createElement(h.f,{id:"name-value",className:"add-input",margin:"dense",label:"Drink name"}),o.a.createElement(h.f,{id:"price-value",className:"add-input",margin:"dense",label:"Price"}),o.a.createElement(S.b,{utils:I.a},o.a.createElement(S.a,{id:"date-value",className:"add-input",margin:"dense",format:"M/d/yyyy h:mm a",label:"Date picker",value:this.state.selectedDate,onChange:this.handleDateChange})),o.a.createElement(h.f,{id:"description-value",className:"add-input",label:"Description"}),o.a.createElement("div",{className:"add-button-holder"},o.a.createElement(h.c,{onClick:this.saveDrink,className:"add-button"},"ADD")))}}]),t}(n.Component),D=a(79),x=a.n(D),A=a(78),T=a.n(A),B=a(162),M=a.n(B),P=a(161),L=a.n(P),z=(a(156),function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={open:!1,add:!1},a.toggle=function(){a.setState(function(e){return{open:!e.open}})},a.toggleAdd=function(){a.setState(function(e){return{add:!e.add}})},a.hasImage=function(){if(""!==a.props.data.photo.trim()&&"asdf"!==a.props.data.photo)return o.a.createElement("img",{alt:"drink",src:a.props.data.photo})},a.delete=function(){x.a.post("https://api.boba.watch/drinks/delete/"+a.props.data.id+"/"+a.props.accessToken).then(function(e){a.props.getNewInfo()}).catch(function(e){console.log(e)})},a.edit=function(){a.toggleAdd(a.delete)},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"thaman-color"},o.a.createElement(h.e,{open:this.state.add,onBackdropClick:this.toggleAdd},o.a.createElement("div",null,o.a.createElement(C,{toggleSelf:this.edit}))),o.a.createElement("div",{className:"history-drink-label",onClick:this.toggle},o.a.createElement("p",{className:"drink-place"},this.props.data.location.length>13?this.props.data.location.substr(0,10)+"...":this.props.data.location),o.a.createElement("p",{className:"drink-price"},"$",parseInt(this.props.data.price/100)+"."+(this.props.data.price%100<10?"0"+this.props.data.price%100:this.props.data.price%100)),o.a.createElement("div",{className:"expand-icon"},this.state.open?o.a.createElement(L.a,null):o.a.createElement(M.a,null)),o.a.createElement("p",{className:"drink-name"},this.props.data.name.length>13?this.props.data.name.substr(0,10)+"...":this.props.data.name),o.a.createElement("p",{className:"drink-time"},new Date(this.props.data.date).toDateString().substr(4))),o.a.createElement(T.a,{in:this.state.open},this.hasImage(),o.a.createElement("p",{className:"drink-description"},JSON.stringify(new Date(this.props.data.date))),o.a.createElement("div",{className:"drink-options"},o.a.createElement(h.c,{onClick:this.edit},"EDIT"),o.a.createElement(h.c,{onClick:this.delete},"DELETE"))))}}]),t}(n.Component)),W=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={drinks:[o.a.createElement(h.g,{variant:"h3",key:1},"No Drinks")],sum:0},a.componentDidMount=function(){a.retrieveHistory()},a.retrieveHistory=function(){fetch("https://api.boba.watch/drinks/user/"+a.props.userId,{}).then(function(e){return e.json()}).then(function(e){a.generate(e)}).catch(function(e){console.log(e)})},a.generate=function(e){var t=0;e.forEach(function(e){t+=e.price});var n=e.map(function(e,t){return o.a.createElement(z,{key:t,data:e,getNewInfo:a.retrieveHistory,accessToken:a.props.accessToken})});a.setState({drinks:n,sum:t})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"history-page"},o.a.createElement(h.g,{variant:"h3"}," Monthly Spending"),o.a.createElement("div",{id:"history-spending"},this.state.drinks),o.a.createElement(h.g,{variant:"h3",className:"history-total"}," ",o.a.createElement("span",null,"Monthly Total:")," $",parseInt(this.state.sum/100)+"."+(this.state.sum%100<10?"0"+this.state.sum%100:this.state.sum%100)," "))}}]),t}(n.Component),H=a(163),J=a.n(H),$=(a(415),function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={},a.componentDidMount=function(){a.retrieveHistory()},a.retrieveHistory=function(){},a.successfulLogin=function(e,t){a.props.successfulLogin(e,t),a.props.history.push("/dash")},a.responseFacebook=function(e){x.a.post("https://api.boba.watch/users/login",{fbRes:e}).then(function(t){if(!t.data.hasOwnProperty("userId"))throw"Facebok Login Failed";a.setState(function(){return{userId:t.data.userId,accessToken:e.accessToken}}),a.successfulLogin(t.data.userId,e.accessToken)}).catch(function(e){return console.log(e)})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"login-page"},o.a.createElement("div",{className:"login-logo"}," "),o.a.createElement(h.g,{variant:"h1"},"boba watch"),o.a.createElement(J.a,{appId:"333104870889201",autoLoad:!0,fields:"name,email,picture",callback:this.responseFacebook}))}}]),t}(n.Component)),R=(a(416),Object(f.createMuiTheme)({overrides:{MuiButton:{text:{backgroundColor:"#F68080",borderRadius:3,border:0,color:"white",height:30,padding:"0 30px",margin:"20px",boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",fontFamily:"Poppins",fontWeight:700,fontSize:14}},MuiBottomNavigation:{root:{backgroundColor:"#FFAFA4"}},MuiBottomNavigationAction:{root:{color:"#000000"},iconOnly:{color:"#FF0000"},wrapper:{color:"#FFFFFF "}}},MuiPickers:{root:{backgroundColor:"#FFAFA4"}},MuiCard:{root:{backgroundColor:"#FFAFA4"}},typography:{useNextVariants:!0,h1:{fontFamily:"Poppins",fontWeight:700,color:"#FFFFFF",fontSize:44,marginBottom:20},h2:{fontFamily:"Poppins",fontWeight:700,color:"#FFFFFF",fontSize:48,margin:0},h3:{fontFamily:"Poppins",fontWeight:700,color:"#F68080",fontSize:24,marginBottom:"16px"},h4:{fontFamily:"Poppins",fontWeight:700,color:"white",fontSize:24},h5:{fontFamily:"Poppins",fontWeight:700,color:"black",fontSize:18},h6:{fontFamily:"Poppins",color:"#F68080",fontSize:12}}})),U=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={add:!1,user:!1,value:"dash",userId:1,accessToken:0},a.toggleAdd=function(){a.setState(function(e){return{add:!e.add}})},a.toggleUser=function(){a.setState(function(e){return{add:!e.user}})},a.handleChange=function(e,t){a.setState({value:t})},a.successfulLogin=function(e,t){a.setState({userId:e,accessToken:t})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement(f.MuiThemeProvider,{theme:R},o.a.createElement(m.a,{basename:""},o.a.createElement(p.a,{exact:!0,strict:!0,path:"/",render:function(){return o.a.createElement($,{successfulLogin:e.successfulLogin})}}),o.a.createElement(p.a,{strict:!0,path:"/:page",render:function(){return o.a.createElement("div",null,o.a.createElement("div",{className:"page"},o.a.createElement(p.a,{exact:!0,path:"/dash",component:w}),o.a.createElement(p.a,{path:"/history",render:function(){return o.a.createElement(W,{accessToken:e.state.accessToken,userId:e.state.userId})}})),o.a.createElement(h.e,{open:e.state.add,onBackdropClick:e.toggleAdd},o.a.createElement("div",null,o.a.createElement(C,{accessToken:e.state.accessToken,userId:e.state.userId,toggleSelf:e.toggleAdd}))),o.a.createElement(h.e,{open:e.state.user,onBackdropClick:e.toggleUser},o.a.createElement("div",null,o.a.createElement(C,{accessToken:e.state.accessToken,userId:e.state.userId}))),o.a.createElement(h.a,{value:e.state.value,onChange:e.handleChange,className:"bottom-nav"},o.a.createElement(h.b,{label:"Dashboard",value:"dash",component:m.b,to:"/dash",icon:o.a.createElement(E.a,null)}),o.a.createElement(h.b,{value:"add",disableRipple:!0,onClick:e.toggleAdd,onClose:e.refocus,icon:o.a.createElement("div",{className:"center-fab"}," ",o.a.createElement(b.a,{style:{fontSize:50}}))}),o.a.createElement(h.b,{label:"Spending",value:"history",component:m.b,to:"/history",icon:o.a.createElement(k.a,null)})))}})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(U,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[239,1,2]]]);
//# sourceMappingURL=main.f70659c8.chunk.js.map