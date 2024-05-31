export const tittleToSlug = (title: string) => {
  let tittle: string;
  tittle = title.toLowerCase();
  tittle = tittle.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, "");
  tittle = tittle.replace(/ /gi, "-");
  tittle = tittle.replace(/\-\-\-\-\-/gi, "-");
  tittle = tittle.replace(/\-\-\-\-/gi, "-");
  tittle = tittle.replace(/\-\-\-/gi, "-");
  tittle = tittle.replace(/\-\-/gi, "-");
  tittle = "@" + tittle + "@";
  tittle = tittle.replace(/\@\-|\-\@|\@/gi, "");
  return tittle;
};

export const upperCase = (text: string) => {
  return text.toUpperCase();
};

export const getWordInitials = (word: string): string => {
  const bits = word.trim().split(" ");
  return bits
    .map(bit => bit.charAt(0))
    .join("")
    .toUpperCase();
};

export const slugToTitle = (slug: string) => {
  let words = slug.split("-");

  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(" ");
};

export const titleCase = (text: string) => {
  return text[0].toUpperCase() + text.substr(1).toLowerCase();
};

export const getRandomId = (chars: string, len: number) => [...Array(len)].map(i => chars[Math.floor(Math.random() * chars.length)]).join("");
