import { Component } from '@angular/core';
import { Creature } from './shared/models/creature';
import { MainService } from './shared/services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: Creature[] = [];
  title = 'RPGServer';

  ngOnInit() {
    this.mainService.getAllCreatures().subscribe((res) => {
      this.data = res;
    })
  }

  constructor(private mainService: MainService) {

  }
}
