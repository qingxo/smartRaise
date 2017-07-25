export class BaseHandle {
  public list: Array<any>
  public successHandle(res: any) {
    console.log(res)
    if (res.success) {
      this.list = res.data.list
      console.log("sueecxxx", this.list)
    } else {
      console.log("error")
    }
  }

  public errorHandle(res: any) {
    console.log(res)
  }
}
