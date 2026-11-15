import type { Countdown } from "@/lib/countdown";
import { fest, jaehrlich } from "@/lib/countdown";
import { aschermittwoch, bussUndBettag } from "@/lib/feiertage";
import { datumLang, datumMitWochentag, wochentagName } from "@/lib/format";
import { type Tag, berlin, plusTage, tageDiff, tagVon, wochentag } from "@/lib/zeit";

/** Geprüft im November 2026: Die Seite nennt die neun bundeseinheitlichen Feiertage und den Einigungsvertrag. */
const BMI = {
  label: "Bundesministerium des Innern: Nationale Feiertage",
  url: "https://www.bmi.bund.de/DE/themen/verfassung/staatliche-symbole/nationale-feiertage/nationale-feiertage-node.html",
};

/** Nächstes Vorkommen eines festen Datums. Am Tag selbst: heute. */
function naechster(now: Date, m: number, d: number): Tag {
  const heute = tagVon(now);
  const t = { y: heute.y, m, d };
  return tageDiff(heute, t) < 0 ? { ...t, y: heute.y + 1 } : t;
}

/** Ein Satz dazu, was der Wochentag für den freien Tag bedeutet. `wo` steht am Satzanfang. */
function freiHinweis(t: Tag, wo: string): string {
  const wt = wochentag(t);
  if (wt === 0 || wt === 6) return "Der Feiertag fällt damit auf ein Wochenende. Einen Ersatztag gibt es nicht.";
  if (wt === 1 || wt === 5) return `${wo} ergibt das ein langes Wochenende.`;
  if (wt === 2) return `${wo} werden daraus mit einem Urlaubstag am Montag vier freie Tage am Stück.`;
  if (wt === 4) return `${wo} werden daraus mit einem Urlaubstag am Freitag vier freie Tage am Stück.`;
  return `${wo} liegt der freie Tag mitten in der Woche.`;
}

