import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  animatetype = '';
  classhere = '';
  constructor(
    private iab: InAppBrowser,
    private admobFree: AdMobFree
  ) { }

  ngOnInit() {
    this.setListener();
    this.loadAd();
  }

  setListener() {
    const promise = new Observable((observer) => {
      document.getElementById('animatediv').addEventListener('animationend',
        () => {
          observer.next(1);
        });
    });
    promise.subscribe(res => this.classhere = '');
  }

  loadAd() {
    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      id: 'ca-app-pub-7653635470519191/5905940482',
      autoShow: true,
      bannerAtTop: false
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare()
      .then(() => {
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here
      })
      .catch(e => console.log(e));
  }

  delaybeforeanimation() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  }

  animate() {
    this.delaybeforeanimation().then(res => {
      if (res) {
        this.classhere = this.animatetype + ' animated';
      }
    });
  }

  visitrepo() {
    this.iab.create('https://github.com/ionicninja/animator', '_blank', 'location=no');
  }

}
