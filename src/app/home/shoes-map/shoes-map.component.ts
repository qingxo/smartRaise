import { Component, OnInit } from '@angular/core';
import { OfflineOptions, ControlAnchor, NavigationControlType } from 'angular2-baidu-map';
import { ClientDetailService } from '../client-detail/client-detail.service';
import { ShoesMapService } from './shoes-map.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-shoes-map',
  templateUrl: './shoes-map.component.html',
  styleUrls: ['./shoes-map.component.scss'],
  providers: [ClientDetailService, ShoesMapService]
})
export class ShoesMapComponent implements OnInit {

  opts: any = { center: { 'longitude': 121.506191, 'latitude': 31.245554 } };
  offlineOpts: OfflineOptions;
  userInfo: any = {};
  myAk: string = 'fhchSIWoAsUs65ZMsrDqrtMGgPYoSubW';
  userId: string = '';
  list: Array<any> = [];
  list0: Array<any> = [];
  list1: Array<any> = [];
  list2: Array<any> = [];
  posList: Array<any> = [];
  localPosLen: number = 0;  // 这是地图上鞋子的id的个数
  pageSize: number = 10;
  pageNumber: number = 1;
  mobile: string = "";
  shoesNo: string = '';
  markers: Array<any> = [];
  markersPos: Array<any> = [];
  mk2: Array<any> = [];
  chooseDate: string = moment(new Date()).format('YYYY-MM-DD');
  // chooseDate: string = '2017-09-23'
  constructor(private clientDetailService: ClientDetailService, private shoesMapService: ShoesMapService, private route: ActivatedRoute) { }


  ngOnInit() {
    this.offlineOpts = {
      retryInterval: 5000,
      txt: 'NO-NETWORK'
    };
    this.userId = this.route.snapshot.params['userId'];
    this.mobile = this.route.snapshot.params['mobile'];
    this.getUserInfo();
    this.getAccidentInfo();
    this.getLocalPosition();
  }
  shoeDate(date) {
    this.chooseDate = date;
    this.getAccidentInfo();
    this.getLocalPosition();
  }

  createMakders(posx, posy, content?, img?) {
    return {
      'longitude': posx,
      'latitude': posy,
      'width': '52',
      'height': '52',
      'content': content,
      'enableDragging': false,
      'icon': img === 'start' ? '/assets/images/icon-map-start.png' : '/assets/images/icon-map-normal.png'
    }
  }

  createLines(centerx, centery) {
    this.opts = {
      center: {
        longitude: centerx,
        latitude: centery
      },
      zoom: 17,
      markers: this.markers,
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
      polyCtrl: {
        setStrokeWeight: 2,
        setStrokeOpacity: 0.4,
        setStrokeColor: 'blue',
        setPath: this.localPosLen > 1 ? [this.markersPos, this.mk2] : [this.markersPos]
      }
    };

    console.log(this.opts)

  }

  initMakers() {
    this.markers = [];
    this.markersPos = [];
    let obj = {};
    if (this.localPosLen === 0) {
      return
    }
    for (let i = 0; i < this.list0.length; i++) {
      if (i == 0) {
        this.markers.push(this.createMakders(this.list0[i]['longitude'], this.list0[i]['latitude'], this.list0[i]['localDt'], 'start'));
      } else {
        this.markers.push(this.createMakders(this.list0[i]['longitude'], this.list0[i]['latitude'], this.list0[i]['localDt']));
      }
      obj[this.list0[i]['longitude'] + ',' + this.list0[i]['latitude']] = 1
    }
    let keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      let tps = keys[i].split(',')
      this.markersPos.push([Number(tps[0]), Number(tps[1])])
    }

    if (this.localPosLen > 1) {
      let obj2 = {};
      for (let i = 0; i < this.list1.length; i++) {
        if (i === 0) {
          this.markers.push(this.createMakders(this.list1[i]['longitude'], this.list1[i]['latitude'], this.list1[i]['localDt'], 'start'));
        } else {
          this.markers.push(this.createMakders(this.list1[i]['longitude'], this.list1[i]['latitude'], this.list1[i]['localDt']));
        }
        obj2[this.list1[i]['longitude'] + ',' + this.list1[i]['latitude']] = 1
      }
      let keys = Object.keys(obj2)
      for (let i = 0; i < keys.length; i++) {
        let tps = keys[i].split(',')
        this.mk2.push([Number(tps[0]), Number(tps[1])])
      }
    }

    this.createLines(parseFloat(this.list0[0]['longitude']), parseFloat(this.list0[0]['latitude']));
  }

  getAccidentInfo() {
    let data = {
      "pageSize": this.pageSize,
      "pageNumber": this.pageNumber,
      "mobile": this.mobile,
      "date": this.chooseDate
    }
    this.shoesMapService.getAccidentInfo(data).subscribe((res) => {
      if (res.success) {
        if (res.data !== null) {
          let tmp = Object.keys(res.data.pMap);
          this.posList = []
          for (let i = 0; i < tmp.length; i++) {
            for (let j = 0; j < res.data.pMap[tmp[i]].length; j++) {
              this.posList.push(res.data.pMap[tmp[i]][j]);
            }
          }
        }
      }
    })
  }

  getLocalPosition() {
    let data = {
      "pageSize": this.pageSize,
      "pageNumber": this.pageNumber,
      "mobile": this.mobile,
      "date": this.chooseDate
    }
    this.shoesMapService.getLocalPos(data).subscribe((res) => {
      if (res.success) {
        if (res.data.pMap) {
          let tmp = Object.keys(res.data.pMap);
          this.localPosLen = tmp.length;
          if (tmp.length > 0) {

            for (let i = 0; i < this.localPosLen; i++) {
              if (i === 0) {
                this.list0 = res.data.pMap[tmp[i]]
              } else if (i === 1) {
                this.list1 = res.data.pMap[tmp[i]]
              } else if (i === 2) {
                this.list2 = res.data.pMap[tmp[i]]
              }
            }
            this.initMakers()

          }
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
