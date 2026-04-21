import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { ProfileForm } from "@/components/profile-form";
import { AvatarUpload } from "@/components/avatar-upload";
import { ChangePasswordForm } from "@/components/change-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, avatar_url")
    .eq("id", user.id)
    .single();

  const displayName = profile?.name || "";
  const email = user.email || "";
  const avatarUrl = profile?.avatar_url || "";

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-10">
        <Card>
          <CardContent className="pt-6">
            <AvatarUpload
              currentAvatarUrl={avatarUrl}
              displayName={displayName}
              email={email}
            />
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your name and view your email address.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm defaultName={displayName} email={email} />
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password to keep your account secure.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
