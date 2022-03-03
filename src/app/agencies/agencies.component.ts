import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agency } from '@data/models/agency.interface';

@Component({
  selector: 'stk-agencies',
  templateUrl: './agencies.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgenciesComponent implements OnInit {
  agencies: { data?: Agency[]; error?: string } = { data: [], error: '' };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.agencies = this.route.snapshot.data['agencies'];
  }
}
