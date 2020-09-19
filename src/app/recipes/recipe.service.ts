import {Recipe } from './recipe.model'
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service'
import { Subject } from 'rxjs';


// ShoppingListService
@Injectable()
export class RecipeService{
    // recipeSelected = new Subject<Recipe>()
    recipesChanged = new Subject<Recipe[]>()
    private recipes:Recipe[] = [
        new Recipe('Big Fat Burger',
        'What else you need to say',
        'https://www.tasteofhome.com/wp-content/uploads/2018/01/exps28800_UG143377D12_18_1b_RMS-1-696x696.jpg',
        [
            new Ingredient('Meat',1),
            new Ingredient('french fries',20)
        ])
        ,new Recipe('Tasty Schnitzel',
        'A super tasty schinitzel -  just awesome',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Schnitzel.JPG/1200px-Schnitzel.JPG',
        [
            new Ingredient('Buns',2),
            new Ingredient('Meat',2)
        ])
      
      ];
      constructor(private shoppingListService:ShoppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }
    getRecipe(index:number){
        return this.recipes.slice()[index];

    }
    addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.shoppingListService.addIngredients(ingredients)
    }
    addRecipe(recipe:Recipe){
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())
    }
    updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe
        this.recipesChanged.next(this.recipes.slice())

    }
    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice())

    }
    getIngredients(){
        return this.shoppingListService.getIngredients();
    }
}