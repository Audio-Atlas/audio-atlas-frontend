export interface Result {
    id: string;
    name: string;
    similarity: number;
}

export interface APIResult {
  id: string;
  length: string; // 00:00.00 format
  name: string; // in ugly filename format
}

export const API_BASE_URL = "https://audioatlas.mosaiq.dev/api/v1/";
export const API_HEALTH_URL = `${API_BASE_URL}/health`;
export const API_SEARCH_URL = `${API_BASE_URL}/retrieve/`;//?k=00&query=abc
export const API_GET_CLIP_URL = `${API_BASE_URL}/audio/file/`;//thisisanid?format=wav|mp3

export const MAX_SEARCH_RESULTS = 50;


export const fetchHealthCheck = async () => {
  try {
    const res = await fetch(API_HEALTH_URL);
    return res.ok;
  } catch (e: any) {
    console.error("Failed to fetch health check:", e.message);
    return false;
  }
};

export const fetchSearchResults = async (count: number, query: string) => {
  try {
    if (!query || query.trim().length === 0 || count <= 0) {
      return [];
    }
    count = Math.min(count, MAX_SEARCH_RESULTS);
    const res = await fetch(`${API_SEARCH_URL}?k=${count}&query=${query}`);
    return res.json();
  } catch (e: any) {
    console.error("Failed to fetch search results:", e.message);
    return [];
  }
};

export const getClipURl = (id: string, format: string) => {
  return `${API_GET_CLIP_URL}${id}?format=${format}`;
}

export const fetchClip = async (id: string, format: string) => {
  try {
    if (!id || id.trim().length === 0) {
      return null;
    }
    const res = await fetch(getClipURl(id, format));
    return res.blob();
  } catch (e: any) {
    console.error("Failed to fetch clip:", e.message);
    return null;
  }
};

// convert ms to seconds with 1 decimal place precision
export const millisecondsToSeconds = (ms: number) => {
  return Math.round(ms / 100) / 10;
};


export const downloadAudioClip = async (id: string, name:string, format: string) => {
    const blob = await fetchClip(id, format);
    if (!blob) {
        console.error("Failed to download audio clip");
        return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
};

export const cleanFilename = (filename: string) => {
  // files are stored such as: foley_water_pour_onto_very_hot_metal_sheet_surface_steam_sizzle_bubble_fizzle_out_111202
  // need to split by underscores and capitalize each word, remove random numbers
  const words = filename.split("_");
  let clean = "";
  for (const word of words) {
    if (word.length === 0 || !isNaN(Number(word))) {
      continue;
    }
    clean += word.charAt(0).toUpperCase() + word.slice(1) + " ";
  }
  return clean.trim();
}