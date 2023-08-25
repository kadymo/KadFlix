export default async function useFetch({ path, query }) {
  const baseURL = "https://api.themoviedb.org/3";
  const apiKey = process.env.VUE_APP_TMDB_API_KEY;

  let requestURL = baseURL + path + "?" + `api_key=${apiKey}` + "&";

  const querys = Object.entries(query);
  querys.forEach((q) => {
    requestURL += `${q[0]}=${q[1]}&`;
  });

  const resp = await fetch(requestURL);
  const respData = await resp.json();

  return respData;
}
