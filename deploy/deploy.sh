#!/bin/bash

set -e # exit with nonzero exit code if anything fails

SOURCE_BRANCH="${1}"
TARGET_REPO="${2}"
TARGET_REPO_SSH="${2/https:\/\/github.com\//git@github.com:}"
TARGET_BRANCH="${3:-$SOURCE_BRANCH}"

SHA=`git rev-parse --verify HEAD`

skip() {
  echo "$@. Skipping deploy..."
  cd ..
  rm -rf target
  exit 0
}

git checkout ${SOURCE_BRANCH}
SOURCE_SHA=`git rev-parse --verify HEAD`
test "${SHA}" == "${SOURCE_SHA}" || skip "Built commit ${SHA}!=${SOURCE_SHA}(${SOURCE_BRANCH})"

git clone ${TARGET_REPO} target
cd target
git checkout ${TARGET_BRANCH} || git checkout --orphan ${TARGET_BRANCH}

rm -rf *
cp -ra ../build/* .
echo sztukauniwersalna.pl > CNAME

git config user.name "Travis CI"
git config user.email "travis@sztukauniwersalna.pl"
git add -A .

git diff --cached --quiet && skip "No changes to the output on this push"

git commit -m "Deploy to GitHub Pages: ${SHA}"

eval `ssh-agent -s`
ssh-add -D
openssl rsa -in ../deploy/key -passin pass:`cat ../password` -out ./key
chmod 0600 ./key
ssh-add ./key

git push ${TARGET_REPO_SSH} ${TARGET_BRANCH}

cd ..
rm -rf target

