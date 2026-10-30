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
  assert.match(html,/<!--[\s\S]*?Version : v0\.1\.5[\s\S]*?30\/10\/2026[\s\S]*?-->/);
  assert.match(html,/<span class="tag">v0\.1\.5 — essai hors ligne<\/span>/);
  assert.doesNotMatch(html,/<script[^>]+src=|<link[^>]+href=/i);
});

test("La distribution autonome v0.1.5 reproduit strictement le HTML de travail",()=>{
  const distributed=fs.readFileSync(path.join(__dirname,"..","dist","CleanOR-v0.1.5-essai.html"),"utf8");
  assert.equal(distributed,html);
});
test("Diagnostic et aide 100 % HTML inline sans pop-up externe",()=>{
  for(const key of ["id=\"diagnosticToggle\"","id=\"diagnosticPanel\"","id=\"diagnosticView\"","id=\"diagnosticReport\"","id=\"copyDiagnosticBtn\""]){
    assert.ok(html.includes(key),key);
  }
  assert.doesNotMatch(html,/window\.open\s*\(|\bfetch\s*\(|\bXMLHttpRequest\b/i);
  assert.match(html,/document\.createTextNode\(piece\.value\)/);
  assert.doesNotMatch(html,/innerHTML\s*=\s*piece\.value/);
});
test("Fichier autonome et noms génériques",()=>{
  assert.match(html,/<html lang="fr">/);
  assert.doesNotMatch(html,/<script[^>]+src=|<link[^>]+href=|@import\b|https?:\/\//i);
  assert.doesNotMatch(html,/\bSalesforce\b|\bEnedis\b/i);
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


test("Diagnostic de l'original avant conversion : CRLF, LF, NBSP, ZWSP et U+2063",()=>{
  const raw="A \r\nB\u00a0C\u200bD\u2063E\u2028F";
  const d=api.inspectInvisible(raw);
  const codes=d.items.map(x=>x.code);
  assert.deepEqual(Array.from(codes),["U+000D","U+000A","U+00A0","U+200B","U+2063","U+2028"]);
  assert.equal(d.plainSpaces,1);
  assert.equal(d.truncated,false);
  assert.equal(d.items[0].position,3);
  assert.equal(d.items[1].position,4);
  assert.equal(d.items[2].position,6);
  assert.equal(api.convert(raw,{target:"reseau"}).text,"A B C D\u2063E F");
});
test("Décodage Unicode : les positions comptent les points de code, pas les unités UTF-16",()=>{
  const d=api.inspectInvisible("🙂\u200bA\nB");
  assert.equal(d.items[0].position,2);
  assert.equal(d.items[1].position,4);
  assert.equal(d.items[0].code,"U+200B");
  assert.equal(d.items[1].code,"U+000A");
});
test("Diagnostic sans fuite : le rapport exclut les mots du texte source",()=>{
  const source="CLIENT_CONFIDENTIEL_781 \u200b Adresse_PRIVEE \r\n";
  const r=api.diagnosticReport(api.inspectInvisible(source));
  assert.ok(r.includes("U+200B"));
  assert.ok(r.includes("U+000D"));
  assert.ok(r.includes("U+000A"));
  assert.ok(r.includes("Position "));
  assert.ok(!r.includes("CLIENT_CONFIDENTIEL_781"));
  assert.ok(!r.includes("Adresse_PRIVEE"));
  assert.ok(!r.includes(source));
});
test("Espaces ordinaires montrés en points sans être signalés comme anomalie",()=>{
  const d=api.inspectInvisible("un  deux");
  assert.equal(d.plainSpaces,2);
  assert.equal(d.items.length,0);
  assert.equal(d.fragments.filter(x=>x.type==="space").length,2);
  assert.equal(api.diagnosticReport(d).includes("Aucun code invisible spécial"),true);
});
test("Les contrôles, marques de format et espaces non standards sont identifiés",()=>{
  const sample="\u0001\t\u0085\u00ad\u034f\u061c\u180e\u200b\u200c\u200d\u2060\u2063\u2066\ufeff";
  const d=api.inspectInvisible(sample);
  assert.equal(d.items.length,14);
  assert.ok(d.items.some(x=>x.code==="U+0001"));
  assert.ok(d.items.some(x=>x.code==="U+034F"));
  assert.ok(d.items.some(x=>x.code==="U+2066"));
  assert.ok(d.items.some(x=>x.code==="U+FEFF"));
  assert.ok(d.items.some(x=>x.code==="U+2063"));
});
test("Diagnostic borné pour gros collages avec avertissement explicite",()=>{
  const d=api.inspectInvisible("A\u200bB\nC",{maxCharacters:3});
  assert.equal(d.truncated,true);
  assert.equal(d.scanned,3);
  assert.equal(d.items.length,1);
  assert.match(api.diagnosticReport(d),/ANALYSE PARTIELLE/);
  const m=api.inspectInvisible("\u200b\u200b\u200b",{maxMarkers:1});
  assert.equal(m.truncated,true);
  assert.equal(m.items.length,1);
});
test("Rapport technique déterministe et conversion sans effet de bord",()=>{
  const original="Bonjour\u200bmonde\r\nTerminé";
  const before=api.inspectInvisible(original);
  const report=api.diagnosticReport(before);
  assert.equal(report,api.diagnosticReport(api.inspectInvisible(original)));
  assert.equal(api.convert(original,{target:"reseau"}).text,"Bonjour monde Terminé");
  assert.equal(before.items[0].code,"U+200B");
  assert.equal(before.items[1].code,"U+000D");
  assert.equal(before.items[2].code,"U+000A");
});

test("SpanPersoOr : Unicode autorisé et contrôles rejetés",()=>{
  const ok="Éléphant 123 !?«» — € £ 🙂";
  const check=api.SpanPersoOrCheck(ok,"commentaire");
  assert.equal(check.valid,true);
  assert.equal(check.invalid.length,0);
  const raw="A\r\nB\u200b\u2060\tC";
  const bad=api.SpanPersoOrCheck(raw,"commentaire");
  assert.deepEqual(Array.from(bad.invalid.map(x=>x.code)),["U+000D","U+000A","U+200B","U+2060","U+0009"]);
});
test("SpanPersoOr : nettoyer ou supprimer les séparateurs selon le choix",()=>{
  const raw="Bonjour\u200bmonde\r\nSuite";
  const replace=api.SpanPersoOrClean(raw,{SpanPersoOrAction:"space"});
  const remove=api.SpanPersoOrClean(raw,{SpanPersoOrAction:"remove"});
  assert.equal(replace.text,"Bonjour monde Suite");
  assert.equal(remove.text,"BonjourmondeSuite");
  assert.equal(replace.SpanPersoOr.result.valid,true);
  assert.ok(replace.SpanPersoOr.codes.some(x=>x.includes("U+200B")));
});
test("SpanPersoOr : les catégories Z admises peuvent être normalisées",()=>{
  for(const separator of ["\u00a0","\u2028","\u2029","\u202f","\u3000"]){
    assert.equal(api.SpanPersoOrCheck("A"+separator+"B","commentaire").valid,true);
    assert.equal(api.SpanPersoOrClean("A"+separator+"B",{}).text,"A B");
  }
});
test("SpanPersoOr : limites de commentaires en unités UTF-16 sans troncature",()=>{
  assert.equal(api.SpanPersoOrCheck("x".repeat(2047),"commentaire").valid,true);
  assert.equal(api.SpanPersoOrCheck("x".repeat(2048),"commentaire").overLimit,true);
  assert.equal(api.SpanPersoOrCheck("x".repeat(2045)+"🙂","commentaire").valid,true);
  assert.equal(api.SpanPersoOrCheck("x".repeat(2046)+"🙂","commentaire").overLimit,true);
  const r=api.SpanPersoOrClean("x".repeat(2055),{SpanPersoOrField:"commentaire"});
  assert.equal(r.text.length,2055);
  assert.equal(r.SpanPersoOr.result.overLimit,true);
  assert.ok(r.SpanPersoOr.warnings.length);
});

test("SpanPersoOr : restrictions de référence demandeur 150 unités UTF-16",()=>{
  assert.equal(api.SpanPersoOrCheck("A".repeat(150),"referenceDemandeur").valid,true);
  assert.equal(api.SpanPersoOrCheck("A".repeat(151),"referenceDemandeur").overLimit,true);
  for(const ch of ["'","%","&","€",'"',"{","}","|",String.fromCharCode(96),"$",";","\\"]){
    const check=api.SpanPersoOrCheck("A"+ch+"B","referenceDemandeur");
    assert.equal(check.valid,false);
    assert.equal(check.forbidden.length,1);
    assert.equal(api.SpanPersoOrClean("A"+ch+"B",{SpanPersoOrField:"referenceDemandeur"}).text,"A B");
  }
  assert.equal(api.SpanPersoOrCheck("A|B","commentaire").valid,true);
});
test("SpanPersoOr : aucune longueur inconnue inventée pour les autres champs",()=>{
  const result=api.SpanPersoOrCheck("A".repeat(4000),"autre");
  assert.equal(result.profile.maxLength,null);
  assert.equal(result.valid,true);
});
test("SpanPersoOr : ponctuations, accents et symboles autorisés préservés",()=>{
  const raw="Électricité : «test» — déjà… € 🙂";
  const result=api.SpanPersoOrClean(raw,{SpanPersoOrField:"commentaire"});
  assert.equal(result.text,raw);
  assert.equal(result.SpanPersoOr.modified,false);
});
test("SpanPersoOr : règles personnalisées et encodages restent disponibles",()=>{
  const config=api.defaultConfig();
  config.reseau.rules.push({from:"Ω",to:"ohm"});
  config.reseau.denied="★";
  assert.equal(api.SpanPersoOrClean("Ω ★",{config}).text,"ohm ");
  assert.equal(api.SpanPersoOrClean("Été",{encoding:"ascii"}).text,"Ete");
  assert.ok(api.SpanPersoOrClean("Été",{encoding:"ascii"}).SpanPersoOr.warnings.length);
});
test("SpanPersoOr : profil historique préservé hors option",()=>{
  const raw="Bonjour\r\nmonde";
  assert.equal(run(raw).text,"Bonjour monde");
  assert.equal(api.convert(raw,{target:"reseau",SpanPersoOr:true}).text,"Bonjour monde");
  assert.equal(api.convert(raw,{target:"crm",SpanPersoOr:true}).text,"Bonjour\nmonde");
});


test("Le renommage public et interne ne contient plus l'ancien identifiant",()=>{
  assert.doesNotMatch(html, /adc5/i);
  assert.doesNotMatch(fs.readFileSync(path.join(__dirname,"test-settings.cjs"),"utf8"), /adc5/i);
});
