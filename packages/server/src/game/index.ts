interface Rooms {
  [index: string]: {
    p1: typePlayer['name'];
    p1Symbol: 'X' | 'O';
    p2?: typePlayer['name'];
    p2Symbol: 'X' | 'O';
    table: typeTable;
    moves: typeMoves;
  }
}

interface Players {
  [index: string]: string
}

export type typePlayer = {
  name: string;
  playerId: string;
}

type typeTable = [
  ['X' | 'O' | '', 'X' | 'O' | '', 'X' | 'O' | ''],
  ['X' | 'O' | '', 'X' | 'O' | '', 'X' | 'O' | ''],
  ['X' | 'O' | '', 'X' | 'O' | '', 'X' | 'O' | '']
]

type typeMoves = [
  ['p1' | 'p2' | '', 'p1' | 'p2' | '', 'p1' | 'p2' | ''],
  ['p1' | 'p2' | '', 'p1' | 'p2' | '', 'p1' | 'p2' | ''],
  ['p1' | 'p2' | '', 'p1' | 'p2' | '', 'p1' | 'p2' | '']
]


const players: Players = {}
const rooms: Rooms = {}

function createRoom(player: typePlayer) {
  const pSymbols: Array<'X' | 'O'> = ['X', 'O']
  const p1Symbol = pSymbols[(Math.floor(Math.random() * 2 + 1))]

  rooms[player.playerId] = {
    p1: player.name,
    p1Symbol,
    p2Symbol: p1Symbol === 'X' ? 'O' : 'X',
    table: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ],
    moves: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  }

  console.log(rooms)
}

function enterRoom(roomId: string, player: typePlayer) {
  rooms[roomId].p2 = player.name
}

function getAvailableRooms() {
  const available: string[] = []

  Object.keys(rooms).forEach(playerId => {
    if (!rooms[playerId].p2) {
      available.push(playerId)
    }
  })

  return available
}

export function addPlayer(player: typePlayer) {
  players[player.name] = player.playerId
}

export const getPlayers = () => players;

export function init(player: typePlayer) {
  const available = getAvailableRooms()
  let room: { p1: string, p2?: string, table: typeTable, moves: typeMoves, p1Symbol: 'X' | 'O', p2Symbol: 'X' | 'O' }, roomId: string;
  if (!available.length) {
    createRoom(player)
    room = rooms[player.playerId]
    roomId = player.playerId
  } else {
    const _roomId = available.shift();
    enterRoom(_roomId, player)
    room = rooms[_roomId]
    roomId = _roomId
  }
  return { room, roomId }
}

function canAddSymbol(roomId: string, { col, row }: { col: string, row: string }) {
  if (!rooms[roomId].table[row][col]?.length) {
    return true
  }

  return false
}

export function addSymbol(roomId: string, { col, row }: { col: string, row: string }, player: 'p1' | 'p2') {
  if (canAddSymbol(roomId, { col, row })) {
    const pSymbol = player === 'p1' ? rooms[roomId].p1Symbol : rooms[roomId].p2Symbol
    rooms[roomId].table[row][col] = pSymbol
    rooms[roomId].moves[row][col] = player
  }
}