import { Component, HostListener, OnInit } from '@angular/core';
import { Area, Zone } from 'src/app/model/zone.interface';
import { ZonesService } from 'src/app/services/zones.service';

@Component({
  selector: 'app-svgmap',
  templateUrl: './svgmap.component.html',
  styleUrls: ['./svgmap.component.css'],
})
export class SvgmapComponent{

  zones: Zone[] = []
  zone!: Zone | undefined
  areas!:Area[]

  constructor(private zoneService:ZonesService){
    this.zones = this.zoneService.getZones()
    localStorage.clear()

      this.searchZone('CO-SAN')
  }

  idElement!: string
  oldHtmlElement!: HTMLElement

  activeZone(event: Event) {
    if(this.checkStorage()){
      const idZone = localStorage.getItem('element-id')
      const elementPath = event.target as HTMLElement;

      if(idZone === elementPath.id){
        elementPath.classList.add('active')
        this.searchZone(elementPath.id)
      }else{
        this.oldHtmlElement.classList.remove('active')
        elementPath.classList.add('active')
        this.initStorage(elementPath)
        this.searchZone(elementPath.id)
      }
    }else{
      const elementPath = event.target as HTMLElement;
      elementPath.classList.add('active')
      this.initStorage(elementPath)
      this.searchZone(elementPath.id)
    }

    var zones = document.getElementsByClassName('swaypzone');
    for (var i = 0; i < zones.length; i++) {
      var zone = zones[i];
      zone.classList.add('outZone');
    }
  }

  initStorage(html:HTMLElement){
    this.oldHtmlElement = html
    localStorage.setItem('element-id', html.id)
  }

  checkStorage(): boolean {
    return localStorage.getItem('element-id') ? true : false
  }

  searchZone(idZone:string){
   this.zone = this.zones.find(zone => zone.id == idZone)
   if(this.zone != null){
    this.areas = this.zone.areas
   }else{
    this.areas = []
   }
  }
}
