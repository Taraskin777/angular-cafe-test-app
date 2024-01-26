import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [CommonModule, MenuRoutingModule],
  exports: [CategoriesComponent],
})
export class MenuModule {}
