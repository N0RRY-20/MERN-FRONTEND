import { FormField } from "@/components/common/form";
import { PasswordInput } from "@/components/common/password-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { useRegister } from "./useRegister";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { control, onSubmit, isPending, isSuccess, errorMessage } =
    useRegister();

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} noValidate>
          <FieldGroup>
            <FormField
              control={control}
              name="fullname"
              label="Full Name"
              placeholder="John Doe"
              autoComplete="name"
            />
            <FormField
              control={control}
              name="username"
              label="Username"
              placeholder="johndoe"
              autoComplete="username"
            />
            <FormField
              control={control}
              name="email"
              type="email"
              label="Email"
              placeholder="m@example.com"
              autoComplete="email"
            />
            <PasswordInput
              control={control}
              name="password"
              label="Password"
              autoComplete="new-password"
            />
            <PasswordInput
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              autoComplete="new-password"
            />
            <FieldGroup>
              <Field>
                {errorMessage && <FieldError>{errorMessage}</FieldError>}
                <Button type="submit" disabled={isPending || isSuccess}>
                  {isPending ? "Creating account..." : "Create Account"}
                </Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
