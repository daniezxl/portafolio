export type ThemePref = "system" | "light" | "dark";

export const THEME_KEY = "theme";

/** Se ejecuta en <head> antes de pintar, para evitar el destello de tema. */
export const themeScript = `(function(){try{var p=localStorage.getItem('${THEME_KEY}')||'system';var d=p==='dark'||(p==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.dataset.theme=d?'dark':'light';r.dataset.themePref=p;r.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export function applyTheme(pref: ThemePref) {
  const dark =
    pref === "dark" || (pref === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const root = document.documentElement;
  root.dataset.theme = dark ? "dark" : "light";
  root.dataset.themePref = pref;
  root.style.colorScheme = dark ? "dark" : "light";
  try {
    if (pref === "system") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, pref);
  } catch {
    /* almacenamiento bloqueado: el tema sigue funcionando en esta visita */
  }
  window.dispatchEvent(new CustomEvent("theme:change", { detail: pref }));
}

export function currentPref(): ThemePref {
  const p = document.documentElement.dataset.themePref;
  return p === "light" || p === "dark" ? p : "system";
}
