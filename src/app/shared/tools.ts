 class Tools {
   getAge(ageNum:string) {
     if (typeof ageNum === 'undefined' || ageNum === '') {
       return '未知'
     } else {
       var newYear = new Date().getFullYear()
       var num = Number(newYear) - parseInt(ageNum.split('-')[0])
       return num
     }

   }

}

export default new Tools()
