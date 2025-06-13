export function getTokenFromCookies(): string | null {
    const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
    return match ? match[2] : null;
}