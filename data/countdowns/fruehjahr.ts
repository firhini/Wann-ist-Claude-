import type { Countdown } from "@/lib/countdown";
import { fest, jaehrlich } from "@/lib/countdown";
import {
  aschermittwoch,
  christiHimmelfahrt,
  fronleichnam,
  karfreitag,
  muttertag,
  ostermontag,
  ostersonntag,
  pfingstmontag,
  pfingstsonntag,
  rosenmontag,
  vatertag,
  weiberfastnacht,
} from "@/lib/feiertage";
import { datumLang, datumMitWochentag, wochentagName } from "@/lib/format";
import { type Tag, plusTage, tageDiff, tagVon, wochentag } from "@/lib/zeit";

const BMI = {
  label: "Bundesministerium des Innern: Nationale Feiertage",
  url: "https://www.bmi.bund.de/DE/themen/verfassung/staatliche-symbole/nationale-feiertage/nationale-feiertage-node.html",
};

/**
 * Nächstes Vorkommen eines jährlichen Termins: dieses Jahr, sonst nächstes.
 * `dauer` in Tagen, damit ein zweitägiges Fest am zweiten Tag noch als laufend gilt.
 */
function naechstes(now: Date, datum: (jahr: number) => Tag, dauer = 1): Tag {
  const heute = tagVon(now);
  const diesesJahr = datum(heute.y);
  return tageDiff(heute, plusTage(diesesJahr, dauer - 1)) < 0 ? datum(heute.y + 1) : diesesJahr;
}

const festerTag = (m: number, d: number) => (jahr: number): Tag => ({ y: jahr, m, d });

