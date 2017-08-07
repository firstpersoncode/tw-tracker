import io from 'socket.io-client';
const socket = io.connect('http://localhost:7005');

export default socket;
