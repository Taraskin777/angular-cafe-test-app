import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { Categories } from 'src/app/shared/interfaces/categories';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Categories[]> | undefined;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.categories$ = this.dataService.getData();
  }

  trackByCategory(index: number, item: Categories): number {
    return item.id;
  }
}
