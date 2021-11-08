import { io } from 'socket.io-client';
import { retrieve } from './helpers/storage';
import config from './config'; 

const socket = io('ws://localhost:5000', { extraHeaders: { 'Authorization': `Bearer ${retrieve('token')}` } })

socket.on('connect', () => {
  console.log(socket.id)
})

export default socket