# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


## Arquitetura 

-- NOTE-APP
   -- app
      -- (tabs)
         - _layout.tsx             # Layout base das abas
         - equipmentList.tsx       # Tela de listagem de equipamentos
         - homeScreen.tsx          # Tela inicial
         - registerEquipment.tsx   # Tela de cadastro de equipamentos
         - registerPoint.tsx       # Tela de registro de pontos
         - loginScreen.tsx         # Tela de login
      -- database
         -- equipment
            -- queries
               - index.ts          # Consultas SQL relacionadas a equipamentos
         - index.ts                # Configuração inicial do banco de dados
      -- hooks
         - AuthContext.tsx         # Contexto de autenticação
         - useColorScheme.ts       # Configuração do esquema de cores
         - useThemeColor.ts        # Hook para cores temáticas
      -- components
         - CustomSelectorModal.tsx # Modal personalizado para seleção
         - Collapsible.tsx         # Componente de colapso
         - HapticTab.tsx           # Aba com feedback háptico
         - ThemedText.tsx          # Texto estilizado com tema
         - ThemedView.tsx          # View estilizada com tema
      -- constants
         - Colors.ts               # Paleta de cores do projeto
      -- testes
         - equipmentList.test.ts   # Testes da tela de listagem de equipamentos
         - insertEquipment.test.ts # Testes para inserção de equipamentos
   -- assets
      -- fonts                     # Diretório de fontes customizadas
         - Roboto-Regular.ttf      # Fonte Roboto Regular
         - Roboto-Bold.ttf         # Fonte Roboto Bold
      -- images                    # Diretório de imagens usadas no projeto
         - logo.png                # Logotipo do aplicativo
         - background.jpg          # Imagem de fundo
   -- package.json                 # Configurações do projeto e dependências
   -- README.md                    # Documentação do projeto

