import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { Player } from './auth';

const PlayerContext = createContext({ player: null } as { player: Player | null });

export const PlayerProvider = ({ children, player }: { children: JSX.Element | JSX.Element[], player: Player | null }): JSX.Element => {
  // useEffect(() => {
  //   console.log(player);
    
  // }, [player])

  const contextValue = useMemo(() => ({ player }), [player]);

  return (
    <PlayerContext.Provider value={contextValue}>{
      children
    }</PlayerContext.Provider>
  )
}

// export function usePlayer() {
//   const context = useContext(PlayerContext)
//   return context
// }