export const HERBST: Countdown[] = [
  {
    slug: "heilige-drei-koenige",
    pfad: "/heilige-drei-koenige",
    title: "Heilige Drei Könige",
    question: "Wie lange noch bis Heilige Drei Könige?",
    category: "feiertage",
    art: "tag",
    ...fest(1, 6),
    bis: "bis Heilige Drei Könige",
    heute: "Heute ist Heilige Drei Könige.",
    motif: "krone",
    gesetzlich: ["BW", "BY", "ST"],
    intro: `Heilige Drei Könige ist am 6. Januar. Die Kirchen nennen das Fest Epiphanias oder Erscheinung des Herrn, im Alltag heißt es Dreikönigstag. Es erinnert an die Sterndeuter, die laut Matthäusevangelium einem Stern nach Bethlehem folgten. Dass es drei waren und dazu Könige, steht dort nicht. Die Zahl hat man später aus den drei Geschenken abgeleitet: Gold, Weihrauch und Myrrhe.

Frei hast du nur in Baden-Württemberg, Bayern und Sachsen-Anhalt. In den anderen 13 Ländern ist der 6. Januar ein normaler Werktag. Wann die Schule wieder anfängt, steht bei den [Terminen der Weihnachtsferien](/ferien/weihnachtsferien).

Rund um den Tag ziehen die Sternsinger von Haus zu Haus und schreiben ihren Segen mit Kreide an die Tür. Vielerorts bleibt der Weihnachtsbaum genau bis zu diesem Tag stehen. Was davor kam, zeigen die Zähler für [Weihnachten](/weihnachten) und [Neujahr](/neujahr).`,
    facts: [
      "Der 6. Januar ist nur in Baden-Württemberg, Bayern und Sachsen-Anhalt gesetzlicher Feiertag.",
      "Im Matthäusevangelium ist von Sterndeutern aus dem Osten die Rede. Weder die Zahl Drei noch ein Königstitel stehen im Bibeltext.",
      "Die Gebeine, die als Reliquien der Heiligen Drei Könige verehrt werden, kamen 1164 von Mailand nach Köln. Sie liegen im Dreikönigenschrein des Kölner Doms.",
      "Die Aktion Dreikönigssingen der Sternsinger gibt es in Deutschland seit 1959.",
      "Der Kreidesegen „C+M+B“ wird heute als „Christus mansionem benedicat“ gelesen: Christus segne dieses Haus.",
    ],
    faq: [
      {
        q: "Wo ist Heilige Drei Könige ein Feiertag?",
        a: "In Baden-Württemberg, Bayern und Sachsen-Anhalt. In allen anderen Bundesländern ist der 6. Januar ein normaler Arbeitstag. Auch in Österreich ist der Tag gesetzlicher Feiertag.",
      },
      {
        q: "Haben die Geschäfte am 6. Januar geöffnet?",
        a: "In den drei Ländern mit Feiertag bleiben die Läden geschlossen, überall sonst gelten die normalen Öffnungszeiten. Wer nahe an einer Landesgrenze wohnt, kennt die Lösung.",
      },
      {
        q: "Was bedeutet C+M+B an der Haustür?",
        a: "Die Sternsinger schreiben den Segen mit Kreide an die Tür, eingerahmt von der Jahreszahl. Die Buchstaben stehen für „Christus mansionem benedicat“, auf Deutsch: Christus segne dieses Haus. Im Volksmund werden sie auch als Anfangsbuchstaben von Caspar, Melchior und Balthasar gelesen.",
      },
      {
        q: "Wie lange bleibt der Weihnachtsbaum stehen?",
        a: "Eine Vorschrift gibt es nicht. Verbreitet ist der 6. Januar als letzter Tag. In katholischen Gegenden bleibt der Baum nach älterem Brauch manchmal bis Mariä Lichtmess am 2. Februar stehen.",
      },
    ],
    faqDynamisch: (now) => {
      const t = naechster(now, 1, 6);
      return [
        {
          q: `Auf welchen Wochentag fällt Heilige Drei Könige ${t.y}?`,
          a: `Der nächste Dreikönigstag ist am ${datumMitWochentag(t)}. ${freiHinweis(t, "In Baden-Württemberg, Bayern und Sachsen-Anhalt")}`,
        },
      ];
    },
    related: ["/neujahr", "/silvester", "/weihnachten", "/heiligabend", "/ferien/weihnachtsferien", "/rosenmontag", "/valentinstag"],
  },
  {
    slug: "mariae-himmelfahrt",
    pfad: "/mariae-himmelfahrt",
    title: "Mariä Himmelfahrt",
    question: "Wie lange noch bis Mariä Himmelfahrt?",
    category: "feiertage",
    art: "tag",
    ...fest(8, 15),
    bis: "bis Mariä Himmelfahrt",
    heute: "Heute ist Mariä Himmelfahrt.",
    motif: "strauss",
    gesetzlich: ["SL"],
    intro: `Mariä Himmelfahrt ist am 15. August. Die katholische Kirche feiert an diesem Tag, dass Maria nach ihrem Tod mit Leib und Seele in den Himmel aufgenommen wurde. Zum Dogma wurde das erst 1950, gefeiert wird es seit weit über tausend Jahren.

Mit dem freien Tag ist es kompliziert. Landesweit gilt er nur im Saarland. In Bayern ist Mariä Himmelfahrt nur in Gemeinden mit überwiegend katholischer Bevölkerung gesetzlicher Feiertag. Das sind die meisten, aber eben nicht alle. Es kann also passieren, dass du arbeitest, während im Nachbarort die Läden zu sind. Den Rest des Jahres zeigen die [Feiertage in Bayern](/feiertage/bayern) und die [Feiertage im Saarland](/feiertage/saarland).

Zum Fest gehören Kräutersträuße, die im Gottesdienst gesegnet werden. Für bayerische Schulkinder ändert der Tag nichts: Der 15. August liegt dort immer in den [Sommerferien](/ferien).`,
    facts: [
      "Landesweit gesetzlicher Feiertag ist der 15. August nur im Saarland.",
      "In Bayern gilt der Feiertag laut Feiertagsgesetz nur in Gemeinden mit überwiegend katholischer Bevölkerung. Welche das sind, stellt das Bayerische Landesamt für Statistik anhand der letzten Volkszählung fest.",
      "Papst Pius XII. erklärte die Aufnahme Marias in den Himmel am 1. November 1950 zum Dogma.",
      "Die Stadt Augsburg hat mit dem Friedensfest am 8. August einen eigenen gesetzlichen Feiertag, eine Woche vor Mariä Himmelfahrt.",
      "Zum 15. August werden in katholischen Gegenden Kräutersträuße gebunden und im Gottesdienst gesegnet.",
    ],
    faq: [
      {
        q: "Wo ist Mariä Himmelfahrt ein Feiertag?",
        a: "Im Saarland im ganzen Land, in Bayern in allen Gemeinden mit überwiegend katholischer Bevölkerung. In den übrigen 14 Bundesländern ist der 15. August ein normaler Werktag.",
      },
      {
        q: "Warum ist Mariä Himmelfahrt nicht in ganz Bayern ein Feiertag?",
        a: "Das bayerische Feiertagsgesetz knüpft den Tag an die Konfession vor Ort: Er gilt nur in Gemeinden mit überwiegend katholischer Bevölkerung. Das Landesamt für Statistik stellt nach jeder Volkszählung fest, welche Gemeinden das sind, und veröffentlicht die Liste. In überwiegend evangelischen Gemeinden, vor allem in Teilen Frankens, wird gearbeitet.",
      },
      {
        q: "Ich wohne in einer Gemeinde mit Feiertag und arbeite in einer ohne. Habe ich frei?",
        a: "Nein. Entscheidend ist der Arbeitsort, nicht der Wohnort. Liegt dein Betrieb in einer Gemeinde ohne Feiertag, musst du arbeiten, auch wenn zu Hause alles geschlossen ist. Umgekehrt hast du frei, wenn am Arbeitsort Feiertag ist.",
      },
      {
        q: "Was ist der Unterschied zu Christi Himmelfahrt?",
        a: "Christi Himmelfahrt liegt 39 Tage nach Ostersonntag, immer an einem Donnerstag, und ist bundesweit gesetzlicher Feiertag. Mariä Himmelfahrt hat das feste Datum 15. August, ist ein katholisches Marienfest und nur im Saarland und in Teilen Bayerns arbeitsfrei.",
      },
    ],
    faqDynamisch: (now) => {
      const t = naechster(now, 8, 15);
      return [
        {
          q: `Auf welchen Wochentag fällt Mariä Himmelfahrt ${t.y}?`,
          a: `Mariä Himmelfahrt ist am ${datumMitWochentag(t)}. ${freiHinweis(t, "Im Saarland und in den bayerischen Gemeinden mit Feiertag")}`,
        },
      ];
    },
    related: ["/christi-himmelfahrt", "/fronleichnam", "/pfingsten", "/allerheiligen", "/weltkindertag", "/herbstanfang", "/tag-der-deutschen-einheit"],
  },
  {
    slug: "weltkindertag",
    pfad: "/weltkindertag",
    title: "Weltkindertag",
    nominativ: "Der Weltkindertag",
    question: "Wann ist Weltkindertag?",
    category: "feiertage",
    art: "tag",
    ...fest(9, 20),
    bis: "bis zum Weltkindertag",
    heute: "Heute ist Weltkindertag.",
    motif: "drachen",
    gesetzlich: ["TH"],
    intro: `Der Weltkindertag ist in Deutschland am 20. September. Er soll daran erinnern, dass Kinder eigene Rechte haben: auf Schutz, auf Bildung, aufs Mitreden. Angestoßen haben ihn die Vereinten Nationen, die 1954 allen Staaten empfahlen, einen Tag für Kinder einzurichten. Das Datum durfte jedes Land selbst wählen.

Gesetzlicher Feiertag ist der 20. September nur in Thüringen, und zwar seit 2019. Dort bleiben Schulen, Büros und Läden zu. Überall sonst ist es ein normaler Tag mit Festen und Aktionen, oft am Wochenende davor oder danach. Was Thüringen sonst noch frei hat, steht bei den [Feiertagen in Thüringen](/feiertage/thueringen).

Verwirrend: Es gibt einen zweiten Kindertag. Der Internationale Kindertag am 1. Juni wurde in der DDR gefeiert und ist im Osten bis heute verbreitet. Im Kalender geht es weiter mit dem [Herbstanfang](/herbstanfang) und dem [Tag der Deutschen Einheit](/tag-der-deutschen-einheit).`,
    facts: [
      "Der Weltkindertag ist seit 2019 in Thüringen gesetzlicher Feiertag. Kein anderes Bundesland hat ihn.",
      "Die Generalversammlung der Vereinten Nationen empfahl 1954 allen Staaten, einen Kindertag einzuführen. Das Datum ließ sie offen.",
      "Die Vereinten Nationen selbst begehen den Tag am 20. November. An diesem Datum wurde 1989 die Kinderrechtskonvention verabschiedet.",
      "In der DDR war der 1. Juni Kindertag. Viele Familien in Ostdeutschland feiern ihn weiterhin.",
    ],
    faq: [
      {
        q: "Ist der Weltkindertag ein Feiertag?",
        a: "Nur in Thüringen. Dort ist der 20. September seit 2019 gesetzlicher Feiertag und damit arbeits- und schulfrei. In den anderen 15 Bundesländern ist er ein normaler Werktag.",
      },
      {
        q: "Warum gibt es zwei Kindertage?",
        a: "Das ist ein Erbe der deutschen Teilung. Die Bundesrepublik feierte den Weltkindertag am 20. September, die DDR den Internationalen Kindertag am 1. Juni. Nach 1990 sind beide Termine geblieben.",
      },
      {
        q: "Warum ist der Weltkindertag am 20. September?",
        a: "Die Vereinten Nationen empfahlen 1954 einen Kindertag, ohne ein Datum vorzugeben. Die Bundesrepublik entschied sich für den 20. September. Andere Länder feiern an anderen Tagen, die Vereinten Nationen selbst am 20. November.",
      },
      {
        q: "Bekomme ich einen Ersatztag, wenn der Weltkindertag auf ein Wochenende fällt?",
        a: "Nein. Fällt ein gesetzlicher Feiertag in Deutschland auf einen Samstag oder Sonntag, entfällt der freie Tag ersatzlos. Das gilt auch für den Weltkindertag in Thüringen.",
      },
    ],
    faqDynamisch: (now) => {
      const t = naechster(now, 9, 20);
      return [
        {
          q: `Auf welchen Wochentag fällt der Weltkindertag ${t.y}?`,
          a: `Der Weltkindertag ist am ${datumMitWochentag(t)}. ${freiHinweis(t, "In Thüringen")}`,
        },
      ];
    },
    related: ["/herbstanfang", "/tag-der-deutschen-einheit", "/mariae-himmelfahrt", "/ferien/herbstferien", "/halloween", "/reformationstag", "/sankt-martin"],
  },
  {
    slug: "tag-der-deutschen-einheit",
    pfad: "/tag-der-deutschen-einheit",
    title: "Tag der Deutschen Einheit",
    nominativ: "Der Tag der Deutschen Einheit",
    tafel: "Tag der Dt. Einheit",
    question: "Wie lange noch bis zum Tag der Deutschen Einheit?",
    category: "feiertage",
    art: "tag",
    ...fest(10, 3),
    bis: "bis zum Tag der Deutschen Einheit",
    heute: "Heute ist der Tag der Deutschen Einheit.",
    motif: "fahne",
    gesetzlich: "bundesweit",
    source: BMI,
    intro: `Der Tag der Deutschen Einheit ist am 3. Oktober. Er erinnert an den 3. Oktober 1990, an dem die DDR der Bundesrepublik beitrat und Deutschland nach gut vier Jahrzehnten Teilung wieder ein Staat war. Der Tag steht im Einigungsvertrag und ist damit der einzige Feiertag, den der Bund festgelegt hat. Alle anderen regeln die Länder.

Frei ist überall. Fällt der 3. Oktober auf ein Wochenende, hast du Pech: Einen Ersatztag kennt das deutsche Recht nicht. Welche freien Tage dein Land sonst noch hat, zeigt die [Übersicht der gesetzlichen Feiertage](/feiertage).

Die zentrale Feier wandert. Ausgerichtet wird sie jedes Jahr von dem Land, das gerade den Vorsitz im Bundesrat hat. Danach ist bundesweit Pause bis [Weihnachten](/weihnachten). Nur ein Teil der Länder bekommt vorher noch den [Reformationstag](/reformationstag) oder [Allerheiligen](/allerheiligen).`,
    facts: [
      "Der 3. Oktober ist der einzige Feiertag, den Bundesrecht festlegt. Grundlage ist Artikel 2 Absatz 2 des Einigungsvertrags vom 31. August 1990.",
      "Am 3. Oktober 1990 trat die DDR dem Geltungsbereich des Grundgesetzes bei. Beschlossen hatte das die frei gewählte Volkskammer am 23. August 1990.",
      "Bis 1990 war in der Bundesrepublik der 17. Juni der Tag der deutschen Einheit. Er erinnerte an den Volksaufstand in der DDR von 1953.",
      "Die zentrale Feier richtet jedes Jahr das Land aus, das den Vorsitz im Bundesrat führt.",
      "2004 wollte die Bundesregierung den Feiertag auf den ersten Sonntag im Oktober verlegen. Nach wenigen Tagen Protest war der Plan vom Tisch.",
    ],
    faq: [
      {
        q: "Warum ist der Tag der Deutschen Einheit am 3. Oktober und nicht am 9. November?",
        a: "Am 3. Oktober 1990 wurde der Beitritt der DDR zur Bundesrepublik wirksam, die Einheit war damit rechtlich vollzogen. Der 9. November, der Tag des Mauerfalls 1989, war im Gespräch. Er ist aber auch das Datum der Novemberpogrome von 1938 und kam deshalb als Feiertag nicht infrage.",
      },
      {
        q: "Ist der 3. Oktober überall in Deutschland ein Feiertag?",
        a: "Ja, in allen 16 Bundesländern. Der Tag ist im Einigungsvertrag als gesetzlicher Feiertag festgelegt. Fällt er auf einen Samstag oder Sonntag, gibt es keinen Ersatztag.",
      },
      {
        q: "Haben Geschäfte am 3. Oktober geöffnet?",
        a: "In der Regel nicht. Supermärkte und Kaufhäuser bleiben zu. Ausnahmen gibt es je nach Land für Tankstellen, Läden in Bahnhöfen und Flughäfen sowie Bäckereien mit begrenzten Öffnungszeiten.",
      },
      {
        q: "Was war vor 1990 der Nationalfeiertag?",
        a: "In der Bundesrepublik war es der 17. Juni, der als Tag der deutschen Einheit an den Volksaufstand in der DDR von 1953 erinnerte. Die DDR feierte am 7. Oktober den Tag der Republik, den Jahrestag ihrer Gründung 1949. Seit 1990 gilt für das ganze Land der 3. Oktober.",
      },
    ],
    faqDynamisch: (now) => {
      const t = naechster(now, 10, 3);
      return [
        {
          q: `Auf welchen Wochentag fällt der Tag der Deutschen Einheit ${t.y}?`,
          a: `Der Tag der Deutschen Einheit ist am ${datumMitWochentag(t)}. ${freiHinweis(t, "Bundesweit")}`,
        },
      ];
    },
    related: ["/reformationstag", "/allerheiligen", "/weltkindertag", "/herbstanfang", "/ferien/herbstferien", "/zeitumstellung", "/halloween"],
  },
  {
    slug: "halloween",
    pfad: "/halloween",
    title: "Halloween",
    question: "Wie lange noch bis Halloween?",
    category: "feiertage",
    art: "tag",
    ...fest(10, 31),
    bis: "bis Halloween",
    heute: "Heute ist Halloween.",
    motif: "kuerbis",
    gesetzlich: false,
    intro: `Halloween ist am 31. Oktober, am Abend vor [Allerheiligen](/allerheiligen). Daher auch der Name: „All Hallows’ Eve“ heißt nichts anderes als Vorabend von Allerheiligen. Der Brauch stammt aus Irland, wanderte im 19. Jahrhundert mit Auswanderern in die USA und kam von dort mit Kürbis und Kostüm zurück nach Europa.

Ein Feiertag ist Halloween nirgends. Dass trotzdem viele am 31. Oktober frei haben, liegt am [Reformationstag](/reformationstag), der auf dasselbe Datum fällt und in neun Bundesländern gesetzlicher Feiertag ist. Die einen denken an Luther, die anderen klingeln als Skelett an der Tür. Der Kalender hält das aus.

Für den Abend gilt: Süßes bereithalten oder das Licht ausmachen. Und wer feiern geht, sollte wissen, dass Allerheiligen in mehreren Ländern ein stiller Feiertag ist. Dort endet die Party früher als geplant.`,
    facts: [
      "Halloween ist in keinem Bundesland ein gesetzlicher Feiertag.",
      "Der Name ist eine Verkürzung von „All Hallows’ Eve“, dem Abend vor Allerheiligen.",
      "Irische Auswanderer brachten den Brauch im 19. Jahrhundert in die USA.",
      "Die ausgehöhlte Laterne heißt im Englischen „Jack O’Lantern“. In Irland schnitzte man sie ursprünglich aus Rüben, der Kürbis kam erst in Amerika dazu.",
    ],
    faq: [
      {
        q: "Ist Halloween ein Feiertag?",
        a: "Nein. Wer am 31. Oktober frei hat, verdankt das dem Reformationstag, der in neun Bundesländern gesetzlicher Feiertag ist. In den anderen Ländern ist der Tag ein normaler Werktag.",
      },
      {
        q: "Was sagt man an Halloween an der Tür?",
        a: "„Süßes oder Saures“. Das ist die deutsche Fassung des amerikanischen „Trick or treat“: Entweder es gibt Süßigkeiten, oder es droht ein Streich. In der Praxis bleibt es fast immer bei den Süßigkeiten.",
      },
      {
        q: "Wann gehen Kinder an Halloween von Tür zu Tür?",
        a: "Am Abend des 31. Oktober, sobald es dämmert. Eine feste Uhrzeit gibt es nicht, die meisten Gruppen sind am frühen Abend unterwegs. Ein dunkler Hauseingang gilt als Zeichen, dass dort niemand klingeln soll.",
      },
      {
        q: "Darf man an Halloween die ganze Nacht feiern?",
        a: "Nicht überall. In den Ländern, in denen Allerheiligen gesetzlicher Feiertag ist, zählt der 1. November zu den stillen Tagen mit Tanzverbot. Ab wann es gilt, regelt jedes Land selbst, zum Teil schon ab den frühen Morgenstunden.",
      },
    ],
    faqDynamisch: (now) => {
      const t = naechster(now, 10, 31);
      return [
        {
          q: `Auf welchen Wochentag fällt Halloween ${t.y}?`,
          a: `Halloween ist am ${datumMitWochentag(t)}. Allerheiligen am Tag danach ist ein ${wochentagName(plusTage(t, 1))}.`,
        },
      ];
    },
    related: ["/reformationstag", "/allerheiligen", "/sankt-martin", "/karneval", "/zeitumstellung", "/ferien/herbstferien", "/tag-der-deutschen-einheit"],
  },
  {
    slug: "reformationstag",
    pfad: "/reformationstag",
    title: "Reformationstag",
    nominativ: "Der Reformationstag",
    question: "Wie lange noch bis zum Reformationstag?",
    category: "feiertage",
    art: "tag",
    ...fest(10, 31),
    bis: "bis zum Reformationstag",
    heute: "Heute ist Reformationstag.",
    motif: "these",
    gesetzlich: ["BB", "HB", "HH", "MV", "NI", "SN", "ST", "SH", "TH"],
    intro: `Der Reformationstag ist am 31. Oktober. Evangelische Christen erinnern an Martin Luther, der 1517 seine 95 Thesen gegen den Ablasshandel veröffentlichte. Der Überlieferung nach schlug er sie an die Tür der Schlosskirche in Wittenberg. Ob wirklich ein Hammer im Spiel war, ist unter Historikern umstritten. Sicher ist, dass er die Thesen an diesem Tag verschickte.

Gesetzlicher Feiertag ist der 31. Oktober in neun Ländern: Brandenburg, Bremen, Hamburg, Mecklenburg-Vorpommern, Niedersachsen, Sachsen, Sachsen-Anhalt, Schleswig-Holstein und Thüringen. Die vier norddeutschen Länder kamen erst 2018 dazu.

Der Rest der Republik arbeitet und hat dafür teilweise am Tag darauf frei: [Allerheiligen](/allerheiligen) ist Feiertag in fünf Ländern. Beides zusammen gibt es nirgends. Wer am selben Abend lieber Kürbisse aushöhlt, findet hier den [Countdown bis Halloween](/halloween).`,
    facts: [
      "Der Reformationstag ist in neun Bundesländern gesetzlicher Feiertag: Brandenburg, Bremen, Hamburg, Mecklenburg-Vorpommern, Niedersachsen, Sachsen, Sachsen-Anhalt, Schleswig-Holstein und Thüringen.",
      "Bremen, Hamburg, Niedersachsen und Schleswig-Holstein haben den Feiertag 2018 eingeführt.",
      "2017, zum 500. Jahrestag der Thesen, war der 31. Oktober einmalig in ganz Deutschland arbeitsfrei.",
      "Luther schickte seine 95 Thesen am 31. Oktober 1517 an Erzbischof Albrecht von Mainz. Der Anschlag an die Kirchentür ist nicht sicher belegt.",
      "Kein Bundesland hat sowohl den Reformationstag als auch Allerheiligen als gesetzlichen Feiertag.",
    ],
    faq: [
      {
        q: "In welchen Bundesländern ist der Reformationstag ein Feiertag?",
        a: "In Brandenburg, Bremen, Hamburg, Mecklenburg-Vorpommern, Niedersachsen, Sachsen, Sachsen-Anhalt, Schleswig-Holstein und Thüringen. In den anderen sieben Ländern ist der 31. Oktober ein normaler Werktag.",
      },
      {
        q: "Seit wann ist der Reformationstag in Norddeutschland ein Feiertag?",
        a: "Seit 2018. Nachdem der Tag 2017 zum Reformationsjubiläum einmalig bundesweit frei war, führten Bremen, Hamburg, Niedersachsen und Schleswig-Holstein ihn dauerhaft ein. In den fünf ostdeutschen Flächenländern gilt er schon seit den 1990er-Jahren.",
      },
      {
        q: "Hat Luther die Thesen wirklich an die Kirchentür genagelt?",
        a: "Das ist nicht gesichert. Belegt ist, dass Luther die 95 Thesen am 31. Oktober 1517 mit einem Brief an Erzbischof Albrecht von Mainz schickte. Von einem Anschlag an die Tür der Wittenberger Schlosskirche hat er selbst nie berichtet, Historiker streiten darüber seit Jahrzehnten.",
      },
      {
        q: "Was ist der Unterschied zwischen Reformationstag und Allerheiligen?",
        a: "Der Reformationstag am 31. Oktober ist ein evangelischer Gedenktag und in neun überwiegend nord- und ostdeutschen Ländern arbeitsfrei. Allerheiligen am 1. November ist ein katholisches Fest und in fünf Ländern im Süden und Westen Feiertag. Berlin und Hessen haben keinen der beiden Tage frei.",
      },
    ],
    faqDynamisch: (now) => {
      const t = naechster(now, 10, 31);
      return [
        {
          q: `Auf welchen Wochentag fällt der Reformationstag ${t.y}?`,
          a: `Der Reformationstag ist am ${datumMitWochentag(t)}. ${freiHinweis(t, "In den neun Ländern mit Feiertag")}`,
        },
      ];
    },
    related: ["/halloween", "/allerheiligen", "/buss-und-bettag", "/tag-der-deutschen-einheit", "/sankt-martin", "/ferien/herbstferien", "/1-advent"],
  },
  {
    slug: "allerheiligen",
    pfad: "/allerheiligen",
    title: "Allerheiligen",
    question: "Wie lange noch bis Allerheiligen?",
    category: "feiertage",
    art: "tag",
    ...fest(11, 1),
    bis: "bis Allerheiligen",
    heute: "Heute ist Allerheiligen.",
    motif: "grablicht",
    gesetzlich: ["BW", "BY", "NW", "RP", "SL"],
    intro: `Allerheiligen ist am 1. November. Die katholische Kirche gedenkt an diesem Tag aller Heiligen, auch derer, die keinen eigenen Tag im Kalender haben. Am 2. November folgt Allerseelen, das Gedenken an alle Verstorbenen. In der Praxis verschmilzt beides: Schon am Nachmittag des 1. November gehen viele Familien auf den Friedhof, schmücken die Gräber und zünden Lichter an.

Gesetzlicher Feiertag ist Allerheiligen in Baden-Württemberg, Bayern, Nordrhein-Westfalen, Rheinland-Pfalz und im Saarland. Dort ist es zugleich ein stiller Feiertag mit Tanzverbot. Wer am Vorabend [Halloween](/halloween) feiert, merkt das spätestens, wenn die Musik ausgeht.

In den anderen elf Ländern wird gearbeitet. Neun davon hatten dafür am Tag vorher frei, am [Reformationstag](/reformationstag). Welche Regel bei dir gilt, zeigt die [Übersicht der Feiertage nach Bundesland](/feiertage).`,
    facts: [
      "Allerheiligen ist in fünf Bundesländern gesetzlicher Feiertag: Baden-Württemberg, Bayern, Nordrhein-Westfalen, Rheinland-Pfalz und Saarland.",
      "In der Westkirche liegt das Fest seit dem 9. Jahrhundert am 1. November.",
      "Allerseelen am 2. November geht auf Abt Odilo von Cluny zurück, der den Gedenktag um das Jahr 1000 in seinen Klöstern einführte.",
      "In den Ländern mit Feiertag zählt Allerheiligen zu den stillen Tagen. Öffentliche Tanzveranstaltungen sind dann zeitweise verboten.",
      "Berlin und Hessen haben weder am 31. Oktober noch am 1. November einen Feiertag.",
    ],
    faq: [
      {
        q: "Wo ist Allerheiligen ein Feiertag?",
        a: "In Baden-Württemberg, Bayern, Nordrhein-Westfalen, Rheinland-Pfalz und im Saarland. In den anderen elf Bundesländern ist der 1. November ein normaler Werktag.",
      },
      {
        q: "Was ist der Unterschied zwischen Allerheiligen und Allerseelen?",
        a: "Allerheiligen am 1. November gilt allen Heiligen der Kirche. Allerseelen am 2. November ist das Gedenken an alle Verstorbenen und in Deutschland kein Feiertag. Weil nur der 1. November arbeitsfrei ist, finden Friedhofsbesuch und Gräbersegnung meist schon an diesem Tag statt.",
      },
      {
        q: "Was bedeutet stiller Feiertag?",
        a: "An stillen Feiertagen sind öffentliche Tanz- und Unterhaltungsveranstaltungen eingeschränkt oder verboten. Wie lange das Verbot dauert, legt jedes Bundesland in seinem Feiertagsgesetz fest. An Allerheiligen gilt es je nach Land nur tagsüber oder fast rund um die Uhr.",
      },
      {
        q: "Haben Geschäfte an Allerheiligen geöffnet?",
        a: "In den fünf Ländern mit Feiertag bleiben sie geschlossen, mit den üblichen Ausnahmen wie Tankstellen und Läden in Bahnhöfen. In den Nachbarländern ohne Feiertag ist ganz normal geöffnet.",
      },
    ],
    faqDynamisch: (now) => {
      const t = naechster(now, 11, 1);
      return [
        {
          q: `Auf welchen Wochentag fällt Allerheiligen ${t.y}?`,
          a: `Allerheiligen ist am ${datumMitWochentag(t)}. ${freiHinweis(t, "In den fünf Ländern mit Feiertag")}`,
        },
      ];
    },
    related: ["/halloween", "/reformationstag", "/sankt-martin", "/buss-und-bettag", "/karneval", "/ferien/herbstferien", "/1-advent"],
  },
  {
    slug: "sankt-martin",
    pfad: "/sankt-martin",
    title: "Sankt Martin",
    nominativ: "Der Martinstag",
    question: "Wie lange noch bis Sankt Martin?",
    category: "feiertage",
    art: "tag",
    ...fest(11, 11),
    bis: "bis Sankt Martin",
    heute: "Heute ist Sankt Martin.",
    motif: "laterne",
    gesetzlich: false,
    intro: `Sankt Martin ist am 11. November. Der Tag erinnert an Martin von Tours, einen römischen Soldaten, der später Bischof wurde. Berühmt ist er für eine einzige Szene: Am Stadttor von Amiens teilte er seinen Mantel mit dem Schwert und gab die Hälfte einem frierenden Bettler. Der 11. November ist der Tag seiner Beisetzung im Jahr 397.

Gefeiert wird mit Laternenumzügen, Martinsfeuer und einem Reiter im roten Mantel vorneweg. Die Umzüge finden oft nicht genau am 11. statt, sondern an einem Abend in den Tagen davor oder danach. Kita und Schule geben den Termin vor, nicht der Kalender.

Ein gesetzlicher Feiertag ist der Martinstag nirgends. Am selben Tag um 11:11 Uhr [beginnt die Karnevalssession](/karneval). Der nächste Termin für Kinder ist dann schon der [Nikolaustag](/nikolaus).`,
    facts: [
      "Martin von Tours starb am 8. November 397 und wurde am 11. November in Tours beigesetzt. Daher das Datum.",
      "Martin wurde im Gebiet des heutigen Ungarn geboren, diente als römischer Soldat und wurde in den 370er-Jahren Bischof von Tours.",
      "Die Martinsgans geht der Legende nach auf Gänse zurück, deren Geschnatter Martin verriet, als er sich vor der Bischofswahl im Stall versteckte.",
      "Der Martinstag war über Jahrhunderte ein Stichtag im bäuerlichen Jahr: Pacht und Zinsen wurden fällig, Knechte und Mägde wechselten die Stelle.",
      "Der Martinstag ist in keinem Bundesland ein gesetzlicher Feiertag.",
    ],
    faq: [
      {
        q: "Ist Sankt Martin ein Feiertag?",
        a: "Nein. Der 11. November ist in ganz Deutschland ein normaler Werk- und Schultag. Die Umzüge finden deshalb am späten Nachmittag oder Abend statt.",
      },
      {
        q: "Wann ist der Martinsumzug?",
        a: "Einen einheitlichen Termin gibt es nicht. Kitas, Schulen, Kirchengemeinden und Vereine legen ihre Umzüge selbst fest, meist auf einen Abend in der Woche um den 11. November. Den Termin vor Ort erfährst du bei der Einrichtung oder der Gemeinde.",
      },
      {
        q: "Warum isst man an Sankt Martin Gans?",
        a: "Die Legende sagt: Martin wollte nicht Bischof werden und versteckte sich in einem Gänsestall, die Tiere verrieten ihn. Praktischer ist die zweite Erklärung. Am Martinstag wurden Abgaben fällig, oft in Form von Gänsen, und danach begann früher eine Fastenzeit vor Weihnachten. Vorher wurde noch einmal ordentlich gegessen.",
      },
      {
        q: "Was ist ein Weckmann?",
        a: "Ein Männchen aus süßem Hefeteig, oft mit einer Tonpfeife. Im Rheinland bekommen Kinder es zu Sankt Martin, in anderen Gegenden gibt es dasselbe Gebäck erst zu Nikolaus. Je nach Region heißt es auch Stutenkerl.",
      },
    ],
    faqDynamisch: (now) => {
      const t = naechster(now, 11, 11);
      return [
        {
          q: `Auf welchen Wochentag fällt Sankt Martin ${t.y}?`,
          a: `Der Martinstag ist am ${datumMitWochentag(t)}. Im Jahr darauf fällt der 11. November auf einen ${wochentagName({ ...t, y: t.y + 1 })}.`,
        },
      ];
    },
    related: ["/karneval", "/nikolaus", "/halloween", "/allerheiligen", "/buss-und-bettag", "/1-advent", "/weihnachten"],
  },
  {
    slug: "karneval",
    pfad: "/karneval",
    title: "Karnevalsbeginn",
    nominativ: "Die Karnevalssession",
    question: "Wann beginnt Karneval?",
    category: "feiertage",
    art: "tag",
    ...fest(11, 11),
    uhrzeit: { h: 11, mi: 11 },
    // Der Zähler läuft bis 11:11 Uhr. Am 11.11. bleibt es der heutige Tag, ab dem 12.11. zählt das nächste Jahr.
    getNextDate: (now) => {
      const heute = tagVon(now);
      const vorbei = heute.m === 12 || (heute.m === 11 && heute.d > 11);
      return berlin(vorbei ? heute.y + 1 : heute.y, 11, 11, 11, 11);
    },
    bis: "bis zum Karnevalsbeginn",
    heute: "Heute beginnt die Karnevalssession.",
    motif: "narrenkappe",
    gesetzlich: false,
    intro: `Am 11. November um 11:11 Uhr beginnt die Karnevalssession, die fünfte Jahreszeit. In Köln, Düsseldorf und Mainz stehen dann Tausende im Kostüm auf den Plätzen, es wird heruntergezählt, geschunkelt und zum ersten Mal seit Aschermittwoch wieder „Alaaf“ oder „Helau“ gerufen. Der Zähler auf dieser Seite läuft deshalb nicht bis Mitternacht, sondern bis genau 11:11 Uhr deutscher Zeit.

Warum ausgerechnet die Elf? Sie gilt als Narrenzahl. Erklärungen dafür gibt es mehrere, gesichert ist keine. Fest steht, dass am 11. November auch [Sankt Martin](/sankt-martin) ist und danach früher eine Fastenzeit vor Weihnachten begann. Vorher wurde noch einmal gefeiert.

Nach dem Auftakt wird es wieder ruhig, im Advent pausiert der Karneval weitgehend. Richtig los geht es im neuen Jahr: von [Weiberfastnacht](/weiberfastnacht) über [Rosenmontag](/rosenmontag) bis [Aschermittwoch](/aschermittwoch). Frei hast du am 11.11. übrigens nicht.`,
    facts: [
      "Die Session beginnt jedes Jahr am 11.11. um 11:11 Uhr und endet am Aschermittwoch.",
      "Der 11. November ist kein gesetzlicher Feiertag. Auch der Rosenmontag ist es in keinem Bundesland.",
      "In Düsseldorf erwacht zum Auftakt der Hoppeditz, in Mainz wird das närrische Grundgesetz mit seinen elf Artikeln verkündet.",
      "In Köln ruft man „Alaaf“, in Düsseldorf und Mainz „Helau“.",
      "Weil der Aschermittwoch vom Osterdatum abhängt, ist die Session jedes Jahr unterschiedlich lang.",
    ],
    faq: [
      {
        q: "Warum beginnt Karneval am 11.11. um 11:11 Uhr?",
        a: "Die Elf gilt im Karneval als Narrenzahl, daher Datum und Uhrzeit. Woher das kommt, ist nicht sicher geklärt. Dazu passt der Kalender: Der 11. November ist der Martinstag, nach dem früher eine Fastenzeit vor Weihnachten begann. Ein letztes Fest davor lag nahe.",
      },
      {
        q: "Ist der 11.11. ein Feiertag?",
        a: "Nein, in keinem Bundesland. Wer in Köln, Düsseldorf oder Mainz um 11:11 Uhr dabei sein will, braucht Urlaub oder einen verständnisvollen Chef. Einen Anspruch auf Freistellung gibt es nicht.",
      },
      {
        q: "Wann endet die Karnevalssession?",
        a: "Am Aschermittwoch, 46 Tage vor Ostersonntag. Der Termin wandert also mit Ostern durch Februar und März. Die sechs Tage davor, von Weiberfastnacht bis Veilchendienstag, sind der Höhepunkt mit dem Straßenkarneval.",
      },
      {
        q: "Was ist der Unterschied zwischen Karneval, Fasching und Fastnacht?",
        a: "Gemeint ist dasselbe Fest, die Namen sind regional. Karneval sagt man im Rheinland, Fasching vor allem in Bayern, Sachsen und Österreich, Fastnacht in Mainz und im Südwesten. Die schwäbisch-alemannische Fasnet beginnt allerdings nicht am 11.11., sondern am Dreikönigstag.",
      },
    ],
    faqDynamisch: (now) => {
      const t = naechster(now, 11, 11);
      return [
        {
          q: `Wann beginnt die Karnevalssession ${t.y}/${t.y + 1}?`,
          a: `Am ${datumMitWochentag(t)} um 11:11 Uhr. Sie endet am Aschermittwoch, dem ${datumLang(aschermittwoch(t.y + 1))}.`,
        },
      ];
    },
    related: ["/sankt-martin", "/weiberfastnacht", "/rosenmontag", "/aschermittwoch", "/halloween", "/1-advent", "/nikolaus"],
  },
  {
    slug: "buss-und-bettag",
    pfad: "/buss-und-bettag",
    title: "Buß- und Bettag",
    nominativ: "Der Buß- und Bettag",
    question: "Wann ist der Buß- und Bettag?",
    category: "feiertage",
    art: "tag",
    ...jaehrlich(bussUndBettag),
    bis: "bis zum Buß- und Bettag",
    heute: "Heute ist Buß- und Bettag.",
    motif: "glocke",
    gesetzlich: ["SN"],
    intro: `Der Buß- und Bettag ist ein evangelischer Feiertag ohne festes Datum. Er liegt immer am Mittwoch vor dem 23. November, elf Tage vor dem [1. Advent](/1-advent). Der früheste Termin ist der 16., der späteste der 22. November. Gedacht ist er zum Innehalten: überlegen, was schiefläuft, und es besser machen.

Arbeitsfrei ist er nur noch in Sachsen. In allen anderen Ländern wurde der Feiertag 1995 gestrichen, um die Arbeitgeber für ihren Anteil an der neuen Pflegeversicherung zu entlasten. Sachsen behielt ihn, dafür zahlen Beschäftigte dort mehr in die Pflegeversicherung ein. Ein freier Mittwoch auf Raten. Alle weiteren freien Tage stehen bei den [Feiertagen in Sachsen](/feiertage/sachsen).

Eine Sonderrolle hat Bayern: Dort ist schulfrei, obwohl die Eltern arbeiten müssen. Vier Tage später ist Totensonntag, dann beginnt die Adventszeit und der [Countdown bis Weihnachten](/weihnachten) wird ernst.`,
    facts: [
      "Der Buß- und Bettag ist nur in Sachsen gesetzlicher Feiertag.",
      "Er fällt immer auf den Mittwoch vor dem 23. November: frühestens auf den 16., spätestens auf den 22. November.",
      "1995 wurde er in allen anderen Ländern als arbeitsfreier Tag gestrichen. Das sollte die Arbeitgeber für ihren Beitrag zur neu eingeführten Pflegeversicherung entlasten.",
      "In Sachsen tragen Beschäftigte dafür einen um 0,5 Prozentpunkte höheren Anteil am Beitrag zur Pflegeversicherung als im übrigen Bundesgebiet.",
      "In Bayern ist der Buß- und Bettag kein gesetzlicher Feiertag, an den Schulen fällt aber der Unterricht aus.",
    ],
    faq: [
      {
        q: "Wo ist der Buß- und Bettag ein Feiertag?",
        a: "Nur in Sachsen. In den anderen 15 Bundesländern ist der Tag seit 1995 ein normaler Werktag. Evangelische Kirchengemeinden laden trotzdem überall zu Gottesdiensten ein, meist am Abend.",
      },
      {
        q: "Warum wurde der Buß- und Bettag abgeschafft?",
        a: "Wegen der Pflegeversicherung, die 1995 eingeführt wurde. Um die Arbeitgeber für ihren Beitragsanteil zu entlasten, strichen die Länder einen Feiertag, der immer auf einen Werktag fällt. Sachsen ging einen anderen Weg: Dort blieb der Feiertag, und die Beschäftigten zahlen einen höheren Anteil am Beitrag.",
      },
      {
        q: "Wie wird das Datum berechnet?",
        a: "Der Buß- und Bettag ist der Mittwoch vor dem 23. November. Das ist zugleich der Mittwoch vor dem Totensonntag und liegt elf Tage vor dem 1. Advent. Möglich sind damit nur die Termine vom 16. bis zum 22. November.",
      },
      {
        q: "Ist am Buß- und Bettag schulfrei?",
        a: "In Sachsen ja, weil der Tag dort gesetzlicher Feiertag ist. In Bayern fällt der Unterricht ebenfalls aus, obwohl die Eltern arbeiten müssen. In den übrigen Ländern ist normaler Unterricht.",
      },
    ],
    faqDynamisch: (now) => {
      const heute = tagVon(now);
      let b = bussUndBettag(heute.y);
      if (tageDiff(heute, b) < 0) b = bussUndBettag(heute.y + 1);
      return [
        {
          q: `Wann ist der Buß- und Bettag ${b.y}?`,
          a: `Der Buß- und Bettag ${b.y} ist am ${datumMitWochentag(b)}. Im Jahr darauf fällt er auf den ${datumLang(bussUndBettag(b.y + 1))}.`,
        },
      ];
    },
    related: ["/reformationstag", "/allerheiligen", "/sankt-martin", "/1-advent", "/nikolaus", "/weihnachten", "/ferien/weihnachtsferien"],
  },
];
