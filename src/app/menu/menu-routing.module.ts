import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './pages/category/category.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [{ path: 'category', component: CategoryComponent },{ path: '', component: MainComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