export const FRUEHJAHR: Countdown[] = [
  {
    slug: "weiberfastnacht",
    pfad: "/weiberfastnacht",
    title: "Weiberfastnacht",
    question: "Wann ist Weiberfastnacht?",
    category: "feiertage",
    art: "tag",
    ...jaehrlich(weiberfastnacht),
    bis: "bis Weiberfastnacht",
    heute: "Heute ist Weiberfastnacht.",
    motif: "krawatte",
    gesetzlich: false,
    intro: `Weiberfastnacht ist der Donnerstag vor Rosenmontag. Um 11:11 Uhr beginnt im Rheinland der Straßenkarneval, und bis Aschermittwoch hört er nicht mehr richtig auf. In Köln heißt der Tag Wieverfastelovend, in Düsseldorf Altweiber, im Südwesten Schmotziger Donnerstag.

Das Datum hängt an Ostern. Weiberfastnacht liegt immer 52 Tage vor dem Ostersonntag, frühestens am 29. Januar und spätestens am 4. März. Vier Tage später ist [Rosenmontag](/rosenmontag), sechs Tage später [Aschermittwoch](/aschermittwoch).

Ein gesetzlicher Feiertag ist der Tag nirgends. In den Hochburgen machen viele Büros und Behörden trotzdem mittags zu, weil ab 11:11 Uhr ohnehin niemand mehr arbeitet. Wer an diesem Tag eine Krawatte trägt, sollte nicht an ihr hängen. Den Überblick über die ganze närrische Zeit gibt es beim [Countdown bis Karneval](/karneval).`,
    facts: [
      "Weiberfastnacht liegt 52 Tage vor dem Ostersonntag und fällt immer auf einen Donnerstag zwischen dem 29. Januar und dem 4. März.",
      "Als Ursprungsort gilt Beuel, heute ein Stadtteil von Bonn. Dort gründeten Wäscherinnen der Überlieferung nach 1824 ein eigenes Damenkomitee.",
      "Weiberfastnacht ist in keinem Bundesland ein gesetzlicher Feiertag, auch nicht in Nordrhein-Westfalen.",
      "Das Amtsgericht Essen sprach 1988 einem Mann 40 Mark Schadenersatz zu, dem in einem Reisebüro ungefragt die Krawatte abgeschnitten worden war.",
    ],
    faq: [
      {
        q: "Ist Weiberfastnacht ein Feiertag?",
        a: "Nein. Weiberfastnacht ist in ganz Deutschland ein normaler Werktag. Ob du früher gehen darfst, entscheidet der Arbeitgeber. In Köln, Bonn oder Düsseldorf schließen viele Betriebe und Ämter am Mittag freiwillig.",
      },
      {
        q: "Warum werden an Weiberfastnacht Krawatten abgeschnitten?",
        a: "Die Krawatte steht für männliche Macht, und an Weiberfastnacht übernehmen symbolisch die Frauen das Regiment. Deshalb stürmen sie Rathäuser und kürzen Schlipse. Als Spaß gilt das nur mit Einverständnis des Trägers, ohne kann es Sachbeschädigung sein.",
      },
      {
        q: "Um wie viel Uhr beginnt Weiberfastnacht?",
        a: "Um 11:11 Uhr. Dann wird in Köln auf dem Alter Markt der Straßenkarneval eröffnet, in vielen anderen Städten stürmen die Frauen um diese Zeit das Rathaus.",
      },
      {
        q: "Wie heißt Weiberfastnacht in anderen Regionen?",
        a: "In Köln Wieverfastelovend, in Düsseldorf und am Niederrhein Altweiber, in Aachen Fettdonnerstag. In der schwäbisch-alemannischen Fastnacht heißt der Tag Schmotziger Donnerstag, in Teilen Bayerns Unsinniger Donnerstag.",
      },
    ],
    faqDynamisch: (now) => {
      const w = naechstes(now, weiberfastnacht);
      return [
        {
          q: `Wann ist Weiberfastnacht ${w.y}?`,
          a: `Weiberfastnacht ${w.y} ist am ${datumMitWochentag(w)}. Rosenmontag folgt am ${datumLang(plusTage(w, 4))}, Aschermittwoch am ${datumLang(plusTage(w, 6))}.`,
        },
      ];
    },
    related: ["/rosenmontag", "/aschermittwoch", "/karneval", "/valentinstag", "/frauentag", "/ostern", "/ferien/winterferien"],
  },
  {
    slug: "rosenmontag",
    pfad: "/rosenmontag",
    title: "Rosenmontag",
    question: "Wann ist Rosenmontag?",
    category: "feiertage",
    art: "tag",
    ...jaehrlich(rosenmontag),
    bis: "bis Rosenmontag",
    heute: "Heute ist Rosenmontag.",
    motif: "narrenkappe",
    gesetzlich: false,
    intro: `Rosenmontag ist der Höhepunkt des Straßenkarnevals. In Köln, Düsseldorf und Mainz rollen die großen Züge, es regnet Kamelle, und wer am Straßenrand steht, sollte einen Beutel dabeihaben. Mit Rosen hat der Tag vermutlich wenig zu tun, die Herkunft des Namens ist bis heute umstritten.

Im Kalender liegt Rosenmontag immer 48 Tage vor dem Ostersonntag. Damit fällt er frühestens auf den 2. Februar und spätestens auf den 8. März. Los geht es vier Tage vorher mit [Weiberfastnacht](/weiberfastnacht), Schluss ist zwei Tage später am [Aschermittwoch](/aschermittwoch).

Gesetzlicher Feiertag ist Rosenmontag in keinem Bundesland. In den Hochburgen bleiben trotzdem viele Betriebe, Behörden und Schulen zu, anderswo wird ganz normal gearbeitet. Wer frei haben will und nicht im Rheinland wohnt, braucht Urlaub. Den nächsten sicheren freien Tag für alle zeigt der [Countdown bis Karfreitag](/karfreitag).`,
    facts: [
      "Rosenmontag liegt 48 Tage vor dem Ostersonntag und fällt immer auf einen Montag zwischen dem 2. Februar und dem 8. März.",
      "Der erste organisierte Rosenmontagszug zog am 10. Februar 1823 durch Köln.",
      "1991 fiel der Rosenmontagszug in Köln und den meisten anderen Hochburgen wegen des Golfkriegs aus.",
      "Rosenmontag ist kein gesetzlicher Feiertag. Wo frei ist, beruht das auf Tarifvertrag, Betriebsvereinbarung oder Gewohnheit.",
      "Der späteste Termin, der 8. März, kommt selten vor. Zuletzt war das 1943 so, das nächste Mal ist 2038.",
    ],
    faq: [
      {
        q: "Ist Rosenmontag ein Feiertag?",
        a: "Nein, in keinem Bundesland. In Karnevalshochburgen wie Köln, Düsseldorf oder Mainz geben viele Arbeitgeber trotzdem frei. Einen Anspruch darauf hast du nur, wenn es im Arbeits- oder Tarifvertrag steht oder der Betrieb es seit Jahren ohne Vorbehalt so handhabt.",
      },
      {
        q: "Haben Schulen am Rosenmontag frei?",
        a: "Das hängt vom Ort ab. In Nordrhein-Westfalen legen viele Schulen einen ihrer beweglichen Ferientage auf den Rosenmontag. In Ländern mit Winter- oder Faschingsferien fällt der Tag oft ohnehin in die Ferien.",
      },
      {
        q: "Woher kommt der Name Rosenmontag?",
        a: "Das ist nicht sicher geklärt. Eine verbreitete Erklärung führt den Namen auf den Rosensonntag zurück, den vierten Sonntag der Fastenzeit. Eine andere leitet ihn von „rasen“ im Sinne von toben ab.",
      },
      {
        q: "Was passiert nach Rosenmontag?",
        a: "Am Dienstag danach, dem Veilchendienstag oder Fastnachtsdienstag, gibt es noch kleinere Umzüge. In der Nacht wird in Köln und Umgebung der Nubbel verbrannt, eine Strohpuppe, die für alle Sünden der Session büßt. Am Aschermittwoch ist dann Schluss.",
      },
    ],
    faqDynamisch: (now) => {
      const r = naechstes(now, rosenmontag);
      return [
        {
          q: `Wann ist Rosenmontag ${r.y}?`,
          a: `Rosenmontag ${r.y} ist am ${datumLang(r)}. Im Jahr darauf fällt er auf den ${datumLang(rosenmontag(r.y + 1))}.`,
        },
      ];
    },
    related: ["/weiberfastnacht", "/aschermittwoch", "/karneval", "/valentinstag", "/karfreitag", "/ostern", "/ferien/winterferien"],
  },
  {
    slug: "aschermittwoch",
    pfad: "/aschermittwoch",
    title: "Aschermittwoch",
    question: "Wann ist Aschermittwoch?",
    category: "feiertage",
    art: "tag",
    ...jaehrlich(aschermittwoch),
    bis: "bis Aschermittwoch",
    heute: "Heute ist Aschermittwoch.",
    motif: "aschenkreuz",
    gesetzlich: false,
    intro: `Am Aschermittwoch ist alles vorbei, so singt man es im Karneval. Gemeint ist das Feiern. Für die Kirchen fängt an diesem Tag etwas an, nämlich die Fastenzeit vor [Ostern](/ostern). In katholischen Gottesdiensten bekommen die Gläubigen ein Kreuz aus Asche auf die Stirn gezeichnet, daher der Name.

Aschermittwoch liegt immer 46 Tage vor dem Ostersonntag, frühestens am 4. Februar und spätestens am 10. März. Dass die Fastenzeit trotzdem nur 40 Tage hat, liegt an den sechs Sonntagen dazwischen. Sie zählen nicht mit.

Frei hast du nicht, Aschermittwoch ist in ganz Deutschland ein normaler Arbeitstag. Wer zwei Tage nach [Rosenmontag](/rosenmontag) müde im Büro sitzt, hat das selbst gewählt. Der nächste gesetzliche Feiertag für alle ist [Karfreitag](/karfreitag), gut sechs Wochen später.`,
    facts: [
      "Aschermittwoch liegt 46 Tage vor dem Ostersonntag und fällt immer auf einen Mittwoch zwischen dem 4. Februar und dem 10. März.",
      "Die Asche für das Aschenkreuz stammt traditionell von den verbrannten Palmzweigen des Vorjahres.",
      "In der katholischen Kirche sind Aschermittwoch und Karfreitag die beiden strengen Fast- und Abstinenztage des Jahres.",
      "Der politische Aschermittwoch begann 1919 in Vilshofen in Niederbayern, als der Bayerische Bauernbund am Rande des Viehmarkts zu einer Kundgebung lud.",
      "Aschermittwoch ist in keinem Bundesland ein gesetzlicher Feiertag.",
    ],
    faq: [
      {
        q: "Ist Aschermittwoch ein Feiertag?",
        a: "Nein. Aschermittwoch ist ein kirchlicher Gedenktag, aber in keinem Bundesland ein gesetzlicher Feiertag. Geschäfte, Schulen und Betriebe haben normal geöffnet.",
      },
      {
        q: "Wie lange dauert die Fastenzeit?",
        a: "Von Aschermittwoch bis Karsamstag, das sind 46 Kalendertage. Die sechs Sonntage gelten nicht als Fastentage, so bleiben 40. Die Zahl erinnert an die 40 Tage, die Jesus nach der Bibel in der Wüste fastete.",
      },
      {
        q: "Warum isst man am Aschermittwoch Fisch?",
        a: "Aschermittwoch ist in der katholischen Kirche ein Abstinenztag, an dem auf Fleisch verzichtet wird. Fisch fiel nicht unter dieses Verbot. Daraus wurde das traditionelle Fischessen, zu dem heute auch viele Vereine und Parteien einladen.",
      },
      {
        q: "Was ist der politische Aschermittwoch?",
        a: "Eine Tradition aus Niederbayern, bei der Parteien in Hallen und Bierzelten mit deftigen Reden über die Konkurrenz herziehen. Sie begann 1919 in Vilshofen. Die CSU zog mit ihrer Kundgebung 1975 nach Passau um, inzwischen laden Parteien in ganz Deutschland zu eigenen Veranstaltungen.",
      },
    ],
    faqDynamisch: (now) => {
      const a = naechstes(now, aschermittwoch);
      return [
        {
          q: `Wann ist Aschermittwoch ${a.y}?`,
          a: `Aschermittwoch ${a.y} ist am ${datumLang(a)}. Die Fastenzeit dauert dann bis Karsamstag, den ${datumLang(plusTage(a, 45))}.`,
        },
      ];
    },
    related: ["/rosenmontag", "/weiberfastnacht", "/karneval", "/karfreitag", "/ostern", "/valentinstag", "/fruehlingsanfang"],
  },
  {
    slug: "valentinstag",
    pfad: "/valentinstag",
    title: "Valentinstag",
    nominativ: "Der Valentinstag",
    question: "Wie lange noch bis zum Valentinstag?",
    category: "feiertage",
    art: "tag",
    ...fest(2, 14),
    bis: "bis zum Valentinstag",
    heute: "Heute ist Valentinstag.",
    motif: "herz",
    gesetzlich: false,
    intro: `Der Valentinstag ist am 14. Februar, jedes Jahr, ohne Ausnahme. Das macht ihn zu einem der wenigen Termine im Frühjahr, die sich nicht nach dem Mond richten. Vergessen wird er trotzdem regelmäßig, meist von denselben Leuten.

Benannt ist der Tag nach dem heiligen Valentin, einem Märtyrer aus dem 3. Jahrhundert, über den fast nichts gesichert ist. Mit Verliebten bringen ihn erst englische Dichter im späten Mittelalter in Verbindung. Nach Deutschland kam der Brauch nach dem Zweiten Weltkrieg mit den amerikanischen Soldaten.

Ein Feiertag ist der Valentinstag nicht. Fällt er auf einen Werktag, haben die Blumenläden normal geöffnet, und du hast keine Ausrede. In manchen Jahren liegt er mitten im Karneval, dann lohnt ein Blick auf [Weiberfastnacht](/weiberfastnacht) und [Rosenmontag](/rosenmontag). Der nächste Blumentermin im Kalender ist der [Muttertag im Mai](/muttertag).`,
    facts: [
      "Der Valentinstag ist immer am 14. Februar und in Deutschland kein gesetzlicher Feiertag.",
      "Die Verbindung von Valentinstag und Liebe taucht zuerst bei Geoffrey Chaucer auf, in seinem Gedicht „Parlement of Foules“ aus dem späten 14. Jahrhundert.",
      "1969 strich die katholische Kirche den Gedenktag des heiligen Valentin aus dem allgemeinen römischen Kalender, weil über sein Leben zu wenig gesichert ist.",
      "Als erster Valentinsball in Deutschland gilt der von 1950 in Nürnberg.",
      "Der Valentinstag kann auf Aschermittwoch fallen. Das war 2018 und 2024 so und passiert 2029 wieder.",
    ],
    faq: [
      {
        q: "Ist der Valentinstag ein Feiertag?",
        a: "Nein. Der 14. Februar ist ein normaler Werktag, sofern er nicht auf ein Wochenende fällt. Auch kirchlich ist er kein Feiertag.",
      },
      {
        q: "Warum feiert man Valentinstag?",
        a: "Der Tag erinnert an den heiligen Valentin, der der Legende nach im 3. Jahrhundert als Märtyrer starb und Verliebte getraut haben soll. Belegt ist davon wenig. Als Tag der Liebenden ist der 14. Februar seit dem späten Mittelalter aus England bekannt.",
      },
      {
        q: "Seit wann gibt es den Valentinstag in Deutschland?",
        a: "Verbreitet hat er sich nach 1945 durch die in Deutschland stationierten US-Soldaten. 1950 fand in Nürnberg der erste Valentinsball statt. Danach half der Blumenhandel kräftig nach.",
      },
      {
        q: "Wer schenkt wem etwas am Valentinstag?",
        a: "In Deutschland beschenken sich Paare gegenseitig, klassisch mit Blumen, Pralinen oder einer Karte. In Japan ist es anders geregelt. Dort schenken am 14. Februar die Frauen Schokolade, die Männer revanchieren sich einen Monat später am White Day.",
      },
    ],
    faqDynamisch: (now) => {
      const v = naechstes(now, festerTag(2, 14));
      return [
        {
          q: `Auf welchen Wochentag fällt der Valentinstag ${v.y}?`,
          a: `Der 14. Februar ${v.y} ist ein ${wochentagName(v)}. Im Jahr darauf fällt der Valentinstag auf einen ${wochentagName({ ...v, y: v.y + 1 })}.`,
        },
      ];
    },
    related: ["/weiberfastnacht", "/rosenmontag", "/aschermittwoch", "/frauentag", "/muttertag", "/fruehlingsanfang", "/karneval"],
  },
  {
    slug: "frauentag",
    pfad: "/frauentag",
    title: "Internationaler Frauentag",
    nominativ: "Der Internationale Frauentag",
    tafel: "Frauentag",
    question: "Wie lange noch bis zum Frauentag?",
    category: "feiertage",
    art: "tag",
    ...fest(3, 8),
    bis: "bis zum Frauentag",
    heute: "Heute ist Internationaler Frauentag.",
    motif: "venus",
    gesetzlich: ["BE", "MV"],
    intro: `Der Internationale Frauentag ist am 8. März. Er ist kein Blumentag mit politischem Anstrich, sondern umgekehrt ein politischer Tag, an dem inzwischen auch Blumen verschenkt werden. Am Anfang stand die Forderung nach dem Wahlrecht für Frauen. Den ersten Frauentag gab es 1911.

Gesetzlicher Feiertag ist der 8. März nur in zwei Bundesländern, in [Berlin](/feiertage/berlin) seit 2019 und in [Mecklenburg-Vorpommern](/feiertage/mecklenburg-vorpommern) seit 2023. Überall sonst wird normal gearbeitet. Wer in Brandenburg wohnt und in Berlin arbeitet, hat frei, umgekehrt nicht. Es zählt der Arbeitsort.

Das Datum ist fest, der Wochentag wandert. Fällt der 8. März auf ein Wochenende, gibt es keinen Ersatztag. Was in welchem Land sonst noch frei ist, steht in der [Übersicht aller Feiertage](/feiertage). Der nächste bundesweite Feiertag danach ist [Karfreitag](/karfreitag).`,
    facts: [
      "Der 8. März ist gesetzlicher Feiertag in Berlin (seit 2019) und in Mecklenburg-Vorpommern (seit 2023).",
      "Beschlossen wurde der Frauentag 1910 auf der Zweiten Internationalen Sozialistischen Frauenkonferenz in Kopenhagen, auf Initiative von Clara Zetkin.",
      "Der erste Frauentag fand am 19. März 1911 statt. Auf den 8. März wurde er 1921 festgelegt.",
      "Die Vereinten Nationen begingen den 8. März erstmals 1975, im Internationalen Jahr der Frau.",
      "Das Frauenwahlrecht, die Hauptforderung der ersten Frauentage, gilt in Deutschland seit November 1918.",
    ],
    faq: [
      {
        q: "Habe ich am Frauentag frei, wenn ich in Berlin arbeite, aber woanders wohne?",
        a: "Ja. Für Feiertage zählt der Arbeitsort, nicht der Wohnort. Wer in Berlin oder Mecklenburg-Vorpommern arbeitet, hat am 8. März frei. Wer dort wohnt und in einem anderen Bundesland arbeitet, muss zur Arbeit.",
      },
      {
        q: "Warum ist der Frauentag am 8. März?",
        a: "Das Datum wurde 1921 auf einer Konferenz kommunistischer Frauen in Moskau festgelegt. Es erinnert an den Streik der Petrograder Arbeiterinnen am 8. März 1917, der am Beginn der Februarrevolution in Russland stand. Davor hatte der Frauentag wechselnde Termine.",
      },
      {
        q: "Was ist der Unterschied zwischen Frauentag und Muttertag?",
        a: "Der Frauentag am 8. März ist ein politischer Tag für Gleichberechtigung. Der Muttertag am zweiten Sonntag im Mai ehrt Mütter in der Familie. In der DDR wurde offiziell nur der Frauentag begangen.",
      },
      {
        q: "Haben Geschäfte am Frauentag geöffnet?",
        a: "In Berlin und Mecklenburg-Vorpommern bleiben die Läden am 8. März geschlossen, wie an jedem gesetzlichen Feiertag. In allen anderen Bundesländern gelten die normalen Öffnungszeiten. Wer in Berlin wohnt und dringend etwas braucht, wird in Brandenburg fündig.",
      },
    ],
    faqDynamisch: (now) => {
      const f = naechstes(now, festerTag(3, 8));
      const wt = wochentag(f);
      const folge =
        wt === 0 || wt === 6
          ? "In Berlin und Mecklenburg-Vorpommern fällt der Feiertag damit auf das Wochenende, einen Ersatztag gibt es nicht."
          : "In Berlin und Mecklenburg-Vorpommern ist dieser Tag arbeitsfrei.";
      return [
        {
          q: `Auf welchen Wochentag fällt der Frauentag ${f.y}?`,
          a: `Der 8. März ${f.y} ist ein ${wochentagName(f)}. ${folge}`,
        },
      ];
    },
    related: ["/valentinstag", "/muttertag", "/karfreitag", "/ostern", "/tag-der-arbeit", "/fruehlingsanfang", "/weltkindertag"],
  },
  {
    slug: "karfreitag",
    pfad: "/karfreitag",
    title: "Karfreitag",
    question: "Wann ist Karfreitag?",
    category: "feiertage",
    art: "tag",
    ...jaehrlich(karfreitag),
    bis: "bis Karfreitag",
    heute: "Heute ist Karfreitag.",
    motif: "kreuz",
    gesetzlich: "bundesweit",
    source: BMI,
    intro: `Karfreitag ist der Freitag vor [Ostern](/ostern) und in ganz Deutschland ein gesetzlicher Feiertag. Christen erinnern an diesem Tag an die Kreuzigung Jesu. Das „Kar“ kommt vom althochdeutschen „kara“ und bedeutet Klage oder Trauer. Entsprechend still soll es zugehen.

Das Datum hängt am Osterfest. Karfreitag ist immer zwei Tage vor dem Ostersonntag, frühestens am 20. März und spätestens am 23. April. Zusammen mit dem [Ostermontag](/ostermontag) entsteht so das einzige lange Wochenende, das jedes Jahr sicher vier Tage hat.

Karfreitag ist ein sogenannter stiller Feiertag. Tanzveranstaltungen sind verboten, wie lange genau, regelt jedes Bundesland selbst. Die Läden sind zu, am Karsamstag haben sie wieder normal geöffnet. Wer die freien Tage verplanen will, findet hier die Termine der [Osterferien in allen Bundesländern](/ferien/osterferien).`,
    facts: [
      "Karfreitag liegt zwei Tage vor dem Ostersonntag und fällt immer auf einen Freitag zwischen dem 20. März und dem 23. April.",
      "Karfreitag ist in allen 16 Bundesländern gesetzlicher Feiertag.",
      "Das Tanzverbot ist Ländersache. In Berlin gilt es am Karfreitag von 4 bis 21 Uhr, in Bayern von Gründonnerstag 2 Uhr bis Karsamstag 24 Uhr.",
      "Das Bundesverfassungsgericht entschied 2016, dass ein Karfreitagsschutz ganz ohne Ausnahmemöglichkeit zu weit geht. Das Tanzverbot selbst blieb bestehen.",
      "In der katholischen Kirche wird am Karfreitag keine Messe gefeiert. Die Liturgie beginnt traditionell um 15 Uhr, zur überlieferten Todesstunde Jesu.",
    ],
    faq: [
      {
        q: "Ist Karfreitag ein gesetzlicher Feiertag?",
        a: "Ja, in ganz Deutschland. Geschäfte bleiben geschlossen, die meisten Beschäftigten haben frei. Am Karsamstag gelten wieder die normalen Öffnungszeiten.",
      },
      {
        q: "Gilt am Karfreitag ein Tanzverbot?",
        a: "Ja, in allen Bundesländern, aber unterschiedlich lang. Jedes Land regelt das in seinem Feiertagsrecht. Die Spanne reicht von einigen Stunden am Karfreitag selbst bis zu mehreren Tagen von Gründonnerstag bis Karsamstag. Private Feiern in der eigenen Wohnung sind nicht betroffen.",
      },
      {
        q: "Warum heißt es Karfreitag?",
        a: "Die Silbe „Kar“ geht auf das althochdeutsche „kara“ zurück, das Klage, Kummer oder Trauer bedeutet. Karfreitag ist also der Klagefreitag. Dieselbe Wurzel steckt in Karwoche und Karsamstag.",
      },
      {
        q: "Warum isst man am Karfreitag kein Fleisch?",
        a: "Karfreitag ist in der katholischen Kirche ein strenger Fast- und Abstinenztag. Der Verzicht auf Fleisch erinnert an den Tod Jesu. Fisch ist erlaubt und deshalb das klassische Karfreitagsessen, auch in vielen evangelischen Familien.",
      },
    ],
    faqDynamisch: (now) => {
      const k = naechstes(now, karfreitag);
      return [
        {
          q: `Wann ist Karfreitag ${k.y}?`,
          a: `Karfreitag ${k.y} ist am ${datumLang(k)}. Mit dem Ostermontag am ${datumLang(plusTage(k, 3))} sind das vier freie Tage am Stück.`,
        },
      ];
    },
    related: ["/ostern", "/ostermontag", "/aschermittwoch", "/christi-himmelfahrt", "/pfingsten", "/ferien/osterferien", "/tag-der-arbeit"],
  },
  {
    slug: "ostern",
    pfad: "/ostern",
    title: "Ostern",
    question: "Wie lange noch bis Ostern?",
    category: "feiertage",
    art: "tag",
    ...jaehrlich(ostersonntag, 2),
    bis: "bis Ostern",
    heute: "Heute ist Ostern.",
    motif: "ei",
    gesetzlich: false,
    intro: `Ostern ist das wichtigste Fest der Christen, gefeiert wird die Auferstehung Jesu. Im Kalender sind das der Ostersonntag und der [Ostermontag](/ostermontag). Der Zähler auf dieser Seite läuft bis zum Ostersonntag um 0 Uhr.

Das Datum springt jedes Jahr, folgt aber einer festen Regel. Ostern ist am ersten Sonntag nach dem ersten Vollmond im Frühling, und als Frühlingsanfang gilt dabei immer der 21. März. So fällt der Ostersonntag frühestens auf den 22. März und spätestens auf den 25. April. An diesem einen Datum hängen [Karfreitag](/karfreitag), [Christi Himmelfahrt](/christi-himmelfahrt), [Pfingsten](/pfingsten) und sogar der [Rosenmontag](/rosenmontag).

Kurios ist die Rechtslage. Karfreitag und Ostermontag sind bundesweit gesetzliche Feiertage, der Ostersonntag selbst ist es nur in Brandenburg. Praktisch merkt das kaum jemand, weil sonntags ohnehin frei ist. Die Termine der [Osterferien in allen Bundesländern](/ferien/osterferien) stehen auf einer eigenen Seite.`,
    facts: [
      "Ostersonntag fällt immer auf ein Datum zwischen dem 22. März und dem 25. April.",
      "Der 22. März war zuletzt 1818 Ostersonntag und ist es erst 2285 wieder. Der 25. April war es zuletzt 1943, das nächste Mal ist 2038.",
      "Die Regel vom ersten Sonntag nach dem ersten Frühlingsvollmond wird auf das Konzil von Nicäa im Jahr 325 zurückgeführt.",
      "Der Ostersonntag ist nur in Brandenburg ausdrücklich gesetzlicher Feiertag. Karfreitag und Ostermontag sind es in allen 16 Ländern.",
      "Der Osterhase wird erstmals 1682 schriftlich erwähnt, in der Schrift „De ovis paschalibus“, die beim Heidelberger Medizinprofessor Georg Franck von Franckenau entstand.",
    ],
    faq: [
      {
        q: "Ist Ostersonntag ein gesetzlicher Feiertag?",
        a: "Nur in Brandenburg. Dort führt das Feiertagsgesetz Oster- und Pfingstsonntag ausdrücklich auf. In allen anderen Ländern ist der Ostersonntag rechtlich ein gewöhnlicher Sonntag, also trotzdem arbeitsfrei. Einen Unterschied kann das bei Feiertagszuschlägen machen, wenn du sonntags arbeitest.",
      },
      {
        q: "Wie wird das Osterdatum berechnet?",
        a: "Ostern ist am ersten Sonntag nach dem ersten Vollmond ab dem 21. März. Gerechnet wird nicht mit dem echten Mond am Himmel, sondern mit einem festen kirchlichen Mondkalender. Fällt dieser Vollmond auf einen Sonntag, ist Ostern eine Woche später.",
      },
      {
        q: "Warum feiern orthodoxe Christen Ostern oft an einem anderen Tag?",
        a: "Die meisten orthodoxen Kirchen berechnen Ostern nach dem julianischen Kalender. Der liegt derzeit 13 Tage hinter dem gregorianischen, und auch der Mondkalender weicht ab. Deshalb liegt das orthodoxe Osterfest oft eine oder mehrere Wochen später, in manchen Jahren fallen beide Termine zusammen.",
      },
      {
        q: "Haben Geschäfte an Ostern geöffnet?",
        a: "Am Karfreitag, Ostersonntag und Ostermontag sind die Läden geschlossen. Der Karsamstag ist ein gewöhnlicher Werktag mit normalen Öffnungszeiten. Ausnahmen gelten wie an jedem Sonn- und Feiertag etwa für Tankstellen, Bahnhöfe und manche Bäckereien.",
      },
    ],
    faqDynamisch: (now) => {
      const o = naechstes(now, ostersonntag, 2);
      return [
        {
          q: `Wann ist Ostern ${o.y}?`,
          a: `Ostersonntag ${o.y} ist der ${datumLang(o)}, Ostermontag der ${datumLang(plusTage(o, 1))}. Karfreitag fällt auf den ${datumLang(plusTage(o, -2))}.`,
        },
      ];
    },
    related: ["/karfreitag", "/ostermontag", "/christi-himmelfahrt", "/pfingsten", "/aschermittwoch", "/ferien/osterferien", "/fruehlingsanfang"],
  },
  {
    slug: "ostermontag",
    pfad: "/ostermontag",
    title: "Ostermontag",
    question: "Wann ist Ostermontag?",
    category: "feiertage",
    art: "tag",
    ...jaehrlich(ostermontag),
    bis: "bis Ostermontag",
    heute: "Heute ist Ostermontag.",
    motif: "ei",
    gesetzlich: "bundesweit",
    source: BMI,
    intro: `Ostermontag ist der Tag nach dem Ostersonntag und in ganz Deutschland ein gesetzlicher Feiertag. Er ist der zweite Feiertag des Osterfestes, so wie der 26. Dezember der zweite Weihnachtstag ist. Inhaltlich gehört er zu [Ostern](/ostern), rechtlich ist er der wichtigere der beiden Tage, denn nur er ist überall gesetzlich geschützt.

Weil er am Osterdatum hängt, wandert er mit. Ostermontag fällt frühestens auf den 23. März und spätestens auf den 26. April. Ein Montag ist er immer. Er kann also nie auf ein Wochenende fallen und geht dir, anders als der 1. Mai oder Weihnachten, nie verloren.

Mit [Karfreitag](/karfreitag) davor ergibt das vier freie Tage. Am Dienstag geht der Alltag weiter, außer es sind noch [Osterferien](/ferien/osterferien). Der nächste bundesweite Feiertag ist danach fast immer der [1. Mai](/tag-der-arbeit).`,
    facts: [
      "Ostermontag ist der Tag nach dem Ostersonntag und fällt immer auf einen Montag zwischen dem 23. März und dem 26. April.",
      "Ostermontag ist in allen 16 Bundesländern gesetzlicher Feiertag.",
      "In der DDR wurde der Ostermontag 1967 mit der Einführung der Fünf-Tage-Woche als Feiertag gestrichen und 1990 wieder eingeführt.",
      "Der erste deutsche Ostermarsch der Friedensbewegung führte 1960 zum Raketenübungsplatz Bergen-Hohne in der Lüneburger Heide.",
      "Das Evangelium des Tages erzählt von zwei Jüngern auf dem Weg nach Emmaus. Daher kommt der Brauch des Emmausgangs, eines Spaziergangs am Ostermontag.",
    ],
    faq: [
      {
        q: "Ist Ostermontag ein gesetzlicher Feiertag?",
        a: "Ja, bundesweit. Geschäfte sind geschlossen, die meisten Beschäftigten haben frei. Wer arbeiten muss, etwa in Pflege, Gastronomie oder Verkehr, bekommt einen Ersatzruhetag und je nach Vertrag einen Zuschlag.",
      },
      {
        q: "Warum gibt es einen Ostermontag?",
        a: "Hohe kirchliche Feste wurden früher über mehrere Tage gefeiert, Ostern zeitweise eine ganze Woche lang. Davon ist der zweite Feiertag geblieben. Genauso ist es bei Weihnachten und Pfingsten.",
      },
      {
        q: "Was ist der Unterschied zwischen Ostersonntag und Ostermontag?",
        a: "Ostersonntag ist der eigentliche Festtag der Auferstehung, Ostermontag der zweite Feiertag danach. Gesetzlicher Feiertag in allen Bundesländern ist nur der Montag. Der Sonntag ist es ausdrücklich nur in Brandenburg.",
      },
      {
        q: "Ist Ostermontag auch in anderen Ländern frei?",
        a: "In Österreich, Frankreich, Italien, den Niederlanden und den meisten Schweizer Kantonen ja. In den USA und in Portugal ist der Ostermontag dagegen ein normaler Arbeitstag.",
      },
    ],
    faqDynamisch: (now) => {
      const o = naechstes(now, ostermontag);
      return [
        {
          q: `Wann ist Ostermontag ${o.y}?`,
          a: `Ostermontag ${o.y} ist am ${datumLang(o)}. Im Jahr darauf fällt er auf den ${datumLang(ostermontag(o.y + 1))}.`,
        },
      ];
    },
    related: ["/ostern", "/karfreitag", "/tag-der-arbeit", "/christi-himmelfahrt", "/pfingstmontag", "/ferien/osterferien", "/wochenende"],
  },
  {
    slug: "tag-der-arbeit",
    pfad: "/tag-der-arbeit",
    title: "Tag der Arbeit",
    nominativ: "Der Tag der Arbeit",
    question: "Wie lange noch bis zum 1. Mai?",
    category: "feiertage",
    art: "tag",
    ...fest(5, 1),
    bis: "bis zum 1. Mai",
    heute: "Heute ist der 1. Mai, Tag der Arbeit.",
    motif: "maibaum",
    gesetzlich: "bundesweit",
    source: BMI,
    intro: `Der 1. Mai ist der Tag der Arbeit, und gefeiert wird er passenderweise, indem kaum jemand arbeitet. Er ist in allen 16 Bundesländern gesetzlicher Feiertag. Die Gewerkschaften rufen zu Kundgebungen auf, der Rest des Landes stellt Maibäume auf oder zieht ins Grüne.

Entstanden ist der Tag als Kampftag der Arbeiterbewegung. 1889 beschloss ein internationaler Arbeiterkongress in Paris, am 1. Mai 1890 überall für den Achtstundentag zu demonstrieren. Dauerhaft gesetzlicher Feiertag wurde er in Deutschland erst 1933, ausgerechnet durch die Nationalsozialisten, die einen Tag später die Gewerkschaften zerschlugen.

Das Datum ist fest, der Wochentag nicht. Fällt der 1. Mai auf einen Samstag oder Sonntag, hast du Pech, einen Ersatztag gibt es in Deutschland nicht. Die nächsten freien Tage im Frühjahr sind in aller Regel [Christi Himmelfahrt](/christi-himmelfahrt) und [Pfingstmontag](/pfingstmontag).`,
    facts: [
      "Der 1. Mai ist in allen 16 Bundesländern gesetzlicher Feiertag.",
      "Den Anstoß gab 1889 ein internationaler Arbeiterkongress in Paris. Am 1. Mai 1890 wurde erstmals in vielen Ländern gleichzeitig demonstriert.",
      "In der Weimarer Republik war der 1. Mai nur ein einziges Mal reichsweit gesetzlicher Feiertag, im Jahr 1919.",
      "1933 machten die Nationalsozialisten den 1. Mai zum gesetzlichen Feiertag. Am 2. Mai 1933 ließen sie die Gewerkschaftshäuser besetzen.",
      "Fällt der 1. Mai auf ein Wochenende, gibt es in Deutschland keinen Ersatzfeiertag.",
    ],
    faq: [
      {
        q: "Ist der 1. Mai ein gesetzlicher Feiertag?",
        a: "Ja, in ganz Deutschland. Geschäfte sind geschlossen, die meisten Beschäftigten haben frei. In den Feiertagsgesetzen heißt er nicht überall gleich. In Nordrhein-Westfalen etwa ist er der „Tag des Bekenntnisses zu Freiheit und Frieden, sozialer Gerechtigkeit, Völkerversöhnung und Menschenwürde“.",
      },
      {
        q: "Warum ist der 1. Mai Tag der Arbeit?",
        a: "Am 1. Mai 1886 begann in den USA ein großer Streik für den Achtstundentag. Daran knüpfte 1889 ein Arbeiterkongress in Paris an und rief für den 1. Mai 1890 zu Kundgebungen in allen Ländern auf. Seitdem ist das Datum der internationale Tag der Arbeiterbewegung.",
      },
      {
        q: "Bekomme ich einen freien Tag, wenn der 1. Mai auf einen Sonntag fällt?",
        a: "Nein. In Deutschland verfallen Feiertage, die auf ein Wochenende fallen. Einen Ersatztag am Montag, wie ihn etwa Großbritannien kennt, gibt es hier nicht.",
      },
      {
        q: "Was ist der Tanz in den Mai?",
        a: "Ein Fest am Abend des 30. April, bei dem in den 1. Mai hineingefeiert wird. Die Nacht heißt auch Walpurgisnacht. In vielen Orten wird am selben Abend oder am Morgen des 1. Mai der Maibaum aufgestellt.",
      },
    ],
    faqDynamisch: (now) => {
      const m = naechstes(now, festerTag(5, 1));
      const folgen = [
        "Der Feiertag fällt damit auf das Wochenende, einen Ersatztag gibt es nicht.",
        "Das ergibt ein langes Wochenende ohne Urlaubstag.",
        "Mit einem Urlaubstag am Montag davor werden daraus vier freie Tage.",
        "Er liegt damit mitten in der Woche, ohne Brückentag.",
        "Mit einem Urlaubstag am Freitag danach werden daraus vier freie Tage.",
        "Das ergibt ein langes Wochenende ohne Urlaubstag.",
        "Der Feiertag fällt damit auf das Wochenende, einen Ersatztag gibt es nicht.",
      ];
      return [
        {
          q: `Auf welchen Wochentag fällt der 1. Mai ${m.y}?`,
          a: `Der 1. Mai ${m.y} ist ein ${wochentagName(m)}. ${folgen[wochentag(m)]}`,
        },
      ];
    },
    related: ["/christi-himmelfahrt", "/vatertag", "/muttertag", "/pfingsten", "/pfingstmontag", "/ostermontag", "/wochenende"],
  },
  {
    slug: "muttertag",
    pfad: "/muttertag",
    title: "Muttertag",
    nominativ: "Der Muttertag",
    question: "Wann ist Muttertag?",
    category: "feiertage",
    art: "tag",
    ...jaehrlich(muttertag),
    bis: "bis zum Muttertag",
    heute: "Heute ist Muttertag.",
    motif: "blume",
    gesetzlich: false,
    intro: `Muttertag ist in Deutschland immer am zweiten Sonntag im Mai. Damit liegt er jedes Jahr zwischen dem 8. und dem 14. Mai. Das Datum musst du dir nicht merken, dafür gibt es diese Seite. Den Anruf musst du allerdings selbst erledigen.

Die Idee stammt aus den USA. Anna Jarvis organisierte 1908 in Grafton in West Virginia einen Gedenkgottesdienst für ihre Mutter, sechs Jahre später war der Tag dort offiziell. In Deutschland wurde der Muttertag 1923 eingeführt, und zwar vom Verband Deutscher Blumengeschäftsinhaber. Dass seitdem Blumen verschenkt werden, ist also kein Zufall.

Ein gesetzlicher Feiertag ist der Muttertag nicht, er fällt aber ohnehin auf einen Sonntag. Im selben Monat liegt meist der [Vatertag an Christi Himmelfahrt](/vatertag), oft auch [Pfingsten](/pfingsten). Der [Internationale Frauentag](/frauentag) am 8. März ist ein anderer Termin mit anderer Geschichte.`,
    facts: [
      "Muttertag ist in Deutschland am zweiten Sonntag im Mai und fällt damit immer auf den 8. bis 14. Mai.",
      "Den ersten Muttertag in Deutschland gab es am 13. Mai 1923, angestoßen vom Verband Deutscher Blumengeschäftsinhaber.",
      "In den USA erklärte Präsident Woodrow Wilson den zweiten Sonntag im Mai 1914 zum nationalen Ehrentag der Mütter.",
      "Anna Jarvis, die Begründerin des Muttertags, wehrte sich später selbst gegen dessen Kommerzialisierung.",
      "Muttertag und Pfingstsonntag können auf denselben Tag fallen. Das war zuletzt 2008 so und passiert 2035 wieder.",
    ],
    faq: [
      {
        q: "Ist Muttertag immer am zweiten Sonntag im Mai?",
        a: "In Deutschland ja, ebenso in Österreich, der Schweiz und den USA. Der früheste Termin ist der 8. Mai, der späteste der 14. Mai.",
      },
      {
        q: "Ist Muttertag ein Feiertag?",
        a: "Nein, der Muttertag ist kein gesetzlicher Feiertag. Weil er immer auf einen Sonntag fällt, haben die meisten trotzdem frei. Blumenläden dürfen an diesem Sonntag in vielen Bundesländern für einige Stunden öffnen.",
      },
      {
        q: "Wer hat den Muttertag erfunden?",
        a: "Die Amerikanerin Anna Jarvis. Sie wollte an ihre verstorbene Mutter erinnern und organisierte 1908 den ersten Muttertagsgottesdienst in Grafton, West Virginia. 1914 wurde der Tag in den USA offiziell. Nach Deutschland brachten ihn 1923 die Blumenhändler.",
      },
      {
        q: "Wann ist Muttertag in anderen Ländern?",
        a: "Viele Länder feiern wie Deutschland am zweiten Sonntag im Mai. Großbritannien begeht den „Mothering Sunday“ schon am vierten Fastensonntag, drei Wochen vor Ostern. In Frankreich ist Muttertag am letzten Sonntag im Mai oder, wenn dann Pfingsten ist, am ersten Sonntag im Juni.",
      },
    ],
    faqDynamisch: (now) => {
      const m = naechstes(now, muttertag);
      return [
        {
          q: `Wann ist Muttertag ${m.y}?`,
          a: `Der Muttertag ${m.y} ist am ${datumMitWochentag(m)}. Der Vatertag ${m.y} fällt auf den ${datumLang(vatertag(m.y))}.`,
        },
      ];
    },
    related: ["/vatertag", "/christi-himmelfahrt", "/pfingsten", "/tag-der-arbeit", "/valentinstag", "/frauentag", "/pfingstmontag"],
  },
  {
    slug: "christi-himmelfahrt",
    pfad: "/christi-himmelfahrt",
    title: "Christi Himmelfahrt",
    question: "Wann ist Christi Himmelfahrt?",
    category: "feiertage",
    art: "tag",
    ...jaehrlich(christiHimmelfahrt),
    bis: "bis Christi Himmelfahrt",
    heute: "Heute ist Christi Himmelfahrt.",
    motif: "wolke",
    gesetzlich: "bundesweit",
    source: BMI,
    intro: `Christi Himmelfahrt ist immer ein Donnerstag, und zwar der 39. Tag nach dem Ostersonntag. Nach der Bibel kehrte Jesus 40 Tage nach seiner Auferstehung zu Gott zurück, der Ostersonntag wird dabei mitgezählt. Der Tag ist in ganz Deutschland gesetzlicher Feiertag.

Weil das Datum an [Ostern](/ostern) hängt, wandert es zwischen dem 30. April und dem 3. Juni. Zehn Tage später ist [Pfingsten](/pfingsten). Für die Urlaubsplanung zählt vor allem der Freitag danach. Wer diesen einen Brückentag nimmt, hat vier Tage am Stück frei.

Viele kennen den Tag unter einem anderen Namen. In Deutschland ist Himmelfahrt zugleich [Vatertag](/vatertag), im Osten sagt man Herrentag oder Männertag. Mit der kirchlichen Bedeutung hat der Bollerwagen wenig zu tun, mit dem freien Donnerstag im Mai dafür umso mehr.`,
    facts: [
      "Christi Himmelfahrt liegt 39 Tage nach dem Ostersonntag und fällt immer auf einen Donnerstag zwischen dem 30. April und dem 3. Juni.",
      "Der Tag ist in allen 16 Bundesländern gesetzlicher Feiertag. Reichsweit einheitlich geregelt wurde das erstmals 1934.",
      "In der DDR wurde der Feiertag 1967 gestrichen und 1990 wieder eingeführt.",
      "2008 fiel Christi Himmelfahrt auf den 1. Mai. Das passiert erst im Jahr 2160 wieder.",
      "Pfingstsonntag ist immer genau zehn Tage nach Christi Himmelfahrt.",
    ],
    faq: [
      {
        q: "Ist Christi Himmelfahrt ein gesetzlicher Feiertag?",
        a: "Ja, in allen Bundesländern. Der Freitag danach ist ein normaler Arbeitstag, an vielen Schulen ist er trotzdem unterrichtsfrei.",
      },
      {
        q: "Warum ist Christi Himmelfahrt immer an einem Donnerstag?",
        a: "Weil der Tag vom Ostersonntag aus gezählt wird. Die Apostelgeschichte nennt 40 Tage zwischen Auferstehung und Himmelfahrt. Zählt man den Ostersonntag als ersten Tag, landet man immer bei einem Donnerstag.",
      },
      {
        q: "Was wird an Christi Himmelfahrt gefeiert?",
        a: "Christen feiern, dass Jesus nach seiner Auferstehung in den Himmel aufgenommen wurde. Die Erzählung steht im Lukasevangelium und in der Apostelgeschichte. Als eigenes Fest ist Himmelfahrt seit dem 4. Jahrhundert belegt.",
      },
      {
        q: "Ist der Freitag nach Himmelfahrt frei?",
        a: "Nicht automatisch. Der Brückentag ist ein normaler Werktag, für den du Urlaub oder Überstundenausgleich brauchst. Manche Betriebe legen an diesem Tag Betriebsferien fest.",
      },
    ],
    faqDynamisch: (now) => {
      const h = naechstes(now, christiHimmelfahrt);
      return [
        {
          q: `Wann ist Christi Himmelfahrt ${h.y}?`,
          a: `Christi Himmelfahrt ${h.y} ist am ${datumMitWochentag(h)}. Der Brückentag ist Freitag, der ${datumLang(plusTage(h, 1))}.`,
        },
      ];
    },
    related: ["/vatertag", "/pfingsten", "/pfingstmontag", "/ostern", "/tag-der-arbeit", "/muttertag", "/fronleichnam"],
  },
  {
    slug: "vatertag",
    pfad: "/vatertag",
    title: "Vatertag",
    nominativ: "Der Vatertag",
    question: "Wann ist Vatertag?",
    category: "feiertage",
    art: "tag",
    ...jaehrlich(vatertag),
    bis: "bis zum Vatertag",
    heute: "Heute ist Vatertag.",
    motif: "bollerwagen",
    gesetzlich: "bundesweit",
    source: BMI,
    intro: `Vatertag ist in Deutschland an [Christi Himmelfahrt](/christi-himmelfahrt), also immer an einem Donnerstag im Mai oder Anfang Juni. Einen eigenen Feiertag hat der Vater damit nicht bekommen, er leiht sich einen kirchlichen. Frei ist trotzdem überall, denn Himmelfahrt ist bundesweit gesetzlicher Feiertag.

Der Brauch ist bekannt. Ein Bollerwagen, ein Kasten Bier, eine Gruppe Männer und ein Ziel, das unterwegs an Bedeutung verliert. Entstanden sind diese Herrenpartien Ende des 19. Jahrhunderts rund um Berlin. Im Osten heißt der Tag bis heute Herrentag oder Männertag.

Das Datum wandert mit Ostern und liegt frühestens am 30. April, spätestens am 3. Juni. Der [Muttertag](/muttertag) hat dagegen einen festen Platz am zweiten Sonntag im Mai. Wer den Freitag als Brückentag nimmt, kann bis zum [Wochenende](/wochenende) ausschlafen.`,
    facts: [
      "Vatertag fällt in Deutschland immer auf Christi Himmelfahrt, 39 Tage nach dem Ostersonntag.",
      "Die Herrenpartien mit Kutsche oder Handwagen kamen Ende des 19. Jahrhunderts in und um Berlin auf.",
      "Im Osten Deutschlands heißt der Tag Herrentag oder Männertag.",
      "In Österreich ist Vatertag am zweiten Sonntag im Juni, in den USA am dritten. Dort ist das Datum seit 1972 gesetzlich festgelegt.",
      "Der früheste mögliche Vatertag ist der 30. April, der späteste der 3. Juni.",
    ],
    faq: [
      {
        q: "Ist Vatertag ein Feiertag?",
        a: "Der Vatertag selbst steht in keinem Feiertagsgesetz. Er fällt aber immer auf Christi Himmelfahrt, und dieser Tag ist in ganz Deutschland arbeitsfrei. Praktisch hast du am Vatertag also frei.",
      },
      {
        q: "Warum ist Vatertag an Christi Himmelfahrt?",
        a: "Ein einzelner Ursprung ist nicht belegt. Himmelfahrt war schon lange ein Tag für Flurumgänge und Ausflüge ins Grüne. Ende des 19. Jahrhunderts wurden daraus in Berlin und Umgebung die Herrenpartien, bei denen Männer mit Wagen und Getränken aufs Land zogen.",
      },
      {
        q: "Warum heißt der Vatertag auch Herrentag?",
        a: "Herrentag und Männertag sind die in Ostdeutschland üblichen Namen. Sie beschreiben den Brauch genauer, denn bei der Tour laufen auch Männer ohne Kinder mit. Gemeint ist derselbe Tag.",
      },
      {
        q: "Wann ist Vatertag in anderen Ländern?",
        a: "In Österreich am zweiten Sonntag im Juni, in den USA und vielen weiteren Ländern am dritten Sonntag im Juni. Italien, Spanien und Portugal feiern am 19. März, dem Josefstag. Der Termin an Himmelfahrt ist eine deutsche Besonderheit.",
      },
    ],
    faqDynamisch: (now) => {
      const v = naechstes(now, vatertag);
      return [
        {
          q: `Wann ist Vatertag ${v.y}?`,
          a: `Der Vatertag ${v.y} ist am ${datumMitWochentag(v)}, zusammen mit Christi Himmelfahrt. Der Muttertag ${v.y} fällt auf den ${datumLang(muttertag(v.y))}.`,
        },
      ];
    },
    related: ["/christi-himmelfahrt", "/muttertag", "/pfingsten", "/tag-der-arbeit", "/pfingstmontag", "/wochenende", "/fronleichnam"],
  },
  {
    slug: "pfingsten",
    pfad: "/pfingsten",
    title: "Pfingsten",
    question: "Wie lange noch bis Pfingsten?",
    category: "feiertage",
    art: "tag",
    ...jaehrlich(pfingstsonntag, 2),
    bis: "bis Pfingsten",
    heute: "Heute ist Pfingsten.",
    motif: "flamme",
    gesetzlich: false,
    intro: `Pfingsten ist 49 Tage nach dem Ostersonntag, am fünfzigsten Tag der Osterzeit. Daher auch der Name, er kommt vom griechischen „pentekoste“, der Fünfzigste. Gefeiert wird nach der Apostelgeschichte die Aussendung des Heiligen Geistes. Das Fest gilt als Geburtstag der Kirche.

Im Kalender sind das Pfingstsonntag und [Pfingstmontag](/pfingstmontag). Der Sonntag fällt frühestens auf den 10. Mai und spätestens auf den 13. Juni, je nachdem, wann [Ostern](/ostern) war. Gesetzlicher Feiertag in allen Bundesländern ist nur der Montag. Den Pfingstsonntag führt allein Brandenburg ausdrücklich im Gesetz, frei ist sonntags ohnehin.

Für die meisten ist Pfingsten vor allem ein langes Wochenende im Frühsommer, zehn Tage nach [Christi Himmelfahrt](/christi-himmelfahrt). In Bayern und Baden-Württemberg hängen zwei Wochen [Pfingstferien](/ferien/pfingstferien) daran, in den meisten anderen Ländern höchstens einzelne freie Schultage.`,
    facts: [
      "Pfingstsonntag liegt 49 Tage nach dem Ostersonntag und fällt immer auf ein Datum zwischen dem 10. Mai und dem 13. Juni.",
      "Der Name kommt vom griechischen „pentekoste hemera“, der fünfzigste Tag.",
      "Pfingstmontag ist in allen 16 Bundesländern gesetzlicher Feiertag, Pfingstsonntag ausdrücklich nur in Brandenburg.",
      "Die liturgische Farbe an Pfingsten ist Rot. Sie steht für die Feuerzungen, von denen die Apostelgeschichte erzählt.",
      "Mit dem Pfingstsonntag endet in den Kirchen die Osterzeit.",
    ],
    faq: [
      {
        q: "Ist Pfingstsonntag ein gesetzlicher Feiertag?",
        a: "Nur in Brandenburg, dort steht er ausdrücklich im Feiertagsgesetz. In allen anderen Ländern ist er ein normaler Sonntag und damit ebenfalls arbeitsfrei. Bundesweit gesetzlicher Feiertag ist der Pfingstmontag.",
      },
      {
        q: "Was wird an Pfingsten gefeiert?",
        a: "Nach der Apostelgeschichte kam 50 Tage nach Ostern der Heilige Geist auf die Jünger herab, und sie begannen, in fremden Sprachen zu predigen. Die Kirchen sehen darin ihren Anfang. Deshalb heißt Pfingsten auch Geburtstag der Kirche.",
      },
      {
        q: "Warum ist Pfingsten jedes Jahr an einem anderen Datum?",
        a: "Weil es am Osterdatum hängt. Pfingstsonntag ist immer genau sieben Wochen nach Ostersonntag. Ist Ostern früh, liegt Pfingsten Mitte Mai, ist Ostern spät, rutscht es in den Juni.",
      },
      {
        q: "Wie viele Tage liegen zwischen Ostern und Pfingsten?",
        a: "Von Ostersonntag bis Pfingstsonntag sind es 49 Tage, also genau sieben Wochen. Zählt man den Ostersonntag mit, ist Pfingsten der fünfzigste Tag. Christi Himmelfahrt liegt zehn Tage vor dem Pfingstsonntag.",
      },
    ],
    faqDynamisch: (now) => {
      const p = naechstes(now, pfingstsonntag, 2);
      return [
        {
          q: `Wann ist Pfingsten ${p.y}?`,
          a: `Pfingstsonntag ${p.y} ist der ${datumLang(p)}, Pfingstmontag der ${datumLang(plusTage(p, 1))}. Das sind sieben Wochen nach Ostersonntag, dem ${datumLang(ostersonntag(p.y))}.`,
        },
      ];
    },
    related: ["/pfingstmontag", "/christi-himmelfahrt", "/fronleichnam", "/ostern", "/muttertag", "/ferien/pfingstferien", "/sommeranfang"],
  },
  {
    slug: "pfingstmontag",
    pfad: "/pfingstmontag",
    title: "Pfingstmontag",
    question: "Wann ist Pfingstmontag?",
    category: "feiertage",
    art: "tag",
    ...jaehrlich(pfingstmontag),
    bis: "bis Pfingstmontag",
    heute: "Heute ist Pfingstmontag.",
    motif: "flamme",
    gesetzlich: "bundesweit",
    source: BMI,
    intro: `Pfingstmontag ist der Tag nach Pfingstsonntag und der 50. Tag nach dem Ostersonntag. Er ist in allen 16 Bundesländern gesetzlicher Feiertag und damit der Teil von [Pfingsten](/pfingsten), der dir tatsächlich einen freien Tag bringt.

Das Datum liegt frühestens am 11. Mai und spätestens am 14. Juni. Ein Montag ist es immer, der Feiertag kann also nicht auf ein Wochenende fallen. Elf Tage nach [Christi Himmelfahrt](/christi-himmelfahrt) ist es das zweite lange Wochenende in kurzer Folge.

Danach wird es dünn mit freien Tagen. In sechs Bundesländern folgt zehn Tage später noch [Fronleichnam](/fronleichnam). Für die meisten anderen ist Pfingstmontag der letzte gesetzliche Feiertag bis zum [Tag der Deutschen Einheit](/tag-der-deutschen-einheit) im Oktober. Dazwischen liegen ungefähr vier Monate, in denen du dir freie Tage selbst nehmen musst.`,
    facts: [
      "Pfingstmontag liegt 50 Tage nach dem Ostersonntag und fällt immer auf einen Montag zwischen dem 11. Mai und dem 14. Juni.",
      "Pfingstmontag ist in allen 16 Bundesländern gesetzlicher Feiertag.",
      "Seit 1994 ist am Pfingstmontag Deutscher Mühlentag. Dann öffnen im ganzen Land historische Wind- und Wassermühlen für Besucher.",
      "Fronleichnam ist immer genau zehn Tage nach Pfingstmontag.",
    ],
    faq: [
      {
        q: "Ist Pfingstmontag ein gesetzlicher Feiertag?",
        a: "Ja, in ganz Deutschland. Geschäfte bleiben geschlossen, Busse und Bahnen fahren meist nach Sonntagsfahrplan.",
      },
      {
        q: "Warum ist Pfingstmontag ein Feiertag?",
        a: "Pfingsten gehört mit Weihnachten und Ostern zu den drei Hauptfesten des Kirchenjahres, und alle drei haben in Deutschland einen zweiten Feiertag. Früher wurde an solchen Festen mehrere Tage lang gefeiert. Der Montag ist davon geblieben.",
      },
      {
        q: "Ist Pfingstmontag auch in anderen Ländern frei?",
        a: "In Österreich, den Niederlanden, Belgien, Dänemark und den meisten Schweizer Kantonen ja. In Italien ist er nur in Südtirol frei, in Großbritannien und den USA ist er ein normaler Arbeitstag.",
      },
      {
        q: "Haben Schulen am Dienstag nach Pfingsten frei?",
        a: "Das hängt vom Bundesland ab. Einige Länder haben den Pfingstdienstag als Ferientag festgelegt, Bayern und Baden-Württemberg haben ohnehin zwei Wochen Pfingstferien. Ein gesetzlicher Feiertag ist der Dienstag nirgends.",
      },
    ],
    faqDynamisch: (now) => {
      const p = naechstes(now, pfingstmontag);
      return [
        {
          q: `Wann ist Pfingstmontag ${p.y}?`,
          a: `Pfingstmontag ${p.y} ist am ${datumLang(p)}. Im Jahr darauf fällt er auf den ${datumLang(pfingstmontag(p.y + 1))}.`,
        },
      ];
    },
    related: ["/pfingsten", "/christi-himmelfahrt", "/fronleichnam", "/ostermontag", "/tag-der-deutschen-einheit", "/ferien/pfingstferien", "/sommeranfang"],
  },
  {
    slug: "fronleichnam",
    pfad: "/fronleichnam",
    title: "Fronleichnam",
    question: "Wann ist Fronleichnam?",
    category: "feiertage",
    art: "tag",
    ...jaehrlich(fronleichnam),
    bis: "bis Fronleichnam",
    heute: "Heute ist Fronleichnam.",
    motif: "monstranz",
    gesetzlich: ["BW", "BY", "HE", "NW", "RP", "SL"],
    intro: `Fronleichnam ist ein katholisches Hochfest und immer ein Donnerstag, 60 Tage nach dem Ostersonntag. Der Name klingt düsterer, als er gemeint ist. Er kommt vom mittelhochdeutschen „vrône lîcham“ und heißt „Leib des Herrn“. Gefeiert wird die Gegenwart Christi in der Eucharistie, meist mit einer Prozession durch den Ort.

Das Datum liegt zwischen dem 21. Mai und dem 24. Juni, zehn Tage nach [Pfingstmontag](/pfingstmontag). Gesetzlicher Feiertag ist Fronleichnam in Baden-Württemberg, Bayern, Hessen, Nordrhein-Westfalen, Rheinland-Pfalz und im Saarland. Dazu kommen einzelne katholisch geprägte Gemeinden in Sachsen und Thüringen.

Im Norden und Osten ist der Tag ein gewöhnlicher Donnerstag. Wer dort wohnt und in Hessen arbeitet, hat trotzdem frei, denn es zählt der Arbeitsort. Was bei dir gilt, zeigt die [Übersicht der Feiertage nach Bundesland](/feiertage). Wo frei ist, lockt der Freitag als Brückentag bis zum [Wochenende](/wochenende).`,
    facts: [
      "Fronleichnam liegt 60 Tage nach dem Ostersonntag und fällt immer auf einen Donnerstag zwischen dem 21. Mai und dem 24. Juni.",
      "Gesetzlicher Feiertag ist Fronleichnam in Baden-Württemberg, Bayern, Hessen, Nordrhein-Westfalen, Rheinland-Pfalz und im Saarland.",
      "In Sachsen gilt der Feiertag nur in einigen katholisch geprägten Gemeinden im Landkreis Bautzen, in Thüringen im Landkreis Eichsfeld und in einzelnen weiteren Gemeinden.",
      "Das Fest wurde 1246 im Bistum Lüttich eingeführt. Papst Urban IV. dehnte es 1264 auf die ganze Kirche aus.",
      "Der Name bedeutet „Leib des Herrn“ und hat mit einem Leichnam im heutigen Wortsinn nichts zu tun.",
    ],
    faq: [
      {
        q: "Ist Fronleichnam in Sachsen und Thüringen ein Feiertag?",
        a: "Nur in Teilen. In Sachsen gilt Fronleichnam in einigen katholisch geprägten Gemeinden im Landkreis Bautzen, in Thüringen im Landkreis Eichsfeld und in einzelnen Gemeinden des Unstrut-Hainich- und des Wartburgkreises. Im Rest beider Länder ist es ein normaler Werktag.",
      },
      {
        q: "Was bedeutet das Wort Fronleichnam?",
        a: "Es setzt sich aus den mittelhochdeutschen Wörtern „vrôn“ (zum Herrn gehörig) und „lîcham“ (Leib) zusammen. Fronleichnam heißt also „Leib des Herrn“. Kirchlich heißt der Tag „Hochfest des Leibes und Blutes Christi“.",
      },
      {
        q: "Warum ist Fronleichnam immer an einem Donnerstag?",
        a: "Das Fest bezieht sich auf das letzte Abendmahl am Gründonnerstag. Weil die Karwoche für ein fröhliches Fest nicht passt, liegt es am zweiten Donnerstag nach Pfingsten. Das ist immer der 60. Tag nach dem Ostersonntag.",
      },
      {
        q: "Was passiert bei einer Fronleichnamsprozession?",
        a: "Nach dem Gottesdienst zieht die Gemeinde mit der Monstranz durch die Straßen. In diesem Schaugefäß wird eine geweihte Hostie unter einem Tragehimmel mitgeführt. Unterwegs wird an mehreren geschmückten Altären angehalten, vielerorts liegen Blumenteppiche auf dem Weg.",
      },
    ],
    faqDynamisch: (now) => {
      const f = naechstes(now, fronleichnam);
      return [
        {
          q: `Wann ist Fronleichnam ${f.y}?`,
          a: `Fronleichnam ${f.y} ist am ${datumMitWochentag(f)}. Das sind zehn Tage nach Pfingstmontag, dem ${datumLang(plusTage(f, -10))}.`,
        },
      ];
    },
    related: ["/pfingstmontag", "/pfingsten", "/christi-himmelfahrt", "/mariae-himmelfahrt", "/allerheiligen", "/sommeranfang", "/ferien/pfingstferien"],
  },
];
