ARG ARCH=amd64

FROM --platform=${ARCH} nginx
COPY dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
