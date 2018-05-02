#!/bin/bash

SEARCH=$1

RESULTS=$(jq "$(cat <<EOF
[
  [
    .[
      [
        .[].text
        | test("${SEARCH}"; "i")
      ]
      | indices(true)
      | .[]
     ]
  ] as \$results
  | \$results | map(true) | indices(true)
  | .[] | {"index": ., "msg": (\$results[.].cls + ": " + \$results[.].text), "link": \$results[.].link}
]
EOF
)" voicelines.json)

echo $RESULTS | jq -r '.[] | "(" + (.index + 1 | tostring) + ") " + .msg' -
echo -n "Choice: "
read choice

if [ ${choice} = "q" ]; then
  exit
fi

mplayer $(echo $RESULTS | jq -r ".[${choice} - 1].link" -)
