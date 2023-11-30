import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { CbrService } from './cbr.service';
import { CreateCbrDto } from './dto/create-cbr.dto';
import { UpdateCbrDto } from './dto/update-cbr.dto';

@Controller()
export class CbrController {
  constructor(private readonly cbrService: CbrService) {}

  @GrpcMethod('Create')
  create(@Payload() createCbrDto: CreateCbrDto) {
    return this.cbrService.create(createCbrDto);
  }

  @GrpcMethod('FindAll')
  findAll() {
    return this.cbrService.findAll();
  }

  @GrpcMethod('FindByCode')
  findOne(@Payload() id: number) {
    return this.cbrService.findOne(id);
  }

  @GrpcMethod('Update')
  update(@Payload() updateCbrDto: UpdateCbrDto) {
    return this.cbrService.update(updateCbrDto.id, updateCbrDto);
  }
  
}
