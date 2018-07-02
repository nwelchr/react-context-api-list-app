export const getStore = namespace => {
  const store = localStorage.getItem(namespace);
  return (store && JSON.parse(store)) || [];
};

export const setStore = (namespace, data) => {
  localStorage.setItem(
    namespace,
    JSON.stringify(data.filter(todo => !todo.hasOwnProperty('exports')))
  );

  return getStore(namespace);
};
