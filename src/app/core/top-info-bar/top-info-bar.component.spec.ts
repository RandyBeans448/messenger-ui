import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopInfoBarComponent } from './top-info-bar.component';

describe('TopInfoBarComponent', () => {
    let component: TopInfoBarComponent;
    let fixture: ComponentFixture<TopInfoBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TopInfoBarComponent],
        })
            .compileComponents();

        fixture = TestBed.createComponent(TopInfoBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
