export function dateFilter(value) {
  return value.split("-").reverse().join("/");
}

export function genreFilter(value) {
  return value === "Thriller" ? "Suspense" : value;
}

export function voteAverageFilter(value) {
  value.toString();
  return value.length === 1 ? value + ".0" : value;
}
