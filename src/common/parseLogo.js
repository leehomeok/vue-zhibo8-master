export  function parseLogo(list) {
    let teamlogo="http://www.sinaimg.cn/lf/sports/logo85/";
  for(let i=0,len=list.length;i<len;i++){
    let startIndex=list[i].c4T1URL.lastIndexOf("=")+1;
    let tm1_id=list[i].c4T1URL.substr(startIndex,list[i].c4T1URL.length);
    let tm2_id=list[i].c4T2URL.substr(startIndex,list[i].c4T2URL.length);
    list[i].tm1_img  =   teamlogo+tm1_id +".png";
    list[i].tm2_img  =   teamlogo+tm2_id +".png";
  }
  return list;
}

export function compare(obj1,obj2){
         var val1= parseInt(obj1.c2.substr(0,2)+obj1.c2.substr(3,2)+obj1.c3.substr(0,2)+obj1.c3.substr(3,2));
         var  val2=parseInt(obj2.c2.substr(0,2)+obj2.c2.substr(3,2)+obj2.c3.substr(0,2)+obj2.c3.substr(3,2));
           if (val1 < val2) {
             return -1;
        } else if (val1 > val2) {
            return 1;
         } else {
           return 0;
        }  
 }