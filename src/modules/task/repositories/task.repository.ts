import { Injectable } from '@nestjs/common';
import * as Datastore from 'nedb';

@Injectable()
export class DatabaseService {
  private db: Datastore;

  constructor() {
    this.db = new Datastore({ filename: 'tasks.db', autoload: true }); // Load database from file
  }

  // Insert a new task into the database
  insert(task: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.insert(task, (err, newDoc) => {
        if (err) return reject(err);
        resolve(newDoc);
      });
    });
  }

  // Remove a task by ID
  remove(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.remove({ id }, {}, (err, numRemoved) => {
        if (err) return reject(err);
        resolve(numRemoved);
      });
    });
  }

  // Find a task by ID
  findById(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.findOne({ id }, (err, doc) => {
        if (err) return reject(err);
        resolve(doc);
      });
    });
  }

  // Update a task by ID
  update(id: number, updateData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.update({ id }, { $set: updateData }, {}, (err, numReplaced) => {
        if (err) return reject(err);
        resolve(numReplaced);
      });
    });
  }

  // Get all tasks
  findAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.find({}, (err, docs) => {
        if (err) return reject(err);
        resolve(docs);
      });
    });
  }
}
