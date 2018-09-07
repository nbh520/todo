const vm = new Vue({
    el: '#app',
    data: {
        todos: [
            {isSelected: false, title: '睡觉'},
            {isSelected: false, title: '吃饭'}
        ],
        title: '',
        cur: ''
    },
    methods: {
        add(){
            this.todos.push({
                isSelected: false,
                title: this.title
            });
            this.title = '';
        },
        remove(todo){
            this.todos = this.todos.filter(item => item !== todo);
        },
        remember(todo){
            this.cur = todo;
        },
        cancel(){
            this.cur = '';
        }
    },
    computed:{
        count(){
            return this.todos.filter(item => !item.isSelected).length;
        }
    },
    directives:{ //自定义
        focus(el, bindings){
            if(bindings.value){
                el.focus();
            }
        }
    },
    created(){ //ajax获取 初始化数据
        this.todos = JSON.parse(localStorage.getItem('data')).length || this.todos;
    },
    watch: {
        todos:{ //watch默认只监控一层的数据变化，深度监控
            handler(){ //默认写成函数 就相当于默认写了个handler
                //loclStorage 默认存的是字符串
                localStorage.setItem('data', JSON.stringify(this.todos));
            },deep: true
        }
    }
})