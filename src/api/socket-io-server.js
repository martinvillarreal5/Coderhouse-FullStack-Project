import { Server as IoServer } from "socket.io";
import passport from "passport";
import logger from "../lib/logger.js";
import sessionMiddleware from "./middleware/session-middleware.js";
import { socketAuth } from "./middleware/socket-io-middleware.js";
import { node_env } from "../config/index.js";
import * as messageServices from "../services/message-services.js";

const startSocketIoServer = async (expressServer) => {
  logger.info("Starting Socket.io server.");
  const io = new IoServer(expressServer, {
    cors: {
      origin: node_env === "production" ? "*" : "http://localhost:5173",
      methods: ["GET", "POST"],
      transports: ["websocket", "polling"],
      credentials: true,
    },
  });

  const wrap = (middleware) => (socket, next) =>
    middleware(socket.request, {}, next);

  io.use(wrap(sessionMiddleware));
  io.use(wrap(passport.initialize()));
  io.use(wrap(passport.session()));

  io.use(socketAuth);

  // TODO Set an error handling middleware
  // TODO do error handling for events

  let allUsers = [];
  let chatRoom = ""; // TODO Refactor to only use on roomname
  const CHAT_BOT = "System";

  io.on("connection", async (socket) => {
    logger.info("New User Connection");

    socket.on("room_join", (data) => {
      const { email, room } = data; // Data sent from client when room_join event emitted
      socket.join(room);
      logger.info(`${email} has joined the chat room`);
      let createdAt = Date.now();

      // Send message to all users currently in the room, apart from the user that just joined
      socket.to(room).emit("receive_message", {
        body: `${email} has joined the chat room`,
        email: CHAT_BOT,
        createdAt: createdAt,
        origin: CHAT_BOT,
      });

      // Send welcome message only to user that just joined chat
      socket.emit("receive_message", {
        body: `Welcome ${email}`,
        email: CHAT_BOT,
        createdAt: createdAt,
        origin: CHAT_BOT,
      });

      chatRoom = room;
      allUsers.push({ id: socket.id, email: email, room: room });
      let chatRoomUsers = allUsers.filter((user) => user.room === room);
      socket.in(room).emit("chatroom_users", chatRoomUsers); // emit current room user to all room users
      //TODO test code above

      messageServices
        .getAllMessages()
        .then((messages) => {
          socket.emit("chatroom_messages", messages); // Send all saved mesagges to user who joined
        })
        .catch((err) => logger.error(err));
    });

    socket.on("send_message", (data) => {
      const { message, room } = data;
      // validate message
      message.origin = "user";
      messageServices
        .createMessage(message)
        .then((response) => {
          logger.info(response, "New message received:");
          io.in(room).emit("receive_message", response); // Send to all users in room, including sender
        })
        .catch((err) => {
          logger.error(err);
        });
    });

    socket.on("room_leave", (data) => {
      const { email, room } = data;
      socket.leave(room);
      allUsers = allUsers.filter((user) => user.id != socket.id);
      socket.to(room).emit("chatroom_users", allUsers);

      // Send message to all users currently in the room, apart from the user that just left
      socket.to(room).emit("receive_message", {
        body: `${email} has left the chat.`,
        email: CHAT_BOT,
        createdAt: Date.now(),
        origin: CHAT_BOT,
      });
      logger.info(`${email} has left the chat.`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected from the chat.");
      const user = allUsers.find((user) => user.id == socket.id);
      if (user?.email) {
        allUsers = allUsers.filter((user) => user.id != socket.id);
        socket.to(chatRoom).emit("chatroom_users", allUsers);

        // Send message to all users currently in the room, apart from the user that just disconected
        // This message is saved to database?, but ignored when fetching from the database
        socket.to(chatRoom).emit("receive_message", {
          message: `${user.email} has disconnected from the chat.`,
        });
      }
    });
  });

  logger.info("Socket.io server created and configurated.");
};

export default startSocketIoServer;
