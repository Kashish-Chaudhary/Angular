import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient }  from '../../shared/ingredient.model'
// import { ShoppingListService } from './shopping-list.service'
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{
  @ViewChild('f',{static:true}) slForm:NgForm
  // @ViewChild('nameInput',{static:true}) nameInputRef:ElementRef
  // @ViewChild('amountInput',{static:true}) amountInputRef:ElementRef
  // @Output() ingredientAdded=new EventEmitter<Ingredient>()
  subscription:Subscription;
  editMode = false
  editedItemIndex:number
  editedItem:Ingredient;
  updatedIngredient:Ingredient
  alreadyPresent=false
  invalidDelete = false;
  constructor(private shoppingListService:ShoppingListService ) { }



  ngOnInit(): void {
    this.subscription= this.shoppingListService.startedEditing.subscribe((index:number)=>{ 
      this.editMode=true
       this.editedItemIndex=index;
       this.editedItem=this.shoppingListService.getIngredient(index);
      //  this.invalidDelete=false
      this.slForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount  
      })
    })
  }




  onSubmit(form:NgForm){
  //   const ingName = this.nameInputRef.nativeElement.value;
  //   const ingAmount = this.amountInputRef.nativeElement.value;
    const ingredients = this.shoppingListService.getIngredients();
    const value=form.value
    const newIngredient = new Ingredient(value.name,value.amount);

    if(this.editMode){
          this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient) }
   
    else{
          let r=ingredients.filter((value)=>{ 
              if(value.name == newIngredient.name) return true;
              return false;
                })
          if(r.length > 0 )
              this.alreadyPresent = true;
          else{
              this.alreadyPresent=false
              this.shoppingListService.onIngredientAdded(newIngredient);
              }
        }
   this.editMode=false
   this.slForm.reset();
  }




  onClear(){
    this.slForm.reset()
    this.editMode = false
  }



  onDelete(form:NgForm){
    const ingredients = this.shoppingListService.getIngredients();
    const value=form.value
    const newIngredient = new Ingredient(value.name,value.amount);
    let r=ingredients.filter((value)=>{ 
      if(value.name == newIngredient.name) return true;
      return false;
       }) 

    if(r.length > 0)
       {
              // console.log(newIngredient.name)
              let i;
              ingredients.some((value,ind)=>{
                if( value.name === newIngredient.name ){
                  i=ind;
                  return true
                }
              })
              this.shoppingListService.deleteIngredient(i)
       }
       
       
       this.invalidDelete=true
       new Promise((resolve,reject)=>{
         setTimeout(()=>{
          this.invalidDelete = false;
          resolve()
         },2000)
       })
       
    
    this.onClear();
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
