class Gobang {
    constructor(){
        this.info = {white:{},black:{}};

        this.init();
    }
    init(){
        this.$vue = new Vue({
            el:"#gobang",
            data:{
                rows:[[{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""}],
                      [{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""}],
                      [{type:""},{type:""},{type:"",solid:true},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:"",solid:true},{type:""},{type:""},{type:""}],
                      [{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""}],
                      [{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""}],
                      [{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""}],
                      [{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:"",solid:true},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""}],
                      [{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""}],
                      [{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""}],
                      [{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""}],
                      [{type:""},{type:""},{type:"",solid:true},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:"",solid:true},{type:""},{type:""},{type:""}],
                      [{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""}],
                      [{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""}],
                      [{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""},{type:""}]
                    ]
            },
            methods:{
                created:this.created.bind(this)
            },
            mounted:this.initData
        })
    }
    initData(){
       const rows = this.$el.querySelectorAll(".gobang-row");

       for(let i = 0,len = rows.length;i<len;i++)
       {
           const cols = rows[i].children;

           for(let j = 0,count = cols.length;j<count;j++)
           {    
               const {offsetTop,offsetLeft,offsetWidth,offsetHeight} = cols[j],
                     _layout =  this.rows[i][j];
                
                _layout.x = offsetLeft,_layout.y = offsetTop,
                
                _layout.width = offsetWidth,_layout.height = offsetHeight;
           }
       }
    }
    created(event){
       const {pageX:x,pageY:y} = event;

       for(let i = 0,len = this.$vue.rows.length;i<len;i++)
       {
           const _rows = this.$vue.rows,_row = _rows[i];

           for(let j = 0,count = _row.length;j < count;j++)
           {
                const _col = _row[j],
                      _lx = _col.x - _col.width / 2,_rx = _col.x + _col.width / 2,
                      _ly = _col.y - _col.height / 2,_ry = _col.y + _col.height / 2;
                
                if(x >= _lx && x <= _rx && y >= _ly && y <= _ry)
                {
                    return this.rule(Object.assign(_col,{type:"black",index:j,rowIndex:i}),_row,_rows);
                }
           }
       }  
    }
    rule(current,row,all){
        const {index,rowIndex,type} = current;

        this.info[type] = {top:{value:0},left:{value:0},right:{value:0},bottom:{value:0},
        topLeft:{value:0},topRight:{value:0},bottomLeft:{value:0},bottomRight:{value:0}};

        const _info = this.info[type];

        for(let i = 1;i <= 5;i++)
        {
            const prev = all[rowIndex - i] || [],next = all[rowIndex + i] || [];

            if(_info.top.value != 4)
            { 
                if((prev[index] || {}).type == type){ _info.top.value = _info.top.value + 1; }
            }
            else{ return this.end(current); }

            if(_info.bottom.value != 4)
            {
                if((next[index] || {}).type == type){ _info.bottom.value =  _info.bottom.value + 1; }
            }
            else{ return this.end(current); }

            if(_info.left.value != 4)
            {
                if((row[index - i] || {}).type == type){ _info.left.value =  _info.left.value + 1; }
            }
            else{ return this.end(current); }

            if(_info.right.value != 4)
            {
                if((row[index + i] || {}).type == type){ _info.right.value =  _info.right.value + 1; }
            }
            else{ return this.end(current); }

            if(_info.topLeft.value != 4)
            {
                if((prev[index - i] || {}).type == type){ _info.topLeft.value =  _info.topLeft.value + 1; }
            }
            else{ return this.end(current); }

            if(_info.topRight.value != 4)
            {  
                if((prev[index + i] || {}).type == type){ _info.topRight.value =  _info.topRight.value + 1;}
            }
            else{ return this.end(current); }

            if(_info.bottomLeft.value != 4)
            {
                if((next[index - i] || {}).type == type){ _info.bottomLeft.value =  _info.bottomLeft.vlaue + 1;  }
            }
            else{ return this.end(current); }

            if(_info.bottomRight.value != 4)
            {  
                if((next[index + i] || {}).type == type){ _info.bottomRight.value =  _info.bottomRight.value + 1;  }
            }
            else{ return this.end(current); }

            if(_info.top.value + _info.bottom.value == 4 || _info.left.value + _info.right.value == 4 || _info.topLeft.value + _info.bottomRight.value == 4 || _info.topRight.value + _info.bottomLeft.value == 4)
            {
                return this.end(current);
            }
        }
    }
    end(current){
        alert(current.type + "赢了")
    }
}

new Gobang();