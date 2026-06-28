export interface NavLink {
    href: string;
    label?: string;
    /** HTTP method for Inertia Link (e.g. POST for logout). */
    method?: 'get' | 'post';
    /** Match this path and all nested child paths (derived from route URLs, not hardcoded). */
    matchPrefix?: string;
    /** Only highlight on an exact path match — no child routes. */
    exact?: boolean;
    /** Never highlight when the current path equals or nests under these paths. */
    excludePaths?: string[];
}

/** Normalize any URL or path to a comparable pathname (no trailing slash). */
export function toPath(urlOrPath: string): string {
    const raw = urlOrPath.split('?')[0].split('#')[0];

    if (raw.startsWith('http://') || raw.startsWith('https://')) {
        try {
            const pathname = new URL(raw).pathname;
            return pathname.length > 1 && pathname.endsWith('/')
                ? pathname.slice(0, -1)
                : pathname || '/';
        } catch {
            // fall through
        }
    }

    if (raw.length > 1 && raw.endsWith('/')) {
        return raw.slice(0, -1);
    }

    return raw || '/';
}

/** Resolve a Ziggy route to a normalized pathname. */
export function pathFromRoute(name: string, params?: Record<string, string | number>): string {
    return toPath(route(name, params));
}

/** Drop the last N path segments — e.g. `/admin/reports/analytics` → `/admin/reports`. */
export function parentPath(path: string, dropSegments = 1): string {
    const parts = toPath(path).split('/').filter(Boolean);
    if (parts.length <= dropSegments) {
        return '/';
    }
    return `/${parts.slice(0, parts.length - dropSegments).join('/')}`;
}

function isExcluded(path: string, link: NavLink): boolean {
    return (link.excludePaths ?? []).some((excluded) => {
        const excludedPath = toPath(excluded);
        return path === excludedPath || path.startsWith(`${excludedPath}/`);
    });
}

function linkMatches(path: string, link: NavLink): boolean {
    if (isExcluded(path, link)) {
        return false;
    }

    const target = toPath(link.href);

    if (link.exact) {
        return path === target;
    }

    if (link.matchPrefix) {
        const prefix = toPath(link.matchPrefix);
        return path === prefix || path.startsWith(`${prefix}/`);
    }

    if (target === '/') {
        return path === '/';
    }

    return path === target || path.startsWith(`${target}/`);
}

function matchScore(path: string, link: NavLink): number {
    if (link.matchPrefix) {
        return toPath(link.matchPrefix).length;
    }

    const target = toPath(link.href);

    if (path === target) {
        return target.length + 1000;
    }

    if (path.startsWith(`${target}/`)) {
        return target.length;
    }

    return 0;
}

export function getActiveNavHref(currentUrl: string, links: NavLink[]): string | null {
    const path = toPath(currentUrl);
    let bestHref: string | null = null;
    let bestScore = -1;

    for (const link of links) {
        if (!linkMatches(path, link)) {
            continue;
        }

        const score = matchScore(path, link);
        if (score > bestScore) {
            bestHref = link.href;
            bestScore = score;
        }
    }

    return bestHref;
}

export function isNavActive(currentUrl: string, href: string, links?: NavLink[]): boolean {
    if (links?.length) {
        return getActiveNavHref(currentUrl, links) === href;
    }

    return linkMatches(toPath(currentUrl), { href });
}

export const publicNavLinkClass = (active: boolean) =>
    active
        ? 'font-medium text-foreground underline decoration-foreground/30 underline-offset-[6px]'
        : 'text-muted-foreground transition-colors hover:text-foreground';

export const publicNavLinkMobileClass = (active: boolean) =>
    active
        ? 'rounded-lg bg-accent px-3 py-2.5 text-sm font-medium text-foreground'
        : 'rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground';

export const portalNavLinkClass = (active: boolean) =>
    active
        ? 'border-l-2 border-primary bg-accent pl-[calc(0.75rem-2px)] font-medium text-foreground'
        : 'border-l-2 border-transparent pl-[calc(0.75rem-2px)] text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground';

/** Build a match prefix from a route by stripping trailing segments. */
export function prefixFromRoute(routeName: string, dropSegments = 1): string {
    return parentPath(pathFromRoute(routeName), dropSegments);
}
