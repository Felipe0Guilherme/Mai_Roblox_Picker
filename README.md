# Mai Roblox Picker 🎮

> App mobile presenteado para **Mai** — uma roleta sorteadora de jogos/modos do **Roblox**, feita com carinho em React Native + Expo.

---

## Sobre o Projeto

O Mai Roblox Picker é um aplicativo pessoal desenvolvido como presente, com o objetivo de sortear jogos ou modos do Roblox de forma divertida e interativa. Com visual colorido usando gradientes, fonte Nunito e uma UI leve e responsiva, o app foi pensado para ser simples de usar e agradável de ver.

---

## 🗂️ Estrutura do Projeto

```
Mai_Roblox_Picker/
├── App.js              # Componente raiz — estrutura e lógica principal do picker
├── index.js            # Entry point do React Native
├── app.json            # Configurações do Expo (nome, slug, ícone, splash)
├── eas.json            # Configurações de build via EAS CLI
├── package.json        # Dependências e scripts
├── package-lock.json   # Lock file das dependências
├── assets/             # Ícones, splash screen e imagens
└── .gitignore          # Arquivos ignorados pelo Git
```

---

## 🛠️ Tecnologias e Dependências

| Pacote | Versão | Uso |
|---|---|---|
| **expo** | ~54.0.33 | Plataforma de desenvolvimento e build |
| **react** | 19.1.0 | Biblioteca de UI |
| **react-native** | 0.81.5 | Framework mobile nativo |
| **expo-linear-gradient** | ~15.0.8 | Gradientes coloridos no visual |
| **@expo-google-fonts/nunito** | ^0.4.2 | Fonte Nunito — identidade visual do app |
| **expo-font** | ~14.0.11 | Carregamento de fontes customizadas |
| **expo-status-bar** | ~3.0.9 | Controle da status bar |
| **react-native-web** | ^0.21.0 | Suporte à versão web |
| **EAS CLI** | — | Build e publicação Android/iOS |

---

## ✨ Funcionalidades

- 🎰 **Sorteio aleatório** de jogos ou modos do Roblox
- 🌈 **Visual com gradientes** usando `expo-linear-gradient`
- 🔤 **Fonte Nunito** carregada via Google Fonts para um estilo suave e amigável
- 📱 **Interface responsiva** otimizada para mobile
- ⚙️ **Pronto para build** via EAS CLI (APK/IPA)

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 18+
- Expo Go instalado no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Felipe0Guilherme/Mai_Roblox_Picker.git
   cd Mai_Roblox_Picker
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o projeto:
   ```bash
   npx expo start
   ```

4. Escaneie o QR Code com o **Expo Go** no celular.

---

## 📦 Build com EAS CLI

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login na conta Expo
eas login

# Build Android
eas build --platform android --profile preview

# Build iOS
eas build --platform ios --profile production
```

---

## 👨‍💻 Autor

**Felipe Guilherme**
Desenvolvedor Front-End & Mobile — São Paulo, SP
[GitHub](https://github.com/Felipe0Guilherme) · [Portfólio](https://website-portfolio-theta-ashen.vercel.app)

---

## 📄 Licença

Projeto pessoal. Todos os direitos reservados ao autor.
