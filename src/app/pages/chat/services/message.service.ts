import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc,limitToLast, onSnapshot, orderBy, query } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { Message } from 'src/models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private firestore: Firestore) {}

  messages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  listenMessages(conversationId: string){
    let messageCollection = collection(this.firestore, 'message-'+ conversationId);
    let q = query(messageCollection, orderBy('timestamp'), limitToLast(100));
    onSnapshot(q,(snapshot) => {
      let messages = new Array<Message>();
      for(let doc of snapshot.docs){
        let message = doc.data() as Message;
        messages.push(message);
      }
      this.messages.next(messages);
    });
  }

  async send(conversationId: string, message: Message){
    let messageCollection = collection(this.firestore,'message-'+conversationId);
    let currentTime = Date.now();
    message.timestamp = currentTime;

    try{
      await setDoc(doc(messageCollection, currentTime.toString()), message);
      return true;
    }catch(error){
      console.log(error);
      return false;
    }
  }
}
