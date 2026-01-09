# 📸 Gerador de EXIF Frame

Um site interativo que cria automaticamente frames personalizados para suas fotos a partir dos metadados EXIF. Carregue uma imagem e gere um frame estético com informações técnicas da captura.

[![Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://criador-de-exif-frame.onrender.com/)

## ✨ Funcionalidades

- 📤 Upload simples de fotos por drag & drop ou clique
- 🔍 Extração automática de metadados EXIF
- 🎨 Frame profissional com informações técnicas:
  - ISO
  - Abertura (f/número)
  - Velocidade do obturador
  - Distância focal
  - Modelo da câmera
  - Lente utilizada
  - Logo da marca (suporte para 18+ marcas)
- 💾 Exportação em alta qualidade (PNG)
- 🎊 Animações e feedback visual
- 📱 Design responsivo

## 🛠️ Tecnologias

- **React 19** - Biblioteca UI
- **Vite** - Build tool e dev server
- **exifr** - Leitura de metadados EXIF
- **html-to-image** - Exportação de canvas
- **react-confetti** - Efeitos visuais
- **react-icons** - Ícones

## 🚀 Como usar

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/exif-frame-generator.git

# Entre no diretório
cd exif-frame-generator

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Comandos disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm run preview  # Preview do build de produção
npm run lint     # Executa linter
```

## 📋 Requisitos

- Node.js 18+
- NPM ou Yarn

## 🎯 Como funciona

1. Faça upload de uma foto (JPG, PNG, etc.)
2. O app extrai automaticamente os metadados EXIF
3. Um frame é gerado com as informações técnicas
4. Clique em "Exportar como imagem" para baixar

## 🏷️ Marcas suportadas

O app reconhece logos das seguintes marcas:

- Apple (iPhone)
- Canon
- Nikon
- Sony
- Fujifilm
- Leica
- Panasonic/Lumix
- Olympus/OM System
- Pentax/Ricoh
- Hasselblad
- DJI
- GoPro
- Samsung
- Xiaomi/Redmi/Poco
- Huawei/Honor
- Google Pixel
- OnePlus
- Oppo/Realme

## 📁 Estrutura do projeto

```
src/
├── assets/
│   └── brandIcons/        # Logos das marcas
├── components/
│   └── frames/
│       ├── Classic.jsx    # Componente do frame
│       └── Classic.css    # Estilos do frame
├── utils/
│   ├── cameraBrandLogos.js   # Lógica de detecção de marcas
│   ├── exifFormatters.js     # Formatadores de dados EXIF
│   └── exportImage.js        # Lógica de exportação
├── App.jsx                # Componente principal
├── App.css               # Estilos principais
└── main.jsx              # Entry point
```

## 🎨 Personalização

Para adicionar novos estilos de frame, crie um novo componente em `src/components/frames/` seguindo o padrão do `Classic.jsx`.

## 🐛 Problemas conhecidos

- Algumas fotos sem metadados EXIF podem não exibir todas as informações
- A exportação usa alta qualidade (pixelRatio: 4), o que pode ser pesado em dispositivos com pouca memória

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 👨‍💻 Autor

Fabio dos Santos

---

⭐ Se este projeto foi útil, considere dar uma estrela no repositório!
