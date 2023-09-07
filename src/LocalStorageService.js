class responsive {
    constructor(key, value) {
        this.key=key
        this.value=value
        localStorage.setItem(key,value)
    }
}