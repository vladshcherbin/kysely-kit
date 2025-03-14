import { createJiti } from 'jiti'

const jiti = createJiti(import.meta.url, { fsCache: false })

export default jiti
