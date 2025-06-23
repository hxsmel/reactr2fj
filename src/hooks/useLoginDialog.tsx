import {useState} from "react";
import {LoginDialog} from "../LoginForm/LoginDialog.tsx";

export function useLoginDialog() {
    const [open, setOpen] = useState(false);

    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    const dialog = <LoginDialog open={open} onClose={closeDialog} />;

    return { openDialog, dialog };
}