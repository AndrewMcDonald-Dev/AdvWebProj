import{j as w,d as b,o as p,c as f,l as V,F as $,n as r,b as k,z as I,a as s,t as v,g as F,u as l,p as C,e as D,A as P,r as y,m as T,w as E,v as g,q as _,s as m,B as M,S as N,f as A}from"./vendor.857a9fbe.js";import{u as U,a as h,r as j,_ as x}from"./index.5d8f31cb.js";const q=e=>{const t=e.split("-");return new Date(parseInt(t[0]),parseInt(t[1])-1,parseInt(t[2])).getTime()},L=w("tasks",{state:()=>({tasks:[],session:U(),currentTab:"All",newTask:"",toBeAssigned:"",newDueDate:""}),actions:{changeTab(e){this.currentTab=e},async addTask(){if(!this.session.user)throw new Error("Current user not stored in addTask().");if(this.newTask&&this.toBeAssigned&&this.newDueDate){const e={title:this.newTask,isCompleted:!1,assignedTo:await this.session.api(`users/${this.toBeAssigned}`),createdBy:this.session.user,dueDate:q(this.newDueDate)};(await this.session.api("tasks",e,"POST")).data,this.newTask="",this.toBeAssigned="",this.newDueDate="",await this.fetchTasks()}},changeToBeAssigned(e){this.toBeAssigned=e},async fetchTasks(){this.tasks=(await h("tasks")).data},async deleteTask(e){await h(`tasks/${this.tasks[e]._id}`,null,"DELETE"),this.tasks.splice(e,1)},async saveTask(e){const t=this.tasks[e],a={isCompleted:!t.isCompleted};await h(`tasks/${t._id}`,a,"PATCH")}},getters:{displayedTasks:({tasks:e,currentTab:t,session:a})=>{switch(a.user||j.push("/login"),t){case"Created":return e.filter(({createdBy:n})=>{var i;return n._id===((i=a.user)==null?void 0:i._id)});case"Assigned":return e.filter(({assignedTo:n})=>{var i;return n._id===((i=a.user)==null?void 0:i._id)});case"Upcoming":return e.sort((n,i)=>n.dueDate-i.dueDate);case"Completed":return e.filter(({isCompleted:n})=>n);case"All":return e.sort((n,i)=>new Date(i.timeCreated).getTime()-new Date(n.timeCreated).getTime());default:return e}}}}),z=w("users",{state:()=>({list:[],session:U()}),actions:{async fetchUser(e){const t=await this.session.api(`users/${e}`);this.list.find(n=>n._id===t._id)||this.list.push(t)}},getters:{findUser:e=>t=>{const a=e.list.find(({_id:n})=>n===t);if(!a)throw new Error("failed to find user in findUser");return a}}}),O=e=>{const t=new Date(e);return`${t.getMonth()+1}/${t.getDate()}/${t.getFullYear()}`};const R=e=>(C("data-v-8b8a9912"),e=e(),D(),e),H=["onUpdate:modelValue","onClick"],Y={class:"task-text"},G={class:"task-container"},J={class:"mini-avatar"},K={class:"image is-32x32"},Q=["src"],W={class:"date"},X=R(()=>s("h4",null,"Due Date:",-1)),Z={class:"delete-button"},ss=["onClick"],es=b({props:{tasks:null,currentTab:null,findUser:null,deleteTask:null,saveTask:null},setup(e){return(t,a)=>(p(!0),f($,null,V(e.tasks,(n,i)=>(p(),f("a",{class:r(["panel-block",{"is-completed":e.currentTab!="Completed"&&n.isCompleted}]),key:i},[k(s("input",{type:"checkbox","onUpdate:modelValue":c=>n.isCompleted=c,onClick:c=>e.saveTask(i)},null,8,H),[[I,n.isCompleted]]),s("div",Y,v(n.title),1),s("div",G,[s("div",J,[s("figure",K,[s("img",{src:e.findUser(n.assignedTo._id).pic,class:"img is-rounded"},null,8,Q)]),s("p",null,v(e.findUser(n.assignedTo._id).firstName),1)]),s("div",W,[X,F(" "+v(l(O)(n.dueDate)),1)]),s("div",Z,[s("button",{class:"delete is-large",onClick:c=>e.deleteTask(i)},null,8,ss)])])],2))),128))}});var as=x(es,[["__scopeId","data-v-8b8a9912"]]);const u=e=>(C("data-v-0d7fdd7b"),e=e(),D(),e),ts={class:"tabs is-boxed"},ns=u(()=>s("a",null,[s("span",{class:"icon is-small"},[s("i",{class:"fas fa-clipboard-list"})]),s("span",null,"Created")],-1)),is=[ns],ls=u(()=>s("a",null,[s("span",{class:"icon is-small"},[s("i",{class:"fas fa-calendar-times"})]),s("span",null,"Assigned")],-1)),os=[ls],cs=u(()=>s("a",null,[s("span",{class:"icon is-small"},[s("i",{class:"fa-solid fa-calendar-days"})]),s("span",null,"Upcoming")],-1)),ds=[cs],rs=u(()=>s("a",null,[s("span",{class:"icon is-small"},[s("i",{class:"fa-solid fa-calendar-check"})]),s("span",null,"Completed")],-1)),us=[rs],ps=u(()=>s("a",null,[s("span",{class:"icon is-small"},[s("i",{class:"fas fa-calendar"})]),s("span",null,"All")],-1)),_s=[ps],hs={class:"panel-block"},fs={class:"columns"},vs={class:"field has-addons column is-5"},ks={class:"control has-icons-left"},ms=u(()=>s("span",{class:"icon is-left"},[s("i",{class:"fas fa-calendar-plus","aria-hidden":"true"})],-1)),bs=u(()=>s("div",{class:"control"},[s("button",{class:"button is-primary"},"Add")],-1)),Ts={class:"column is-3"},gs={class:"column is-3"},ws=b({setup(e){const t=z(),a=L();P(async()=>{await a.fetchTasks(),await a.tasks.forEach(async c=>{await t.fetchUser(c.createdBy._id),await t.fetchUser(c.assignedTo._id)})});const n=y(""),i=async()=>{const c=(await h(`users/search/${n.value}`)).data;return console.log(c),c||null};return(c,o)=>{const S=T("o-autocomplete"),B=T("o-field");return p(),f($,null,[s("div",ts,[s("ul",null,[s("li",{class:r({"is-active":l(a).currentTab=="Created"}),onClick:o[0]||(o[0]=d=>l(a).changeTab("Created"))},is,2),s("li",{class:r({"is-active":l(a).currentTab=="Assigned"}),onClick:o[1]||(o[1]=d=>l(a).changeTab("Assigned"))},os,2),s("li",{class:r({"is-active":l(a).currentTab=="Upcoming"}),onClick:o[2]||(o[2]=d=>l(a).changeTab("Upcoming"))},ds,2),s("li",{class:r({"is-active":l(a).currentTab=="Completed"}),onClick:o[3]||(o[3]=d=>l(a).changeTab("Completed"))},us,2),s("li",{class:r({"is-active":l(a).currentTab=="All"}),onClick:o[4]||(o[4]=d=>l(a).changeTab("All"))},_s,2)])]),s("div",hs,[s("form",{onSubmit:o[9]||(o[9]=E((...d)=>l(a).addTask&&l(a).addTask(...d),["prevent"])),style:{"flex-grow":"1"}},[s("div",fs,[s("div",vs,[s("div",ks,[k(s("input",{class:"input is-primary",type:"text",placeholder:"New Task","onUpdate:modelValue":o[5]||(o[5]=d=>l(a).newTask=d),maxlength:"35",required:""},null,512),[[g,l(a).newTask]]),ms]),bs]),s("div",Ts,[_(B,null,{default:m(()=>[_(S,{modelValue:n.value,"onUpdate:modelValue":o[6]||(o[6]=d=>n.value=d),placeholder:"e.g. Anne",data:i,field:"user.firstName",onSelect:o[7]||(o[7]=d=>l(a).toBeAssigned=d)},null,8,["modelValue"])]),_:1})]),s("div",gs,[k(s("input",{type:"date",class:"date-picker",required:"","onUpdate:modelValue":o[8]||(o[8]=d=>l(a).newDueDate=d)},null,512),[[g,l(a).newDueDate]])])]),_(as,{tasks:l(a).displayedTasks,currentTab:l(a).currentTab,findUser:l(t).findUser,deleteTask:l(a).deleteTask,saveTask:l(a).saveTask},null,8,["tasks","currentTab","findUser","deleteTask","saveTask"])],32)])],64)}}});var $s=x(ws,[["__scopeId","data-v-0d7fdd7b"]]);const Cs={class:"section"},Ds={class:"container"},ys={class:"columns"},As={class:"column is-8"},Us={class:"panel"},xs=s("div",null,"Loading",-1),Ss={class:"column is-4"},Bs={class:"panel"},Vs=A('<p class="panel-heading">Repositories</p><div class="panel-block"><p class="control has-icons-left"><input class="input" type="text" placeholder="Search"><span class="icon is-left"><i class="fas fa-search" aria-hidden="true"></i></span></p></div>',2),Is={class:"panel-tabs"},Fs=A('<a class="panel-block is-active"><span class="panel-icon"><i class="fas fa-book" aria-hidden="true"></i></span> bulma </a><a class="panel-block"><span class="panel-icon"><i class="fas fa-book" aria-hidden="true"></i></span> marksheet </a><a class="panel-block"><span class="panel-icon"><i class="fas fa-book" aria-hidden="true"></i></span> minireset.css </a><a class="panel-block"><span class="panel-icon"><i class="fas fa-book" aria-hidden="true"></i></span> jgthms.github.io </a><a class="panel-block"><span class="panel-icon"><i class="fas fa-code-branch" aria-hidden="true"></i></span> daniellowtw/infboard </a><a class="panel-block"><span class="panel-icon"><i class="fas fa-code-branch" aria-hidden="true"></i></span> mojs </a><label class="panel-block"><input type="checkbox"> remember me </label><div class="panel-block"><button class="button is-link is-outlined is-fullwidth">Reset all filters</button></div>',8),Ms=b({setup(e){const t=y("All"),a=n=>{t.value=n};return(n,i)=>(p(),f("div",Cs,[s("div",Ds,[s("div",ys,[s("div",As,[s("article",Us,[(p(),M(N,null,{default:m(()=>[_($s)]),fallback:m(()=>[xs]),_:1}))])]),s("div",Ss,[s("nav",Bs,[Vs,s("p",Is,[s("a",{class:r({"is-active":t.value=="All"}),onClick:i[0]||(i[0]=c=>a("All"))},"All",2),s("a",{class:r({"is-active":t.value=="Public"}),onClick:i[1]||(i[1]=c=>a("Public"))},"Public",2),s("a",{class:r({"is-active":t.value=="Private"}),onClick:i[2]||(i[2]=c=>a("Private"))},"Private",2),s("a",{class:r({"is-active":t.value=="Sources"}),onClick:i[3]||(i[3]=c=>a("Sources"))},"Sources",2),s("a",{class:r({"is-active":t.value=="Forks"}),onClick:i[4]||(i[4]=c=>a("Forks"))},"Forks",2)]),Fs])])])])]))}});export{Ms as default};
