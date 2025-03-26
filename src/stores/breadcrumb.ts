import {defineStore} from 'pinia';

interface Breadcrumbs {
    title: string;
    breadcrumbs: any;
}

export const breadcrumbsStore = defineStore('breadcrumbs', {
        state: (): Breadcrumbs => {
            return {
                title: '',
                breadcrumbs: [],
            };
        },
        actions: {
            setBreadcrumb(title: string, breadcrumbs: any) {
                this.title = title;
                this.breadcrumbs = breadcrumbs;
            }
            ,
        },
    })
;
