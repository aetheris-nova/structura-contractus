#!/usr/bin/env bash

source $(dirname "${BASH_SOURCE[0]}")/set_vars.sh

# Public: Performs post install actions including installing Solidity dependencies and creating the `.env` file if none
# exist.
#
# Examples
#
#   ./bin/postinstall.sh
#
# Returns exit code 0.
function main {
  set_vars

  if ! command -v forge &> /dev/null; then
    printf "%b foundry not found, installing... \n" "${INFO_PREFIX}"
    curl -L https://foundry.paradigm.xyz | bash
    source ~/.bashrc
    foundryup
  fi

  # fetch solidity dependencies
  forge soldeer install

  # create a .env if none exist
  printf "%b creating .env, if necessary \n" "${INFO_PREFIX}"
  shx cp -n .env.example .env

  exit 0
}

# and so, it begins...
main "$@"
