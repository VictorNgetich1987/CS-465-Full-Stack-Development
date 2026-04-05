import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit {

  public editForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) { }
ngOnInit(): void {
  const tripCode = localStorage.getItem('tripCode') ?? '';

  this.editForm = this.formBuilder.group({
    _id: [],
    code: [tripCode, Validators.required],
    name: ['', Validators.required],
    length: ['', Validators.required],
    start: ['', Validators.required],
    resort: ['', Validators.required],
    perPerson: ['', Validators.required],
    image: ['', Validators.required],
    description: ['', Validators.required],
  });

  this.tripService.getTrip(tripCode).subscribe({
    next: (data: any) => {
      const trip = data[0];
      // Format date to yyyy-MM-dd for the date input
      const formattedDate = new Date(trip.start)
        .toISOString().substring(0, 10);
      trip.start = formattedDate;
      this.editForm.patchValue(trip);
    },
    error: (error: any) => {
      console.log('Error: ' + error);
    }
  });
}
  public onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
    }
  }

  get f() { return this.editForm.controls; }
}