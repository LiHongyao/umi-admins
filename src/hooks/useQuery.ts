export default function useQuery<T = any>(key?: string) {
  const search = window.location.search;
  if (search) {
    const queryString = search.slice(1);
    const queryParams: Record<string, string> = {};

    queryString.split('&').forEach((pair) => {
      const [k, v] = pair.split('=');
      queryParams[k] = v ? decodeURIComponent(v) : '';
    });

    if (key) {
      return queryParams[key] as unknown as T;
    }
    return queryParams as unknown as T;
  }

  return (key ? '' : {}) as unknown as T;
}
