import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthModule } from './auth/auth.module';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    AuthModule,
    CoreRoutingModule,
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
