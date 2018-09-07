const vm = new Vue({
    el: '#app',
    data: {
        todos: [
            {isSelected: false, title: '睡觉'},
            {isSelected: false, title: '吃饭'}
        ],
        title: '',
        cur: '',
        hash: ''
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
        filterTodos(){
            if(this.hash === 'all') return this.todos;
            if(this.hash === 'finish') return this.todos.filter(item => item.isSelected);
            if(this.hash === 'unfinish') return this.todos.filter(item => !item.isSelected)
            return this.todos;
        },
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
        this.todos = JSON.parse(localStorage.getItem('data')) || this.todos;
        //监控hash值的变化,如果页面以及有hash了， 重新刷新页面也要获取hash值 
        this.hash = window.location.hash.slice(2) || 'all';
        window.addEventListener('hashchange', () => {
            //当hash值变化 重新操作记录
            this.hash = window.location.hash.slice(2);
        }, false)
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