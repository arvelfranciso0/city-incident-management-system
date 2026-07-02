import { useForm } from "@inertiajs/react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "@/Components/ui/label";
import { FormEventHandler, useState } from "react";
import { CimsUser } from "@/types/cims";
import { AuthField } from "./AuthForm";

interface ResetUserPasswordData {
    password: string;
    password_confirmation: string;
}
export default function ResetUserPasswordDialog({ user }: { user: CimsUser }) {
    const [open, setOpen] = useState(false);
    const { data, isDirty, patch, setData, errors } =
        useForm<ResetUserPasswordData>({
            password: "",
            password_confirmation: "",
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route("admin.users.password", user.id), {
            // forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                (console.log("Sucess"), setOpen(false));
            },
            onError: (e) => {
                console.log("error", e);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Reset Password
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Reset Staff Password</DialogTitle>
                <form onSubmit={submit} className="space-y-5">
                    <div className="space-y-2">
                        <AuthField
                            id="password"
                            label="New Password"
                            type="password"
                            value={data.password}
                            error={errors.password}
                            autoComplete="new-password"
                            required
                            onChange={(value) => setData("password", value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <AuthField
                            id="password_confirmation"
                            label="Confirm password"
                            type="password"
                            value={data.password_confirmation}
                            error={errors.password_confirmation}
                            autoComplete="new-password"
                            required
                            onChange={(value) =>
                                setData("password_confirmation", value)
                            }
                        />
                    </div>

                    <Button type="submit" disabled={!isDirty}>
                        Save
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
