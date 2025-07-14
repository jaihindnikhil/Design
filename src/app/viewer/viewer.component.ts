import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import * as THREE from 'three';
import * as PhotoSphereViewer from 'photo-sphere-viewer';
import { GyroscopePlugin } from 'photo-sphere-viewer/dist/plugins/gyroscope';
@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit, OnDestroy {
  @Input() image!: string;
  @Output() close = new EventEmitter<void>();
  viewer: any;

  ngOnInit() {
    this.viewer = new PhotoSphereViewer.Viewer({
      container: document.getElementById('viewer')!,
      panorama: this.image,
      navbar: 'zoom move fullscreen',
      plugins: [
        [GyroscopePlugin, { touchmove: true }]
      ]
    });

    this.viewer.once('ready', () => {
      this.viewer.rotate({ longitude: 0, latitude: 0 });
      this.viewer.zoom(90);

      const gyro = this.viewer.getPlugin(GyroscopePlugin);
      if (gyro) gyro.start();
    });
  }

  ngOnDestroy() {
    if (this.viewer) {
      const gyro = this.viewer.getPlugin(GyroscopePlugin);
      if (gyro) gyro.stop();
      this.viewer.destroy();
    }
  }

  onClose() {
    this.close.emit();
  }
}