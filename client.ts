/* Flexible Supabase client with graceful fallback.
 * If VITE_SUPABASE_* envs exist, use Supabase Edge Functions.
 * Else, route calls to local edge endpoints implemented by the host
 * such as `/status-overview` and `/status-aggregator?action=...`,
 * or `/api/status/*` as a secondary fallback.
 */
import { createClient, type PostgrestError } from '@supabase/supabase-js';

type InvokeOpts = { method?: 'GET'|'POST'; body?: any };

async function tryFetch(urls: string[], init?: RequestInit) {
  let lastErr: any = null;
  for (const u of urls) {
    try {
      const res = await fetch(u, init);
      if (res.ok) return await res.json();
    } catch (e) { lastErr = e; }
  }
  if (lastErr) throw lastErr;
  throw new Error('All fallback endpoints failed');
}

function buildFallback() {
  return {
    functions: {
      invoke: async (name: string, opts: InvokeOpts = {}) => {
        try {
          if (name === 'status-overview') {
            const data = await tryFetch(['/status-overview', '/api/status/overview']);
            return { data, error: null as unknown as PostgrestError };
          }
          if (name === 'status-aggregator') {
            const action = opts?.body?.action || 'overview';
            const map: Record<string, string[]> = {
              overview: ['/status-overview', '/api/status/overview'],
              incidents: ['/status-aggregator?action=incidents', '/api/status/incidents'],
              maintenances: ['/status-aggregator?action=maintenances', '/api/status/maintenances'],
              components: ['/status-aggregator?action=components', '/api/status/components'],
            };
            const data = await tryFetch(map[action] ?? map.overview);
            return { data, error: null as unknown as PostgrestError };
          }
          throw new Error(`Unknown function: ${name}`);
        } catch (error: any) {
          return { data: null, error };
        }
      },
    },
  };
}

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseImpl: any = null;
if (url && key) {
  supabaseImpl = createClient(url, key);
}

export const supabase = supabaseImpl ?? buildFallback();
