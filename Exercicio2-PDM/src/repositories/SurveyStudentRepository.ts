import { EntityRepository, Repository } from "typeorm";
import { SurveyStudent } from "../models/SurveyStudent";

@EntityRepository(SurveyStudent)
class SurveyStudentRepository extends Repository<SurveyStudent> {
    
}

export {SurveyStudentRepository}