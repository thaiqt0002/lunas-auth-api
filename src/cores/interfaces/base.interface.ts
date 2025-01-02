/**
 * Flattens a TypeScript type, making it easier to read or display in tools like error messages.
 */
export type Prettify<T> = {
  [K in keyof T]: T[K]
}

/**
 * Merges two types. Properties from T2 will override those from T1 if they have the same keys.
 */
export type Spread<T1, T2> = T2 & Omit<T1, keyof T2>

/**
 * Removes the specified keys from the type T, creating a new type.
 */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>

/**
 * Makes all properties of a type optional, recursively making nested objects partial as well.
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<string, unknown> ? DeepPartial<T[K]> : T[K]
}

/**
 * Recursively makes all properties of a type readonly, including nested objects.
 */
export type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends Record<string, unknown> ? DeepReadonly<T[K]> : T[K]
}

/**
 * Makes all properties of a type nullable.
 */
export type Nullable<T> = {
  [K in keyof T]: T[K] | null
}

/**
 * Extracts the return type of a function component (FC) or any function.
 */
export type FCReturnType<T extends (...args: any[]) => any> = ReturnType<T>

export enum ERole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IError {
  statusCode: number
  message: string
}
export interface IResponse<T> {
  statusCode: number
  data: T
  message: string | null
  error: IError | null
}
export enum ImageType {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  JPG = 'image/jpg',
  GIF = 'image/gif',
  SVG = 'image/svg+xml',
  BMP = 'image/bmp',
  TIFF = 'image/tiff',
  WEBP = 'image/webp',
}
export interface IPayloadJwt {
  uuid: string
  role: ERole
}

export interface IBaseId {
  id: number
}
export interface IBaseUuid {
  uuid: string
}
