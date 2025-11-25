"use client"
import { useState } from "react"
import { RecoveryForm } from "@/components/recovery-form"
import { LoginForm } from "@/components/login-form"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  const [formType, setFormType] = useState<"login" | "recovery">("login")  // Estado para determinar si es login o registro
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-16 w-16 items-center rounded-full justify-center bg-primary text-primary-foreground">
            <Image
              src="/images/logo.jpg"
              alt="Image"
              width={500}
              height={500}
              className="h-full w-40 object-cover rounded-full"
            />
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {/* Pasar el estado formType como prop a cada formulario */}
            {formType === "login" ? (
              <LoginForm setFormType={setFormType} />
            ) : (
              <RecoveryForm setFormType={setFormType} />
            )}
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/0 to-transparent z-10" />
        {/* Imagen */}
        <Image
          src="/img/content-marketing/antropometria.jpg"
          alt="Image"
          width={500}
          height={500}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
