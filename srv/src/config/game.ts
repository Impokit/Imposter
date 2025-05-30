export interface Player {
    id: string;
    name: string;
    socket?: WebSocket;
    isHost: boolean;
}

export interface Game {
    id: string;
    players: Player[];
    phase: 'setup' | 'selection' | 'chat' | 'voting';
}

export enum WordSector {
    "economic",
    "all"
}

export const games: Record<string, Game> = {};