import { Component, EventEmitter, Output, Input } from '@angular/core';

import { Friendship } from 'src/models/friendship';
import { UserService } from '../../services/user.service';
import { FriendshipService } from '../../services/friendship.service';
import { UserInfo } from 'src/models/user-info';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent {
  friendList: Array<Friendship> = [];
  // @Input() user: UserInfo | null = {
  //   id: 'id-001',
  //   name: 'John',
  //   email: 'test@gmail.com',
  //   avatarUrl:
  //     'https://lh3.googleusercontent.com/fife/AKsag4PREE9Tavp_BC5cpy32qbenx8MoEkGeFS4aFv1B0OPFzxD2fol5yKMCdn5XO6lCxJPjECvwqlh_8l6skRKX9R6wlhrVrEO8qRRKnTZP9gTbNDqhjBKWJnR6E7fhdbGzETwTTfNVrg14Rna15ERd7BDfoQqyjRuX3gTCLnAqw-_7rsKMsZ_CyWmXgZmurZDyuYElGaT7qXuB9igdB5lYmLDJQAUpKjnSERvzg3plLn2QZf0zwN63NXKgOrm1M0-EGfi6dmqE4FPrlQaoZU4G-8MXbb1Sd8gxU6hsDHiReaZ9S48u8gdMzRJmnfTB6WWvakcKBlJ9QyMox3bOLFH3QJ_8AuULznX6jo-vEnyNb1UJU7H2cIeWoitztlAfy7M6bgoumK6Fnk7aJ3rdlxApZYGueRqms29o4chDY4NjbqO0s61V4P0dVfacZSYMDccjDnP2yZD4Heug2msBkRRa4VZGbGTsAyPXQG49zxeDkrE0MCs40_BKzQnJEAsziYiBgOl11l_H3QeMqyIuEpC7y0aq6rN2zaHhVZ4meXUl0Z2a5-uy-KXLk-opJVQo52lZGVW8p30Gx_qE4Z_QtsK706WpqUrApyvorK9UgWku81Pwv59hcjGT_cH92fcxV4KiyaDa0PPNWy4gKezMMiBTl2Hil7cT0XHruaiQ5VU0hOY5N4LbdvM2yHPusHc5KPSEiqv9NmtemHkfZvOxetELtEWEoQ-TZSkoYkIK7djHDh9JR6GD2zjo9SGAg6xwrFrRsigpENU3lrhIN7EO4P414aOzStXvhN4R1gx2_BSQKMGGEZi_nbUHzKXTHEP1Nb9m9PLhgrepTrEzh4PwlJxIMf2lz_9x-hYPGWU4vanS9Mw3RcvCpDMmMrHxOzzFFfFonrpE1c2eekFXcnccR-D6raZ0WawbIi_0X8AlxVANC_nmYC9sQW4ibn-j79NFtkF6S3YoZLYM2hR0LDYlB2cwBDhqzQQ5gz92xGLSNV3AxKZlek5uN4JOtdqJdZjwC9-h-IUYFfSIJNF-8ck-N8iAKhaNlSt6XnLVvA4lI-zWmC-UqdSA0wxy5FfuCDLm_qboP8oj4Q9K_66bBh0mesjjj6Mxl1Vkmg8OtFKEbwmZIQdr5INXtOwTfpAUi5Qlzcgs2l7TdGKJGP_YSyk0PTVOIiAxKV0WcrdsrxPDQnBw9RurlHyGzalrjmZIHZyKcZloWS3trGOaQdKq0pGd5EsKihNxhZNL62OGI9CeAgYIiApR-UPu2-brEITG8yXgKDmAursZpIJX97Zcwhwqf2yUqWilAl-N3iuwCPXLST2T11Loz0wi4GviKc1k8i7tkfkoxBWisv56ImqLjhY=s32-c',
  // };

  @Output() selectedFriend: EventEmitter<Friendship> = new EventEmitter();

  constructor(
    public userService: UserService,
    public friendshipService: FriendshipService
  ) {
    this.userService.userInfo.subscribe((user) => {
      if (user == null) {
        return;
      }
      this.friendshipService.getFriendList(user?.email ?? '');
    });

    this.friendshipService.friendList.subscribe((friendship) => {
      if (friendship == null) {
        return;
      }
      if (
        !this.friendList
          .map((f) => f.friendEmail)
          .includes(friendship.friendEmail)
      ) {
        this.friendList.push(friendship);
      }
    });
  }

  chatWith(friendship: Friendship) {
    console.log(friendship);
    this.selectedFriend.emit(friendship);
  }

  getTotalFriend(): number {
    return this.friendList.length;
  }

  

  deleteFriend(friendship: Friendship): void {
    const index = this.friendList.findIndex(
      (f) => f.conversationId === friendship.conversationId
    );
    if (index !== -1) {
      this.friendList.splice(index, 1);
      this.friendshipService.deleteFriend(friendship).then((success) => {
        if (success) {
          console.log('Friend deleted successfully from Firestore.');
        } else {
          console.log('Failed to delete friend from Firestore.');
        }
      });
    }
  }
}
