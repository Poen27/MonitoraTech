# Como editar o site MonitoraTech pelo GitHub

Você não precisa instalar programa no computador.

## Jeito mais fácil: editar textos, contato e cores

1. Abra o arquivo [config.js](./config.js).
2. Clique no ícone de lápis (**Edit this file**).
3. Altere o texto que estiver entre aspas, sem apagar as aspas ou vírgulas.
4. Clique em **Commit changes** e confirme.
5. Se o GitHub Pages ou Netlify estiver conectado à branch `main`, a publicação será atualizada automaticamente.

### Exemplos de alteração

- **E-mail:** modifique `email`
- **Nome do site:** modifique `nomeProjeto`
- **Subtítulo da marca:** modifique `subtituloMarca`
- **Frase principal:** modifique `tituloPrincipal` e `destaquePrincipal`
- **Descrição inicial:** modifique `descricaoPrincipal`
- **Texto do contato:** modifique `tituloContato`, `destaqueContato` e `descricaoContato`
- **Cor de destaque:** modifique `corPrincipal`
- **Cor de fundo:** modifique `corFundo`

### Para trocar a logo

Substitua o arquivo `logo-monitoratech.webp` no repositório por uma nova imagem WebP com o mesmo nome. Se for PNG, ajuste também as três referências para a logo no arquivo `index.html`.

## Para alterações maiores

- `index.html`: seções, estrutura e textos que não estão no `config.js`.
- `styles.css`: layout, tamanhos, espaçamentos e estilos.
- `script.js`: interações, gráficos demonstrativos, formulário e leitura do `config.js`.
- `logo-monitoratech.webp`: imagem da marca.

**Importante:** o painel usa dados ilustrativos, não dados reais do Zabbix. O contato prepara uma mensagem no aplicativo de e-mail do visitante; não envia e-mail diretamente do site.

## Dica

Antes de mexer em muitos arquivos, faça mudanças pequenas e use a prévia do site para conferir. O GitHub permite recuperar versões anteriores pelo histórico de commits.
