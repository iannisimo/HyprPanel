import { PowerProfileService } from 'src/lib/types/options';
import { PowerProfileHeader } from './Header';
import { PowerProfiles } from './Profile';
import { TLP } from './TLP';
import { bind } from 'astal';

const { powerProfileService } = options.menus.power;

export const EnergyProfiles = (): JSX.Element => {
    return (
        <box className="menu-section-container energy" vertical>
            <PowerProfileHeader />
            {bind(powerProfileService).as((pps) => {
                switch (pps) {
                    case 'ppd':
                        return (<PowerProfiles />);
                    case 'tlp':
                        return (<TLP />);
                    default:
                        break;
                }
            })}
        </box>
    );
};
