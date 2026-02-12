function parseIsFavourite(value) {
  console.log(value);
  
  if (typeof value === 'undefined') return undefined;

  if (value === 'true') return true;
  if (value === 'false') return false;

  return undefined;
}

export function parseFilterParams(query) {
  const { isFavourite } = query;
  console.log("favourite: ", isFavourite);
  
  return { isFavourite: parseIsFavourite(isFavourite) };
}
