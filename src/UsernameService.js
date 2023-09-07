export class UsernameService {
    constructor(username) {
        if (!localStorage.getItem("username") && username) {
            this.username = username
        }
    }

    get username() {
        return localStorage.getItem("username")
    }

    set username(username) {
        localStorage.setItem("username", username)
    }
}