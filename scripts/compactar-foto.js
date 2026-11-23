
const sharp = require("sharp");

async function compactar() {
  await sharp("assets/foto-perfil.png")
    .resize(600, 600, {
      fit: "cover",
      position: "centre"
    })
    .jpeg({
      quality: 75,
      mozjpeg: true
    })
    .toFile("assets/foto-perfil.jpg");

  console.log("Foto compactada com sucesso!");
}

compactar().catch(console.error);
