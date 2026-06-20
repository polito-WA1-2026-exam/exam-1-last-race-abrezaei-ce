import api from "@/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

function PageLogin() {
  const navigate = useNavigate();
  const formSchema = zod.object({
    username: zod.string().nonempty(),
    password: zod.string().nonempty()
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  async function handleLogin(data) {
    const response = await api.auth.login(data);

    if (response.success) navigate('/');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <FieldGroup>

            <Controller
              name='username'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>

                  <FieldLabel htmlFor='username'>Username</FieldLabel>
                  <Input
                    {...field}
                    id='username'
                    type='text'
                    placeholder="player"
                    aria-invalid={fieldState.invalid} />
                  {
                    fieldState.invalid
                    &&
                    <FieldError errors={[fieldState.error]} />
                  }

                </Field>
              )} />
            <Controller
              name='password'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>

                  <FieldLabel htmlFor='password'>Password</FieldLabel>
                  <Input
                    {...field}
                    id='password'
                    type='password'
                    aria-invalid={fieldState.invalid} />
                  {
                    fieldState.invalid
                    &&
                    <FieldError errors={[fieldState.error]} />
                  }

                </Field>
              )} />

            <Field>
              <Button type="submit">Login</Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default PageLogin;