import { Component, OnDestroy, OnInit } from '@angular/core';

import { ShoppingListService } from './shopping-list.service'
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients = [];
  private ingredientChangeSubscription:Subscription
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientChangeSubscription=this.shoppingListService.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients=ingredients
    })
    // this.ingredients = this.shoppingListService.ingredients
    // console.log(this.ingredients)
  }
  ngOnDestroy(){
    this.ingredientChangeSubscription.unsubscribe()
  }
  onEdit(index:number){
    this.shoppingListService.startedEditing.next(index)
  }

  
}
