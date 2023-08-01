import { Component, Input } from '@angular/core';
import { Friendship } from 'src/models/friendship';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';
import { Message } from 'src/models/message';


@Component({
  selector: 'app-chat-control',
  templateUrl: './chat-control.component.html',
  styleUrls: ['./chat-control.component.scss']
})
export class ChatControlComponent {
  message = '';

  @Input() friendship: Friendship | null=null;
 
  myEmail = '';

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {
    this.userService.userInfo.subscribe((user) => {
      this.myEmail = user?.email??'';
    });
  }

  async send(){
    if(this.message === ''){
      return;
    }
    if(this.myEmail === ''){
      return;
    }
    await this.messageService.send(this.friendship?.conversationId??'', <Message>{
      senderEmail: this.myEmail,
      content: this.message,
      timestamp: 0,
      reciverEmail: this.friendship?.friendEmail??''
    });     
  }
}
