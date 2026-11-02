// Empty API_URL switches axios to the in-browser mock adapter (src/mocks/adapter.ts).
export const API_URL = process.env.REACT_APP_API_URL ?? ''
export const ASSETS_URL = process.env.REACT_APP_ASSETS_URL ?? '/mock-assets'
