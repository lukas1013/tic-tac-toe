import React, { Fragment } from "react"
import PlayerIcon from "../../components/PlayerIcon";
import { useGame } from "../../contexts/game";

import './style.css';

export default function Game(): JSX.Element {
  const { room, timer, addSymbol } = useGame()

  return (
    <main id="game">
      <header>
        <div className="content">
          <span id="p1">{
            room.p1
          }</span>

          <PlayerIcon className="p1" />

          <span id="timer">{timer}</span>

          <span id="p2">{
            room.p2
          }</span>

          <PlayerIcon className="p2" />
        </div>
      </header>
      <div id="table">
        {
          room.table.map((row, key) => (
            <Fragment key={key}>
              <div className="slot" onClick={() => {
                addSymbol({ row: key, col: 0, player: room.p1 as string })
              }}>
                <span className="symbol">{
                  room.table[key][0]
                }</span>
              </div>
              <div className="slot" onClick={() => {
                addSymbol({ row: key, col: 1, player: room.p1 as string })
              }}>
                <span className="symbol">{
                  room.table[key][1]
                }</span>
              </div>
              <div className="slot" onClick={() => {
                addSymbol({ row: key, col: 2, player: room.p1 as string })
              }}>
                <span className="symbol">{
                  room.table[key][2]
                }</span>
              </div>
            </Fragment>)
          )
        }
      </div>
    </main>
  )
}