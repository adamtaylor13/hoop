import * as blessed from "blessed";
import { deflatten } from "./deflatten";

const screen = blessed.screen({
    smartCSR: true,
    fullUnicode: true,
    forceUnicode: true,
});

// TODO: Rename this because TS thinks screen.render is status.render
export const status = {
    render: (content: string, jobStatusLabels: string[]) => {
        const message = blessed.text({
            parent: screen,
            width: "50%",
            align: "center",
            left: "center",
            content: content,
            underline: false,
            style: {
                fg: "blue",
                bold: true,
            },
        });

        let maxLabelLength = jobStatusLabels.reduce(
            (acc, label) => (label.length > acc ? label.length : acc),
            0
        );
        const maxWidth = Math.floor(screen.width / maxLabelLength);
        // Label table
        blessed.listtable({
            parent: screen,
            top: `${message.height}`,
            height: "70%",
            align: "left",
            data: deflatten(jobStatusLabels, maxWidth),
        });

        screen.render();
    },
};
