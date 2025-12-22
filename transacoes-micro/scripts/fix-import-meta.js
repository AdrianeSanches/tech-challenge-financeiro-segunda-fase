/**
 * Script para remover import.meta do remoteEntry.js
 * O Angular CLI não respeita a configuração environment.module: false,
 * então precisamos fazer um pós-processamento.
 */

const fs = require('fs');
const path = require('path');

const remoteEntryPath = path.join(__dirname, '..', 'dist', 'transacoes-micro', 'remoteEntry.js');

console.log('Fixing import.meta in remoteEntry.js...');

if (!fs.existsSync(remoteEntryPath)) {
  console.error('remoteEntry.js not found at:', remoteEntryPath);
  process.exit(1);
}

let content = fs.readFileSync(remoteEntryPath, 'utf8');

// Conta quantos import.meta existem antes
const countBefore = (content.match(/import\.meta/g) || []).length;
console.log(`Found ${countBefore} occurrences of import.meta`);

// Substitui o padrão que usa import.meta.url para determinar publicPath
// De: (()=>{var a;if("string"==typeof import.meta.url&&(a=import.meta.url),!a)throw new Error("Automatic publicPath is not supported in this browser");a=a.replace(/^blob:/,"").replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),r.p=a})()
// Para: (()=>{r.p="http://localhost:4201/"})()

// Padrão mais genérico para capturar o bloco que define r.p usando import.meta
const importMetaPattern = /\(\(\)=>\{var a;if\("string"==typeof import\.meta\.url&&\(a=import\.meta\.url\),!a\)throw new Error\("Automatic publicPath is not supported in this browser"\);[^}]+,r\.p=a\}\)\(\)/g;

// Substitui por uma versão que usa document.currentScript ou URL fixa
const replacement = `(()=>{
  var a;
  if(typeof document!=="undefined"&&document.currentScript){
    var s=document.currentScript.src;
    a=s.substring(0,s.lastIndexOf("/")+1);
  }
  if(!a){
    var scripts=document.getElementsByTagName("script");
    for(var i=scripts.length-1;i>=0;i--){
      var src=scripts[i].src;
      if(src&&src.indexOf("remoteEntry.js")>-1){
        a=src.substring(0,src.lastIndexOf("/")+1);
        break;
      }
    }
  }
  if(!a)a="http://localhost:4201/";
  r.p=a;
})()`.replace(/\n\s*/g, '');

content = content.replace(importMetaPattern, replacement);

// Conta quantos import.meta existem depois
const countAfter = (content.match(/import\.meta/g) || []).length;
console.log(`After fix: ${countAfter} occurrences of import.meta`);

if (countAfter > 0) {
  console.warn('Warning: Some import.meta occurrences could not be replaced');
  // Tenta uma substituição mais agressiva como fallback
  content = content.replace(/import\.meta\.url/g, '(document.currentScript?document.currentScript.src:"http://localhost:4201/remoteEntry.js")');
  const countFinal = (content.match(/import\.meta/g) || []).length;
  console.log(`After aggressive fix: ${countFinal} occurrences of import.meta`);
}

// Também remove o export statement ESM no final e converte para IIFE
if (content.includes('export{G as get,H as init}')) {
  content = content.replace(/export\{G as get,H as init\};?$/, 'var transacoes_micro={get:G,init:H};');
  console.log('Converted ESM export to global variable');
}

fs.writeFileSync(remoteEntryPath, content, 'utf8');

console.log('remoteEntry.js fixed successfully!');

