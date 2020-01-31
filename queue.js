class Queue{
    constructor(){
        this.arr = [];
    }

    enqueue(x){
        this.arr.push(x);
    }

    dequeue(){
        if (this.arr.length > 0){
            return this.arr.splice(0, 1)[0];
        }
    }

    first(){
        if (this.arr.length > 0){
            return this.arr[0];
        }
        return null;
    }

    size(){
        return this.arr.length;
    }

    isEmpty(){
        return this.arr.length == 0;
    }
    
}