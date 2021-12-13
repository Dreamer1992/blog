import { Socket } from "socket.io-client";

export const SOCKET = "SOCKET";

export interface ISocketAction {
	type: typeof SOCKET;
	payload: Socket;
}