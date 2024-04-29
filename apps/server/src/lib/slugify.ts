export const titleToSlug = (title: string) => {
  let Slug: string;
  Slug = title.toLowerCase();
  Slug = Slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, "");
  Slug = Slug.replace(/ /gi, "-");
  Slug = Slug.replace(/\-\-\-\-\-/gi, "-");
  Slug = Slug.replace(/\-\-\-\-/gi, "-");
  Slug = Slug.replace(/\-\-\-/gi, "-");
  Slug = Slug.replace(/\-\-/gi, "-");
  Slug = "@" + Slug + "@";
  Slug = Slug.replace(/\@\-|\-\@|\@/gi, "");
  return Slug;
};
