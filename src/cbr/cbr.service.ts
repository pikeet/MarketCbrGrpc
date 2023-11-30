import { Injectable } from '@nestjs/common';
import { CreateCbrDto } from './dto/create-cbr.dto';
import { UpdateCbrDto } from './dto/update-cbr.dto';

@Injectable()
export class CbrService {
  create(createCbrDto: CreateCbrDto) {
    return 'This action adds a new cbr';
  }

  findAll() {
    return `This action returns all cbr`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cbr`;
  }

  update(id: number, updateCbrDto: UpdateCbrDto) {
    return `This action updates a #${id} cbr`;
  }

  remove(id: number) {
    return `This action removes a #${id} cbr`;
  }
}
