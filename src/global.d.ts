declare global {
  export interface IBaseResponse<T = any> {
    readonly statusCode: number;
    readonly message: string;
    readonly data?: T;
    readonly totalItems?: number; // Total number of items in database
    readonly totalPages?: number; // Total pages based on limit
    readonly currentPage?: number; // Current page number
    readonly limit?: number; // Limit per page
    readonly hasNextPage?: boolean; // Check if there is a next page
    readonly hasPreviousPage?: boolean; // Check if there is a previous page
    readonly nextPage?: number; // Next page number
    readonly previousPage?: number; // Previous page number
  }

  export interface WebResponse {
    readonly statusCode: number;
    readonly message: string;
  }
}

export {};
