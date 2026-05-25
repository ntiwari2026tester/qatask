/**
 * Calculates pagination metadata.
 * @param total   - Total number of records in DB
 * @param page    - Current page number (1-based)
 * @param limit   - Records per page
 * @returns       - Object with totalPages, hasNextPage, hasPrevPage, currentPage, limit
 */
export function getPaginationMeta(total: number, page: number, limit: number) {
  const totalPages = total <= 0 ? 0 : Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1 && totalPages > 0;

  return {
    total,
    totalPages,
    currentPage: page,
    limit,
    hasNextPage,
    hasPrevPage,
  };
}
