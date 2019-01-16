import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SharedModule } from '../shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [SearchBoxComponent],
  imports: [
    CommonModule,
    SharedModule,
    Ng2SearchPipeModule
  ]
})
export class SearchModule { }
