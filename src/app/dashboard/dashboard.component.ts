import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: any;
  stats: any = {};
  refreshSub!: Subscription;

  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.fetchStats();

    // Refresh data every 30 seconds
    this.refreshSub = interval(30000).subscribe(() => {
      this.fetchStats();
    });
  }

  fetchStats() {
    this.api.getDashboardStats().subscribe({
      next: (res) => (this.stats = res),
      error: (err) => console.error('Error fetching stats:', err),
    });
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    if (this.refreshSub) this.refreshSub.unsubscribe();
  }
}
