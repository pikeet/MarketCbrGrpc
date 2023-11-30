import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { CbrService } from './cbr.service';
import { UpdateCbrDto } from './dto/update-cbr.dto';
import { FindByIdDto } from './dto/find-by-id.dto';

@Controller()
export class CbrController {
  constructor(private readonly cbrService: CbrService) {}

  @GrpcMethod('CbrGrpcServices', 'Create')
  async Create() {
    const res = await this.cbrService.create();
    return {
      statusCode: 'OK',
    };
  }

  @GrpcMethod('CbrGrpcServices', 'FindAll')
  FindAll() {
    return this.cbrService.findAll();
  }

  @GrpcMethod('CbrGrpcServices', 'FindByCode')
  FindByCode(code: FindByIdDto) {
    try{
        return this.cbrService.findOne(code.code);
    }
    catch(e){
      console.log(e)
    }
  }

  @GrpcMethod('CbrGrpcServices', 'Update')
  Update() {
    return this.cbrService.update();
  }
  
}
