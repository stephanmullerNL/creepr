import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-find-user',
    templateUrl: './find-user.component.html',
    styleUrls: ['./find-user.component.scss']
})
export class FindUserComponent {
    @Input() placeholder = 'username';
    @Output() error: EventEmitter<string> = new EventEmitter<string>();

    constructor(private router: Router,
                private userService: UserService) {
    }

    getUserInfo(username: string): void {
        this.userService.lookupAccountNames([username])
            .then((accounts: User[]) => {
                this.router.navigate(['/', `@${accounts[0].name}`]);
            })
            .catch((error) => {
                this.error.emit(error);
            });
    }

}
