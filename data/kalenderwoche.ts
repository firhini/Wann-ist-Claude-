import type { Faq } from "@/lib/countdown";

/** Jahre mit eigener Übersichtsseite unter /kalenderwoche/<jahr>. */
export const KW_JAHRE = [2026, 2027, 2028, 2029, 2030];

export const KW_TEXT = `In Deutschland werden Kalenderwochen nach der Norm ISO 8601 gezählt. Sie hat zwei einfache Regeln: Jede Woche beginnt am Montag und endet am Sonntag. Und die erste Kalenderwoche eines Jahres ist die Woche, in der der erste Donnerstag liegt.

Aus der zweiten Regel folgt, dass der 4. Januar immer in KW 1 liegt und der 28. Dezember immer in der letzten Woche. Es folgt auch, dass die Tage um den Jahreswechsel manchmal zur „falschen“ Woche gehören: Der 1. Januar kann noch in KW 52 oder KW 53 des alten Jahres liegen, der 31. Dezember schon in KW 1 des neuen.

Die meisten Jahre haben 52 Kalenderwochen. Eine 53. Woche gibt es, wenn das Jahr an einem Donnerstag beginnt, oder wenn es ein Schaltjahr ist und an einem Mittwoch beginnt. Das passiert etwa alle fünf bis sechs Jahre.

In den USA und einigen anderen Ländern beginnt die Woche am Sonntag, und Woche 1 ist einfach die mit dem 1. Januar. Wer mit amerikanischen Kollegen Termine nach Wochennummer abstimmt, sollte deshalb lieber ein Datum dazuschreiben.`;

export const KW_FAQ: Faq[] = [
  {
    q: "Wann beginnt die Kalenderwoche: Montag oder Sonntag?",
    a: "In Deutschland und nach ISO 8601 am Montag. Der Sonntag ist der letzte Tag der Woche.",
  },
  {
    q: "Wie viele Kalenderwochen hat ein Jahr?",
    a: "52 oder 53. Ein Jahr hat 53 Kalenderwochen, wenn der 1. Januar ein Donnerstag ist, oder wenn es ein Schaltjahr ist und am Mittwoch beginnt. 2026 hat 53 Wochen, das nächste Jahr mit 53 Wochen ist 2032.",
  },
  {
    q: "Welche Woche ist die KW 1?",
    a: "Die Woche mit dem ersten Donnerstag des Jahres. Anders gesagt: die Woche, in der der 4. Januar liegt. Sie kann schon Ende Dezember beginnen.",
  },
  {
    q: "Warum liegt der 1. Januar manchmal in KW 52 oder 53?",
    a: "Weil die KW 1 mindestens vier Tage des neuen Jahres enthalten muss. Fällt der 1. Januar auf Freitag, Samstag oder Sonntag, gehört er noch zur letzten Woche des alten Jahres.",
  },
  {
    q: "Wie berechnet man die Kalenderwoche eines Datums?",
    a: "Man geht zum Donnerstag derselben Woche, zählt, der wievielte Tag des Jahres das ist, teilt durch 7 und rundet auf. Das Jahr dieses Donnerstags ist zugleich das Jahr, zu dem die Woche gehört.",
  },
];
