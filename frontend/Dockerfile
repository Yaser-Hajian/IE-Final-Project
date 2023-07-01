FROM public.ecr.aws/docker/library/node:16
WORKDIR /
COPY package*.json /
RUN npm install
COPY . /
RUN npm run build

FROM public.ecr.aws/nginx/nginx:stable-alpine
COPY --from=build-stage ./dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]