// ARNES KNAPPAR
//
// En rad = en knapp. Knapparna visas i samma ordning som här.
//   Ta bort en knapp: radera hela raden.
//   Lägg till en knapp: kopiera en rad och ändra texten.
//   Glöm inte kommatecknet i slutet av varje rad.
//
//   namn        = stor text på knappen
//   beskrivning = liten text under (kan vara tom: "")
//   ikon        = en emoji
//   farg        = bla, rod, gron, lila, orange, turkos, brun eller gra
//   adress      = webbadressen, måste börja med https://

const LANKAR = [
  { namn: "Nyheter",     beskrivning: "SVT Nyheter",         ikon: "📰", farg: "bla",    adress: "https://www.svt.se/" },
  { namn: "Titta på TV", beskrivning: "SVT Play",            ikon: "📺", farg: "rod",    adress: "https://www.svtplay.se/" },
  { namn: "Vädret",      beskrivning: "SMHI",                ikon: "🌤️", farg: "turkos", adress: "https://www.smhi.se/" },
  { namn: "Radio",       beskrivning: "Sveriges Radio",      ikon: "📻", farg: "orange", adress: "https://sverigesradio.se/" },
  { namn: "Vården",      beskrivning: "1177",                ikon: "🏥", farg: "gron",   adress: "https://www.1177.se/" },
  { namn: "E-post",      beskrivning: "Läs och skicka brev", ikon: "✉️", farg: "lila",   adress: "https://mail.google.com/" },
  { namn: "YouTube",     beskrivning: "Filmklipp",           ikon: "▶️", farg: "rod",    adress: "https://www.youtube.com/" },
  { namn: "Facebook",    beskrivning: "Familj och vänner",   ikon: "👥", farg: "bla",    adress: "https://www.facebook.com/" },
];
