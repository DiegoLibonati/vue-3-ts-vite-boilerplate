import type { InjectionKey, Ref } from "vue";

export const ThemeKey: InjectionKey<Ref<"light" | "dark">> = Symbol("theme");
export const ToggleThemeKey: InjectionKey<() => void> = Symbol("toggleTheme");
