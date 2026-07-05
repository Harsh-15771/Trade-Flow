# Stage 1: Build the React application
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
ARG REACT_APP_DASHBOARD_URL
ENV REACT_APP_DASHBOARD_URL=$REACT_APP_DASHBOARD_URL

RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
# Copy the custom Nginx configuration for React Router support
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built app to Nginx's web root directory
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
