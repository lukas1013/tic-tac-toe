const storage = localStorage

type Player = {
  name: string;
  email: string;
  level: string;
  score: string;
  isGuest?: true | false
}

export function save(...[entry, value]: [entry: string, value: string] | [entry: Array<string>, value: Array<string | Record<string, unknown>>]): void {
  if (typeof entry === 'string' && typeof value === 'string') {
    storage.setItem(entry, value)
  } else if (Array.isArray(entry)) {
    entry.forEach((item, index) => {
      storage.setItem(item, typeof value[index] === 'object' ? JSON.stringify(value[index]) : value[index] as string)
    });
  }
}
export function retrieve(entry: 'player'): Player | null;
export function retrieve(entry: 'token'): string | null;
export function retrieve(entry: string[] | 'player' | 'token'): Array<string | Player> | Player | string | null {
  if (typeof entry === 'string') {
    const stored = storage.getItem(entry)
    return (entry === 'player' && stored) ? JSON.parse(stored) : stored;
  }

  return entry.map(item => {
    const stored = storage.getItem(item)
    return (item === 'player' && stored) ? JSON.parse(stored) : stored
  })
}

export function deleteAll(): void {
  storage.clear()
}