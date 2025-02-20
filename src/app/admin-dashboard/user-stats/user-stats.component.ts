import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-xl text-white">
      <h3 class="text-xl font-bold mb-4">User Stats</h3>
      <p>Total Users: {{ users.length }}</p>
      <!-- <p>Admins: {{ users.filter(u => u.role === 'admin').length }}</p> -->
    </div>
  `,
})
export class UserStatsComponent {
  @Input() users: any[] = [];
}