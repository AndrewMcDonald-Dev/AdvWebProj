var B=Object.defineProperty;var L=Object.getOwnPropertySymbols;var R=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var S=(o,s,t)=>s in o?B(o,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[s]=t,x=(o,s)=>{for(var t in s||(s={}))R.call(s,t)&&S(o,t,s[t]);if(L)for(var t of L(s))j.call(s,t)&&S(o,t,s[t]);return o};import{d as v,o as u,c as p,a as n,t as g,r as $,w as H,b as P,v as I,p as U,e as q,f as O,u as l,g as V,h as W,i as E,j as w,k as c,l as d,m as f,n as N,F as D,q as F,s as M}from"./vendor.ae2ed5a7.js";const J=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerpolicy&&(i.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?i.credentials="include":e.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(e){if(e.ep)return;e.ep=!0;const i=t(e);fetch(e.href,i)}};J();const z="modulepreload",C={},G="/",K=function(s,t){return!t||t.length===0?s():Promise.all(t.map(a=>{if(a=`${G}${a}`,a in C)return;C[a]=!0;const e=a.endsWith(".css"),i=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${i}`))return;const r=document.createElement("link");if(r.rel=e?"stylesheet":z,e||(r.as="script",r.crossOrigin=""),r.href=a,document.head.appendChild(r),e)return new Promise((_,A)=>{r.addEventListener("load",_),r.addEventListener("error",A)})})).then(()=>s())},Q={class:"section"},X={class:"title"},m=v({props:{title:{type:String,defualt:"Hello World"}},setup(o){const s=o;return(t,a)=>(u(),p("div",Q,[n("h1",X,g(s.title),1)]))}});var b=(o,s)=>{const t=o.__vccOpts||o;for(const[a,e]of s)t[a]=e;return t};const Y={},Z={class:"container"},tt=n("h1",{class:"title"},"Praying for Ukraine",-1),st=[tt];function et(o,s){return u(),p("div",Z,st)}var ot=b(Y,[["render",et]]);const at=o=>(U("data-v-1c898fca"),o=o(),q(),o),nt={class:"section"},it={class:"wrap"},rt=at(()=>n("div",{class:"form-header"},[n("h3",null,"Login")],-1)),ct={class:"form-group"},lt={class:"form-group"},dt=O('<div class="form-group" data-v-1c898fca><a href="#" class="form-forgot" data-v-1c898fca>Forgot Password?</a></div><div class="form-group" data-v-1c898fca><button class="form-button" type="submit" data-v-1c898fca>Login</button></div><div class="form-footer" data-v-1c898fca> Don&#39;t have an account? <a href="/register.html" data-v-1c898fca>Sign Up</a></div>',3),ut=v({setup(o){const{Login:s}=k(),t=$(""),a=$("");return(e,i)=>(u(),p("div",nt,[n("div",it,[n("form",{class:"login-form form",onSubmit:i[2]||(i[2]=H(r=>l(s)(t.value,a.value),["prevent"]))},[rt,n("div",ct,[P(n("input",{type:"text",class:"form-input",placeholder:"Handle",required:"","onUpdate:modelValue":i[0]||(i[0]=r=>t.value=r)},null,512),[[I,t.value]])]),n("div",lt,[P(n("input",{type:"password",class:"form-input",placeholder:"Password",required:"","onUpdate:modelValue":i[1]||(i[1]=r=>a.value=r)},null,512),[[I,a.value]])]),dt],32)])]))}});var pt=b(ut,[["__scopeId","data-v-1c898fca"]]);const _t={},ft={class:"sec"},ht=O('<div class="wrap" data-v-3f439415><form class="register-form form" data-v-3f439415><div class="form-header" data-v-3f439415><h3 data-v-3f439415>Register</h3></div><div class="form-group" data-v-3f439415><input type="text" class="form-input" placeholder="First Name" required data-v-3f439415><input type="text" class="form-input ml" placeholder="Last Name" required data-v-3f439415></div><div class="form-group" data-v-3f439415><input type="email" class="form-input" placeholder="Email" required data-v-3f439415></div><div class="form-group" data-v-3f439415><span class="form-label" data-v-3f439415>How did you find us?</span><span class="form-label" data-v-3f439415>Date of Birth</span></div><div class="form-group" data-v-3f439415><input type="text" class="form-input" placeholder="Social Media" required data-v-3f439415><input type="date" class="form-input ml" required data-v-3f439415></div><div class="form-group" data-v-3f439415><input type="password" class="form-input" placeholder="New Password" required data-v-3f439415><input type="password" class="form-input ml" placeholder="Confirm Password" required data-v-3f439415></div><div class="form-group" data-v-3f439415><button class="form-button" type="submit" data-v-3f439415>Register</button></div><div class="form-footer" data-v-3f439415> Have an account? <a href="/login.html" data-v-3f439415>Sign In</a></div></form></div>',1),vt=[ht];function mt(o,s){return u(),p("div",ft,vt)}var gt=b(_t,[["render",mt],["__scopeId","data-v-3f439415"]]);const bt=[{path:"/",component:ot},{path:"/about",component:m,props:{title:"About Page"}},{path:"/contact",component:m,props:{title:"Contact Page"}},{path:"/login",component:pt},{path:"/signup",component:gt},{path:"/wall",component:()=>K(()=>import("./Wall.358f4947.js"),["assets/Wall.358f4947.js","assets/Wall.07345232.css","assets/vendor.ae2ed5a7.js"])},{path:"/jobs",component:m,props:{title:"Jobs page"}},{path:"/issue",component:m,props:{title:"Issue Page"}}],h=V({history:W(),routes:bt,linkActiveClass:"is-active"});h.beforeEach(async(o,s)=>{const t=k();if(!t.user){const e=localStorage.getItem("user");e&&await t.LoginByToken(e)}if(t.destinationUrl==null&&o.path!="/login"&&(t.destinationUrl=o.path),["/messages","/wall","/feed","/hidden"].includes(o.path.toLowerCase())&&!t.user)return"/login"});const y=E("messages",{state:()=>({notifications:[]}),actions:{close(o){this.notifications.splice(o,1)}}}),yt="http://localhost:3004/api/",$t=(o,s,t,a)=>{let e={method:t||"GET",headers:a};return s&&(e={method:t||"POST",headers:x({"Content-Type":"application/json",Accept:"application/json"},e.headers),cache:"no-cache",body:JSON.stringify(s)}),fetch(yt+o,e).then(i=>i.json())},k=E("session",{state:()=>({user:null,destinationUrl:null}),actions:{async Login(o,s){var a;const t=y();try{const e=await this.api("users/login",{email:o,password:s});e&&(t.notifications.push({type:"success",message:`Welcome back ${e.firstName}!`}),this.user=e,h.push((a=this.destinationUrl)!=null?a:"/wall"),localStorage.setItem("user",e.token))}catch(e){t.notifications.push({type:"danger",message:e.message}),console.table(t.notifications)}},Logout(){this.user=null,h.push("/login")},async Register(o){var t;const s=y();try{const a=await this.api("users",o,"POST");a&&(s.notifications.push({type:"success",message:`Welcome ${a.firstName}!`}),this.user=a,h.push((t=this.destinationUrl)!=null?t:"/wall"),localStorage.setItem("user",a.token))}catch(a){s.notifications.push({type:"danger",message:a.message}),console.table(s.notifications)}},async LoginByToken(o){var s;try{const t=await this.api(`users/login/${o}`);t&&(this.user=t,h.push((s=this.destinationUrl)!=null?s:"/wall"))}catch(t){console.log(t)}},async api(o,s,t,a={}){var i,r;const e=y();((i=this.user)==null?void 0:i.token)&&(a.Authorization=`Bearer ${this.user.token}`);try{const _=await $t(o,s,t,a);if((r=_.errors)==null?void 0:r.length)throw{message:_.errors.join("")};return await _.data}catch(_){e.notifications.push({type:"danger",message:_.message})}}}});const T=o=>(U("data-v-7f8f7a40"),o=o(),q(),o),wt={key:0,class:"buttons"},kt=f("Log in"),Lt=T(()=>n("strong",null,"Sign up",-1)),St={key:1,class:"buttons"},xt={class:"avatar"},Pt={class:"avatar-image"},It={class:"image is-64x64"},Nt=["src"],Ct={class:"login-tag"},Ut=T(()=>n("strong",null,"Log Out",-1)),qt=[Ut],Ot=v({setup(o){const{Logout:s,user:t}=k();return(a,e)=>{const i=w("router-link");return l(t)?(u(),p("div",St,[n("div",xt,[n("div",Pt,[n("figure",It,[n("img",{src:l(t).pic,class:"img is-rounded"},null,8,Nt)])]),n("div",Ct,[n("strong",null,g(l(t).firstName)+" "+g(l(t).lastName),1),n("i",null,g(l(t).email),1)])]),n("a",{class:"button is-primary",onClick:e[0]||(e[0]=(...r)=>l(s)&&l(s)(...r))},qt)])):(u(),p("div",wt,[c(i,{class:"button is-light",to:"/login"},{default:d(()=>[kt]),_:1}),c(i,{class:"button is-primary",to:"/signup"},{default:d(()=>[Lt]),_:1})]))}}});var Et=b(Ot,[["__scopeId","data-v-7f8f7a40"]]);const Tt={class:"navbar is-link",role:"navigation","aria-label":"main navigation"},At={class:"container"},Bt={class:"navbar-brand"},Rt=n("a",{class:"navbar-item",href:"https://bulma.io"},[n("img",{src:"https://bulma.io/images/bulma-logo.png",width:"112",height:"28"})],-1),jt=n("span",{"aria-hidden":"true"},null,-1),Ht=n("span",{"aria-hidden":"true"},null,-1),Vt=n("span",{"aria-hidden":"true"},null,-1),Wt=[jt,Ht,Vt],Dt={class:"navbar-start"},Ft=f("Home"),Mt=f("Wall"),Jt={class:"navbar-item has-dropdown is-hoverable"},zt=n("a",{class:"navbar-link"},"More",-1),Gt={class:"navbar-dropdown"},Kt=f("About"),Qt=f("Jobs"),Xt=f("Contact"),Yt=n("hr",{class:"navbar-divider"},null,-1),Zt=f("Report an issue"),ts={class:"navbar-end"},ss={class:"navbar-item"},es=v({setup(o){const s=$(!1);return(t,a)=>{const e=w("router-link");return u(),p("nav",Tt,[n("div",At,[n("div",Bt,[Rt,n("a",{role:"button",class:N(["navbar-burger",{"is-active":s.value}]),"aria-label":"menu","aria-expanded":"false",onClick:a[0]||(a[0]=i=>s.value=!s.value)},Wt,2)]),n("div",{class:N(["navbar-menu",{"is-active":s.value}])},[n("div",Dt,[c(e,{class:"navbar-item",to:"/"},{default:d(()=>[Ft]),_:1}),c(e,{class:"navbar-item",to:"/wall"},{default:d(()=>[Mt]),_:1}),n("div",Jt,[zt,n("div",Gt,[c(e,{class:"navbar-item",to:"/about"},{default:d(()=>[Kt]),_:1}),c(e,{class:"navbar-item",to:"/jobs"},{default:d(()=>[Qt]),_:1}),c(e,{class:"navbar-item",to:"/contact"},{default:d(()=>[Xt]),_:1}),Yt,c(e,{class:"navbar-item",to:"/issue"},{default:d(()=>[Zt]),_:1})])])]),n("div",ts,[n("div",ss,[c(Et)])])],2)])])}}}),os={class:"container"},as=v({setup(o){return(s,t)=>{const a=w("router-view");return u(),p(D,null,[c(es),n("div",os,[c(a)])],64)}}});F(as).use(h).use(M()).mount("#app");export{b as _,$t as a,k as u};
