import {SweetAlertService} from 'ng2-sweetalert2'
export class BaseHandle {
  public list: Array<any>
  public successHandle(res: any) {
    console.log(res)
    if (res.success) {
      // this.sweetAlertService.swal('处理成功', '', 'success')
      this.list = res.data.list
      console.log("sueecxxx", this.list)
    } else {
      console.log("error")

      // this.sweetAlertService.swal(res.errMsg, '', 'error')
    }
  }

  public errorHandle(res: any) {
    console.log(res)
  }
}
