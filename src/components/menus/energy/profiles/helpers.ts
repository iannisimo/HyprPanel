import { Variable } from "astal";
import { BashPoller } from "src/lib/poller/BashPoller";

/**
 * Renders the uptime in a human-readable format.
 *
 * This function takes the current uptime in minutes and converts it to a string format showing days, hours, and minutes.
 *
 * @param curUptime The current uptime in minutes.
 *
 * @returns A string representing the uptime in days, hours, and minutes.
 */
export const renderUptime = (curUptime: number): string => {
    const days = Math.floor(curUptime / (60 * 24));
    const hours = Math.floor((curUptime % (60 * 24)) / 60);
    const minutes = Math.floor(curUptime % 60);
    return ` : ${days}d ${hours}h ${minutes}m`;
};

const handleTlpResponse = (response: string) => {
    // console.log(response, tlpStatus.get());
    return response;
}

const tlpPollerInterval = Variable(1000);

export const tlpStatus = Variable<string>("unk");

export const tlpPoller = new BashPoller<string, []>(
    tlpStatus,
    [],
    tlpPollerInterval,
    `${SRC_DIR}/scripts/tlp.sh get`,
    handleTlpResponse,
)

