import { Injectable } from '@angular/core';
import {Auth, GoogleAuthProvider, signInWithPopup} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth: Auth) { }

  async loginWithGoogle(){
    let providers = new GoogleAuthProvider();
    try{
      let credential = signInWithPopup(this.auth, providers);
      return credential;
    }
    catch(error){
      console.log(error);
    }
    return null;
  }
}
