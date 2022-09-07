import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  getCarParts!: any[];
  getCarPartsSubCat!: any[];
  public carPartsMultiFilterCtrl: FormControl = new FormControl();
  public carPartsSubMultiFilterCtrl: FormControl = new FormControl();
  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter<any>();
  public filteredcarParts: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filteredcarPartsSub: ReplaySubject<any[]> = new ReplaySubject<any[]>(
    1
  );
  createEstimation!: FormGroup;
  set data(data: any[]) {
    this.getCarParts = data;
    this.getCarPartsSubCat = data;
    // load the initial list

    this.filteredcarParts.next(this.data.slice());
    this.filteredcarPartsSub.next(this.data.slice());
  }
  inputValue: string[] = [];
  finalData: any;
  items: any;

  defaultForm = {
    carParts: [],
  };

  defaultForm2 = {
    handicraft: [],
  };

  carParts: any[] = [this.defaultForm];
  handicraft: any[] = [this.defaultForm2];
  filterForm!: FormGroup;
  constructor(public fb: FormBuilder) {}

  onChange($event: any) {
    this.onSelectionChange.emit($event);
  }

  get formArrCat() {
    return this.filterForm.get('categories') as FormArray;
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      categories: this.fb.array([this.initCat()]),
    });

    this.getCarParts = [
      {
        carPartCategoryId: '027005e2-0624-402b-8d4f-c14feef2d99e',
        name: 'Brakes',
        description: 'test',
        carPartSubCategories: [
          {
            carPartSubCategoryId: '11e1bf14-ae47-4702-822c-04b508d112a9',
            carPartCategoryId: '027005e2-0624-402b-8d4f-c14feef2d99e',
            name: 'ABS ring',
            description: 'string',
          },
          {
            carPartSubCategoryId: '32debca1-4455-489c-98d3-f03b1935c670',
            carPartCategoryId: '027005e2-0624-402b-8d4f-c14feef2d99e',
            name: 'Brake discs',
            description: 'string',
          },
          {
            carPartSubCategoryId: '9a9200ca-6781-45b4-bcf9-a3806f488b30',
            carPartCategoryId: '027005e2-0624-402b-8d4f-c14feef2d99e',
            name: 'Brake drums',
            description: 'string',
          },
          {
            carPartSubCategoryId: 'adfb116b-ca65-4e2f-94b3-0125cec676e6',
            carPartCategoryId: '027005e2-0624-402b-8d4f-c14feef2d99e',
            name: 'Brake drums',
            description: 'string',
          },
        ],
      },
      {
        carPartCategoryId: '948020a5-07f9-4889-8737-575a67111008',
        name: 'Engine Parts',
        description: 'test',
        carPartSubCategories: [
          {
            carPartSubCategoryId: '369d046c-25be-475c-b351-e18cd3b84692',
            carPartCategoryId: '948020a5-07f9-4889-8737-575a67111008',
            name: 'Head bolts',
            description: 'test',
          },
          {
            carPartSubCategoryId: '48b2642f-8bc7-47b6-8227-38a60d17fc40',
            carPartCategoryId: '948020a5-07f9-4889-8737-575a67111008',
            name: 'Air filter',
            description: 'test',
          },
          {
            carPartSubCategoryId: 'd0951212-b847-4eb5-b16a-e63a44cdd3d6',
            carPartCategoryId: '948020a5-07f9-4889-8737-575a67111008',
            name: 'Oil filter',
            description: 'test',
          },
        ],
      },
    ];
    this.filteredcarParts.next(this.getCarParts);
  }

  // get car part subcategory
  getCarPartsSubCategory(event: any) {
    let value = event.value;
    this.inputValue = [];
    console.log(value);
    this.inputValue = [...this.inputValue, ...value.carPartSubCategories];
    this.filteredcarPartsSub.next(this.inputValue);
  }
  // create another field for categories
  createCat(array: any, form: any) {
    let formgroup = this.fb.group({
      carPartCategory: ['', Validators.required],
      carPartSubCategory: ['', Validators.required],
      quantity: ['', Validators.required],
      comment: [''],
    });
    this.formArrCat.push(formgroup);
  }

  initCat() {
    return this.fb.group({
      carPartCategory: ['', Validators.required],
      carPartSubCategory: ['', Validators.required],
      quantity: ['', Validators.required],
      comment: [''],
    });
  }

  sendForm() {
    console.log(this.filterForm.value);
  }
}
