FROM public.ecr.aws/docker/library/node:16
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . .
CMD [ "npm" , "start" ]