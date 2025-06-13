export interface Player {
  id: string;
  name: string;
  socket?: WebSocket;
  config: {
    role?: PlayerRole | null,
  }
  isHost: boolean;
}

export interface Game {
  id: string;
  players: Player[];
  phase: "setup" | "selection" | "chat" | "voting";
  config: {
    imposterCount: number,
    maxPlayerCount: number,
    hintsForImposter: boolean,
    wordSector: WordSector,
    gameTime: number,
    TimeLimit: boolean
  }
}

export enum PlayerRole {
  "innocent",
  "imposter",
  "ejected"
}

export enum WordSector {
  "economic",
  "all",
}

export const games: Record<string, Game> = {};
