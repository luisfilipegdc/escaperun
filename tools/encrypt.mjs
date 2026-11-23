#!/usr/bin/env node
// Criptografa a imagem secreta com a senha do jogo.
// Uso: node tools/encrypt.mjs <imagem> <senha> [saida]
// Só os dígitos da senha contam ("4.032" e "4032" são equivalentes).
import { readFileSync, writeFileSync } from 'node:fs';
import { webcrypto as crypto } from 'node:crypto';

const [, , input, password, output = 'assets/segredo.bin'] = process.argv;
if (!input || !password) {
  console.error('Uso: node tools/encrypt.mjs <imagem> <senha> [saida]');
  process.exit(1);
}

const ITERATIONS = 200000; // manter igual ao index.html
const pin = password.replace(/\D/g, '');
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));

const material = await crypto.subtle.importKey(
  'raw', new TextEncoder().encode(pin), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
  material, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
const cipher = new Uint8Array(
  await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, readFileSync(input)));

// formato: salt (16) | iv (12) | dados cifrados
writeFileSync(output, Buffer.concat([salt, iv, cipher]));
console.log(`OK: ${output} (${pin.length} dígitos, ${cipher.length} bytes)`);
