export function formatYear(date?: string): string {
    return date ? String(new Date(date).getFullYear()) : '—';
}

export function formatRuntime(minutes?: number): string {
    if (!minutes) return '—';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${minutes} мин / ${h}:${m.toString().padStart(2, '0')}`;
}

export function formatBudget(amount?: number): string {
    return amount ? `$ ${amount.toLocaleString()}` : '—';
}

export function formatRevenue(revenue?: number): string {
    return revenue ? `${(revenue / 1_000_000).toFixed(1)} млн` : '—';
}