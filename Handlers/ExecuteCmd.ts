import { WAMethods } from "../Library/Functions";
import { exec } from "child_process";
import { MessageSerializer } from "../Library/Serialize";
import { custom_msg } from "../Library/Fakes";
import { ucapanWaktu } from "../Library/Modules";
import * as cfg from "../Config/Config.json";
const handler = (setsu: WAMethods, m: MessageSerializer) => {
    if (m.isCreator === false) return setsu.sendMessage(m.chat, { text: cfg.mess.owner }, m.device !== "web" ? { quoted: custom_msg(`${ucapanWaktu()} ${m.pushname}`) } : undefined);
    if (!m.query)
        return setsu.sendMessage(
            m.chat,
            { text: `Ketik ${m.bold}${m.prefix}${m.command} <perintah>${m.bold}` },
            m.device !== "web" ? { quoted: custom_msg(`${ucapanWaktu()} ${m.pushname}`) } : undefined
        );
    const Aliases = Object.keys(cfg["terminal.aliases"]);
    const command = m.query === "pull" ? "pull" : m.query === "restart" ? "restart" : undefined;
    if (Aliases.includes(m.query)) execute(cfg["terminal.aliases"][command!]);
    else execute(m.query);
    function execute(command: string) {
        exec(command, (err, stdout, stderr) => {
            if (err) return setsu.sendMessage(m.chat, { text: `${err}` }, m.device !== "web" ? { quoted: custom_msg(`${ucapanWaktu()} ${m.pushname}`) } : undefined);
            if (stderr) return setsu.sendMessage(m.chat, { text: `${stderr}` }, m.device !== "web" ? { quoted: custom_msg(`${ucapanWaktu()} ${m.pushname}`) } : undefined);
            setsu.sendMessage(m.chat, { text: `${stdout}` }, m.device !== "web" ? { quoted: custom_msg(`${ucapanWaktu()} ${m.pushname}`) } : undefined);
        });
    }
};
handler.command = ["exec"];

export default handler;
