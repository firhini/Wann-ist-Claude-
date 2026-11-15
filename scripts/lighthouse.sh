#!/usr/bin/env bash
# Lighthouse Mobile für eine oder mehrere Seiten. Erwartet den Server auf Port 3100.
# Aufruf: scripts/lighthouse.sh /weihnachten /kalenderwoche
mkdir -p lighthouse
export CHROME_PATH="${CHROME_PATH:-/opt/pw-browsers/chromium}"
for pfad in "$@"; do
  name=$(echo "$pfad" | sed 's#^/##; s#/#_#g'); name=${name:-start}
  npx -y lighthouse@13 "http://localhost:3100$pfad" --only-categories=performance,accessibility,best-practices,seo \
    --form-factor=mobile --chrome-flags="--headless --no-sandbox" --output=json --output-path="lighthouse/$name.json" --quiet >/dev/null 2>&1
  node -e '
    const r=require("./lighthouse/'"$name"'.json");
    const c=r.categories;
    console.log("'"$pfad"'".padEnd(44),
      "P",Math.round(c.performance.score*100),"A",Math.round(c.accessibility.score*100),
      "BP",Math.round(c["best-practices"].score*100),"SEO",Math.round(c.seo.score*100),
      "| LCP",r.audits["largest-contentful-paint"].displayValue,"CLS",r.audits["cumulative-layout-shift"].displayValue,"TBT",r.audits["total-blocking-time"].displayValue);'
done
