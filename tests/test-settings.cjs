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
 const fields={},clipboard=[];
 function makeNode(id){
  const events={},children=[],attrs={};
  return {
   value:id==="mode"?"prudent":id==="outputEncoding"?"utf-8":"",
   hidden:true,checked:false,textContent:"",className:"",title:"",style:{},files:[],children,attrs,
   addEventListener(type,fn){events[type]=fn;},
   setAttribute(k,v){attrs[k]=v;},
   focus(){this.focused=true;},
   select(){this.selected=true;},
   click(){return events.click&&events.click();},
   emit(type){return events[type]&&events[type]();},
   appendChild(child){children.push(child);return child;},
   removeChild(child){const index=children.indexOf(child);if(index>=0)children.splice(index,1);return child;},
   get firstChild(){return children[0]||null;}
  };
 }
 const node=id=>fields[id]??=makeNode(id);
 const localStorage={
  getItem(){if(!storageWorks)throw new Error("stockage bloqué");return stored===undefined?null:stored;},
  setItem(){if(!storageWorks)throw new Error("stockage bloqué");},
  removeItem(){if(!storageWorks)throw new Error("stockage bloqué");}
 };
 const document={
  getElementById:node,documentElement:{style:{}},
  createTextNode(value){return {nodeType:3,textContent:String(value)};},
  createElement(name){return makeNode(name);}
 };
 const navigator={clipboard:{async writeText(value){clipboard.push(value);}}};
 const ctx={TextEncoder,TextDecoder,Uint8Array,Set,localStorage,document,navigator};
 vm.createContext(ctx);vm.runInContext(script,ctx,{timeout:3000});
 return {fields,node,ctx,clipboard};
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

test("❓ ouvre une aide et un diagnostic inline, sans nouvelle fenêtre",()=>{
 const app=launch();
 assert.equal(app.node("help").hidden,true);
 app.node("helpBtn").click();
 assert.equal(app.node("help").hidden,false);
 assert.equal(app.node("diagnosticPanel").hidden,true);
 app.node("sourceText").value="ClientSecret\u200btexte\r\nSuite";
 app.node("diagnosticToggle").click();
 assert.equal(app.node("diagnosticPanel").hidden,false);
 assert.equal(app.node("diagnosticToggle").attrs["aria-expanded"],"true");
 assert.ok(app.node("diagnosticView").children.some(n=>n.className==="invisible-code"&&n.textContent.includes("U+200B")));
 assert.ok(app.node("diagnosticReport").value.includes("U+200B"));
 assert.ok(!app.node("diagnosticReport").value.includes("ClientSecret"));
 app.node("closeDiagnosticBtn").click();
 assert.equal(app.node("diagnosticPanel").hidden,true);
 assert.equal(app.node("diagnosticReport").value,"");
});
test("Le rapport copié ne contient pas le texte professionnel d'origine",async()=>{
 const app=launch();
 app.node("sourceText").value="SECRET_DOSSIER_123\u2028MESURE\u200bOK";
 app.node("helpBtn").click();
 app.node("diagnosticToggle").click();
 await app.node("copyDiagnosticBtn").click();
 assert.equal(app.clipboard.length,1);
 assert.ok(app.clipboard[0].includes("U+2028"));
 assert.ok(app.clipboard[0].includes("U+200B"));
 assert.ok(!app.clipboard[0].includes("SECRET_DOSSIER_123"));
 assert.ok(!app.clipboard[0].includes("MESURE"));
});
test("Le diagnostic suit les modifications du texte source et ne persiste pas à la fermeture",()=>{
 const app=launch();
 app.node("helpBtn").click();
 app.node("sourceText").value="un\u200bdeux";
 app.node("diagnosticToggle").click();
 assert.ok(app.node("diagnosticReport").value.includes("U+200B"));
 app.node("sourceText").value="trois\u2028quatre";
 app.node("sourceText").emit("input");
 assert.ok(app.node("diagnosticReport").value.includes("U+2028"));
 assert.ok(!app.node("diagnosticReport").value.includes("U+200B"));
 app.node("helpBtn").click();
 assert.equal(app.node("diagnosticPanel").hidden,true);
 assert.equal(app.node("diagnosticView").children.length,0);
});
test("Le texte potentiellement HTML reste un simple nœud texte",()=>{
 const app=launch();
 app.node("helpBtn").click();
 app.node("sourceText").value="<img src=x onerror=alert(1)>\u200bX";
 app.node("diagnosticToggle").click();
 const view=app.node("diagnosticView").children;
 assert.equal(view[0].nodeType,3);
 assert.ok(view.filter(n=>n.nodeType===3).map(n=>n.textContent).join("").includes("<img"));
 assert.ok(view.some(n=>n.className==="invisible-code"));
});
