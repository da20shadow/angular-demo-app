import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {SettingsComponent} from "./settings/settings.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";

const routes: Routes = [
  {path: '', component: ProfileComponent},
  {path: 'edit', component: EditProfileComponent},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
