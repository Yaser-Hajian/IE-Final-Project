FROM public.ecr.aws/docker/library/node:16
WORKDIR /
COPY package*.json /
RUN npm install
COPY . .
CMD [ "npm" , "start" ]