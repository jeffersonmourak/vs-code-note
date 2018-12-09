import { env, languages } from 'vscode';
import { get } from 'lodash';

class I18n {
    private translations = this.loadLocale(env.language);

    updateLocale(locale : string) {
        this.translations = this.loadLocale(locale);
    }

    loadLocale(locale : string) {
        let translations;
        try {
            translations= require(`./${locale}`).default;
        } catch (e) {
            translations = require(`./en`).default;
        }

        return translations; 
    }

    translate(key : string) {        
        return get(this.translations, key) || key;
    }
}

export default new I18n();