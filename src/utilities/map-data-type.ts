export default function mapDataType(dataType: string) {
  switch (dataType) {
    case 'bigint':
    case 'int4':
    case 'numeric':
    case 'smallint':
      return 'number'
    case 'jsonb':
      return 'JSONColumnType<object>'
    case 'text':
    case 'varchar':
      return 'string'
    case 'timestamptz':
      return 'Date'
    default:
      return 'unknown'
  }
}
