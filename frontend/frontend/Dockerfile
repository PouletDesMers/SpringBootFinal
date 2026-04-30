# ==============================
# BUILD : Compilation Angular
# ==============================
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Renommer index.csr.html -> index.html (Angular Client mode)
RUN if [ -f /app/dist/frontend/browser/index.csr.html ]; then \
      cp /app/dist/frontend/browser/index.csr.html /app/dist/frontend/browser/index.html; \
    fi

# ==============================
# RUN : Serveur Nginx
# ==============================
FROM nginx:alpine

COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
