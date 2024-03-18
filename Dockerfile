FROM node:16.13.1 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#FROM node:16.13.1-slim AS final
#WORKDIR /app
#COPY --from=build /app .
#COPY --from=build /app/package*.json ./
EXPOSE 3000
CMD ["npm","start"]
 
