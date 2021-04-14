import { EntityRepository, Repository } from "typeorm";
import { StudentSubject } from "../models/StudentSubject";

@EntityRepository(StudentSubject)
class StudentSubjectRepository extends Repository<StudentSubject> {}

export {StudentSubjectRepository}