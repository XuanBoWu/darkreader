import type {Theme} from '../../../definitions';
import {isURLInList} from '../../../utils/url';
import type {ViewProps} from '../types';

export function getCurrentThemePreset(props: ViewProps) {
    const custom = props.data.settings.customThemes.find(
        ({url}) => isURLInList(props.tab.url, url)
    );
    const preset = custom ? null : props.data.settings.presets.find(
        ({urls}) => isURLInList(props.tab.url, urls)
    );
    const theme = custom ?
        custom.theme :
        preset ?
            preset.theme :
            props.data.settings.theme;

    function setTheme(theme: Partial<Theme>) {
        if (custom) {
            custom.theme = {...custom.theme, ...theme};
            props.actions.changeSettings({
                customThemes: props.data.settings.customThemes,
            });
        } else if (preset) {
            preset.theme = {...preset.theme, ...theme};
            props.actions.changeSettings({
                presets: props.data.settings.presets,
            });
        } else {
            props.actions.setTheme(theme);
        }
    }

    return {
        theme,
        change: setTheme,
    };
}
