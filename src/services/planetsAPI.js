const planetsAPI = async () => {
  const url = 'https://swapi.dev/api/planets';
  const item = await fetch(url).then((response) => response.json())
    .then((data) => data.results);
  return item;
};

export default planetsAPI;
