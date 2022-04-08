import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreateComponent } from './classes/product/product-create/product-create.component';
import { ProductDetailComponent } from './classes/product/product-detail/product-detail.component';
import { ProductEditComponent } from './classes/product/product-edit/product-edit.component';
import { ProductListComponent } from './classes/product/product-list/product-list.component';
import { RequestCreateComponent } from './classes/request/request-create/request-create.component';
import { RequestDetailComponent } from './classes/request/request-detail/request-detail.component';
import { RequestEditComponent } from './classes/request/request-edit/request-edit.component';
import { RequestListComponent } from './classes/request/request-list/request-list.component';
import { RequestReviewComponent } from './classes/request/request-review/request-review.component';
import { RequestlineCreateComponent } from './classes/requestline/requestline-create/requestline-create.component';
import { UserCreateComponent } from './classes/user/user-create/user-create.component';
import { UserDetailComponent } from './classes/user/user-detail/user-detail.component';
import { UserEditComponent } from './classes/user/user-edit/user-edit.component';
import { UserListComponent } from './classes/user/user-list/user-list.component';
import { UserLoginComponent } from './classes/user/user-login/user-login.component';
import { VendorCreateComponent } from './classes/vendor/vendor-create/vendor-create.component';
import { VendorDetailComponent } from './classes/vendor/vendor-detail/vendor-detail.component';
import { VendorEditComponent } from './classes/vendor/vendor-edit/vendor-edit.component';
import { VendorListComponent } from './classes/vendor/vendor-list/vendor-list.component';
import { AboutComponent } from './core/about/about.component';
import { E404Component } from './core/e404/e404.component';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  {path:"", redirectTo: "/home", pathMatch: "full"},
  {path: "home", component: HomeComponent},
  {path: "about", component: AboutComponent}, 

  {path:"user/list",component:UserListComponent},
  {path:"user/create",component:UserCreateComponent},
  {path:"user/edit/:id",component:UserEditComponent},
  {path: "user/detail/:id", component: UserDetailComponent},

  {path:"vendor/list",component:VendorListComponent},
  {path:"vendor/create",component:VendorCreateComponent},
  {path:"vendor/edit/:id",component:VendorEditComponent},
  {path: "vendor/detail/:id", component: VendorDetailComponent},

  {path: "login", component:UserLoginComponent},

  {path: "request/list", component: RequestListComponent},
  {path: "request/create", component: RequestCreateComponent},
  {path:"request/edit/:id", component: RequestEditComponent},
  {path: "request/detail/:id", component: RequestDetailComponent},

  {path: "product/list", component: ProductListComponent},
  {path: "product/create", component: ProductCreateComponent},
  {path: "product/edit/:id", component: ProductEditComponent},
  {path: "product/detail/:id", component: ProductDetailComponent},

  {path: "request/list/request:id", component: RequestReviewComponent},
  {path: "requestlines/create/:id", component: RequestlineCreateComponent},
  


  {path: "**", component: E404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
