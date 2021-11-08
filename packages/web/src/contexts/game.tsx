import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import socket from '../socket';
import { useAuth } from './auth';

interface Room {
  p1?: typePlayer['name'];
  p1Symbol: 'X' | 'O';
  p2Symbol?: 'X' | 'O';
  p2?: typePlayer['name'];
  table: typeSlots,
  moves: typeMoves
}

export type typePlayer = {
  name: string;
  playerId: string;
}

type typeSlots = [
  ['X' | 'O' | '', 'X' | 'O' | '', 'X' | 'O' | ''],
  ['X' | 'O' | '', 'X' | 'O' | '', 'X' | 'O' | ''],
  ['X' | 'O' | '', 'X' | 'O' | '', 'X' | 'O' | ''],
]
type typeMoves = [
  ['p1' | 'p2' | '', 'p1' | 'p2' | '', 'p1' | 'p2' | ''],
  ['p1' | 'p2' | '', 'p1' | 'p2' | '', 'p1' | 'p2' | ''],
  ['p1' | 'p2' | '', 'p1' | 'p2' | '', 'p1' | 'p2' | '']
]

type typeAddSymbol = (({ col, row, player }: { col: number, row: number, player: string }) => void)

const initialSetup: Room = {
  table: [
    ['','',''],
    ['','',''],
    ['','','']
  ] as typeSlots,
  moves: [
    ['','',''],
    ['','',''],
    ['','','']
  ] as typeMoves,
  p1Symbol: 'X'
}

const GameContext = createContext({ room: initialSetup, timer: 0, addSymbol: function ({ col, row, player }: { col: number, row: number, player: string }) { console.log(col); } });

export const GameProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { player } = useAuth()
  const [room, setRoom] = useState(initialSetup)
  const [canPlay, setCanPlay] = useState(false)
  const [timer, setTimer] = useState(60)

  const playTimer = useMemo(() => {
    if (canPlay) {
    return setInterval(() => setTimer(pre => pre -1), 1000)
  }
}, [canPlay])

  useEffect(() => {
    if (!canPlay && playTimer) {
      clearInterval(playTimer)
      setTimer(60)
    }
  }, [canPlay, playTimer])

  useEffect(() => {
    socket.emit('play')

    socket.on('game setup', (room: Room) => {
      console.log(room);
      
      setRoom(() => ({
        p1: room.p1,
        p1Symbol: room.p1Symbol,
        p2: room.p2,
        p2Symbol: room.p2Symbol,
        table: initialSetup.table,
        moves: initialSetup.moves
      }))
    })

    socket.on('start', () => {
      if (room.p1 === player?.name) {
        setCanPlay(true)
      }
    })

    socket.on('add symbol', ({ col, row, player: _player }: { col: number, row: number, player: string }) => {
      setRoom((pre) => {
        pre.table[row][col] = _player === pre.p1 ? pre.p1Symbol : pre.p2Symbol as 'X' | 'O'
        pre.moves[row][col]= 'p1'
        
        return ({
          ...pre
        })
      })
      
      setCanPlay(_player === player?.name ? false : true)
    })
    
  }, [])

  const addSymbol = useCallback(({ row, col, player }) => {
    if (!room.table[row][col]?.length) {
      socket.emit('add symbol', { row, col })
      setCanPlay(false)
    }
  }, [room.table])

  const contextValue = useMemo(() => ({
    room,
    timer,
    addSymbol
  }), [room, timer, addSymbol]);

  return (
    <GameContext.Provider value={contextValue}>{
      children
    }</GameContext.Provider>
  )
}

export function useGame(): { room: Room, timer: number, addSymbol: typeAddSymbol } {
  const context = useContext(GameContext)
  return context
}