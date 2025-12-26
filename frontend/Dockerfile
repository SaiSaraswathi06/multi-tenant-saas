# --- Stage 1: Build Vite frontend ---
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# --- Stage 2: Nginx serve build output ---
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist ./

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
