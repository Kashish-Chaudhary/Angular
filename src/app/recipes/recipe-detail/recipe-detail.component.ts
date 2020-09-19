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
    // console.log(this.recipe)
    // const id=this.route.snapshot.params['id']
    this.route.params.subscribe((params:Params)=>{
      this.id=+params['id']
      this.recipe = this.recipeService.getRecipe(this.id)
      // console.log(this.recipe)
    })
  }
  ngOnChange(){
    
  }
  onAddToShoppingList(){
    let ingredients=this.recipeService.getIngredients()
    let i:boolean=false;
       ingredients.some((value)=>{
      console.log(value.name,this.recipe.ingredients[0].name);
      if(value.name == this.recipe.ingredients[0].name)
      {
        i= true;
      }
    })
    console.log(i)
    if(!i)
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }
  onEdit(){
     this.router.navigate(['edit'],{relativeTo:this.route})
     //alternative
    //  this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route}) 
  }
  onDelete(){
    this.recipeService.deleteRecipe(this.id)
    // this.router.navigate(['../'],{relativeTo:this.route})
    this.router.navigate(['/recipes'])

  }

}
