declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FAUNA_DB_KEY: string;
      NEXTAUTH_URL: string;
      GITHUB_CLIENT_ID: string;
      FAUNA_DB_ENDPOINT: string;
      GITHUB_CLIENT_SECRET: string;
      NEXT_PUBLIC_FAKE_API_URL: string;
      NEXT_PUBLIC_API_ROUTE_URL: string;
      NEXT_PUBLIC_API_ROUTE_SECRET: string;
    }
  }
}

export {};
