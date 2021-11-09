import { io } from 'socket.io-client';
import { retrieve } from './helpers/storage';

const token = retrieve('token')

const socket = io('ws://localhost:5000', { extraHeaders: { 'Authorization': `Bearer ${token}` } })


socket.on('connect', () => {
  console.log(socket.id)
})

export default socket