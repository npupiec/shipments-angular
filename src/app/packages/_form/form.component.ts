import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { dateValidation } from '../../shared/_validation/customValidate';
import { Package } from '../_models/package.model';
import { Item } from '../_models/item.model';

// Services
import { PackagesService } from '../_services/packages.service';

//Router
import { Router } from '@angular/router';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    dataForm: FormGroup;
    success = '';

    formErrors = {
        required: 'this field is required',
        toLong100: 'max 100 characters',
        toLong20: 'max 20 characters',
        toLong50: 'max 50 characters',
        toLong255: 'max 255 characters',
        atLeast: 'at least0 characters',
        wrong: 'incompatible data format',
        date: 'selected date can not be earlier than today'
    }

    constructor(private packagesService: PackagesService, private form: FormBuilder, private router: Router) { }

    ngOnInit(): void {

        this.dataForm = this.form.group({
            streetAddress: ['', [Validators.required, Validators.maxLength(100)]],
            streetNumber: ['', [Validators.required, Validators.maxLength(20)]],
            postalCode: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[0-9]{2}-[0-9]{3}')]],
            location: ['', [Validators.required, Validators.maxLength(50)]],
            country: ['', [Validators.required, Validators.maxLength(50)]],
            phoneNumber: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^([0-9 ]+)$')]],
            initialTransportDate:['', Validators.compose([ Validators.required, dateValidation()])],
            description:['',[Validators.required, Validators.maxLength(255)]],
            packages: this.form.array([]),
        })
    }

    createPackage(e): void {
        e.preventDefault();
        const formValues = this.dataForm.value;

        const packageVal: Item[] = formValues.packages.map(
            (packageItem: Package) => Object.assign({}, packageItem)
          );
        
        const packageData: Package = {
            streetAddress: formValues.streetAddress,
            streetNumber: formValues.streetNumber,
            postalCode: formValues.postalCode,
            location: formValues.location,
            country: formValues.country,
            phoneNumber: formValues.phoneNumber,
            initialTransportDate: formValues.initialTransportDate,
            description: formValues.description,
            items: packageVal,
            status: formValues.status
        }

        this.packagesService.create(packageData)
            .subscribe(
                data => {
                    console.log(data);
                    return this.success = 'Saved'
                },
                error => {
                    console.error(error);
                });

        this.router.navigateByUrl('/api/packages-list');
    }
    
    get packages() : FormArray {
        return <FormArray>this.dataForm.get('packages');
    }

    buildPac() : FormGroup {
        return this.form.group({
            name: ['', [Validators.required, Validators.maxLength(50)]],
            unit: ['', [Validators.required, Validators.maxLength(20)]],
            quantity: ['', [Validators.required, Validators.minLength(0)]]
        });
    }

    addPac() : void {
    this.packages.push(this.buildPac());
    }

    removePac(i) : void {
    this.packages.removeAt(i);
    }
}
