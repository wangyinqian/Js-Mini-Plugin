const Private = {
        VUE:null,
        COUNT:42,//方格总长度
        dateTime:"", //日期字符串
        DAYS:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
         //格式化日期
        fomatDate(pattern,time){
            const _date = new Date(Number(time) || new Date().getTime()), //获取日期对象
                _dateTime = _date.toLocaleString().split(" "), //分隔本地化的日期字符串
                _d = _dateTime[0].split(/\/|-/), //分隔年月日部分 
                _t = _dateTime[1].split(":");  //分隔时间部分

            const _data = {y:_d[0],M:_d[1],d:_d[2],h:_t[0],m:_t[1],s:_t[2]} //把年月日时间通过指定的键存储起来
                
            return pattern.replace(/[yMdhms]?/g,(r,n,p)=>_data[r] ? _data[r] < 10 ? ("0" + _data[r]) : _data[r] : ""); //通过替换日期表达式返回指定格式的日期字符串
        },
        //获取此月份的天数
        getDate(){
            const [year,month] = this.dateTime.split(/年|月/,2),
                  _prevNumDay = new Date(year,month - 1,0).getDate(), //获取上一个月的总天数
                  _numDay = new Date(year,month,0).getDate(); //获取当前月份的总天数

            let _day = new Date(year,month - 1,1).getDay(), // 获取当前月份第一天是星期几 注：月份是从零开始算的，所以减一
                _month = 0,_dates = [[],[],[]];
            
            if(_day == 0){ _day = 7 } //如果为零，则赋值为7 注：一周七天，是从0-6算的，其中0代表星期天

            for(let i = 1;i <= this.COUNT;i++)
            {
                if(i > _day) //如果i大于新月份第一天的星期几，则新月份开始，否则记录上一月的日期
                {
                    _month = i - _day;

                    _month <= _numDay ? _dates[1].push(_month) : _dates[2].push(_month - _numDay);  //如果当月的天数结束，则记录下个月的天数

                } else { _dates[0].push(_prevNumDay - _day + i) }
            }

            return _dates;
        },
         //事件处理函数，this指向vue实例
        prev(event){
            let [year,month,day] = Private.dateTime.split(/年|月|日/);

            if(month > 1) 
            {
                month = month - 1,day = 1;
            }
            else
            {
                year = year - 1,month = 12,day = 1;
            }

            this.current = day;

            this.dateTime = Private.dateTime = Private.fomatDate("y年M月d日",new Date(year,month - 1,day).getTime()); 
            
            this.date = Private.getDate();
        },
         //事件处理函数，this指向vue实例
        next(event){
            let [year,month,day] = Private.dateTime.split(/年|月|日/),
                _count = new Date(year,month,0).getDate();
            
            if(month < 12) 
            {
                month = Number(month) + 1,day = 1;
            }
            else
            {
                year = Number(year) + 1,month = 1,day = 1;
            }

            this.current = day;

            this.dateTime = Private.dateTime = Private.fomatDate("y年M月d日",new Date(year,month - 1,day).getTime());

            this.date = Private.getDate();
        },
        //事件处理函数，this指向vue实例
        toDate(event){
            let _day = event.target.textContent;

            this.current = _day;

            _day = _day > 9 ? _day : "0" + _day;

            this.dateTime = Private.dateTime = Private.dateTime.replace(/[\d]{2}日/,_day + "日");
        }
      }

class Calendar {
    constructor(el){
        this.init(el);
    }
    //初始化VUE实例
    init(el){
        Private.VUE = new Vue({
            el:el,
            data:{
                dateTime:Private.dateTime,
                days:Private.DAYS,
                date:[]
            },
             //在Vue实例化成功后执行。
            created(){
                const _day = new Date().getDate();

                this.dateTime = Private.dateTime = Private.fomatDate("y年M月d日");

                this.date = Private.getDate(); 
                
                this.today = this.current = _day != 0 ? _day : 7;

                this.currentClass = "current";
            },
            methods:{
               prev:Private.prev,
               next:Private.next,
               toDate:Private.toDate 
            }
        })
    }
}

new Calendar("#calendar")