const requests = new Map<string, { count: number; expiresAt: number }>();

export function rateLimit(key: string, { maxRequests = 5, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const entry = requests.get(key);

  if (!entry || now > entry.expiresAt) {
    requests.set(key, { count: 1, expiresAt: now + windowMs });
    return { limited: false };
  }

  entry.count++;

  if (entry.count > maxRequests) {
    return { limited: true };
  }

  return { limited: false };
}
