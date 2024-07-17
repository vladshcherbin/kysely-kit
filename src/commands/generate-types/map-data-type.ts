export default function mapDataType(dataType: string): string {
  switch (dataType) {
    case 'bool':
      return 'boolean'
    case 'int4':
      return 'number'
    case 'jsonb':
      return 'JSONColumnType<{}>'
    case 'text':
    case 'varchar':
      return 'string'
    case 'timestamptz':
      return 'Date'
    default:
      throw new Error(`Unknown data type: ${dataType}`)
  }
}
