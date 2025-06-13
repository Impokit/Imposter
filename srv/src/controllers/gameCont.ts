import { Request, RequestHandler, Response } from "express";
import { games, Player, WordSector } from "../config/game";
import { WebSocket } from "ws";

export const CreateImposterGame: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  let {
    maxPlayerCount,
    imposterCount,
    hintsForImposter,
    wordSector,
    gameTime,
    TimeLimit,
    name,
  } = req.body as {
    maxPlayerCount?: number;
    imposterCount?: number;
    hintsForImposter?: boolean;
    wordSector?: WordSector;
    gameTime?: number;
    TimeLimit?: boolean;
    name?: string;
  };

  if (!name) {
    res.status(406).json({ message: "Name must be given" });
    return;
  }

  maxPlayerCount = maxPlayerCount ?? 20;
  imposterCount = imposterCount ?? Math.floor(maxPlayerCount / 3);
  hintsForImposter = hintsForImposter ?? true;
  wordSector = wordSector ?? WordSector.all;
  gameTime = gameTime ?? 1000 * 60 * 10;
  TimeLimit = TimeLimit ?? false;

  const gameId = Math.random().toString(36).substr(2, 6);
  const hostId = Math.random().toString(36).substr(2, 6);

  const host: Player = {
    id: hostId,
    name,
    isHost: true,
  };

  games[gameId] = {
    id: gameId,
    players: [host],
    phase: "setup",
  };

  res.json({ gameId, type: "success" });
};

export const handleSocketConnection = async (socket: WebSocket) => {
  let gameId = "";
  let playerId = "";
  let playerName = "";

  socket.on("message", (data) => {
    const msg = JSON.parse(data.toString());

    // Player joins an existing game
    if (msg.type === "joinGame") {
      gameId = msg.gameId;
      playerName = msg.playerName;
      playerId = Math.random().toString(36).substr(2, 6);
      const game = games[gameId];
      if (!game) {
        return socket.send(
          JSON.stringify({ type: "error", message: "Game not found" }),
        );
      }

      let player = game.players.find((p) => p.name === playerName);
      if (player) {
        if (player.isHost !== true) {
          return socket.send(
            JSON.stringify({ type: "error", message: "Name already taken" }),
          );
        }
      }

      if (!player) {
        player = {
          id: playerId,
          name: playerName,
          isHost: false,
        } as Player;

        if (game.players.includes(player)) {
          return socket.send(
            JSON.stringify({ type: "error", message: "Player already joined" }),
          );
        }

        game.players.push(player);
        console.log(game);
      }

      (player as any).socket = socket;

      broadcast(gameId, {
        type: "playerJoined",
        playerId: player.id,
        name: player.name,
        players: game.players,
      });
    }

    if (msg.type === "chatMessage" && gameId) {
      const game = games[gameId];
      if (game?.phase === "chat") {
        broadcast(gameId, {
          type: "chatMessage",
          from: playerId,
          content: msg.content,
        });
      }
    }

    if (msg.type === "startChat" && gameId) {
      const game = games[gameId];
      const host = game?.players.find((p) => p.id === playerId);
      if (host?.isHost) {
        game.phase = "chat";
        broadcast(gameId, { type: "changePhase", phase: game.phase });
      }
    }

    if (msg.type === "startSelection" && gameId) {
      const game = games[gameId];
      const host = game?.players.find((p) => p.id === playerId);

      if (host?.isHost) {
        game.phase = "selection";
        broadcast(gameId, { type: "changePhase", phase: game.phase });
      }
    }

    if (msg.type === "startVoting" && gameId) {
      const game = games[gameId];
      const host = game?.players.find((p) => p.id === playerId);

      if (host?.isHost) {
        game.phase = "voting";
        broadcast(gameId, { type: "changePhase", phase: game.phase });
      }
    }
  });

  socket.on("close", () => {
    if (!gameId || !playerId) return;
    const game = games[gameId];
    if (!game) return;
    game.players = game.players.filter((p) => p.id !== playerId);
    broadcast(gameId, {
      type: "playerLeft",
      player: playerId,
      players: game.players,
    });

    if (game.players.length === 0) delete games[gameId];
  });
};

function broadcast(gameId: string, msg: any) {
  const game = games[gameId];
  if (!game) return;
  const host = game.players.find((p) => p.isHost === true);
  game.players.forEach((p) => {
    let message;
    if (p.isHost === true) {
      message = JSON.stringify({ msg, isHost: true, host });
    } else {
      message = JSON.stringify({ msg });
    }
    p.socket?.send(message);
  });
}
