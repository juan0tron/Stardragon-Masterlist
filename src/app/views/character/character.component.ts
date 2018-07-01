import { Component }  from '@angular/core';

@Component({
  selector: 'character',
  templateUrl: './character.template.html',
  providers: []
})
export class CharacterComponent {

  public characterStats = {
    "name":    "Alduen Farstrider (Al-du-wen)",
    "age":     "19",
    "height":  "5′4″ (5′11″ with horns)",
    "weight":  "136 lbs",
    "species": "Stareater",
    "Relationship status": "Single",
    "family":{
      "father":   "Elrich Farstrider (Severely ill, on his deathbed)",
      "mother":   "Azeala Farstrider (Deceased - Died in childbirth)",
      "siblings": "8 younger sisters",
    }
  };

  constructor(){}

}
