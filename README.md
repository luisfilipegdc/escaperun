# Escape Run — Tablet bloqueado

Site de uma etapa do jogo de escape: o aluno digita a senha de 4 dígitos e,
acertando, a tela desbloqueia e mostra a foto do próximo desafio.

Site estático (um `index.html`), sem build e sem dependências.

## Publicar na Vercel

1. Em [vercel.com/new](https://vercel.com/new), importe este repositório.
2. Framework Preset: **Other**. Deixe os comandos de build vazios.
3. Clique em **Deploy**.

## Trocar a foto ou a senha

A foto não fica no repositório em formato aberto: ela é criptografada com a
senha e salva em `assets/segredo.bin`. Para gerar de novo (Node 18+):

```bash
node tools/encrypt.mjs caminho/da/foto.png SENHA
```

Só os dígitos da senha contam (`1.234` e `1234` são a mesma senha) e a tela
espera 4 dígitos. Depois é só fazer commit do novo `assets/segredo.bin`.

## Testar no computador

```bash
npx serve .
```

A página precisa ser aberta por `http://localhost` ou `https://` (não funciona
abrindo o arquivo direto com duplo clique).
