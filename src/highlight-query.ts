import styles from 'ansi-styles'
import type { LogEvent } from 'kysely'
import { highlight } from 'sql-highlight'

export default function highlightQuery({ query: { parameters, sql } }: LogEvent) {
  const query = sql.replaceAll(/\$\d+/g, (match) => {
    const parameter = parameters.at(Number(match.substring(1)) - 1)

    return typeof parameter === 'string' ? `'${parameter}'` : String(parameter)
  })

  return highlight(query, {
    colors: {
      bracket: styles.color.white.open,
      clear: styles.modifier.reset.open,
      comment: styles.color.grey.open,
      function: styles.color.white.open,
      identifier: styles.color.blueBright.open,
      keyword: styles.color.grey.open,
      number: styles.color.blueBright.open,
      special: styles.color.grey.open,
      string: styles.color.blueBright.open
    }
  })
}
