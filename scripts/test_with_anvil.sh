#!/usr/bin/env bash

source $(dirname "${BASH_SOURCE[0]}")/set_vars.sh

# Public: Runs test against and with a custom MUD world deployed to an anvil instance running on http://127.0.0.1:8545.
#
# $1 - The name of the package, i.e. @aetherisnova/portae-astrales.
#
# Examples
#
#   ./scripts/test_with_anvil.sh "@aetherisnova/portae-astrales"
#
# Returns with exit code 1 if the tests fail or no package was supplied, otherwise exit code 0 is returned.
function main {
  local exit_code

  exit_code=0

  set_vars

  if [ -z "${1}" ]; then
    printf "%b no package specified, use: ./test_with_anvil.sh [package] \n" "${ERROR_PREFIX}"
    exit 1
  fi

  docker compose up world_deployer \
    --build

  # run tests
  pnpm -F "${1}" run test
  exit_code=$? # get exit code of tests

  # stop the services and remove
  docker compose down

  exit ${exit_code}
}

# And so, it begins...
main "$@"
