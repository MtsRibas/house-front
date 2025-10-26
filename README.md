# House Frontend

Frontend desenvolvido com React, TypeScript e Tailwind CSS.

## 🚀 Como executar

### Instalação das dependências
```bash
npm install
```

### Desenvolvimento
```bash
npm start
```

### Build para produção
```bash
npm run build
```

## 📁 Estrutura do projeto

```
src/
├── components/       # Componentes React
├── pages/           # Páginas da aplicação
├── services/        # Serviços para comunicação com API
├── utils/           # Utilitários
├── types/           # Definições de tipos TypeScript
├── App.tsx          # Componente principal
└── index.tsx        # Ponto de entrada da aplicação
```

## 🔧 Scripts disponíveis

- `npm start` - Executa a aplicação em modo de desenvolvimento
- `npm run build` - Cria build de produção
- `npm test` - Executa os testes
- `npm run eject` - Remove o Create React App (não recomendado)

## 🎨 Styling

Este projeto utiliza Tailwind CSS para estilização. As classes do Tailwind podem ser usadas diretamente nos componentes.

## 🌐 Comunicação com API

O projeto está configurado com Axios para fazer requisições HTTP. Configure a URL base da API no arquivo de configuração.

## 🛠️ Tecnologias utilizadas

- React 18
- TypeScript
- Tailwind CSS
- Axios
- Create React App