import type { Migration } from 'kysely'

export default function isMigration(object: unknown): object is Migration {
  return typeof object === 'object'
    && object !== null
    && !Array.isArray(object)
    && 'up' in object
    && typeof object.up === 'function'
}
