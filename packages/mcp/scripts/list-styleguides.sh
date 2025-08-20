#!/bin/bash

# List Zeroheight styleguides using environment variables
# Usage: ./list-styleguides.sh

if [ -z "$ZEROHEIGHT_API_KEY" ]; then
    echo "Error: ZEROHEIGHT_API_KEY environment variable is required"
    exit 1
fi

if [ -z "$ZEROHEIGHT_API_CLIENT" ]; then
    echo "Error: ZEROHEIGHT_API_CLIENT environment variable is required"
    exit 1
fi

curl -X GET "https://zeroheight.com/open_api/v2/styleguides" \
  -H "Accept: application/json" \
  -H "X-API-KEY: $ZEROHEIGHT_API_KEY" \
  -H "X-API-CLIENT: $ZEROHEIGHT_API_CLIENT" \
  | jq '.data.styleguides[] | {id: .id, name: .name, slug: .slug}'