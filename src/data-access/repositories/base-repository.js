import mongoose from "mongoose";
import { databaseConfig } from "../../config/index.js";
import logger from "../../lib/logger.js";
import { AppError } from "../../lib/errorHandler.js";

await mongoose
  .connect(databaseConfig.mongoDbUrl)
  .then(() => logger.info("MongoDb Connection Successfull"))
  .catch((error) => {
    throw new AppError("database-connection", error.message, 500, true);
  });

//TODO optimize database connections (use singleton pattern?)

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async getById(id) {
    return await this.model.findById(id);
  }

  async getOne(paramsObject) {
    return await this.model.findOne(paramsObject).exec();
    //? findOne returns null when no document satisfies the field in the filter
    //! But if the specified field in the filter does not exist,
    //! (for example: because of a typo), MongoDB returns an arbitrary document.
    //! This can cause some really bad bugs and security issues. Check strict schema mode
  }

  async getAll() {
    return await this.model.find({}).exec();
    // ? find returns a empty array if didnt found a doc
    //! find method has the same problem as findOne above
  }

  async create(object) {
    return await this.model.create(object);
  }

  async save(modelInstance) {
    return await modelInstance.save();
  }

  async updateById(id, data) {
    return await this.model.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {
        runValidators: true,
        new: true, // returns new object instead of the old one
        //select: "fieldIWant anotherFieldIWant"
        //select: {_id: 0} //excludes _id, includes other fields
        //select: {_id: 1} //includes _id, excludes other fields
      }
    );
  }

  async deleteById(id) {
    await this.model.findByIdAndRemove(id);
    return;
  }

  async deleteAll() {
    await mongoose.connection.db.dropCollection(
      this.model.collection.collectionName
    );
    return;
  }
}

export default BaseRepository;
