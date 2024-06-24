import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type IconType =
    'add' | 'downloadTechDrawing' | 'savedDesigns' | 'privateDb' | 'cancel' | 'check_circle' | 'beta'
    | 'pro' | 'open_full' | 'toggle_menu' | 'team_files' | 'saved' | 'category'
    | 'search' | 'close' | 'download' | 'dropdown' | 'notification' | 'credits' | 'info'
    | 'tender' | 'help' | 'sign_out' | 'upload' | 'copy' | 'arrow_right' | 'arrow_left'
    | 'save' | 'warning' | 'design' | 'share' | 'send' | 'close_full' | 'paperWithMagnifyingGlass'
    | 'delete' | 'check';

@Component({
    selector: 'app-icon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
    @Input()
    public icon: IconType = 'check';

    @Input()
    public filled: boolean = false;

    @Input()
    public circleFill: boolean = false

    @Input()
    public orange: boolean = false

    @Input()
    public red: boolean = false

    @Input()
    public size: string = '1.5rem';

    public iconString: string = 'emoticon';

    private iconMap: { [key in IconType]: string } = {
        add: 'add',
        arrow_left: 'arrow_forward',
        arrow_right: 'arrow_back',
        beta: 'compost',
        cancel: 'cancel',
        category: 'handyman',
        check: 'check',
        check_circle: 'check_circle',
        close: 'close',
        close_full: 'close_fullscreen',
        copy: 'content_copy',
        credits: 'database',
        delete: 'delete',
        design: 'deployed_code',
        download: 'download',
        downloadTechDrawing: 'architecture',
        dropdown: 'arrow_drop_down_circle',
        help: 'help',
        info: 'info',
        notification: 'notifications_active',
        open_full: 'open_in_full',
        paperWithMagnifyingGlass: 'quick_reference_all',
        privateDb: 'database',
        pro: 'diamond',
        save: 'bookmark_add',
        savedDesigns: 'description',
        saved: 'bookmark_added',
        search: 'search',
        send: 'send',
        sign_out: 'logout',
        share: 'ios_share',
        team_files: 'book_5',
        tender: 'gavel',
        toggle_menu: 'menu_open',
        upload: 'upload',
        warning: 'error',
    };

    ngOnInit() {
        this.iconString = this.getIcon(this.icon);
    }

    public getIcon(icon: IconType): string {
        const iconString: string = this.iconMap[icon];

        if (!iconString) {
            return 'emoticon';
        }

        return iconString;
    }
}
