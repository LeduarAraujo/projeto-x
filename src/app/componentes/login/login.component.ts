import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userId: string;
  password: string;
  ipAddres: any;

  private token: string;

  constructor(private http: HttpClient) {
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {
        this.ipAddres = data.ip;
      })
  }

  ngOnInit() {

  }

  logar(formLogin: NgForm) {

    if (!formLogin.valid) {
      alert("Preencha os campos.")
      return;
    }

    const jsAuth: any = {
      userId: this.userId,
      password: this.password,
      ipAddres: this.ipAddres
    }

    this.http.post<{ msg: string, token: string, expiresIn: number }>("http://localhost:3000/api/autenticao/login", jsAuth)
      .subscribe(response => {

        this.token = response.token;
        const tmSecao = response.expiresIn;
        
        alert("Bem vindo !");
      }, err => {
        alert("Usuário/Senha errado.");
      });
  }

}
