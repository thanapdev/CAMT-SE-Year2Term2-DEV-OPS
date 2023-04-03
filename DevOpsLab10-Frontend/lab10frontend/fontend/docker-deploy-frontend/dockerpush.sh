#!/usr/bin/env bash

ng build --prod
cat docker_camtbi_password.txt | docker login --username camtbi --password-stdin
docker build -t camtbi/camtbi:foreign-affair-angular .
docker push camtbi/camtbi:foreign-affair-angular
