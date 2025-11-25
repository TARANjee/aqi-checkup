export const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
export const MAX_CACHE_ENTRIES = 50;

export const cache = new Map();

export function enforceCacheRules() {
  const now = Date.now();

  // Remove expired entries
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      cache.delete(key);
    }
  }

  // Limit cache size
  if (cache.size > MAX_CACHE_ENTRIES) {
    const oldestKey = cache.keys().next().value;
    cache.delete(oldestKey);
  }
}
