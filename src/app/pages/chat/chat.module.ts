import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './component/chat/chat.component';
import { UserInfoComponent } from './component/user-info/user-info.component';
import { FriendListComponent } from './component/friend-list/friend-list.component';
import { ChatBoxComponent } from './component/chat-box/chat-box.component';
import { ChatControlComponent } from './component/chat-control/chat-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChatComponent,
    UserInfoComponent,
    FriendListComponent,
    ChatBoxComponent,
    ChatControlComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule
  ]
})
export class ChatModule { }
