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

test("Date et version en remarque HTML sans dépendance annexe",()=>{
  assert.match(html,/<!--[\s\S]*?Version : v0\.1\.2[\s\S]*?30\/10\/2026[\s\S]*?-->/);
  assert.match(html,/<span class="tag">v0\.1\.2 — hors ligne<\/span>/);
  assert.doesNotMatch(html,/<script[^>]+src=|<link[^>]+href=/i);
});
test("Fichier autonome et noms génériques",()=>{
  assert.match(html,/<html lang="fr">/);
  assert.doesNotMatch(html,/<script[^>]+src=|<link[^>]+href=|@import\b|https?:\/\//i);
  assert.doesNotMatch(html,/\bSalesforce\b|\bEnedis\b|\bSGE\b/i);
});
test("Accents conservés, typographie adaptée à la destination",()=>{
  assert.equal(run("Électricité : «test» — déjà…").text,"Électricité : «test» - déjà...");
});
test("Contrôles, marques bidi, zéro largeur, espaces insécables",()=>{
  const r=run("A\u200bB\u202e C\u00a0D\u0001");
  assert.equal(r.text,"A B C D");assert.ok(r.removed>=2);assert.ok(r.separatorsNormalized>=2);
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


test("Tous les sauts de ligne et séparateurs deviennent des espaces ASCII vers le réseau",()=>{
  const sep=["\r\n","\n","\r","\u2028","\u2029","\u0085","\u000b","\u000c","\t",
    "\u001c","\u001d","\u001e","\u001f","\u00a0","\u202f","\u1680",
    "\u2000","\u2009","\u200a","\u205f","\u3000","\u200b","\ufeff"];
  const mots=Array.from({length:sep.length+1},(_,i)=>String.fromCharCode(65+i));
  const source=mots.map((mot,i)=>mot+(sep[i]||"")).join("");
  const r=run(source);
  assert.equal(r.text,mots.join(" "));
  assert.equal(r.separatorsNormalized,sep.length);
  assert.equal(run(source,{encoding:"ascii"}).text,mots.join(" "));
  assert.equal(run(source,{encoding:"windows-1252"}).text,mots.join(" "));
});
test("Retours multiples et espaces aux extrémités ne fusionnent pas les mots",()=>{
  const r=run(" \r\n\t Bonjour\u2028\u2029le   monde \u000b !\r\n ");
  assert.equal(r.text,"Bonjour le monde !");
  assert.ok(r.separatorsNormalized>=4);
});
test("Une règle personnalisée ne peut réintroduire un séparateur réseau",()=>{
  const config=api.defaultConfig();
  config.reseau.rules.push({from:"|",to:"\r\n\u2028\t"});
  assert.equal(run("avant|après",{config}).text,"avant après");
});
test("La conversion inverse vers le CRM conserve les lignes ordinaires",()=>{
  const r=run("A\r\nB\nC",{target:"crm"});
  assert.equal(r.text,"A\nB\nC");
  assert.equal(r.separatorsNormalized,0);
});
test("Les marques invisibles non séparatrices restent retirées",()=>{
  const r=run("A\u200cB\u2060C");
  assert.equal(r.text,"ABC");
});
