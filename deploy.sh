#!/bin/bash

set -e # exit with nonzero exit code if anything fails

SOURCE_BRANCH="${1}"
TARGET_REPO="${2}"
TARGET_REPO_SSH="${2/https:\/\/github.com\//git@github.com:}"
TARGET_BRANCH="${3:-$SOURCE_BRANCH}"

BRANCH=`git rev-parse --abbrev-ref HEAD`
SHA=`git rev-parse --verify HEAD`

skip() {
  echo "$@. Skipping deploy..."
  cd ..
  rm -rf target
  exit 0
}

test "${TRAVIS_PULL_REQUEST}" != "false" || skip "Built a pull request"
test "${BRANCH}" == "${SOURCE_BRANCH}" || skip "Built branch ${BRANCH}!=${SOURCE_BRANCH}"

git clone ${TARGET_REPO} target
cd target
git checkout ${TARGET_BRANCH} || git checkout --orphan ${TARGET_BRANCH}

rm -rf *
cp -ra ../build/* .
echo sztukauniwersalna.pl > CNAME

git config user.name "Travis CI"
git config user.email "travis@sztukauniwersalna.pl"
git add -A .

if git diff --cached --quiet; then
  echo "No changes to the output on this push; exiting."
  exit 0
fi

git commit -m "Deploy to GitHub Pages: ${SHA}"

ssh-agent -s
ssh-add -D
openssl rsa -in ../key -passin pass:`cat ../password` -out ./key
ssh-add ./key

git push ${TARGET_REPO_SSH} ${TARGET_BRANCH}

cd ..
rm -rf target

