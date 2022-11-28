import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule, //be kell importálni, különben nem megy majd a routerLink
    MatToolbarModule,
    MatIconModule
  ],
  exports: [
    MenuComponent,
  ]
})
export class CoreModule { }
