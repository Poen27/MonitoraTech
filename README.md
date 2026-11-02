# MONITORA. — Projeto de Monitoramento TI

Site estático de apresentação de um projeto educacional de monitoramento com **Zabbix, Zabbix Agent e Grafana**.

## Arquivos

- `index.html` — página principal
- `styles.css` — aparência e responsividade
- `script.js` — comportamento da página e formulário
- `config.js` — configuração do e-mail de contato
- `favicon.svg` — ícone do navegador

## Configure o contato

Edite `config.js` antes de publicar:

```js
window.SITE_CONFIG = {
  email: "contato@exemplo.com",
  nomeProjeto: "Monitoramento TI"
};
```

Use apenas um endereço que você autoriza tornar público. O formulário **não envia mensagens diretamente**: ele abre o programa de e-mail do visitante com o texto preparado.

## Publicar no GitHub Pages

1. Crie um repositório novo no GitHub (por exemplo, `projeto-monitoramento`).
2. Envie **os arquivos da raiz deste pacote** para a **raiz do repositório** (não envie a pasta ZIP como um único arquivo).
3. Abra `Settings` → `Pages` e selecione `Deploy from a branch`.
4. Selecione a branch `main` e a pasta `/(root)`, depois clique em `Save`.
5. Quando a implantação estiver concluída, acesse `https://SEU-USUARIO.github.io/projeto-monitoramento/`.

Os dados do painel são ilustrativos. Não inclua senhas, chaves, tokens ou dados privados no site público. Uma integração real com Zabbix exige infraestrutura segura e controle de acesso.