export const fetchUserFromLocalStorage = () => {
  if (typeof window !== undefined && localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  }
};

export const initUser =() => {
  
}
