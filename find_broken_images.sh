#!/bin/bash

if tty -s
then
  green() {
    echo -e "\e[32m$@\e[0m"
  }
  red() {
    echo -e "\e[31m$@\e[0m"
  }
else
  green() {
    echo $@
  }
  red() {
    echo $@
  }
fi

POSTS=$(find _posts/ -type f | sort)

for POST in $POSTS
do
  echo $POST
  IMAGES=$(egrep -o 'http.*\.jpe?g' $POST)

  for SRC in $IMAGES
  do
    STATUS=$(curl -s -o /dev/null -w '%{http_code}' $SRC)
    if [[ "$STATUS" == "200" ]]
    then
      echo -e $(green " ✔ $SRC")
    else
      echo -e $(red " ✘ $SRC")
    fi
  done
done

