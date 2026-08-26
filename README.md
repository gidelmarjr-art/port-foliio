# Gidelmar Júnior — Portfólio (React)

Landing page do portfólio pessoal em **React + Vite**, com uma identidade de
**estúdio/agência premium** — inspirada em sites de portfólio de UX/UI como
o [aerukart.com](https://aerukart.com/): fundo preto com grão de filme,
tipografia gigante em caixa alta, menu em tela cheia, faixas de texto em
loop (marquee), cursor customizado "magnético" e cards de projeto com
revelação assimétrica no hover.

## Stack

- **React 19 + Vite** — build e dev server
- **CSS puro** (variáveis CSS, sem framework de utilitários) — um arquivo de
  estilo por componente, ao lado do próprio componente
- **lucide-react** — ícones de interface
- **framer-motion** — instalado e disponível para uso futuro (o site atual
  usa `IntersectionObserver` + CSS puro para as revelações de scroll)

## Estrutura de pastas

```
src/
  assets/img/        imagens do site (fotos e prévias de projetos)
  components/
    layout/           Navbar, MenuOverlay (menu fullscreen), Footer,
                       GrainOverlay (textura de grão), ScrollProgress
                       (barra de progresso), CustomCursor
    sections/         Hero, About, Skills, Projects, Contact,
                       AnimatedBackdrop (blobs de fundo do herói)
    ui/                Marquee (faixa de texto em loop infinito)
  context/            ThemeContext (claro/escuro) e LangContext (PT/EN)
  data/               projects.js, skills.js, site.js — conteúdo do site
  hooks/              useScrollReveal, useActiveSection
  i18n/               translations.js — dicionário PT/EN
  styles/             variables.css, base.css, animations.css
```

## Como rodar

```bash
npm install
npm run dev       # ambiente de desenvolvimento
npm run build     # build de produção em /dist
npm run preview   # servir o build de produção localmente
```

## Identidade visual

- **Paleta:** preto profundo (`--ink`) + branco quente (`--paper`) + um
  accent laranja-vermelho ("flare"), usado com moderação em CTAs e detalhes.
- **Tipografia:** Archivo (display, peso 800/900, caixa alta) + Inter (texto)
  + Space Mono (rótulos, índices, tags).
- **Elementos de assinatura:**
  - Menu em tela cheia com transição de `clip-path` a partir do botão.
  - Título do herói com efeito de "cortina" (`overflow:hidden` + máscara
    deslizante) revelando cada linha ao carregar.
  - Faixas de texto em loop infinito (marquee) para a stack técnica e para
    o CTA de contato.
  - Cursor customizado com anel "magnético" que cresce e mostra um rótulo
    (ex.: "Ver") sobre elementos interativos.
  - Grade de projetos assimétrica com hover de zoom + revelação de
    descrição.
  - Barra fina de progresso de rolagem fixa no topo.

## Outras funcionalidades

- Seletor de idioma **PT/EN funcional** — todo o texto vem de
  `src/i18n/translations.js`.
- Tema claro/escuro e idioma persistidos em `localStorage`.
- Grade de projetos com os projetos reais (imagens existentes).
