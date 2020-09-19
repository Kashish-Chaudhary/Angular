import { Ingredient}  from '../shared/ingredient.model'
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';


export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>()
    startedEditing =new Subject<number>()
  private  ingredients:Ingredient[]=[
        new Ingredient("apples",12),
        new Ingredient("mangoes",18)
      
      ];
      getIngredient(index:number){
        return this.ingredients[index];
      } 
      onIngredientAdded(newIngredient:Ingredient){
        this.ingredients.push(newIngredient)
        this.ingredientsChanged.next(this.ingredients.slice())
        console.log(this.ingredients)
      }
      getIngredients(){
          return this.ingredients.slice();
      }
      addIngredients(ingredients:Ingredient[]){
          this.ingredients.push(...ingredients)
          console.log(this.ingredients)
          this.ingredientsChanged.next(this.ingredients.slice());
      }
      updateIngredient(index:number,newIngredient:Ingredient){
        this.ingredients[index]=newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice())
      }
      deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
}