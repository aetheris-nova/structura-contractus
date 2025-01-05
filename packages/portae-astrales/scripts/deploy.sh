#!/usr/bin/env bash

source $(dirname "${BASH_SOURCE[0]}")/set_vars.sh

# Public: Deploys the contracts to using MUD.
#
# This will attempt to source the env vars from a `.env` file.
#
# Required environment variables:
# * PRIVATE_KEY - The private key of the deployer address.
# * RPC_URL - The RPC URL in which to deploy the contracts.
# * WORLD_ADDRESS - The MUD world address.
#
# Examples
#
#   ./bin/deploy.sh
#
# Returns exit code 0, or 1 if any of the required environment variables are missing.
function main {
  source .env

  set_vars

  if [ -z "${RPC_URL}" ]; then
    printf "%b RPC_URL in the .env file is required \n" "${ERROR_PREFIX}"
    exit 1
  fi

  if [ -z "${PRIVATE_KEY}" ]; then
    printf "%b PRIVATE_KEY in the .env file is required \n" "${ERROR_PREFIX}"
    exit 1
  fi

  if [ -z "${WORLD_ADDRESS}" ]; then
    printf "%b WORLD_ADDRESS in the .env file is required \n" "${ERROR_PREFIX}"
    exit 1
  fi

  # deploy the contract
  printf "%b deploying contracts... \n" "${INFO_PREFIX}"
  mud deploy \
    --rpc "${RPC_URL}"  \
    --worldAddress "${WORLD_ADDRESS}"

  exit 0
}

# and so, it begins...
main "$@"
