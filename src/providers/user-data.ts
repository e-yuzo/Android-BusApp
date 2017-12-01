import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserOptions } from '../interfaces/user-options';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    public storage: Storage,
    public auth: AngularFireAuth
  ) {this.get_favorite();}
	set_favorite(){
		this.storage.set("favoritos", this._favorites);
		
	}
	get_favorite(){
		this.storage.get("favoritos").then((val) => {
			if(val)
				this._favorites=val;
		
		});
	}

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
	this.set_favorite();
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
	this.set_favorite();
  };

  async login(username: UserOptions) {
    try{
      const ok= await this.auth.auth.signInWithEmailAndPassword(username.username,username.password)
      if( ok){
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.setUsername(username);
        this.events.publish('user:login')
        console.log("Logado com sucesso")
      }
    }
    catch (e){
      console.error("falha na autenticação: "+ e)
    }
  };

  signup(username: UserOptions): void {
    /*
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
    */
    username
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  };

  setUsername(username: UserOptions): void {
    this.storage.set('username', username);
  };

  getUsername(): Promise<UserOptions> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
