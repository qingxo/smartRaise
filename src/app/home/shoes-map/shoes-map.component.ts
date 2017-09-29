import { Component, OnInit } from '@angular/core';
import { OfflineOptions, ControlAnchor, NavigationControlType } from 'angular2-baidu-map';
import { ClientDetailService } from '../client-detail/client-detail.service';
import { ShoesMapService } from './shoes-map.service';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-shoes-map',
  templateUrl: './shoes-map.component.html',
  styleUrls: ['./shoes-map.component.scss'],
  providers: [ClientDetailService, ShoesMapService]
})
export class ShoesMapComponent implements OnInit {

  opts: any;
  offlineOpts: OfflineOptions;
  userInfo: any = {};
  myAk: string = 'fhchSIWoAsUs65ZMsrDqrtMGgPYoSubW';
  userId: string = '';
  list: Array<any> = [];
  pageSize: number = 10;
  pageNumber: number = 1;
  mobile: string = "";
  shoesNo: string = '';
  constructor(private clientDetailService: ClientDetailService, private shoesMapService: ShoesMapService, private route: ActivatedRoute) { }


  ngOnInit() {
    this.opts = {
      center: {
        longitude: 121.506191,
        latitude: 31.245554
      },
      zoom: 17,
      markers: [{
        longitude: 121.506191,
        latitude: 31.245554,
        icon: '/assets/images/gg.png',
        title: 'Where',
        width: '52',
        height: '52',
        content: 'Put description here',
        enableDragging: false
      }, {
        longitude: 121.506191,
        latitude: 31.255555,
        title: 'P2',
        content: 'Put description here',
        enableDragging: false
      }],
      geolocationCtrl: {
        anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT
      },
      scaleCtrl: {
        anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
      },
      overviewCtrl: {
        isOpen: true
      },
      navCtrl: {
        type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE
      },
      polyCtrl: {//设置折线的点数组
        setStrokeWeight: 2,
        setStrokeOpacity: 0.2,
        setStrokeColor: 'red',
        setPath: [[121.506191, 31.245554], [121.506191, 31.255555], [121.508191, 31.225555]]
      }
    };

    this.offlineOpts = {
      retryInterval: 5000,
      txt: 'NO-NETWORK'
    };
    this.userId = this.route.snapshot.params['userId'];
    this.mobile = this.route.snapshot.params['mobile'];
    this.getUserInfo();
    this.getAccidentInfo();
  }

  getAccidentInfo() {
    let data = {
      "pageSize": this.pageSize,
      "pageNumber": this.pageNumber
    }
    this.shoesMapService.getAccidentInfo(data).subscribe((res) => {
      if (res.success) {
        if (res.data !== null) {
          this.list = res.data
        } else {
          this.list = []
        }
      }
    })
  }

  getUserInfo() {
    this.clientDetailService.getUserInfo(this.userId).subscribe((res) => {
      if (res.success) {
        this.userInfo = res.data;
      }
    });
  }

  loadMap(map: any) {
    console.log('map instance here', map);
  }

  clickMarker(marker: any) {
    console.log('The clicked marker is', marker);
  }

  clickmap(e: any) {
    console.log(`Map clicked with coordinate: ${e.point.lng}, ${e.point.lat}`);
  }

}
