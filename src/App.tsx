import { GuestbookComment } from '../dev/types'

export type AppProps = {
  comments: GuestbookComment[]
}
export function App ({ comments }: AppProps) {
  return <pre>LOL{JSON.stringify(comments, null, 2)}</pre>
}
