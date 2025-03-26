import { createI18n } from 'vue-i18n';
import en from '../locace/en.ts';

const locale = 'en';
export default createI18n({
   legacy: false,
   globalInjection: true,
   locale: locale,
   messages: {
      en,
   },
});
