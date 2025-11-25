"use client";
import axiosInstance from "@/lib/axiosInstance";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; // Iconos ver/ocultar

interface LoginFormProps {
  setFormType: React.Dispatch<React.SetStateAction<"login" | "recovery">>;
}

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "El correo es obligatorio")
    .email("Formato de correo inválido")
    .transform((v) => v.toLowerCase()),
  password: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])/, "Debe incluir mayúscula, número y símbolo"),
});

type FormData = z.infer<typeof loginSchema>;

export function LoginForm({
  setFormType,
  className,
  ...props
}: LoginFormProps & React.ComponentPropsWithoutRef<"form">) {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = useCallback(
    async (data: FormData) => {
      setLoading(true);
      setErrorMessage("");
      setSuccess(false);
      try {
        const response = await axiosInstance.post("/auth/login", data);
        const { user } = response.data;
        if (user) {
          setSuccess(true);
          router.push("/dashboard/panel-control");
        }
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
      noValidate
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Inicia sesión</h1>
        <p className="text-sm text-muted-foreground">
          Ingresa tu correo y contraseña para acceder a tu cuenta.
        </p>
      </div>

      {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
            className={cn(
              errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            )}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              {...register("password")}
              className={cn(
                "pr-10",
                errors.password ? "border-red-500" : ""
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>

        <Button
          type="submit"
            className={`w-full transition-colors ${success ? "bg-emerald-800" : "bg-black hover:bg-gray-900"}`}
          disabled={loading || success || !isValid}
          style={{ opacity: success ? 0.9 : 1 }}
        >
          {loading ? "Iniciando..." : success ? "Sesión iniciada" : "Iniciar sesión"}
        </Button>
      </div>

      <div className="text-center text-sm">
        ¿No tienes acceso?{" "}
        <button type="button" onClick={() => setFormType("recovery")} className="underline">
          Recuperar Cuenta
        </button>
      </div>
    </form>
  );
}
