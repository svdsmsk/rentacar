import { BrandGetModel } from './../../../Models/BrandGetModel';
import { BrandsService } from './../../../Services/brands.service';
import { CarGetModel } from './../../../Models/CarGetModel';
import { CarsService } from './../../../Services/cars.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
  providers:[BrandsService]
})
export class CarAddComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private carsService: CarsService,
    private brandsService: BrandsService
  ) {}
  carAddForm: FormGroup;
  car: CarGetModel[];
  brands: BrandGetModel[];
  createBrandAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      plate: ['', Validators.required],
      state: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.createBrandAddForm();
    this.brandsService.getBrand().subscribe((data) => {
      this.brands = data;
    });
  }

  add() {
    if (this.carAddForm.valid) {
      this.car = Object.assign({}, this.carAddForm.value);
    }
    this.carsService.addCar(this.car).subscribe((data) => (this.car = data));
  }
}