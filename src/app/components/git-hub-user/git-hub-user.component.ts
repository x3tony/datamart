import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { GithubService } from 'src/app/services/github/github.service';
import { repoUserGit, userGit } from 'src/app/services/model/gitHub.model';

@Component({
  selector: 'app-git-hub-user',
  templateUrl: './git-hub-user.component.html',
  styleUrls: ['./git-hub-user.component.scss']
})
export class GitHubUserComponent implements OnInit {

  infoUser: boolean = false;
  userExists: boolean = true;
  username: string = '';
  userGet: userGit = {} as userGit;
  userRepo: Array<repoUserGit> = [] as Array<repoUserGit>;
  
  constructor(
    private gitHubService: GithubService
  ) { }

  ngOnInit(): void {
  }

  searchUser(): void {
    forkJoin([
      this.gitHubService.getSearchUsers(this.username),
      this.gitHubService.getReposUser(this.username)
    ]).subscribe(([userResponse, reposResponse]) => {

      this.userGet = userResponse;
      this.userRepo = reposResponse;
      this.infoUser = true;
      this.userExists = true;
    }, err => {
      this.infoUser = false;
      this.userExists = false;
      console.log(err)
    });
  }

}
