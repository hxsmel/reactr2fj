export function getPageItems(
    current: number,
    total: number,
    around: number = 2
): Array<number | 'ellipsis'> {
    if (total < 1) return [];

    if (total <= around * 2 + 3) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: Array<number | 'ellipsis'> = [1];
    const start = Math.max(2, current - around);
    const end = Math.min(total - 1, current + around);

    if (start > 2) pages.push('ellipsis');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < total - 1) pages.push('ellipsis');

    pages.push(total);
    return pages;
}