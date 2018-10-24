FROM nginx:alpine
LABEL author="Bobby McAllister"
COPY ./dist/mech-trader /usr/share/nginx/html
EXPOSE 80 443
ENTRYPOINT ["nginx","-g","daemon off;"]