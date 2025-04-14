let navigateFn: (path: string, options?: { replace?: boolean, state?: unknown }) => void;

export const setNavigate = (navigate: typeof navigateFn) => {
  navigateFn = navigate;
}

export const navigate = (path: string, options?: { replace?: boolean; state?: unknown }) => {
  if (navigateFn) {
    navigateFn(path, options);
  } else {
    console.error("La fonction navigate n'est pas encore initialisée.");
  }
};