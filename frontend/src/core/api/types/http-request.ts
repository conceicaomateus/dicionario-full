export type HttpRequest = {
  url: string;
  method: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
};

export type HttpMethod = "post" | "get" | "put" | "delete" | "patch";
