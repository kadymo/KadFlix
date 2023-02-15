export default async function useFetch(path, query) {
  let data;

  const baseURL = "https://api.themoviedb.org/3/";
  const apiKey = "37823c25fd81a1efa9124efeb53be3a8";

  const resp = await fetch(baseURL + path + `api_key=${apiKey}` + query);
  const respData = await resp.json();
  data = respData;
  return data;
}
