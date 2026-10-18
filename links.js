// GRANDPA'S BUTTONS
//
// One line = one button, shown in this order on the page.
//   Remove a button: delete its line.
//   Add a button: copy a line and change the text. Keep the comma at the end.
//
//   name        = big text on the button (Swedish)
//   description = small text underneath, can be empty: ""
//   icon        = a name from icons.js, e.g. "bank", "tv", "weather" (an emoji also works)
//   color       = blue, red, green, purple, orange, teal, brown or gray
//   url         = the web address, must start with https://

const LINKS = [
  { name: "Vädret",    description: "Möcklö, Senoren",   icon: "weather",  color: "teal",   url: "https://www.smhi.se/vader/prognoser-och-varningar/vaderprognos/q/M%C3%B6ckl%C3%B6/Karlskrona/2691584" },
  { name: "Nyheter",   description: "SVT Nyheter",       icon: "news",     color: "orange", url: "https://www.svt.se/" },
  { name: "E-post",    description: "Gmail",             icon: "email",    color: "red",    url: "https://mail.google.com/" },
  { name: "Facebook",  description: "Familj och vänner", icon: "facebook", color: "blue",   url: "https://www.facebook.com/" },
  { name: "Kivra",     description: "Digital post",      icon: "mailbox",  color: "green",  url: "https://inbox.kivra.com/" },
  { name: "Banken",    description: "Länsförsäkringar",  icon: "bank",     color: "blue",   url: "https://secure246.lansforsakringer.se/nim" },
  { name: "Vården",    description: "1177",              icon: "health",   color: "purple", url: "https://www.1177.se/" },
  { name: "Mobilen",   description: "Mitt Vimla",        icon: "phone",    color: "gray",   url: "https://mitt.vimla.se/mitt-vimla" },
  { name: "Hembygden", description: "Östra Blekinge",    icon: "home",     color: "brown",  url: "https://hembygd.se/ostra-blekinge" },
];
