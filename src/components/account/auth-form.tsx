"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { eyebrow } from "@/lib/styles";

const modeTab =
  "cursor-pointer border-b border-transparent px-1 py-3 text-[length:inherit] text-[#767f79] transition-[color,border-color] duration-200 aria-selected:border-ink aria-selected:text-ink";
const field = "flex flex-col gap-2 text-[13px]";
const fieldInput = "border-[#d8dcd6] bg-transparent placeholder:text-[#a1a7a0] focus:border-[#d8dcd6]";
const finePrint = "text-[12px] leading-[1.6] text-[#737b75]";

type AuthMode = "sign-in" | "create-account";

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");

  const isSignIn = mode === "sign-in";

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setNotice("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Account access will be available once sign-in is connected.");
  }

  return (
    <main className="grid min-h-[calc(100vh-105px)] grid-cols-[minmax(0,1.05fr)_minmax(460px,.95fr)] bg-[#f7f7f3] max-lg:grid-cols-[minmax(0,.9fr)_minmax(400px,1.1fr)] max-md:grid-cols-[1fr]" data-account-page>
      <section className="relative min-h-[700px] overflow-hidden bg-[#c8c2b6] max-md:h-[34vh] max-md:max-h-[390px] max-md:min-h-[290px]" aria-label="Stillform home">
        <Image
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90"
          alt="A calm living room with natural textures and warm light"
          fill
          priority
          sizes="(max-width: 760px) 100vw, 52vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#161d1a12_25%,#161d1a88_100%)]" />
        <div className="absolute inset-x-[8%] bottom-[8%] z-1 text-white max-md:inset-x-[7%] max-md:bottom-[9%]">
          <span className={cn(eyebrow, "text-[#f1eee5]")}>A place for the pieces you keep</span>
          <p className="mt-5 mb-[30px] font-serif text-[clamp(42px,5.3vw,76px)] leading-[.98] font-normal tracking-[-.04em] max-md:mt-3 max-md:mb-[18px] max-md:text-[48px] max-sm:text-[38px]">Good things<br />belong with you.</p>
          <span className="text-[10px] tracking-[.14em]">THE STILLFORM HOME <span className="px-[7px] opacity-70">/</span> 01</span>
        </div>
      </section>

      <section className="flex flex-col items-center justify-between px-[clamp(32px,7vw,100px)] pt-[35px] pb-7 max-lg:px-8 max-md:min-h-[650px] max-md:px-[7%] max-md:pt-[25px] max-md:pb-6">
        <Link className="self-start text-[15px] font-medium tracking-[.2em] max-md:self-center" href="/" aria-label="Stillform home">
          STILLFORM
        </Link>
        <div className="w-[min(100%,420px)] py-[45px] max-md:py-[30px]">
          <span className={cn(eyebrow, "mb-[15px]")}>Your Stillform account</span>
          <h1 className="mb-3 font-serif text-[clamp(38px,4vw,52px)] leading-[1.05] font-normal tracking-[-.035em] max-md:text-[42px] max-sm:text-[34px]">{isSignIn ? "Welcome back." : "Make yourself at home."}</h1>
          <p className="mb-[30px] leading-[1.7] text-[#6e7771] max-md:mb-[23px]">
            {isSignIn
              ? "Sign in to revisit your saved pieces and orders."
              : "Create an account to keep your favorites close."}
          </p>

          <div className="mb-[25px] grid grid-cols-[1fr_1fr] border-b border-line" role="tablist" aria-label="Account access">
            <button
              type="button"
              role="tab"
              aria-selected={isSignIn}
              className={modeTab}
              onClick={() => changeMode("sign-in")}
            >
              Sign in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={!isSignIn}
              className={modeTab}
              onClick={() => changeMode("create-account")}
            >
              Create account
            </button>
          </div>

          <form className="flex flex-col gap-[19px]" onSubmit={handleSubmit}>
            {!isSignIn && (
              <label className={field}>
                <span>Full name</span>
                <Input variant="box" className={fieldInput} name="name" type="text" autoComplete="name" placeholder="Your name" required />
              </label>
            )}
            <label className={field}>
              <span>Email address</span>
              <Input variant="box" className={fieldInput} name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            </label>
            <label className={field}>
              <span>Password</span>
              <span className="relative flex">
                <Input
                  variant="box"
                  className={cn(fieldInput, "pr-[46px]")}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isSignIn ? "current-password" : "new-password"}
                  placeholder="At least 8 characters"
                  minLength={8}
                  required
                />
                <button
                  className="absolute top-[2px] right-[2px] grid size-[42px] cursor-pointer place-items-center text-[#7b847e] hover:text-ink"
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>

            {isSignIn ? (
              <div className="-mt-[3px] flex items-center justify-between gap-[10px] text-[12px]">
                <label className="flex cursor-pointer items-center gap-2 text-[#626c66]">
                  <input className="my-[3px] mr-[3px] ml-1 size-[15px] accent-ink" name="remember" type="checkbox" />
                  <span>Keep me signed in</span>
                </label>
                <button
                  className="cursor-pointer border-b border-[#9da49e] text-[length:inherit] text-ink"
                  type="button"
                  onClick={() => setNotice("Password reset will be available once sign-in is connected.")}
                >
                  Forgot password?
                </button>
              </div>
            ) : (
              <p className={finePrint}>
                Your account will keep your saved pieces and order details together.
              </p>
            )}

            <Button className="mt-[5px] w-full justify-between px-[17px]" type="submit">
              {isSignIn ? "Sign in" : "Create account"}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            {notice && <p className={cn(finePrint, "bg-[#e8ebe5] p-3 text-[#46564d]")} role="status">{notice}</p>}
          </form>

          <p className="text-[12px] text-[#737b75]">
            New to Stillform? <Link className="text-ink underline underline-offset-[3px]" href="/our-story">Our story</Link>
          </p>
        </div>
        <Link href="/shop" className="inline-flex items-center gap-[9px] self-end border-b border-[#9ca29d] pb-[5px] text-[12px] max-md:self-center [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-[3px]">
          Continue browsing <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
