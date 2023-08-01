import { Component, Input } from '@angular/core';
import { Friendship } from 'src/models/friendship';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent {
  friendship: Friendship | null = null;

  @Input() set _friendship(friendship: Friendship | null) {
    this.friendship = friendship;
    this.messageService.listenMessages(friendship?.conversationId??'');
    console.log(friendship);
  }

  myEmail = '';

  constructor(private userService: UserService, public messageService: MessageService) {
    this.userService.userInfo.subscribe((user) => {
      this.myEmail = user?.email??'';
    });
  }
}
