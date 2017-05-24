import { Component, OnInit ,Input, Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  @Input() imgUrl:string = ''
  @Input() customerStyle:string = ''
  @Output() uploadDone = new EventEmitter<string>()
  private  imageDomain:string ='http://oivkcwaj2.bkt.clouddn.com/'

  constructor() { }

  ngOnInit() {
    this.uploadImage()
  }

  uploadImage() {
      let self = this
      let uploader = window['Qiniu'].uploader({
         runtimes: 'html5,flash,html4',      // 上传模式，依次退化
         browse_button: 'pickfiles',         // 上传选择的点选按钮，必需
         uptoken_url: '/uploadToken',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）

         get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
         // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
         // save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
         domain: 'test',     // bucket域名，下载资源时用到，必需
         container: 'plus',             // 上传区域DOM ID，默认是browser_button的父元素
         max_file_size: '100mb',             // 最大文件体积限制
         flash_swf_url: 'https://cdn.bootcss.com/plupload/2.3.1/Moxie.swf',  //引入flash，相对路径
         max_retries: 3,                     // 上传失败最大重试次数
         dragdrop: true,                     // 开启可拖曳上传
         drop_element: 'plus',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
         chunk_size: '4mb',                  // 分块上传时，每块的体积
         auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传

         init: {
             'FilesAdded': function(up, files) {
                //  plupload.each(files, function(file) {
                     // 文件添加进队列后，处理相关的事情
                //  });
             },
             'BeforeUpload': function(up, file) {
                    // 每个文件上传前，处理相关的事情
             },
             'UploadProgress': function(up, file) {
                    // 每个文件上传时，处理相关的事情
             },
             'FileUploaded': function(up, file, info) {
                    // self.tips("上传成功")
                    // 每个文件上传成功后，处理相关的事情
                    // 其中info是文件上传成功后，服务端返回的json，形式如：
                    // {
                    //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                    //    "key": "gogopher.jpg"
                    //  }
                    // 查看简单反馈
                    var domain = up.getOption('domain');
                   //  var res = JSON.parse(info);
                   //  var sourceLink = domain +"/"+ res.key; 获取上传成功后的文件的Url
                   //  console.log("the sourceLink:"+sourceLink);
                  //  self.imageUrl = constants.getQiniuDomain()+'/'+file.name
                  //  $('#headImg').attr('src','http://oivkcwaj2.bkt.clouddn.com'+'/'+file.name)
                  self.imgUrl = self.imageDomain+file.name
                  self.uploadDone.emit(self.imgUrl)
             },
             'Error': function(up, err, errTip) {
                    //上传出错时，处理相关的事情
                  this.uploadDone.emit(self.imgUrl)

             },
             'UploadComplete': function() {
                    //队列文件处理完毕后，处理相关的事情
                   //  self.tips("上传成功")
             },
             'Key': function(up, file) {
                 // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                 // 该配置必须要在unique_names: false，save_key: false时才生效
                 var key = file.name;
                 return key
             }
         }
     });
     }

}
