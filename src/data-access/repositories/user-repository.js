//import mongoose from 'mongoose';
import BaseRepository from "./base-repository.js";
import UserModel from "../models/user-model.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(UserModel);
  }
}

export default new UserRepository();
