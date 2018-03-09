import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AjustesUsuarioPage } from '../ajustes-usuario/ajustes-usuario';
import { RoomPage } from '../room/room';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ContactPage;
  tab3Root = RoomPage;

  constructor() {

  }
}