export const login = (username: string | null, password: string | null) => {
  return username === password && username !== null;
};
