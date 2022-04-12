import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { E404Component } from './core/e404/e404.component';
import { MenuComponent } from './menu/menu.component';

import { UserListComponent } from './classes/user/user-list/user-list.component';
import { UserDetailComponent } from './classes/user/user-detail/user-detail.component';
import { UserCreateComponent } from './classes/user/user-create/user-create.component';
import { UserEditComponent } from './classes/user/user-edit/user-edit.component';
import { UserLoginComponent } from './classes/user/user-login/user-login.component';

import { VendorListComponent } from './classes/vendor/vendor-list/vendor-list.component';
import { VendorCreateComponent } from './classes/vendor/vendor-create/vendor-create.component';
import { VendorDetailComponent } from './classes/vendor/vendor-detail/vendor-detail.component';
import { VendorEditComponent } from './classes/vendor/vendor-edit/vendor-edit.component';
import { RequestListComponent } from './classes/request/request-list/request-list.component';
import { RequestDetailComponent } from './classes/request/request-detail/request-detail.component';
import { RequestCreateComponent } from './classes/request/request-create/request-create.component';
import { RequestEditComponent } from './classes/request/request-edit/request-edit.component';
import { ProductListComponent } from './classes/product/product-list/product-list.component';
import { ProductEditComponent } from './classes/product/product-edit/product-edit.component';
import { ProductDetailComponent } from './classes/product/product-detail/product-detail.component';
import { ProductCreateComponent } from './classes/product/product-create/product-create.component';
import { RequestMylistComponent } from './classes/request/request-mylist/request-mylist.component';
import { SearchVendorPipe } from './core/pipes/search-vendor.pipe';
import { SearchUsersPipe } from './core/pipes/search-users.pipe';
import { SearchReviewPipe } from './core/pipes/search-review.pipe';
import { SearchRequestPipe } from './core/pipes/search-request.pipe';
import { SearchProductPipe } from './core/pipes/search-product.pipe';
import { BooldispPipe } from './core/pipes/booldisp.pipe';
import { SortPipe } from './core/pipes/sort.pipe';
import { RequestlineCreateComponent } from './classes/requestline/requestline-create/requestline-create.component';
import { RequestlineEditComponent } from './classes/requestline/requestline-edit/requestline-edit.component';
import { RequestReviewComponent } from './classes/request/request-review/request-review.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    E404Component,
    MenuComponent,
    UserListComponent,
    UserDetailComponent,
    UserCreateComponent,
    UserEditComponent, 
    UserLoginComponent,
    VendorListComponent,
    VendorCreateComponent,
    VendorDetailComponent,
    VendorEditComponent,
    RequestListComponent,
    RequestDetailComponent,
    RequestCreateComponent,
    RequestEditComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductDetailComponent,
    ProductCreateComponent,
    RequestMylistComponent,
    RequestlineEditComponent,
    SortPipe,
    SearchVendorPipe,
    SearchUsersPipe,
    SearchReviewPipe,
    SearchRequestPipe,
    SearchProductPipe,
    BooldispPipe,
    RequestlineCreateComponent,
    RequestReviewComponent,
    
  ],
  imports: [
    BrowserModule,HttpClientModule, FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
