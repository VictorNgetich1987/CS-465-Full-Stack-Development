import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, RouterModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css'
})
export class TripListingComponent implements OnInit {

  trips: any[] = [];
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private cdr: ChangeDetectorRef  // ← ADD THIS
  ) {
    console.log('trip-listing constructor');
  }

  ngOnInit(): void {
    this.tripDataService.getTrips().subscribe({
      next: (data: any) => {
        this.trips = Array.isArray(data) ? data : [data];
        this.cdr.detectChanges();  // ← ADD THIS
        console.log('Trips set:', this.trips.length);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    });
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }
}