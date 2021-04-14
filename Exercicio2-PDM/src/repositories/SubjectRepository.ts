import { EntityRepository, Repository } from "typeorm";
import { Subject } from "../models/Subject";

@EntityRepository(Subject)
class SubjectRepository extends Repository<Subject> {}

export {SubjectRepository}