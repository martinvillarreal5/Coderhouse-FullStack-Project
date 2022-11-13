import MessageRepository from "../data-access/repositories/message-repository.js";

export const getAllMessages = async () => {
  return await MessageRepository.getAll();
};

export const createMessage = async (message) => {
  return await MessageRepository.create(message);
};
