import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, onSnapshot, deleteDoc, getDocs } from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';
import {BehaviorSubject} from 'rxjs';
import { Friendship } from 'src/models/friendship';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  constructor(private firestore: Firestore) {}

  friendList: BehaviorSubject<Friendship | null> = new BehaviorSubject<Friendship | null>(null);

  async addFriendship(xEmail: string, yEmail: string): Promise<boolean>{
    let friendshipCollection = collection(this.firestore, 'friendship');
    let friendship = {
      xEmail: xEmail,
      yEmail: yEmail,
      conversationId: Date.now(),
    };
    try{
      await addDoc(friendshipCollection, friendship);
      return true;
    }catch(error){
      console.log(error);
      return false;
    }
  }

  async getFriendList(myEmail: string){
    let friendshipCollection = collection(this.firestore, 'friendship');

    let q1 = query(friendshipCollection, where('xEmail', '==', myEmail));
    onSnapshot(q1,(snapshot) => {
      snapshot.docs.map((doc) => {
        let friendship = doc.data() as Friendship;
        friendship.friendEmail = friendship.yEmail;
        this.friendList.next(friendship);
      });
    });

    let q2 = query(friendshipCollection, where('yEmail', '==', myEmail));
    onSnapshot(q2,(snapshot) => {
      snapshot.docs.map((doc) => {
        let friendship = doc.data() as Friendship;
        friendship.friendEmail = friendship.xEmail;
        this.friendList.next(friendship);
      });
    });
  }

  async deleteFriend(friendship: Friendship): Promise<boolean> {
    let friendshipCollection = collection(this.firestore, 'friendship');
    try {
      let query1 = query(friendshipCollection, where('xEmail', '==', friendship.xEmail), where('yEmail', '==', friendship.yEmail));
      let query2 = query(friendshipCollection, where('xEmail', '==', friendship.yEmail), where('yEmail', '==', friendship.xEmail));

      const snapshot1 = await getDocs(query1);
      snapshot1.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      const snapshot2 = await getDocs(query2);
      snapshot2.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
