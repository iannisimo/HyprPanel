import { bind, execAsync } from "astal";
import { Gtk } from "astal/gtk3";
import icons from "src/lib/icons/icons";
import { isPrimaryClick } from "src/lib/utils";
import { tlpPoller, tlpStatus } from "./helpers";

export const TLP = (): JSX.Element => {

    tlpPoller.initialize();
    const profiles = ['auto', 'ac', 'bat'];

    return (
        <box className={"menu-items-section"} valign={Gtk.Align.FILL} vexpand vertical>
            {profiles.map((profile: string) => {
                const pkey = profile as keyof typeof icons.tlp;
                return (
                    <button
                        className={bind(tlpStatus).as((status) => `power-profile-item ${status === profile ? 'active' : ''}`)}
                        onClick={(_, event) => {
                            if (isPrimaryClick(event)) {
                                execAsync(`${SRC_DIR}/scripts/tlp.sh set ${profile}`)
                            }
                        }}
                    >
                        <box>
                            <icon
                                className={"power-profile-icon"}
                                icon={icons.tlp[pkey] || icons.tlp.auto}
                            />
                            <label className={"power-profile-label"} label={profile} />
                        </box>
                    </button>
                );
            })}
        </box>
    );
};
