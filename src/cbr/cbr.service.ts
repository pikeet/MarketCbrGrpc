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
import { ICurrency } from './model/currency.model';
import { CbrFacture } from './types/cbr.type';

@Injectable()
export class CbrService {

  constructor(@InjectDataSource() private DB: DataSource){}

  async transformer (data:any){
    let cbr : ICurrency[] = []
    const toJson :ICbr = JSON.parse(xml2json(data, {spaces:1, compact: true}))

    toJson.ValCurs.Valute.map(valute => {

      if(CbrFacture[Number(valute.NumCode._text)]){
          cbr.push({
            id: Number(valute?.NumCode._text),
            name: CbrFacture[Number(valute.NumCode._text)],
            prefix: valute.CharCode._text,
            value: parseFloat(valute.Value._text.replace(',', '.'))
        })
      }
    })

    return cbr;
  }


  async create() {
    const response = await axios.get('http://www.cbr.ru/scripts/XML_daily.asp', {
        withCredentials: true,
        headers: {
            "Content-Type": "application/xml; charset=windows-1251"
        }
    })

   return this.transformer(response.data)
   .then(async data => {
      await this.DB.getRepository(CbrModel).createQueryBuilder().insert().into(CbrModel).values(data).execute()
      return {
          statusText: "OK"
      }
   
   }) 
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
          currency: [cbr]
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

     return this.transformer(response.data)
     .then(data => {

        data.map(d => (
            this.DB.getRepository(CbrModel).createQueryBuilder().update().set({
                    name: d.name,
                    prefix: d.prefix,
                    value: d.value
        }).where('id = :id', {id: Number(d.id)}).execute()
          
        ))

        return {
            statusText: "OK"
        }
     })
  }

  remove(id: number) {
    return `This action removes a #${id} cbr`;
  }
}
