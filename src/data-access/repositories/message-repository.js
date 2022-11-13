import BaseRepository from "./base-repository.js";
import MessageModel from "../models/message-model.js";

class MessageRepository extends BaseRepository {
  constructor() {
    super(MessageModel);
  }
}

export default new MessageRepository();
