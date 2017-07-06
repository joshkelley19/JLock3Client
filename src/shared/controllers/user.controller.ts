import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Identity } from '../../model/Identity';

export class UserController {
    baseUrl: string;

    constructor(private http: Http, base: string) {
        this.baseUrl = base;
    }

    getUser(id: number, auth: Identity) {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(auth.userName + ':' + auth.password));
        let args: RequestOptionsArgs = {
            headers
        }
        return this.http.get(this.baseUrl + '/user/' + id, args)
            .map(response => {
                return response.json();
            });
    }

    getEntries(id: number, auth: Identity) {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(auth.userName + ':' + auth.password));
        let args: RequestOptionsArgs = {
            headers
        }
        return this.http.get(this.baseUrl + '/entry/' + id, args)
            .map(response => {
                return response.json();
            });
    }
}