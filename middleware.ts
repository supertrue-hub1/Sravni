import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import geoip from 'geoip-lite';
import { NextRequest } from 'next/server';

// Enable geo-rewrite by default (disable with GEO_REWRITE=false)
const GEO_REWRITE = process.env.GEO_REWRITE !== 'false';

function getCityFromIP(ip: string): string | null {
  // Skip local and private IPs - for dev, return a city for testing
  if (!ip || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
    // For local development, simulate Moscow
    return 'moscow';
  }
  
  try {
    const geo = geoip.lookup(ip);
    if (geo && geo.city) {
      return geo.city.toLowerCase();
    }
  } catch (e) {
    console.error('GeoIP lookup error:', e);
  }
  
  return null;
}

// Map Russian city names to URL slugs
const cityToSlug: Record<string, string> = {
  'moscow': 'moskva',
  'saint petersburg': 'sankt-peterburg',
  'novosibirsk': 'novosibirsk',
  'yekaterinburg': 'ekaterinburg',
  'kazan': 'kazan',
  'nizhny novgorod': 'nizhny-novgorod',
  'voronezh': 'voronezh',
  'rostov-on-don': 'rostov-na-donu',
  'krasnodar': 'krasnodar',
  'samara': 'samara',
  'ufa': 'ufa',
  'chelyabinsk': 'chelyabinsk',
  'perm': 'perm',
  'krasnoyarsk': 'krasnoyarsk',
  'saratov': 'saratov',
  'tyumen': 'tyumen',
  'tolyatti': 'tolyatti',
  'izhevsk': 'izhevsk',
  'barnaul': 'barnaul',
  'vladivostok': 'vladivostok',
  'irkutsk': 'irkutsk',
  'khabarovsk': 'khabarovsk',
  'yaroslavl': 'yaroslavl',
  'makhachkala': 'makhachkala',
  'tver': 'tver',
  'stavropol': 'stavropol',
  'kursk': 'kursk',
  'kaliningrad': 'kaliningrad',
  'tula': 'tula',
  'belgorod': 'belgorod',
  'lipetsk': 'lipetsk',
  'penza': 'penza',
};

export default function middleware(request: NextRequest) {
  // First, handle i18n
  const i18nResult = createMiddleware(routing)(request);
  
  // If it's a redirect from i18n, return it
  if (i18nResult instanceof Response) {
    return i18nResult;
  }
  
  // Geo-personalization only for main page without locale
  const pathname = request.nextUrl.pathname;
  
  // Only geo-rewrite for root path or with locale
  if (!pathname.match(/^\/(?:ru|uz|tg|ky)?\/?$/)) {
    return i18nResult;
  }
  
  // Skip if GEO_REWRITE is disabled
  if (!GEO_REWRITE) {
    return i18nResult;
  }
  
  // Get client IP from headers
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || '127.0.0.1';
  
  const city = getCityFromIP(ip);
  
  if (city && cityToSlug[city]) {
    const slug = cityToSlug[city];
    // Rewrite to city page without changing URL
    const newPath = `/zajmy-online/${slug}`;
    console.log(`[Geo] IP ${ip} -> City: ${city} -> Rewriting to ${newPath}`);
    
    // Use Next.js URL rewrite
    const url = request.nextUrl.clone();
    url.pathname = newPath;
    
    return Response.redirect(url);
  }
  
  return i18nResult;
}

export const config = {
  matcher: ['/', '/(ru|uz|tg|ky)/:path*']
};
