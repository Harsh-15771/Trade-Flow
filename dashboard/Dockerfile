# Stage 1: Build the React application
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
# Use npm install with legacy peer deps if needed, but standard should work
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
# Copy the custom Nginx configuration for React Router support
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built app to Nginx's web root directory
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
