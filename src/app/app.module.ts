import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ViewChild } from "@angular/core";
import { CKEditorModule } from "ng2-ckeditor";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { UserModule } from "./user/user.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppService } from "../services/app.service";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { AuthGuard } from "../services/auth.guard";
import { PageNotFoundComponent } from "./error/page-not-found/page-not-found.component";
import { InternalServerErrorComponent } from "./error/internal-server-error/internal-server-error.component";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    InternalServerErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    DashboardModule,
    UserModule
  ],
  providers: [AppService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
