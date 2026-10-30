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
  assert.match(html,/<!--[\s\S]*?Version : v0\.1\.3[\s\S]*?30\/10\/2026[\s\S]*?-->/);
  assert.match(html,/<span class="tag">v0\.1\.3 — essai hors ligne<\/span>/);
  assert.doesNotMatch(html,/<script[^>]+src=|<link[^>]+href=/i);
});
test("La version autonome d'essai est strictement identique au HTML source",()=>{
  const distrib=fs.readFileSync(path.join(__dirname,"..","dist","CleanOR-v0.1.3-essai.html"),"utf8");
  assert.equal(distrib,html);
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
  assert.equal(r.text,"A B C D");assert.ok(r.removed>=2);assert.equal(r.separatorsNormalized,0);
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



test("Toutes les fins de ligne deviennent un LF U+000A unique",()=>{
  const sep=["\r\n","\n","\r","\u2028","\u2029","\u0085","\u000b","\u000c",
    "\u001c","\u001d","\u001e"];
  for(const sequence of sep){
    const r=run("avant"+sequence+"après");
    assert.equal(r.text,"avant\naprès");
    assert.equal(r.separatorsNormalized,sequence==="\n"?0:1);
    for(const encoding of ["utf-8","windows-1252","ascii"])
      assert.equal(run("avant"+sequence+"après",{encoding}).text,
        encoding==="ascii"?"avant\napres":"avant\naprès");
  }
});
test("Parasites invisibles entre les textes, CRLF et séparateurs répétés",()=>{
  const r=run("avant \u200b\u2060\r\n\u200c\u2028\u2029\u00a0 après");
  assert.equal(r.text,"avant\naprès");
  assert.ok(r.removed>=2);
  assert.equal(r.separatorsNormalized,1);
});
test("Lignes normales et espaces visibles préservés",()=>{
  const r=run("Ligne une\nLigne deux  avec deux espaces\nDernière ligne");
  assert.equal(r.text,"Ligne une\nLigne deux  avec deux espaces\nDernière ligne");
  assert.equal(r.separatorsNormalized,0);
});
test("Les tabulations et espaces Unicode horizontaux deviennent des espaces, pas des LF",()=>{
  for(const sequence of ["\t","\u001f","\u00a0","\u202f","\u1680","\u2000","\u2009","\u205f","\u3000"]){
    assert.equal(run("avant"+sequence+"après").text,"avant après");
  }
  assert.equal(run("avant  après").text,"avant  après");
});
test("Les caractères invisibles isolés sont retirés, sans briser le LF",()=>{
  for(const invisible of ["\u00ad","\u034f","\u061c","\u180e","\u200c","\u200d","\u2060","\u2066","\u2069","\ufeff"]){
    assert.equal(run("a"+invisible+"b").text,"ab");
  }
  assert.equal(run("A\u0001\u200bB").text,"A B");
});

test("Les séparateurs invisibles U+200B et U+2063 deviennent SPACE U+0020",()=>{
  for(const separator of ["\u200b","\u2063"]){
    assert.equal(run("Bonjour"+separator+"monde").text,"Bonjour monde");
    assert.equal(run("Bonjour "+separator+" monde").text,"Bonjour monde");
    assert.equal(run("Bonjour"+separator+separator+"monde").text,"Bonjour monde");
    assert.equal(run("Bonjour"+separator+"monde",{encoding:"ascii"}).text,"Bonjour monde");
    assert.equal(run("Bonjour"+separator+"monde",{encoding:"windows-1252"}).text,"Bonjour monde");
  }
});
test("Une marque de format ne crée pas d'espace à elle seule",()=>{
  for(const mark of ["\u200c","\u200d","\u2060","\u00ad","\ufeff"]){
    assert.equal(run("ab"+mark+"cd").text,"abcd");
  }
  assert.equal(run("Bon\u2060\u200b\u2060jour").text,"Bon jour");
});
test("Un séparateur invisible adjacent à une fin de ligne ne laisse pas d'espace parasite",()=>{
  const input="première \u2063\u200b\r\n\u2060\u2028\u2063 deuxième";
  const output=run(input);
  assert.equal(output.text,"première\ndeuxième");
  assert.equal(run(output.text).text,output.text);
});
test("Une règle personnalisée introduisant un séparateur invisible conserve les mots",()=>{
  const config=api.defaultConfig();
  config.reseau.rules.push({from:"|",to:"\u200b\u2063"});
  assert.equal(run("mot|suivant",{config}).text,"mot suivant");
});
test("Les espaces ordinaires restent intacts, les suites mixtes deviennent un seul espace",()=>{
  assert.equal(run("un  deux   trois").text,"un  deux   trois");
  assert.equal(run("un \t\u200b \u2063  deux").text,"un deux");
  assert.equal(run("  un  deux  ").text,"un  deux");
});

test("Une règle personnalisée ne peut réintroduire ni invisibles ni fin de ligne exotique",()=>{
  const config=api.defaultConfig();
  config.reseau.rules.push({from:"|",to:"\r\n\u200b\u2028\u2060\t"});
  assert.equal(run("avant|après",{config}).text,"avant\naprès");
});
test("La conversion inverse vers le CRM conserve les retours ordinaires",()=>{
  const r=run("A\r\nB\nC",{target:"crm"});
  assert.equal(r.text,"A\nB\nC");
  assert.equal(r.separatorsNormalized,0);
});
test("Les retours parasites aux extrémités ne laissent pas de lignes orphelines",()=>{
  assert.equal(run(" \r\n Début\u2028Fin \r\n\t").text,"Début\nFin");
});
test("Le compteur est stable et la conversion LF est idempotente",()=>{
  const input="avant\u2028\u200baprès\r\nfin";
  const converted=run(input);
  const again=run(converted.text);
  assert.equal(converted.text,"avant\naprès\nfin");
  assert.equal(again.text,converted.text);
  assert.equal(again.separatorsNormalized,0);
});
