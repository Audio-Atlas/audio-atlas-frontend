export interface Result {
    id: string;
    name: string;
    duration: number;
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

export const fetchClip = async (id: string, format: string) => {
  try {
    if (!id || id.trim().length === 0) {
      return null;
    }
    const res = await fetch(`${API_GET_CLIP_URL}${id}?format=${format}`);
    return res.blob();
  } catch (e: any) {
    console.error("Failed to fetch clip:", e.message);
    return null;
  }
};

export const durationToMilliseconds = (duration: string) => {
  if (!duration || duration.trim().length === 0 || !duration.includes(":") || !duration.includes(".")) {
    return -1;
  }
  const [minutes, secondsMs] = duration.split(":");
  const [seconds, ms] = secondsMs.split(".");
  let msTotal:number = 0;
  try {
    const minNum = parseInt(minutes);
    msTotal += minNum * 60 * 1000;
  } catch (e: any) {
    console.error("Failed to parse minutes "+duration+" :", e.message);
    return -1;
  }
  try {
    const secNum = parseInt(seconds);
    msTotal += secNum * 1000;
  } catch (e: any) {
    console.error("Failed to parse seconds "+duration+" :", e.message);
    return -1;
  }
  try {
    const msNum = parseInt(ms);
    msTotal += msNum;
  } catch (e: any) {
    console.error("Failed to parse milliseconds "+duration+" :", e.message);
    return -1;
  }
  return msTotal;
};

// convert ms to seconds with 1 decimal place precision
export const millisecondsToSeconds = (ms: number) => {
  return Math.round(ms / 100) / 10;
};


export const downloadAudioClip = async (id: string, format: string) => {
    const blob = await fetchClip(id, format);
    if (!blob) {
        console.error("Failed to download audio clip");
        return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${id}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
};