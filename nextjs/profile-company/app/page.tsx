"use client";
 
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MenuLandingPage from "@/app/components/langding-page-menu/page";
import { Button } from "@/components/ui/button";
import { LandingPageHero } from "@/app/components/landing-page-hero/hero";
import { X, KeyRound, Mail, ArrowRight } from "lucide-react"
import {
  Field,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
 
export default function Home() {
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
 
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setLoginError("");
 
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Login gagal.");
 
      setIsLoginOpen(false);
      setPassword("");
      router.push("/admin");
      router.refresh();
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Login gagal.");
    } finally {
      setIsSubmitting(false);
    }
  }
 
  return (
    <main className="relative relative w-full bg-white dark:bg-black">
      <div className="relative z-0 -mt-[96px]">
        <LandingPageHero />
      </div>
      <div className="absolute top-0 left-0 z-10 w-full flex flex-col items-center">
        <div className="w-[95%] h-[80px] bg-blue-800 dark:bg-blue-800 rounded-[70px] flex mt-4 mx-8 p-4">
          {/* logo */}
          <div className="relative w-[200px] h-[50px] rounded-[70px] items-center justify-start">
            <Image className="p-[7px]" src="/img/smk_mvp_ars_logo_white.png.png" alt="logo" fill />
          </div>
          {/* menu */}
          <div className="flex flex-1 items-center justify-center">
            <MenuLandingPage />
          </div>
          {/* login */}
          <div className="flex items-center justify-end p-4">
            <Button
              onClick={() => {
                setLoginError("");
                setIsLoginOpen(true);
              }}
              className="
              bg-white 
              border border-gray-300 
              text-orange-500 
              hover:bg-gray-100 
              dark:bg-gray-800 
              dark:border-gray-700 
              dark:text-orange-400
              text-[16px]
              font-semibold
              rounded-full
              p-[20px]"
              size="lg"
            >
              Login
            </Button>
          </div>
        </div>
        
        {isLoginOpen && (
          <div className="flex flex-col gap-4 items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-auto my-8 border border-gray-200">
            <div className="w-full flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">Silakan Login</h3>
              <Button type="button" variant="ghost" size="icon" onClick={() => setIsLoginOpen(false)} disabled={isSubmitting}>
                <X />
              </Button>
            </div>

            <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
              <Field className="w-full">
                <FieldLabel htmlFor="email-input">Email</FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <Mail className="size-4 text-gray-400" />
                  </InputGroupAddon>
                  <InputGroupInput 
                    id="email-input" 
                    type="email" 
                    placeholder="nama@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </InputGroup>
              </Field>

              <Field className="w-full">
                <FieldLabel htmlFor="password-input">Password</FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <KeyRound className="size-4 text-gray-400" />
                  </InputGroupAddon>
                  <InputGroupInput 
                    id="password-input" 
                    type="password" 
                    placeholder="Masukkan password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </InputGroup>
              </Field>

              {loginError && (
                <p role="alert" className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  {loginError}
                </p>
              )}

              <div className="flex justify-end gap-2 mt-2">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  <span>{isSubmitting ? "Memverifikasi..." : "Login"}</span>
                  {!isSubmitting && <ArrowRight className="ml-2 size-4" />}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}