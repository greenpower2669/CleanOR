"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const {test} = require("node:test");
const html = fs.readFileSync(path.join(__dirname,"..","index.html"),"utf8");
const match = html.match(/\/\* CORE_START \*\/([\s\S]*?)\/\* CORE_END \*\//);
assert.ok(match,"Le noyau existe dans index.html");
const ctx = {TextEncoder,TextDecoder,Uint8Array,Set};
vm.runInNewContext(match[1],ctx,{timeout:3000});
const api=ctx.CleanORCore;
const run=(text,opt={})=>api.convert(text,Object.assign({target:"reseau",mode:"prudent",encoding:"utf-8"},opt));

test("Fichier autonome et noms génériques",()=>{
  assert.match(html,/<html lang="fr">/);
  assert.match(html,/<script src="\.\/CleanOR-sauvegarde\.js"><\/script>/);
  assert.doesNotMatch(html,/<script[^>]+src="(?!\.\/CleanOR-sauvegarde\.js")[^"]+"|<link[^>]+href=|@import\b|https?:\/\//i);
  assert.doesNotMatch(html,/\bSalesforce\b|\bEnedis\b|\bSGE\b/i);
});
test("Accents conservés, typographie adaptée à la destination",()=>{
  assert.equal(run("Électricité : «test» — déjà…").text,"Électricité : «test» - déjà...");
});
test("Contrôles, marques bidi, zéro largeur, espaces insécables",()=>{
  const r=run("A\u200bB\u202e C\u00a0D\u0001");
  assert.equal(r.text,"AB C D");assert.ok(r.removed>=3);
});
test("Profils de destination distincts",()=>{
  assert.equal(run("a\u2014b",{target:"crm"}).text,"a\u2014b");
  assert.equal(run("a\u2014b",{target:"reseau"}).text,"a-b");
});
test("Règles personnalisées et caractères interdits",()=>{
  const c=api.defaultConfig();c.reseau.denied="★";c.reseau.rules.push({from:"Ω",to:"ohm"});
  assert.equal(run("Ω ★",{config:c}).text,"ohm ");
});
test("Export réel Windows-1252 et UTF-8",()=>{
  assert.deepEqual(Array.from(api.encodeText("é€","windows-1252")),[233,128]);
  assert.deepEqual(Array.from(api.encodeText("é","utf-8")),[195,169]);
});
test("ASCII et signalement des pertes",()=>{
  assert.equal(run("Crème brûlée, cœur",{encoding:"ascii"}).text,"Creme brulee, coeur");
  assert.equal(run("ok🙂",{encoding:"ascii",mode:"prudent"}).text,"ok?");
  assert.equal(run("ok🙂",{encoding:"ascii",mode:"renforce"}).text,"ok");
  assert.equal(run("ok🙂",{encoding:"ascii"}).unsupported,1);
});
test("Windows-1252 et caractères absents",()=>{
  assert.equal(run("é🙂",{encoding:"windows-1252",mode:"prudent"}).text,"é?");
});
test("Réparation volontaire UTF-8 lu comme ANSI",()=>{
  assert.equal(api.repairMojibake("FranÃ§ais").text,"Français");
  assert.equal(run("FranÃ§ais",{repair:true}).text,"Français");
});
test("Configuration importée filtrée",()=>{
  const c=api.cleanConfig({crm:{denied:"x",rules:[{from:"test",to:"ok"}]},reseau:{denied:"z",rules:[{from:"",to:"p"},{from:"*",to:"!"}]}});
  assert.equal(c.crm.rules.length,1);assert.equal(c.reseau.rules.length,1);
});
