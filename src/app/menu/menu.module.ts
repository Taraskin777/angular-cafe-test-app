import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MenuRoutingModule } from './menu-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { MainComponent } from './pages/main/main.component';
import { CategoryComponent } from './pages/category/category.component';
import { ModalComponent } from './components/modal/modal.component';
import { AddDishModalComponent } from './components/add-dish-modal/add-dish-modal.component';
import { EditDishModalComponent } from './components/edit-dish-modal/edit-dish-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CategoriesComponent,
    MainComponent,
    CategoryComponent,
    ModalComponent,
    AddDishModalComponent,
    EditDishModalComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  exports: [CategoriesComponent, MainComponent],
})
export class MenuModule {}
