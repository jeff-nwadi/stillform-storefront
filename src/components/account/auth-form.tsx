"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <main className="account-page">
      <section className="account-visual" aria-label="Stillform home">
        <Image
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90"
          alt="A calm living room with natural textures and warm light"
          fill
          priority
          sizes="(max-width: 760px) 100vw, 52vw"
          unoptimized
        />
        <div className="account-visual-shade" />
        <div className="account-visual-copy">
          <span className="eyebrow">A place for the pieces you keep</span>
          <p>Good things<br />belong with you.</p>
          <span className="account-visual-caption">THE STILLFORM HOME <span>/</span> 01</span>
        </div>
      </section>

      <section className="account-panel">
        <Link className="account-wordmark" href="/" aria-label="Stillform home">
          STILLFORM
        </Link>
        <div className="account-form-wrap">
          <span className="eyebrow">Your Stillform account</span>
          <h1>{isSignIn ? "Welcome back." : "Make yourself at home."}</h1>
          <p className="account-intro">
            {isSignIn
              ? "Sign in to revisit your saved pieces and orders."
              : "Create an account to keep your favorites close."}
          </p>

          <div className="account-mode-switch" role="tablist" aria-label="Account access">
            <button
              type="button"
              role="tab"
              aria-selected={isSignIn}
              className={isSignIn ? "active" : ""}
              onClick={() => changeMode("sign-in")}
            >
              Sign in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={!isSignIn}
              className={!isSignIn ? "active" : ""}
              onClick={() => changeMode("create-account")}
            >
              Create account
            </button>
          </div>

          <form className="account-form" onSubmit={handleSubmit}>
            {!isSignIn && (
              <label className="account-field">
                <span>Full name</span>
                <Input name="name" type="text" autoComplete="name" placeholder="Your name" required />
              </label>
            )}
            <label className="account-field">
              <span>Email address</span>
              <Input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            </label>
            <label className="account-field">
              <span>Password</span>
              <span className="password-input-wrap">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isSignIn ? "current-password" : "new-password"}
                  placeholder="At least 8 characters"
                  minLength={8}
                  required
                />
                <button
                  className="password-visibility"
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>

            {isSignIn ? (
              <div className="account-options">
                <label className="account-remember">
                  <input name="remember" type="checkbox" />
                  <span>Keep me signed in</span>
                </label>
                <button
                  className="account-text-button"
                  type="button"
                  onClick={() => setNotice("Password reset will be available once sign-in is connected.")}
                >
                  Forgot password?
                </button>
              </div>
            ) : (
              <p className="account-terms">
                Your account will keep your saved pieces and order details together.
              </p>
            )}

            <Button className="account-submit" type="submit">
              {isSignIn ? "Sign in" : "Create account"}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            {notice && <p className="account-notice" role="status">{notice}</p>}
          </form>

          <p className="account-help">
            New to Stillform? <Link href="/our-story">Our story</Link>
          </p>
        </div>
        <Link href="/shop" className="account-back-link">
          Continue browsing <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
