import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { Data } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Data[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      (data: Data[]) => {
        this.categories = data;
        console.log(this.categories);
        this.categories.forEach(category => console.log(category.name));
      },
      error => {
        console.error(error);
      }
    );
  }
  trackByCategory(index: number, item: Data): number {
    return item.id;
  }
}
