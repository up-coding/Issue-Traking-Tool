import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SearchBoxComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SearchModule { }
