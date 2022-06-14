import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ubicaciones } from '../interfaces/interfaz';
import { UbicacionProvider } from '../providers/ubicacion.provider';

declare var H: any;

@Component({
    selector: 'here-map',
    templateUrl: './here-map.component.html',
    styleUrls: ['./here-map.component.css']
})
export class HereMapComponent implements OnInit {

    @ViewChild("map")
    public mapElement: ElementRef;

    @Input()
    public apikey: any;

    @Input()
    public lat: any;

    @Input()
    public lng: any;

    @Input()
    public width: any;

    @Input()
    public height: any;

    public map: any;

    public ubicaciones: ubicaciones[];

    public constructor(private ubicacioneProvider :UbicacionProvider ) { }

    public ngOnInit() { }

    public ngAfterViewInit(): void {
      let platform = new H.service.Platform({
          apikey: this.apikey
      });
      let defaultLayers = platform.createDefaultLayers();
       this.map = new H.Map(
        this.mapElement.nativeElement,
        defaultLayers.vector.normal.map,
        {
            zoom: 12,
            center: { lat: this.lat, lng: this.lng }
        }
      );
      window.addEventListener('resize', () => this.map.getViewPort().resize());
      let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

      let ui = H.ui.UI.createDefault(this.map, defaultLayers);
      
      this.map.setZoom(12)

      this.ubicacioneProvider.getAll().subscribe({
        next: (reponse: any) => { 
          this.ubicaciones = reponse.listaMarcadores;
          console.log(this.ubicaciones); 
          this.cargarMarcadores();
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete') 
      });
    }

public cargarMarcadores(): void{
  for (const marcador of this.ubicaciones) {
    let LocationOfMarker = { lat: marcador.latitud, lng: marcador.longitud };

    let pngIcon = new H.map.Icon("https://cdn-icons-png.flaticon.com/512/0/619.png", { size: { w: 50, h: 50 } });
  
    
    let marker = new H.map.Marker(LocationOfMarker, { icon: pngIcon });
  
    this.map.addObject(marker); 
  }
}
}