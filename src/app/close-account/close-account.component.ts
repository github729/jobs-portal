import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-close-account',
  templateUrl: './close-account.component.html',
  styleUrls: ['./close-account.component.css']
})
export class CloseAccountComponent implements OnInit {
  userId: any;

  constructor(private userApi: UserService,
              private route : ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params.id;
    });
  }
  deleteClose() {
    this.userApi.deleteUser(this.userId).subscribe(res => {
      if (res['success']) {
        this.toastr.success(res['message'],'Success');
      }
    });
  }
}
