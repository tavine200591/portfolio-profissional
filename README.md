
# Portfólio Profissional - Távine Andrade

[![Esteira CI/CD](https://github.com/tavine200591/portfolio-profissional/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/tavine200591/portfolio-profissional/actions/workflows/ci-cd.yml)

## Sobre o projeto

Este projeto é um portfólio profissional desenvolvido com HTML5 e CSS3.

O objetivo é apresentar minhas habilidades, meus conhecimentos e meus projetos na área de Desenvolvimento de Sistemas.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Git
- GitHub
- GitHub Actions
- GitHub Pages
- HTMLHint

## Automação CI/CD

O projeto possui uma esteira automatizada que:

1. Executa testes em Node.js 18 e 20.
2. Verifica a existência do index.html.
3. Executa o HTMLHint.
4. Verifica arquivos maiores que 500 KB.
5. Procura comentários proibidos.
6. Verifica links e imagens.
7. Impede a aprovação de alterações com erros.
8. Publica automaticamente o site no GitHub Pages.
9. Permite notificação de falhas pelo Discord.

## Estrutura do projeto

```text
portfolio-profissional/
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── assets/
│   └── foto-perfil.svg
├── scripts/
│   └── validar.js
├── index.html
├── style.css
├── .htmlhintrc
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Publicação

O site será publicado automaticamente utilizando GitHub Pages.

## Autora

Távine Andrade

GitHub: https://github.com/tavine200591

Curso: Técnico em Desenvolvimento de Sistemas

Ano: 2026
