import { writable } from "svelte/store";

export const waistlineFilters = writable({ yearRange: "2015-2018", age: "20 and over", race: "all" });
export const ASTMFilters = writable({ year: "2021", sizeRange: "straight" });
