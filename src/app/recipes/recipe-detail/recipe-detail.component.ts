import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipe:Recipe;
id:number


  constructor(private recipeService:RecipeService,
    private route:ActivatedRoute,
    private router:Router) { }



  ngOnInit(): void {

    this.route.params.subscribe((params:Params)=>{
      this.id=+params['id']
      this.recipe = this.recipeService.getRecipe(this.id)
    })
  }


  ngOnChange(){
    
  }


  onAddToShoppingList(){
    let ingredients=this.recipeService.getIngredients()
    let allowIngredient:boolean=false;
    ingredients.some((value)=>{
      if(value.name == this.recipe.ingredients[0].name)
      {
        allowIngredient= true;
      }
    })
    if(!allowIngredient)
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }


  onEdit(){
     this.router.navigate(['edit'],{relativeTo:this.route}) 
  }


  onDelete(){
    this.recipeService.deleteRecipe(this.id)

    this.router.navigate(['/recipes'])

  }

}

 //OnEdit alternative
    //  this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route}) 
//OnDelete
    // this.router.navigate(['../'],{relativeTo:this.route})
