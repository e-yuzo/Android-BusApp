import { Component, ViewChild } from '@angular/core';

import { AlertController, App, FabContainer, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment';

import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';


@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  hora: any;
  buttonIcon: string = "star-outline";
  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public confData: ConferenceData,
    public user: UserData,
  ) {this.sethora();}
 
  sethora(){
	  this.hora= new Date();
	  setTimeout(()=>{this.sethora()}, 1000); 
  }
  setnext(horario: any){
    if(horario){
      var d= parseFloat(this.hora.getHours());
      var e= parseFloat(this.hora.getMinutes());
      var i=0
      for(;i<horario.length && parseFloat(horario[i].split(":")[0])*60+parseFloat(horario[i].split(":")[1]) < d*60+e ;i++);

    }
    return horario[i]? horario[i]:"Desculpe temos ônibus so amanhá clique para mais informações!"
  }
  ionViewDidLoad() {
    this.app.setTitle('Schedule');
    this.updateSchedule();

    setTimeout( ()=>{
      this.updateSchedule();
    },1000)
  }

  async updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems();

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }

  goToSessionDetail(sessionData: any) {
    // go to the session detail page
    // and pass in the session data

    this.navCtrl.push(SessionDetailPage, { sessionId: sessionData.id, name: sessionData.name });
  }

  addFavorite(sessionData: any) {

    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite( sessionData);
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);
    }

  }

  removeFavorite(sessionData: any) {
            this.user.removeFavorite(sessionData.name);
            this.updateSchedule();
  }

  openSocial(network: string, fab: FabContainer) {
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
  }

  toggleIcon() {
    
        if (this.buttonIcon === 'star') {
          this.buttonIcon = "star-outline";
        }
        else if (this.buttonIcon === 'star-outline') {
          this.buttonIcon = "star";
  }
}

  doRefresh(refresher: Refresher) {
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;

      // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(() => {
        refresher.complete();

        const toast = this.toastCtrl.create({
          message: 'Sessions have been updated.',
          duration: 3000
        });
        toast.present();
      }, 1000);
    });
  }
  
  verificaFavorito(sessionData: any){
    if (this.user.hasFavorite(sessionData.name)) {
      return "star";
    }
    else{
      return 'star-outline';
    }
  }

}

