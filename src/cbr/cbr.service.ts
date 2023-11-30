import { Injectable } from '@nestjs/common';
import { CreateCbrDto } from './dto/create-cbr.dto';
import { UpdateCbrDto } from './dto/update-cbr.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CbrModel } from 'src/database/models/CbrModel';
import axios from 'axios';
import { xml2json } from 'xml-js';
import { ICbr } from './model/cbr.model';
import { isUtf8 } from 'buffer';
import { Stream } from 'stream';

@Injectable()
export class CbrService {

  constructor(@InjectDataSource() private DB: DataSource){}


  async create() {
    const response = await axios.get('http://www.cbr.ru/scripts/XML_daily.asp', {
        withCredentials: true,
        headers: {
            "Content-Type": "application/xml; charset=windows-1251"
        }
    })

    let cbr:any = []
    const cbr_json:ICbr = JSON.parse(xml2json(response.data, {spaces:1, compact: true}))
    cbr_json.ValCurs.Valute.map(valute => {
      console.log(valute.Name._text.toString());
        cbr.push({
                id: Number(valute?.NumCode._text),
                name: valute.Name._text,
                prefix: valute?.CharCode._text,
                value: parseFloat(valute.Value._text.replace(',', '.'))
            })
        })

    await this.DB.getRepository(CbrModel).createQueryBuilder().insert().into(CbrModel).values([...cbr]).execute()
    return {
        statusText: "OK"
    }
  }

  async findAll() {
    try{
        const cbr = await this.DB.getRepository(CbrModel).createQueryBuilder().select().getMany()
        return {
          statusCode: 'OK',
          currency: cbr
        }
    }catch(e){

    }
  }

  async findOne(id: number) {
    try{
        const cbr =  await this.DB.getRepository(CbrModel).createQueryBuilder().select().where('id = :id', {id: id}).getOne();
        return {
          statusCode: 'OK',
          currency: cbr
        }
    }catch(e){
      console.log(e)
    }
  }

  async update() {
        const response = await axios.get('http://www.cbr.ru/scripts/XML_daily.asp', {
          withCredentials: true,
          headers: {
              "Content-Type": "application/xml; charset=windows-1251"
          }
      })

      const cbr_json:ICbr = JSON.parse(xml2json(response.data, {spaces:1, compact: true}))

      cbr_json.ValCurs.Valute.map(valute => (
          this.DB.getRepository(CbrModel).createQueryBuilder().update().set({
                  name: valute?.CharCode._text,
                  value: parseFloat(valute.Value._text.replace(',', '.'))
      }).where('id = :code', {id: Number(valute.NumCode._text)}).execute()
        
      ))

      return {
          statusText: "OK"
      }
  }

  remove(id: number) {
    return `This action removes a #${id} cbr`;
  }
}
