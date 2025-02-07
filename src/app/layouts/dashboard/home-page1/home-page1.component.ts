import { Component } from '@angular/core';
import { KeenslidercommonComponent } from '../../../shared/components/keenslidercommon/keenslidercommon.component';

@Component({
    selector: 'app-home-page1',
    imports: [KeenslidercommonComponent],
    templateUrl: './home-page1.component.html',
    styleUrl: './home-page1.component.scss'
})
export class HomePage1Component {
    slides = [
        { content: "Slide 1", description: "Description for slide 1", thumbnailContent: "Thumb 1" },
        { content: "Slide 2", description: "Description for slide 2", thumbnailContent: "Thumb 2" },
        { content: "Slide 3", description: "Description for slide 3", thumbnailContent: "Thumb 3" },
        { content: "Slide 4", description: "Description for slide 4", thumbnailContent: "Thumb 4" },
        { content: "Slide 5", description: "Description for slide 5", thumbnailContent: "Thumb 5" },
        { content: "Slide 6", description: "Description for slide 6", thumbnailContent: "Thumb 6" },
    ];

}
