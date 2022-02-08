import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentsRepository } from './students.repository';
import { Student } from './students.entity';
import { name as fName, datatype, address } from 'faker';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentsRepository)
    private studentsRepository: StudentsRepository,
  ) {}

  getStudents(): Promise<Student[]> {
    return this.studentsRepository.find();
  }

  async insertStudents() {
    for (let i = 0; i < 1000000; i++) {
      console.log(fName);
      const name = fName.findName();
      const gender = Math.random() < 0.5;
      const dob = datatype.datetime();
      const homeTown = address.city();
      const mark = Math.floor(Math.random() * 11);
      const student = this.studentsRepository.create({
        name,
        gender,
        dob,
        homeTown,
        mark,
      });
      await this.studentsRepository.save(student);
    }
  }
}
