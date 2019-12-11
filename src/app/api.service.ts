import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Alumno } from './home/alumno';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //baseurl = "http://ec2-54-198-45-95.compute-1.amazonaws.com"
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getAllAlumnos(): Observable<any>{
    let header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token '+localStorage.getItem("Token"));
    return this.http.get(this.baseurl + '/sistemasoperativos/admin/alumnos_lista/', 
    {headers: header})
  }

  getOneAlumno(id): Observable<any>{
    let header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token '+localStorage.getItem("Token"));
    return this.http.get(this.baseurl + '/sistemasoperativos/admin/alumnosviewdetail/' +id, 
    {headers: header})
  }
  
  deleteAlumno(id): Observable<any>{
    let header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token '+localStorage.getItem("Token"));
    return this.http.delete(this.baseurl + '/sistemasoperativos/admin/alumnos_detail/' + id,
    {headers: header});
  }

  filterCarrera(carrera): Observable<any>{
    let header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token '+localStorage.getItem("Token"));
    return this.http.get(this.baseurl + '/sistemasoperativos/admin/alumnosviewdetailcarrera/' + carrera, 
    {headers: header})
  }

  filterNombre(nombre): Observable<any>{
    let header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token '+localStorage.getItem("Token"));
    return this.http.get(this.baseurl + '/sistemasoperativos/admin/alumnosviewdetailnombre/'+ nombre, 
    {headers: header})
  }

  filterEdad(edad): Observable<any>{
    let header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token '+localStorage.getItem("Token"));
    return this.http.get(this.baseurl + '/sistemasoperativos/admin/alumnosviewdetailedad/' + edad, 
    {headers: header})
  }

  createAlumno(alumno): Observable<any>{
    let header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token '+localStorage.getItem("Token"));
    const body = {
      nombre: alumno.nombre, 
      apellidos: alumno.apellidos,
      edad: Number(alumno.edad), 
      sexo: alumno.sexo,
      direccion: alumno.direccion,
      carrera_id: Number(alumno.carrera)
    };
    return this.http.post(this.baseurl + '/sistemasoperativos/admin/alumnos_lista/', body,
    {headers: header}).pipe(catchError(this.handleError));
  }

  handleError(err){
    if(err instanceof HttpErrorResponse){      
    }else{}
    return throwError(err);
  }

  login(login): Observable<any>{
    const body = {
      username: login.username,
      password: login.password
    };
    return this.http.post(this.baseurl + '/sistemasoperativos/login/', body,
    {headers: this.httpHeaders});
  }

  createUser(useradd): Observable<any>{
    const body={
      username: useradd.username,
      password: useradd.password,
      is_superuser: true
    };
    return this.http.post(this.baseurl + '/sistemasoperativos/admin/adduser/', body,
    {headers: this.httpHeaders});
  }

  updateAlumno(id, alumno): Observable<any>{
    let header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Token '+localStorage.getItem("Token"));
    const body = {
      id: id,
      nombre: alumno.nombre, 
      apellidos: alumno.apellidos,
      edad: Number(alumno.edad), 
      sexo: alumno.sexo,
      direccion: alumno.direccion,
      carrera_id: Number(alumno.carrera)
    };
    return this.http.put(this.baseurl + '/sistemasoperativos/admin/alumnos_detail/' + id, JSON.stringify(body), 
    {headers: header});
  }
}
