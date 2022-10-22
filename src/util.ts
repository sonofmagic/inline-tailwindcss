import fs from 'fs/promises'
import path from 'path'

export async function exist(filepath: string, mode?: number): Promise<boolean> {
  try {
    await fs.access(filepath, mode)
    return true
  } catch (error) {
    return false
  }
}

export function resolve(...paths: string[]) {
  return path.resolve(...paths)
}

export function cwdResolve(...paths: string[]) {
  return resolve(process.cwd(), ...paths)
}

export function basename(uri: string, suffix?: string | undefined) {
  return path.basename(uri, suffix)
}
