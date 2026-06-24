# Cardápio Digital — RECREIO (Casa Caiçara)

Cardápio de café da manhã interativo para hóspedes do Airbnb. O hóspede monta o
pedido e envia direto para o WhatsApp da casa, separado por categoria.

## Estrutura

```
cardapio-recreio/
├── index.html              # página (menu fixo + logo embutida)
└── assets/
    ├── css/style.css       # estilo (verde-oliva, 3D, animações, mobile)
    └── js/script.js        # interação (carrinho + envio ao WhatsApp)
```

## Como usar

Abra o `index.html` no navegador. Não precisa de servidor — é HTML, CSS e JS puro.

## Configuração

- **WhatsApp de destino:** em `assets/js/script.js`, primeira linha
  `var WHATSAPP="5524999643048";` (formato 55 + DDD + número, só dígitos).

## Publicar (GitHub Pages)

1. Suba a pasta para um repositório no GitHub.
2. Settings → Pages → Branch: `main` / pasta `/root`.
3. O site fica disponível no link gerado pelo GitHub.

## Categorias

Bebidas · Pães e massas · Doces · Frios
