import * as moment from 'moment';
export class Stardragon{
  name:string;

  image:     string;
  image_url: string;

  species:string;
  rarity:string;
  type:string;

  sex:string;
  gender:string;

  created = moment().format("yyyy-MM-dd");
  approved = moment().format("yyyy-MM-dd");

  designer: string;

  base_price: number;

  description: string;
  link:string;
}
