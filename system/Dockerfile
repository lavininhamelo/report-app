# Usa a imagem base do Node.js
FROM node:16

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do aplicativo para o diretório de trabalho
COPY . .

RUN npm rum generate
RUN npm run migrate-initial 

COPY . .

EXPOSE 3333

# Executa o comando npm run start
CMD ["npm", "run", "dev"]
