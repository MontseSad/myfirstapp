import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent{

    modalRef: BsModalRef; 

    constructor(private _router: Router, private api: ApiService, private modalService: BsModalService){
        this.getLocalStorage();
    }

    user: string;
    password: string;
    newuser: string;
    newpassword: string;
    confirmpassword: string;
    token: string;

    getLocalStorage(){
        let Token = localStorage.getItem("Token");
        if(Token != "0"){
            this._router.navigate(['../home']);
        }
    }

    onLogin(): void{
        let login;
        login = {'username' : this.user,
                 'password': this.password,};
        this.api.login(login).subscribe(
            data => {     
                let token = data.token;       
                localStorage.setItem("Token", token);
                if(data.token !== ""){
                    this._router.navigate(['../home']);
                }               
            },
            error => {
              console.log(error)
            }
          );  
    }

    openModal(template: TemplateRef<any>){
        this.modalRef = this.modalService.show(template);
    }

    AceptNewUser(){
        if(this.newpassword == this.confirmpassword){
            console.log('newuser: ', this.newuser);
            console.log('newpassword: ', this.newpassword);
            console.log('confirmpassword: ', this.confirmpassword);
            let useradd:any;
            useradd = {'username' : this.newuser,
                        'password': this.newpassword};
            this.api.createUser(useradd).subscribe(
            data => {
               console.log(data);
            },
            error => {
                console.log(error);
            }
            );
            this.cerrarmodal(this.modalRef);
        }else{
            alert("Contraseñas no coinciden");
        }
        
    }

    cerrarmodal(modalRef){
        modalRef.hide();
        this.newuser = "";
        this.newpassword = "";
        this.confirmpassword = "";
    }

    ngOnInit(){}
}