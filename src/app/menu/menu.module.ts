import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MenuRoutingModule } from './menu-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { MainComponent } from './pages/main/main.component';
import { CategoryComponent } from './pages/category/category.component';

@NgModule({
  declarations: [CategoriesComponent, MainComponent, CategoryComponent],
  imports: [CommonModule, MenuRoutingModule, MatButtonModule],
  exports: [CategoriesComponent, MainComponent],
})
export class MenuModule {}
