import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { Categories } from 'src/app/shared/interfaces/categories';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Categories[]> | undefined;
  authorizedUser$: Observable<boolean> | undefined;

  constructor(
    private dataService: DataService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.dataService.getData();
    this.authorizedUser$ = this.auth.currentAuth$;
  }

  trackByCategory(index: number, item: Categories): number {
    return item.id;
  }
}
