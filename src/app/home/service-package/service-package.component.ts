import { Component, OnInit, OnChanges, SimpleChange, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { ServicePackageService } from './service-package.service';
import tools from '../../shared/tools';
import { PackageDialogComponent } from '../package-dialog';
import { PkginfoDialogComponent } from '../pkginfo-dialog';
@Component({
  selector: 'app-service-package',
  templateUrl: './service-package.component.html',
  styleUrls: ['./service-package.component.scss'],
  providers: [ServicePackageService]
})
export class ServicePackageComponent implements OnInit {
  private pageSize = 10;
  private pageNumber = 1;
  private pages: Array<any> = [];
  private list: Array<any> = [];
  private queryInfo = '';
  private totalPage: string;
  private clickItem: any;
  private servicePackageBtn: any;
  constructor(private servicePackageService: ServicePackageService, private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.packageList();
    this.initBtnShow();
  }

  initBtnShow() {
    this.servicePackageBtn = tools.initBtnShow(0, 1, 'servicePackageBtn');
  }

  handleShow(packageId) {
    const componentFatory = this.componentFactoryResolver.resolveComponentFactory(PkginfoDialogComponent);
    const containerRef = this.viewContainerRef;
    containerRef.clear();
    const dd = <PkginfoDialogComponent>containerRef.createComponent(componentFatory).instance;
    dd.pkgId = packageId;

  }

  openModal(packageId) {
    const componentFatory = this.componentFactoryResolver.resolveComponentFactory(PackageDialogComponent);
    const containerRef = this.viewContainerRef;
    containerRef.clear();
    const dd = <PackageDialogComponent>containerRef.createComponent(componentFatory).instance;
    dd.packageId = packageId;
    if (packageId === '') {
      dd.showList = this.packageList.bind(this);
    }
  }

  handlePackageConfirm(data) {
    this.clickItem = data;
    const msg = data.item.statue === '0' ? '上架' : '下架';
    tools.tipsConfirm(`确认需要${msg}?`, '', 'warning', this.handlePackageStatus.bind(this));
  }

  handlePackageStatus() {
    const data = this.clickItem;
    let status = typeof data.item.statue === 'undefined' ? 0 : parseInt(data.item.statue, 10);
    status === 1 ? status = 0 : status = 1;
    const param = { 'servicePackId': data.item.servicePackId, 'statue': status };

    this.servicePackageService.changeStatus(param).subscribe((res) => {
      if (res.success) {
        tools.tips(status === 0 ? '下架成功' : '上架成功', '', 'success');
        status === 1 ? data.item.statue = 1 : data.item.statue = 0;
      } else {
        tools.tips(res.errMsg, '', 'error');
      }
    });
  }

  searchTable(queryInfo: string) {
    this.queryInfo = queryInfo;
    this.pageNumber = 1;
    this.packageList();
  }

  pageTurning(number) {
    this.pageNumber = number;
    this.packageList();
  }

  packageList() {
    const data = {
      'pageSize': this.pageSize,
      'pageNum': this.pageNumber,
      'query': this.queryInfo
    };
    this.servicePackageService.packageList(data).subscribe((res) => {
      if (res.success) {
        this.list = res.data.list;
        this.pages = res.data.navigatepageNums;
        this.pageNumber = res.data.pageNum;
        this.totalPage = res.data.total;
      }

    });
  }

}
