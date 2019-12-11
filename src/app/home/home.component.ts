import { Component, OnInit, Input } from '@angular/core';
import { Alumno } from '../home/alumno';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {
  alumnos = [{title: 'test'}];
  id;
  nombre;
  apellidos;
  edad;
  sexo;
  direccion;
  carrera;
  carrera_id;
  alumnoSelected;
  buttonModificar: boolean = false;
  filtrar;
  datainto;
  filtrarinput;
  token: string;

  constructor(private _router: Router, private api: ApiService){
    this.getAlumnos();
    this.getLocalStorage();
  }

  selectedAlumno: Alumno = new Alumno();

  getLocalStorage(){
    let Token = localStorage.getItem("Token");
    if(Token == "0"){
      this._router.navigate(['../login']);
    }
  }

  Filtrar(){
    let filter = this.filtrar;
    if(filter == 'carrera'){
      let carrera = this.filtrarinput;
      //console.log('this is carrera');
      //console.log(carrera);
      let carreraid;
      if(carrera == 'Desarrollo de software'){
          carreraid = 1;
      }else if(carrera == 'Biomédica'){
          carreraid = 2;
      }else if(carrera == 'Mecatronica'){
          carreraid = 3;
      }else if(carrera == 'Agroindustrial'){
        carreraid = 4;
      }else if(carrera == 'Energía'){
        carreraid = 5;
      }else if(carrera == 'Ambiental'){
        carreraid = 6;
      }else if(carrera == 'Petrolera'){
        carreraid = 7;
      }else if(carrera == 'Tecnologías de Manufactura'){
        carreraid = 8;
      }
      this.api.filterCarrera(carreraid).subscribe(
        data => {
          this.alumnos = data;
          console.log(this.alumnos);
        },
        error => {
          console.log(error);
        }
      );
    }else if(filter == 'nombre'){
      console.log('this is nombre');
      //console.log(this.datainto);
      let nombre = this.filtrarinput;
      this.api.filterNombre(nombre).subscribe(
        data => {
          this.alumnos = data;    
        },
        error => {
          console.log(error);
        }
      );
    }else if(filter == 'edad'){
      console.log('this is edad');
      //console.log(this.datainto);
      let edad = this.filtrarinput;
      this.api.filterEdad(edad).subscribe(
        data => {
          this.alumnos = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  UpdateAlumno(){
      let alumnotoupdate:any;
      alumnotoupdate = {
                      'nombre' : this.nombre,
                      'apellidos': this.apellidos,
                      'edad': this.edad,
                      'sexo': this.sexo,
                      'direccion': this.direccion,
                      'carrera': this.carrera };
      this.api.updateAlumno(this.alumnoSelected.id, alumnotoupdate).subscribe(
        data => {
          this.getAlumnos();
        },
        error => {
          console.log(error);
        }
      );  
    this.Cancelar();
  }

  AddAlumno(){
    let alumnotoadd:any;
    alumnotoadd = {'nombre' : this.nombre,
                    'apellidos': this.apellidos,
                    'edad': this.edad,
                    'sexo': this.sexo,
                    'direccion': this.direccion,
                    'carrera': this.carrera };
    this.api.createAlumno(alumnotoadd).subscribe(
      data => {
        this.alumnos.push(data);
      },
      error => {
        console.log(error);
      }
    );
    this.Cancelar();
  }

  openEdit(alumno){   
    this.api.getOneAlumno(alumno.id).subscribe(
      data => {
        this.id = data.id;
        this.nombre = data.nombre;
        this.apellidos = data.apellidos;
        this.edad = data.edad;
        this.sexo = data.sexo;
        this.direccion = data.direccion;
        this.carrera = data.carrera;
        this.carrera = data.carrera_id;
        this.alumnoSelected = data;
      },
      error => {
        console.log(error);
      }
    );    
  }

  Delete(){
    if(confirm('¿Esta seguro de eliminar el registro?')){
      this.api.deleteAlumno(this.alumnoSelected.id).subscribe(
        data => {
          this.getAlumnos();
        },
        error => {
          console.log(error);
        }
      );
    }
    this.Cancelar();
  }

  Cancelar(){
    this.id = 0;
    this.nombre = '';
    this.apellidos = '';
    this.edad = '';
    this.sexo = '';
    this.direccion = '';
    this.carrera = '';        
    this.alumnoSelected = '';
  }

  ngOnInit() {    
  }

  getAlumnos = () => {
    this.api.getAllAlumnos().subscribe(
      data => {
        this.alumnos = data;
      },
      error => {
        console.log(error)
      }
    );
  }

  SinFiltrar = () => {
    this.filtrar = '';
    this.filtrarinput = '';
    this.api.getAllAlumnos().subscribe(
      data => {
        this.alumnos = data;
      },
      error => {
        console.log(error)
      }
    );    
  }

  cerrarsesion = () => {
    localStorage.setItem("Token", "0");
    this._router.navigate(['../login']);
  }

}
