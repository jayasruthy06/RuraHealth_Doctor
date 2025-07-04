"use client";
import React, {useState} from 'react';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ConfirmationModal from './confirmation-modal';

const LoginForm = ({ className, ...props }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState('success');

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission
    setModalState('success');
    setModalOpen(true);
  }

  return (
    <div className={cn("flex flex-col gap-6 font-nunito", className)} {...props}>
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={()=>setModalOpen(false)}
        state={modalState}
        title="Success!"
        message="You've successfully logged in."
      />
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <img
              src="/108329.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
          <form onSubmit={handleLogin} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-charcoal-text">Welcome Doctor</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your RuraHealth account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" placeholder="Enter your password" required />
              </div>
              <Button type="submit" className="w-full bg-primary-accent text-white hover:bg-primary-accent/80 cursor-pointer">
                Login
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  Register
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div
        className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        See our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

export default LoginForm;