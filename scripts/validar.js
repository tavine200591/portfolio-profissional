
const fs = require("fs");
const path = require("path");

const raiz = path.resolve(__dirname, "..");
const limite = 500 * 1024;

let erros = 0;

function erro(mensagem) {
    console.error("ERRO: " + mensagem);
    erros++;
}

console.log("Iniciando validacao do projeto...\n");

// 1. Verificar o arquivo principal
const index = path.join(raiz, "index.html");

if (!fs.existsSync(index)) {
    erro("index.html nao encontrado na raiz do projeto.");
    process.exit(1);
}

const html = fs.readFileSync(index, "utf8");

// 2. Verificar tamanho individual dos arquivos
function verificarTamanho(pasta) {
    const itens = fs.readdirSync(pasta, { withFileTypes: true });

    for (const item of itens) {
        if ([".git", "node_modules"].includes(item.name)) {
            continue;
        }

        const caminho = path.join(pasta, item.name);

        if (item.isDirectory()) {
            verificarTamanho(caminho);
        } else {
            const tamanho = fs.statSync(caminho).size;

            if (tamanho > limite) {
                erro(`${item.name} ultrapassou 500 KB.`);
            }
        }
    }
}

verificarTamanho(raiz);

// 3. Verificar comentarios proibidos
const arquivos = ["index.html", "style.css"];

for (const arquivo of arquivos) {
    const conteudo = fs.readFileSync(path.join(raiz, arquivo), "utf8");

    const comentarios = arquivo.endsWith(".html")
        ? conteudo.match(/<!--[\s\S]*?-->/g) || []
        : conteudo.match(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g) || [];

    for (const comentario of comentarios) {
        if (/\b(TODO|FIXME|senha|password)\b/i.test(comentario)) {
            erro(`Comentario proibido encontrado em ${arquivo}.`);
        }
    }
}

// 4. Verificar IDs existentes
const ids = new Set(
    [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(item => item[1])
);

// 5. Verificar links e imagens
const atributos = [
    ...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)
];

for (const item of atributos) {
    const valor = item[1].trim();

    if (!valor || valor.startsWith("javascript:")) {
        erro(`Endereco invalido: ${valor}`);
        continue;
    }

    if (valor.startsWith("#")) {
        const id = valor.slice(1);

        if (!ids.has(id)) {
            erro(`Secao inexistente: ${valor}`);
        }

        continue;
    }

    if (/^(https?:\/\/|mailto:|tel:)/i.test(valor)) {
        try {
            const endereco = valor.startsWith("http")
                ? new URL(valor)
                : null;

            if (endereco && !["http:", "https:"].includes(endereco.protocol)) {
                erro(`Protocolo invalido: ${valor}`);
            }
        } catch {
            erro(`URL invalida: ${valor}`);
        }

        continue;
    }

    if (/^(data:|\/\/)/i.test(valor)) {
        erro(`Endereco nao permitido: ${valor}`);
        continue;
    }

    const arquivoLocal = decodeURIComponent(valor.split(/[?#]/)[0]);

    if (!fs.existsSync(path.resolve(raiz, arquivoLocal))) {
        erro(`Arquivo ou imagem nao encontrado: ${valor}`);
    }
}

// Resultado final
console.log("\n--------------------------------");

if (erros > 0) {
    console.error(`Validacao reprovada: ${erros} erro(s).`);
    process.exit(1);
} else {
    console.log("Todos os testes foram aprovados!");
    process.exit(0);
}
