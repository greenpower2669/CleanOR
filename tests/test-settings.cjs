"use strict";
const {test}=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const html=fs.readFileSync(path.join(__dirname,"..","index.html"),"utf8");
const script=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(x=>x.includes("CORE_START"));
assert.ok(script,"Script autonome intégré présent");
function launch({stored,storageWorks=true}={}){
 const fields={};
 const node=id=>fields[id]??=( {value:id==="mode"?"prudent":id==="outputEncoding"?"utf-8":"",hidden:true,checked:false,
  textContent:"",className:"",style:{},files:[],addEventListener(){},setAttribute(){},focus(){},select(){},click(){}} );
 const localStorage={
  getItem(){if(!storageWorks)throw new Error("stockage bloqué");return stored===undefined?null:stored;},
  setItem(){if(!storageWorks)throw new Error("stockage bloqué");},
  removeItem(){if(!storageWorks)throw new Error("stockage bloqué");}
 };
 const ctx={TextEncoder,TextDecoder,Uint8Array,Set,localStorage,document:{getElementById:node,documentElement:{style:{}}}};
 vm.createContext(ctx);vm.runInContext(script,ctx,{timeout:3000});
 return {fields,node,ctx};
}
test("aucun chargement de script ni fichier voisin à l'ouverture",()=>{
 assert.doesNotMatch(html,/<script[^>]+src=/i);
 assert.doesNotMatch(html,/CleanORBackup|CleanOR-sauvegarde\.js|exportAutoload/);
});
test("démarrage sans stockage fonctionne sans erreur",()=>{
 const app=launch({storageWorks:false});
 assert.equal(app.node("deniedChars").value,"");
});
test("démarrage sans sauvegarde fonctionne avec réglages par défaut",()=>{
 const app=launch();
 assert.match(app.node("replacements").value,/ => /);
});
test("réglages mémorisés dans le navigateur sont restaurés sans clic",()=>{
 const conf={crm:{denied:"☁",rules:[]},reseau:{denied:"★",rules:[{from:"⚡",to:"eclair"}]}};
 const app=launch({stored:JSON.stringify(conf)});
 assert.equal(app.node("deniedChars").value,"★");
 assert.match(app.node("replacements").value,/⚡ => eclair/);
});
test("import et export JSON manuels préservés",()=>{
 for(const id of ["exportRules","importRules","saveSettings","resetRules"])
   assert.match(html,new RegExp('id="'+id+'"'));
});
