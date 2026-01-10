export function joinClassNames(
  ...classes: (string | number | undefined | boolean)[]
): string {
  classes = Array.from(new Set(classes));
  classes = classes.filter(Boolean);

  return classes.join(" ");
}
