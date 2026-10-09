"use strict";
const {test} = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const html = fs.readFileSync(path.join(__dirname,"..","index.html"),"utf8");
const inline = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
  .map(x=>x[1]).find(x=>x.includes("CORE_START"));
assert.ok(inline,"Le script principal intégré doit être présent");
assert.match(html,/<script src="\.\/CleanOR-sauvegarde\.js"><\/script>\s*<script>/);

function start({backup,localRules,brokenBackup}={}){
  const nodes={};
  function node(id){
    return nodes[id] ||= {value:id==="mode"?"prudent":id==="outputEncoding"?"utf-8":"",textContent:"",
      className:"",style:{},hidden:true,checked:false,files:[],addEventListener(){},
      focus(){},select(){},setAttribute(){},click(){}};
  }
  const document={getElementById:node,documentElement:{style:{}}};
  const store={ "cleanor-settings-v1": localRules ? JSON.stringify(localRules) : null };
  const localStorage={
    getItem(k){return store[k]??null;},
    setItem(k,v){store[k]=v;},
    removeItem(k){delete store[k];}
  };
  const ctx={document,localStorage,TextEncoder,TextDecoder,Uint8Array,Set};
  vm.createContext(ctx);
  if (backup!==undefined){
    const content = "globalThis.CleanORBackup = "+JSON.stringify(backup)+";";
    vm.runInContext(content,ctx);
  } else if(brokenBackup){
    ctx.CleanORBackup={format:"unknown"};
  }
  vm.runInContext(inline,ctx,{timeout:3000});
  return {nodes,node,ctx,store};
}

function profile(denied){return {crm:{denied,rules:[]},reseau:{denied,rules:[]}};}
test("Une sauvegarde placée à côté de la page est reconnue automatiquement, sans clic",()=>{
  const backup={format:"CleanOR-rules-v1",profiles:profile("★")};
  const x=start({backup});
  assert.equal(x.node("deniedChars").value,"★");
  assert.match(x.node("report").textContent,/Sauvegarde locale chargée automatiquement/);
  assert.match(x.node("settingsStatus").textContent,/chargée automatiquement/);
});
test("Le fichier de sauvegarde est prioritaire sur localStorage",()=>{
  const backup={format:"CleanOR-rules-v1",profiles:profile("✓")};
  const x=start({backup,localRules:profile("✗")});
  assert.equal(x.node("deniedChars").value,"✓");
});
test("Sans sauvegarde dans le dossier, les réglages navigateur sont conservés",()=>{
  const x=start({localRules:profile("♪")});
  assert.equal(x.node("deniedChars").value,"♪");
  assert.doesNotMatch(x.node("report").textContent,/Sauvegarde locale chargée/);
});
test("Une sauvegarde invalide n'efface pas les réglages existants",()=>{
  const x=start({brokenBackup:true,localRules:profile("é")});
  assert.equal(x.node("deniedChars").value,"é");
  assert.match(x.node("report").textContent,/Sauvegarde du dossier invalide/);
});
test("L'export automatique est proposé, en plus de l'import/export JSON",()=>{
  for(const name of ["exportAutoload","exportRules","importRules"])
    assert.match(html,new RegExp('id="'+name+'"'));
  assert.match(inline,/download\(new TextEncoder\(\)\.encode\(source\),"CleanOR-sauvegarde\.js"/);
});
