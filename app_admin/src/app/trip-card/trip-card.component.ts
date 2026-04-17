import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent implements OnInit {
  @Input() trip: any;
  @Output() tripDeleted = new EventEmitter<void>();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void { }

  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  public deleteTrip(trip: Trip) {
  if (confirm(`Are you sure you want to delete "${trip.name}"?`)) {
    this.tripDataService.deleteTrip(trip.code).subscribe({
      next: () => {
        this.tripDeleted.emit();
      },
      error: (err) => console.error('Error deleting trip:', err)
    });
  }
}

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}