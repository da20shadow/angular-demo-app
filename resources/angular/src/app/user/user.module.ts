import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SettingsComponent } from './settings/settings.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    SettingsComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule
    ]
})
export class UserModule { }
