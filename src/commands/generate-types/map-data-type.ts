export default function mapDataType(dataType: string): string {
  switch (dataType) {
    case 'bool':
      return 'boolean'
    case 'int4':
    case 'numeric':
      return 'number'
    case 'jsonb':
      return 'JSONColumnType<object>'
    case 'text':
    case 'varchar':
      return 'string'
    case 'timestamp':
    case 'timestamptz':
      return 'Date'
    default:
      throw new Error(`Unknown data type: ${dataType}`)
  }
}
