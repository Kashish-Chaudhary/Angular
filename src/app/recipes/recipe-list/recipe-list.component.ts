import { Component, OnInit, EventEmitter,Output, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {Recipe} from '../recipe.model'
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

// @Output() recipeWasSelected = new EventEmitter<Recipe>();
recipesChangedSubscription:Subscription;
  constructor(private recipeService:RecipeService,
    private router:Router,
    private route : ActivatedRoute
    ) { }
  recipes:Recipe[]
  ngOnInit(): void {
    this.recipesChangedSubscription=this.recipeService.recipesChanged.subscribe((recipes:Recipe[])=>{
      console.log(recipes)
      this.recipes = recipes
    })
    this.recipes = this.recipeService.getRecipes()
    
  }
  // onRecipeSelected(recipe:Recipe){
  //   console.log(recipe)
  //   this.recipeWasSelected.emit(recipe);
  // }
onNewRecipe(){
  this.router.navigate(['new'],{relativeTo:this.route})
}

ngOnDestroy(){
  this.recipesChangedSubscription.unsubscribe()
}

}
